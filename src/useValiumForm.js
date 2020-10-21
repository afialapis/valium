import {useState, useRef, useEffect, useCallback} from 'react'
import {log} from './helpers/log'


const useValiumForm = () => {

  const formRef = useRef(undefined)
  const [valid, setValid]= useState(true)

  const readElements = useCallback(() => {
    if (formRef?.current==undefined) {
      return {}
    }

    const formElements= formRef.current.elements
    if (! formElements) {
      return {}
    }

    let nElements= {}
    for (let idx = 0; idx < formElements.length; idx++) {
      const el= formElements.item(idx)

      const msg= el.getAttribute('data-valium-validity') || ''
      const val= el.getAttribute('data-valium-value') || ''
      const valid = msg==''

      nElements[el.name]= {
        valid  : valid,
        message: msg, 
        value  : val
      }
    } 
    
    return nElements
  }, [])

  const checkIsValid = useCallback(() => {
    let isValid= true
    for (const v of Object.values(readElements())) {
      if (v.valid===false) {
        isValid= false
        break
      }
    }
    return isValid  
  }, [readElements])
  

  useEffect(() => {
    if (formRef?.current==undefined) {
      return
    }

    try {
      formRef.current.noValidate= true
    } catch(e) {
      console.error(e)
    }

    // Initial check of form validity
    const isValid= checkIsValid()
    log('form', `useEffect(1) Setting valid to ${isValid}` )
    setValid(isValid)
  }, [checkIsValid])


  useEffect(() => {
    if (formRef?.current==undefined) {
      return
    }

    const formValidityListener = (event) => {
      const elName= event.detail.name
      //const elValid= event.detail.valid
      //const validity= event.detail.validity
      const value= event.detail.value
      const nValid= checkIsValid()
      log('form', `on ${event.type} ${elName}. Valid? ${nValid} (curr ${valid}) (value ${value})`)

      if (valid!=nValid) {
        setValid(nValid)
      }
    }

    formRef.current.addEventListener('valium-form-change', formValidityListener)

    // clean listeners function
    const removeAllChangeListeners = () => {
     formRef.current.removeEventListener('valium-form-change', formValidityListener)
    }    

    log('form', `useEffect(2) Listeners prepared` )

    return removeAllChangeListeners    

  }, [checkIsValid, valid])


  log('form', `Render, valid is ${valid}`)
  
  return [formRef, valid, readElements]
}

export {useValiumForm}

