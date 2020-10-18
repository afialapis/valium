import {useState/*, useCallback*/} from 'react'
import {log} from '../helpers/log'
import {checkValidity} from '../validity/checkValidity'
import {getInputValue} from './getInputValue'


const useValidity = (input, checkValue, allowedValues, disallowedValues, 
                     doRepeat, doNotRepeat, decimals, feedback) => {
  
  const [valid, setValid]= useState(true)
  const [message, setMessage]= useState('')

  //
  // Callback for check and set input validity
  //
  const setValidity= /*useCallback(*/() => {
    if (input==undefined ) {
      return
    }
    const name= input.name

    log('input', `${input.name} (${input.type}) #${input.id} setValidity()`)
    

    // Clear previous custom error
    input.setCustomValidity('')
    input.setAttribute('data-valium-validity', '')  
    input.removeAttribute('data-valium-value') 

    // Check validity
    const value = getInputValue(input)
    log('input', `${input.name} (${input.type}) #${input.id} setValidity() is running checkValidity()`)
    const validity= checkValidity(input, value,
                                  checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals)
    log('input', `${input.name} (${input.type}) #${input.id} setValidity() returned validity is ${validity}`)
    const nMessage= validity==''
                  ? ''
                  : feedback!=undefined
                    ? feedback 
                    : validity

    // Set it
    //input.removeAttribute('readonly')
    input.setCustomValidity(nMessage)
    input.setAttribute('data-valium-validity', nMessage) 
    input.setAttribute('data-valium-value', value) 

    // Update state
    setValid(nMessage==='')
    setMessage(nMessage)

    // Update form     
    if (input.form != undefined) {
      log('input', `${input.name} (${input.type}) #${input.id} setValidity() is raising valium-form-change`)
      const event = new CustomEvent("valium-form-change", {
        detail: {
          name: name,
          validity: nMessage,
          valid: nMessage=='',
          value: value
        }
      });
      input.form.dispatchEvent(event)
    }

    log('input', `${input.name} (${input.type}) #${input.id} setValidity() done`)


    }/*, 
    [checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback]
  )*/
  
  return [valid, message, setValidity]
}

export {useValidity}

