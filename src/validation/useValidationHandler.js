import {useState, useCallback} from 'react'
import {log} from '../helpers/log'
import {checkValidity} from './checkValidity'
import {getInputValue} from '../config/getInputValue'
import {getEventTarget} from '../config/getEventTarget'
import {getDefaultMessage} from '../config/getDefaultMessage'

const useValidationHandler = (checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback) => {
  const [validity, setValidity]= useState(false)

  const handler= useCallback((event, inputRef) => {
    //const input= inputRef?.current

    const input= event 
                 ? getEventTarget(event)
                 : inputRef?.current

    let nValidity= ''

    if (input!=undefined) {
      

      // Clear previous custom error
      input.setCustomValidity('')
      input.setAttribute('data-valium-validity', '')  
      input.removeAttribute('data-valium-value') 

      // Get input value
      const value = getInputValue(input)

      // Check validity
      const chkValidity= checkValidity(input, value, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals)
      
      nValidity= chkValidity==''
                 ? ''
                 : feedback!=undefined
                   ? feedback 
                   : getDefaultMessage(chkValidity)

      // Set it
      //input.removeAttribute('readonly')
      input.setCustomValidity(nValidity)
      input.setAttribute('data-valium-validity', nValidity) 
      input.setAttribute('data-valium-value', value) 

      // Update form     
      if (input.form != undefined) {
        //log('input', `${input.name} (${input.type}) #${input.id} validationHandler() is raising valium-form-change`)
        const event = new CustomEvent("valium-form-change", {
          detail: {
            name    : input.name,
            validity: nValidity,
            valid   : nValidity=='',
            value   : value
          }
        });
        input.form.dispatchEvent(event)
      }

      log('input', `${input.name} (${input.type}) #${input.id} validationHandler() new validity is -${nValidity || 'ok'}-`)
    }

    setValidity(nValidity)
  
  }, [/*inputRef,*/ checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback])

  return [validity, handler]

}


export {useValidationHandler}