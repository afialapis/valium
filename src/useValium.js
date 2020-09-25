import {useEffect, useRef} from 'react'
import {log} from './helpers/log'
import {makeInputFilter} from './helpers/inputFilters'
import getEventTypes from './config/getEventTypes'
import { useValidity } from './validity/useValidity'
import {checkProps} from './checkers/checkProps'

const useValium = (props) => {

  const {checkValue, 
         allowedValues, disallowedValues, 
         doRepeat, doNotRepeat, decimals, 
         inputFilter, prematureValidation, 
         feedback}= props

  const inputRef = useRef(undefined)

  const [valid, message, setValidity] = 
    useValidity(inputRef, checkValue, allowedValues, disallowedValues, 
                doRepeat, doNotRepeat, decimals, feedback)

  //
  // Specific effect to check props consistency. Just DEV time
  //
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (inputRef!=undefined && inputRef.current!=undefined) {
        const input= inputRef.current

        log('input', `${input.name} (${input.type}) running checkprops effect on useValium  -- ${JSON.stringify([doRepeat, doNotRepeat, inputFilter, prematureValidation])}`)

        checkProps(input, doRepeat, doNotRepeat, inputFilter, prematureValidation)
      }
    }
  }, 
  // We subscribe specific props to avoid re-runnings:
  // - passing `props' would re-run each render
  [doRepeat, doNotRepeat, inputFilter, prematureValidation])


  useEffect(() => {
    if (inputRef!=undefined && inputRef.current!=undefined) {

      const input= inputRef.current
      const name= input.name
      const inputType= input.type.toLowerCase()

      log('input', `${input.name} (${input.type}) running validity effect on useValium - ${JSON.stringify([prematureValidation, inputFilter, setValidity])}`)
      
      // Ensure checkbox checked prop
      if (inputType === 'checkbox') {
        if (input.value==='true' || input.value===true) {
          input.setAttribute('checked', true)
        }         
      }

      // Set initial validity
      setValidity()

      const handleChange = (event) => {
        log('input', `${input.name} (${input.type}) event ${event.type} is calling setValidity`)
        setValidity()
      }

      // Handle listeners
      const allListeners= {}

      // Add change listener
      const changeListener= (event) => {
        handleChange(event)
      }

      const changeEvent= getEventTypes(inputType, 'change')[0]
      input.addEventListener(changeEvent, changeListener)
      allListeners[changeEvent]= changeListener


      // Add premature listeners, if any
      if (prematureValidation) {
        let prematureEvents= []
        prematureEvents= getEventTypes(inputType, 'premature')
        prematureEvents
          .filter((eventType) => eventType != changeEvent)
          .map((eventType) => {
            const prematureListener= (event) => {
              handleChange(event)      
            }
            input.addEventListener(eventType, prematureListener)
            allListeners[eventType]= prematureListener
          })    
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
      return removeAllChangeListeners
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prematureValidation, inputFilter /*, setValidity*/])

  return [inputRef, valid, message, setValidity]
}


export default useValium