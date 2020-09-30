import {useState, useCallback} from 'react'
import {log} from '../helpers/log'
import {checkValidity} from './checkValidity'
import {getInputValue} from './getInputValue'


const useValidity = (inputRef, checkValue, allowedValues, disallowedValues, 
                     doRepeat, doNotRepeat, decimals, feedback) => {
  
  const [valid, setValid]= useState(true)
  const [message, setMessage]= useState('')

  //
  // Callback for check and set input validity
  //
  const setValidity= useCallback(() => {
    if (inputRef!=undefined && inputRef.current!=undefined) {
      const input= inputRef.current
      const name= input.name

      // Clear previous custom error
      input.setCustomValidity('')
      input.setAttribute('data-valium-validity', '')  

      // Check validity
      const value = getInputValue(input)
      const validity= checkValidity(inputRef, value,
                                    checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals)
      const message= validity==''
                    ? ''
                    : feedback!=undefined
                      ? feedback 
                      : validity

      // Set it
      //input.removeAttribute('readonly')
      input.setCustomValidity(message)
      input.setAttribute('data-valium-validity', message) 
      input.setAttribute('data-valium-value', value) 

      // Update state
      setValid(message==='')
      setMessage(message)

      // Update form     
      if (input.form != undefined) {
        log('input', `${name} (${input.type}) setValidity is raising valium-form-change`)
        const event = new CustomEvent("valium-form-change", {
          detail: {
            name: name,
            validity: message,
            valid: message=='',
            value: value
          }
        });
        input.form.dispatchEvent(event)
      }


    }}, 
    [inputRef, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback]
  )
  
  return [valid, message, setValidity]
}

export {useValidity}

