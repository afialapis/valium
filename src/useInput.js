import {useEffect, useRef, useCallback} from 'react'
import {log} from './helpers/log'

import {useCheckProps} from './checkers/useCheckProps'
import {useInputFilter} from './inputFilter/useInputFilter'
//import {useCheckboxEnsure} from './ensurers/useCheckboxEnsure'
import {useValidationListener} from './validation/useValidationListener'
import {useValidationHandler} from './validation/useValidationHandler'

const useInput = (props) => {

  const {transformValue, checkValue, 
        allowedValues, disallowedValues, 
        doRepeat, doNotRepeat, decimals, 
        inputFilter, feedback}= props

  const inputRef = useRef(undefined)
  
  //
  // Specific effect to check props consistency. Just DEV time
  //
  useCheckProps(inputRef, doRepeat, doNotRepeat, inputFilter)

  //
  // Attaches input filters when needed
  //
  useInputFilter(inputRef, inputFilter)

  //
  // Ensures checkboxes value
  //
  //useCheckboxEnsure(inputRef)

  // 
  // Get validation handler and current validity
  //
  const [validity, handler]= useValidationHandler(transformValue, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback)

  //
  // Attaches validation listeners
  //
  useValidationListener(inputRef, handler)  

  //
  // Runs validations from out of Valium
  //
  const setValidity = useCallback(() => {
    handler(undefined, inputRef)
  }, [handler])

  //
  // Runs validity checks on mount
  //
  useEffect(() => {
    setValidity()
  }, [setValidity, inputRef?.current?.value])



  log('input', `Render, ${inputRef?.current?.name} (${inputRef?.current?.type}) #${inputRef?.current?.id} useInput (value ${inputRef?.current?.value})`)
  
  return [inputRef, validity==='', validity, setValidity]
}



export {useInput}