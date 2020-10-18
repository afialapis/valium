import {useState, useEffect, useRef, useCallback} from 'react'
import {log} from './helpers/log'
import { setInputValidity as _setInputValidity } from './validity/setInputValidity'
import {attachEvents} from './validity/attachEvents'
import {checkProps} from './checkers/checkProps'


const useValiumInput = (props) => {
  const inputRef = useRef(undefined)
  const [attached, setAttached]= useState(false)
  const [inited, setInited]= useState(false)
  const [validity, setValidity]= useState(false)
  //const [lastValue, setLastValue]= useState(undefined)

  const {checkValue, 
         allowedValues, disallowedValues, 
         doRepeat, doNotRepeat, decimals, 
         inputFilter, feedback}= props

  
  const setInputValidity = useCallback(() => {
    if (inputRef!=undefined && inputRef.current!=undefined) {
      const input= inputRef.current
  
      log('input', `${input.name} (${input.type}) #${input.id} useValiumInput setInputValidity()`)
  
      // Set initial validity
      const nValidity= _setInputValidity(input, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback)
      setValidity(nValidity)
    }
  }, [checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, decimals, feedback])

  //
  // Specific effect to check props consistency. Just DEV time
  //
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (inputRef!=undefined && inputRef.current!=undefined) {
        const input= inputRef.current

        log('input', `${input.name} (${input.type}) #${input.id} useValiumInput useEffect(1) running checkprops`)

        checkProps(input, doRepeat, doNotRepeat, inputFilter)
      }
    }
  }, 
    // We subscribe specific props to avoid re-runnings:
    // - passing `props' would re-run each render
    [doRepeat, doNotRepeat, inputFilter]
  )

  //
  // add listeners
  //
  useEffect(() => {
    //setAttached(false)

    if (inputRef!=undefined && inputRef.current!=undefined) {
      const input= inputRef.current    

      const removeAllChangeListeners= attachEvents(input, inputFilter, setInputValidity)
      setAttached(true)
      return removeAllChangeListeners
    }
  }, [inputFilter, setInputValidity])  
  


  //
  // check validity on inputRef.value change
  // NOTE  does not work with controlled components
  //
  //  useEffect(() => {
  //    const input= inputRef?.current
  //    if (input==undefined) {
  //      return
  //    }
  //    const value= input.value
  //
  //    if (value != lastValue ) {
  //
  //      console.log(input)
  //
  //      log('input', `${input.name} (${input.type}) #${input.id} useValiumInput useEffect(X) value has changed (${lastValue} => ${value})`)
  //
  //      const nValidity= setInputValidity(input, checkValue, allowedValues, disallowedValues, 
  //                                        doRepeat, doNotRepeat, decimals, feedback)
  //      setValidity(nValidity)
  //      setLastValue(value)
  //    }
  //  }, [inputRef?.current?.value, lastValue, checkValue, allowedValues, disallowedValues, 
  //    doRepeat, doNotRepeat, decimals, feedback])






  useEffect(() => {
    if (! attached) {
      return
    }
    if (inited) {
      return
    }
    if (inputRef!=undefined && inputRef.current!=undefined) {
      const input= inputRef.current
  
      log('input', `${input.name} (${input.type}) #${input.id} useValiumInput useEffect(2) running initial validity`)
  
      // Set initial validity
      setInputValidity()
      setInited(true)
    }
  }, [attached, inited, setInputValidity])


  log('input', `Render, ${inputRef?.current?.name} (${inputRef?.current?.type}) #${inputRef?.current?.id} useValiumInput (value ${inputRef?.current?.value})`)
  
  return [inputRef, validity==='', validity]
}



export {useValiumInput}