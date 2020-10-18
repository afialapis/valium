import {log} from '../helpers/log'
import {checkValidity} from './checkValidity'
import {getInputValue} from '../config/getInputValue'

//
// Callback for check and set input validity
//
const setInputValidity = (input, checkValue, allowedValues, disallowedValues, 
                     doRepeat, doNotRepeat, decimals, feedback) => {


  if (input==undefined ) {
    return ''
  }

  //log('input', `${input.name} (${input.type}) #${input.id} setInputValidity()`) 

  // Clear previous custom error
  input.setCustomValidity('')
  input.setAttribute('data-valium-validity', '')  
  input.removeAttribute('data-valium-value') 

  // Check validity
  const value = getInputValue(input)
  //log('input', `${input.name} (${input.type}) #${input.id} setInputValidity() is running checkValidity()`)
  const chkValidity= checkValidity(input, value,
                                checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals)
  log('input', `${input.name} (${input.type}) #${input.id} setInputValidity() returned validity is ${chkValidity || '-ok-'}`)
  const validity= chkValidity==''
                  ? ''
                  : feedback!=undefined
                    ? feedback 
                    : chkValidity

  // Set it
  //input.removeAttribute('readonly')
  input.setCustomValidity(validity)
  input.setAttribute('data-valium-validity', validity) 
  input.setAttribute('data-valium-value', value) 

  // Update form     
  if (input.form != undefined) {
    log('input', `${input.name} (${input.type}) #${input.id} setInputValidity() is raising valium-form-change`)
    const event = new CustomEvent("valium-form-change", {
      detail: {
        name: input.name,
        validity: validity,
        valid: validity=='',
        value: value
      }
    });
    input.form.dispatchEvent(event)
  }

  //log('input', `${input.name} (${input.type}) #${input.id} setInputValidity() done`)

  return validity
}

export {setInputValidity}

