import {useState, useEffect, useRef, useCallback} from 'react'
import PropTypes from 'prop-types'

import checkValidity from '../validity/check'

const VInputBase = ({config, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, stepRange, prematureValidation, feedback, formActions, bindSetValidity, render}) => {  

  const iconfig= {
    dbg_assertType   : undefined,
    change_event     : 'change' ,
    premature_check  : true     ,
    //
    // Catching 'input' event will not work
    // on Controlled components. The event gets fired
    // and handled correctly (at least it seems so),
    // but the input gets never updated.
    // React seems to be doing something hacky about it.
    // TODO Investigate why
    //
    premature_event  : 'keyup,paste', // 'input',
    //
    getValue         : (inputRef) => {
      if(inputRef!=undefined && inputRef.current!=undefined) {
        if (inputRef.current.value==undefined) {
          return ''
        }
        return inputRef.current.value
      } else {
        return undefined
      }
    },
    rightAfterMount  : (inputRef) => {},
    parseForCompare  : (v) => v.toString(),
    //
    ...config
  }

  const [valid, setValid]= useState(true)
  const [message, setMessage]= useState('')
  
  const inputRef = useRef(undefined)
  

  const setValidity= useCallback(
    () => {
      if (inputRef!=undefined && inputRef.current!=undefined) {
        //console.log(`${inputRef.current.name} => checking validity`)

        // Clear previous custom error
        inputRef.current.setCustomValidity('')
        inputRef.current.setAttribute('data-valium-validity', '')  

        // Check error if any
        const value = iconfig.getValue(inputRef)
        const validity= checkValidity(inputRef, value, iconfig.parseForCompare, 
                                    checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, stepRange)
        const message= validity==''
                      ? ''
                      : feedback || validity

        // Set it
        //inputRef.current.removeAttribute('readonly')
        inputRef.current.setCustomValidity(message)
        inputRef.current.setAttribute('data-valium-validity', message) 

        // Update state
        setValid(message==='')
        setMessage(message)

        // Update form
        if (formActions && formActions.formUpdate!=undefined) {
          formActions.formUpdate(inputRef.current, message, value)
        }      
      }
    }, 
    [iconfig, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, stepRange, feedback, formActions]
  )


  useEffect(() => {
    if (inputRef!=undefined && inputRef.current!=undefined) {

      //console.log(`${inputRef.current.name} => useEffect`)

      const name= inputRef.current.name
      
      // Custom actions
      try {
        iconfig.rightAfterMount(inputRef)
      } catch(e) {
        if (process.env.NODE_ENV !== "production") {
          console.error(`Valium: error on Input Element (${name}) when calling rightAfterMount(): ${e.message})`)
        }
      }

      // Set initial validity
      setValidity()

      // Special props
      if (bindSetValidity!=undefined) {
        bindSetValidity(() => setValidity())
      }

      const cleanBindSetValidity = () => {
        if (bindSetValidity!=undefined) {
          bindSetValidity(() => {})
        }           
      }

      // Check props consistency
      if (process.env.NODE_ENV !== "production") {
        // Check input type
        if (iconfig.dbg_assertType!=undefined) {
          const inputType= inputRef.current.type
          if (inputType.toString().toUpperCase()!=iconfig.dbg_assertType.toString().toUpperCase()) {
            console.error(`Valium: an Input Element (${name}) has an incorrect Type (${inputType} instead of ${iconfig.dbg_assertType})`)
          }
        }
        // Check prematureValidation
        if (prematureValidation && !iconfig.premature_check) {
          console.warn(`Valium: You passed prematureValidation=true to the Input Element (${name}), but it does not support it`)
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

      const handleChange = (_event) => {
        setValidity()
      }

      // Handle listeners
      const allListeners= {}

      // Add premature listeners, if any
      if (iconfig.premature_check && prematureValidation) {
        const prematureEvents= iconfig.premature_event.split(',')
        prematureEvents.map((eventType) => {
          const prematureListener= (event) => {
            handleChange(event)      
          }
          inputRef.current.addEventListener(eventType, prematureListener)
          allListeners[eventType]= prematureListener
        })    
      }
      // Add change listener
      const changeListener= (event) => {
        handleChange(event)
      }
      inputRef.current.addEventListener(iconfig.change_event, changeListener)
      allListeners[iconfig.change_event]= changeListener

      // clean listeners function
      const removeAllChangeListeners = () => {
        Object.keys(allListeners).map((eventType) => {
          inputRef.current.removeEventListener(eventType, allListeners[eventType])
        })
      }    
      
      // return clean function
      const clean = () => {
        cleanBindSetValidity()
        removeAllChangeListeners()
      }
      return clean
    }
  }, [iconfig, prematureValidation, bindSetValidity, doRepeat, doNotRepeat, stepRange, setValidity])
  
  //try{
  //  console.log(`${inputRef.current.name} => render`)
  //} catch(e) {}

  return render({valid, message}, inputRef)
}


VInputBase.propTypes = {
  config              : PropTypes.object,
  feedback            : PropTypes.string,
  render              : PropTypes.func.isRequired,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  doRepeat            : PropTypes.string,
  doNotRepeat         : PropTypes.string,
  stepRange           : PropTypes.number,
  prematureValidation : PropTypes.bool,
  formActions         : PropTypes.object.isRequired
}



export default VInputBase