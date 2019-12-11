import {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import checkValidity from '../validity/check'

const VInputBase = (props) => {  

  const config= {
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
    ...props.config
  }

  const [valid, setValid]= useState(true)
  const [message, setMessage]= useState('')
  
  const inputRef = useRef(undefined)
  

  const setValidity= () => {
    if (inputRef!=undefined && inputRef.current!=undefined) {
      // Clear previous custom error
      inputRef.current.setCustomValidity('')
      inputRef.current.setAttribute('data-valium-validity', '')  

      // Check error if any
      const value = config.getValue(inputRef)
      const validity= checkValidity(inputRef, value, config.parseForCompare, 
                                  props.checkValue, props.allowedValues, props.disallowedValues, props.doRepeat, props.doNotRepeat)
      const message= validity==''
                     ? ''
                     : props.feedback || validity

      // Set it
      //inputRef.current.removeAttribute('readonly')
      inputRef.current.setCustomValidity(message)
      inputRef.current.setAttribute('data-valium-validity', message) 

      // Update state
      setValid(message==='')
      setMessage(message)

      // Update form
      if (props.formActions && props.formActions.formUpdate!=undefined) {
        props.formActions.formUpdate(inputRef.current, message, value)
      }      
    }
  }

  const handleChange = (_event) => {
    setValidity()
  }


  useEffect(() => {
    if (inputRef!=undefined && inputRef.current!=undefined) {

      const name= inputRef.current.name
      
      // Custom actions
      try {
        config.rightAfterMount(inputRef)
      } catch(e) {
        if (process.env.NODE_ENV !== "production") {
          console.error(`Valium: error on Input Element (${name}) when calling rightAfterMount(): ${e.message})`)
        }
      }

      // Set initial validity
      setValidity()

      // Special props
      if (props.bindSetValidity!=undefined) {
        props.bindSetValidity(() => setValidity())
      }

      const cleanBindSetValidity = () => {
        if (props.bindSetValidity!=undefined) {
          props.bindSetValidity(() => {})
        }           
      }

      // Check props consistency
      if (process.env.NODE_ENV !== "production") {
        // Check input type
        if (config.dbg_assertType!=undefined) {
          const inputType= inputRef.current.type
          if (inputType.toString().toUpperCase()!=config.dbg_assertType.toString().toUpperCase()) {
            console.error(`Valium: an Input Element (${name}) has an incorrect Type (${inputType} instead of ${config.dbg_assertType})`)
          }
        }
        // Check prematureValidation
        if (props.prematureValidation && !config.premature_check) {
          console.warn(`Valium: You passed prematureValidation=true to the Input Element (${name}), but it does not support it`)
        }
        // Check doRepeat
        if (props.doRepeat!=undefined && props.doRepeat==name) {
          console.warn(`Valium: You passed doRepeat prop to the Input Element (${name}) with the same name`)
        }
        // Check doNotRepeat
        if (props.doNotRepeat!=undefined && props.doNotRepeat==name) {
          console.warn(`Valium: You passed doNotRepeat prop to the Input Element (${name}) with the same name`)
        }            
      }

      // Handle listeners
      const allListeners= {}

      // Add premature listeners, if any
      if (config.premature_check && props.prematureValidation) {
        const prematureEvents= config.premature_event.split(',')
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
      inputRef.current.addEventListener(config.change_event, changeListener)
      allListeners[config.change_event]= changeListener

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
  }, [props.config, props.prematureValidation])
  
  return props.render(
      {valid, message},
      inputRef)
}


VInputBase.propTypes = {
  feedback            : PropTypes.string,
  render              : PropTypes.func.isRequired,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  doRepeat            : PropTypes.string,
  doNotRepeat         : PropTypes.string,
  prematureValidation : PropTypes.bool,
  formActions         : PropTypes.object.isRequired
}



export default VInputBase