import {useState, useEffect, useRef, useCallback} from 'react'

import checkValidity from './validity/checkValidity'
import getInputValue from './validity/getInputValue'
import {makeInputFilter} from './validity/inputFilters'

// Check some props consistency
const checkProps = (name, inputType, doRepeat, doNotRepeat, inputFilter, prematureValidation) => {
  // Check prematureValidation
  if (prematureValidation && ['text', 'number', 'color'].indexOf(inputType)<0) {
    console.warn(`Valium: You passed prematureValidation=true to the Input Element (${name}) of type (${inputType}), but it does not support it`)
  }
  // Check inputFilter
  if (inputFilter && ['text'].indexOf(inputType)<0) {
    console.warn(`Valium: You passed inputFilter to the Input Element (${name}) of type (${inputType}), but it does not support it`)
  }        
  // Check doRepeat
  if (doRepeat!=undefined && doRepeat==name) {
    console.warn(`Valium: You passed doRepeat prop to the Input Element (${name}) with the same name`)
  }
  // Check doNotRepeat
  if (doNotRepeat!=undefined && doNotRepeat==name) {
    console.warn(`Valium: You passed doNotRepeat prop to the Input Element (${name}) with the same name`)
  }
}

const useValium = (props) => {

  const {formActions, checkValue, 
         allowedValues, disallowedValues, 
         doRepeat, doNotRepeat, decimals, 
         inputFilter, prematureValidation, 
         feedback, bindSetValidity}= props

  const [valid, setValid]= useState(true)
  const [message, setMessage]= useState('')
  
  const inputRef = useRef(undefined)

  //
  // Specific effect to check props consistency. Just DEV time
  //
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (inputRef!=undefined && inputRef.current!=undefined) {
        
        const input= inputRef.current
        checkProps(input.name, input.type.toLowerCase(), doRepeat, doNotRepeat, inputFilter, prematureValidation)
      }
    }
  }, 
  // We subscribe specific props to avoid re-runnings:
  // - passing `props' would re-run each render
  // - notice also `formActions` would run twice at mount
  [doRepeat, doNotRepeat, inputFilter, prematureValidation])


  //
  // Callback for check and set input validity
  //
  const setValidity= useCallback(() => {
    if (inputRef!=undefined && inputRef.current!=undefined) {
      const input= inputRef.current

      // Clear previous custom error
      input.setCustomValidity('')
      input.setAttribute('data-valium-validity', '')  

      // Check validity
      const value = getInputValue(input)
      const validity= checkValidity(inputRef, value,
                                    checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals)
      const message= validity==''
                    ? ''
                    : feedback || validity

      // Set it
      //input.removeAttribute('readonly')
      input.setCustomValidity(message)
      input.setAttribute('data-valium-validity', message) 

      // Update state
      setValid(message==='')
      setMessage(message)

      // Update form
      if (formActions && formActions.formUpdate!=undefined) {
        formActions.formUpdate(input, message, value)
      }      
    }}, 
    [checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback, formActions]
  )


  useEffect(() => {
    if (inputRef!=undefined && inputRef.current!=undefined) {

      const input= inputRef.current
      const name= input.name
      const inputType= input.type.toLowerCase()
      
      // Ensure checkbox checked prop
      if (inputType === 'checkbox') {
        if (input.value==='true' || input.value===true) {
          input.setAttribute('checked', true)
        }         
      }

      // Set initial validity
      setValidity()

      // Special prop `bindSetValidity`
      // Used to propagate the `setValidity()` method 
      // and launch it on higher scopes
      if (bindSetValidity!=undefined) {
        bindSetValidity(() => setValidity())
      }

      const cleanBindSetValidity = () => {
        if (bindSetValidity!=undefined) {
          bindSetValidity(() => {})
        }           
      }

      const handleChange = (_event) => {
        setValidity()
      }

      // Handle listeners
      const allListeners= {}

      // Add premature listeners, if any
      let prematureEvents= []
      if (prematureValidation) {
        //
        // Catching 'input' event will not work
        // on Controlled components. The event gets fired
        // and handled correctly (at least it seems so),
        // but the input gets never updated.
        // React seems to be doing something hacky about it.
        // TODO Investigate why
        //
        prematureEvents= inputType=='color'
                         ? ['change']
                         : ['keyup', 'paste'] // 'input'
        prematureEvents.map((eventType) => {
          const prematureListener= (event) => {
            handleChange(event)      
          }
          input.addEventListener(eventType, prematureListener)
          allListeners[eventType]= prematureListener
        })    
      }

      // Add change listener
      const changeListener= (event) => {
        handleChange(event)
      }

      const changeEvent= ['checkbox', 'select', 'select-multiple'].indexOf(inputType)>=0
                         ? 'click'
                         : 'change'

      if (prematureEvents.indexOf(changeEvent)<0) {
        input.addEventListener(changeEvent, changeListener)
        allListeners[changeEvent]= changeListener
      }

      // Input Filter listeners
      // Credits to:
      // https://stackoverflow.com/a/469362
      // https://jsfiddle.net/emkey08/zgvtjc51
      if (inputType == 'text' && inputFilter!=undefined) {
        
        const theInputFilter= makeInputFilter(name, inputFilter)

        // This event list would cover every need:
        // ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'],
        // But lets start simple and easy. 
        const inputFilterEvents= ['input']

        // init auxiliar properties
        input.oldValue = input.value

        const filterEventListener = function(event) {
          if (theInputFilter(event.target.value)) {
            event.target.oldValue = event.target.value
          } else if (Object.hasOwnProperty.call(event.target, "oldValue")) {
            const selectionStart = event.target.selectionStart
            const selectionEnd = event.target.selectionEnd

            event.target.value = event.target.oldValue
            try {
              event.target.setSelectionRange(selectionStart-1, selectionEnd-1)
            } catch(e) {}
          } else {
            event.target.value = ""
          }
        }

        inputFilterEvents.forEach(function(eventType) {
          input.addEventListener(eventType, filterEventListener)
          allListeners[eventType]= filterEventListener
        })
      }

      // clean listeners function
      const removeAllChangeListeners = () => {
        if (input!=undefined) {
          Object.keys(allListeners).map((eventType) => {
            input.removeEventListener(eventType, allListeners[eventType])
          })
        }
      }    
      
      // return clean function
      const clean = () => {
        cleanBindSetValidity()
        removeAllChangeListeners()
      }
      return clean
    }
  }, [prematureValidation, bindSetValidity, inputFilter, setValidity])

  return [inputRef, {valid, message}]
}


export default useValium