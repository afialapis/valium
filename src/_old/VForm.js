import React, {useState, useRef, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
/*import getEventTypes from './validity/getEventTypes'
import Demo from '../demo/src/Demo'
import useValiumInput from './useValiumInput'*/

/*
COMPROBAR QUE AHORA SI SE EVITAN RENDERS DE TODOS LOS INPUTS EN CADA RERENDER
IGUALMENTE, E EL Demo, HAY INPUUTS QUE AL VALIDAR LLAMN a useValiumInput.-form-change mas de una vez,
incluso al de otros inputs... pero otros van bbien... WHY????
*/

const _log = (s) => 
  console.log(`%cVForm: ${s}`, "color: orange");

const VForm = (props) => {


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

    _log(`readElements()` )

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
    _log(`Mount 1 -- ${formRef?.current==undefined ? 'waiting' : 'ready'}` )

    if (formRef?.current==undefined) {
      return
    }

    // Initial check of form validity
    const isValid= checkIsValid()
    _log(`Mount 1 -- setting valid to ${isValid}` )
    setValid(isValid)
  }, [checkIsValid])


  useEffect(() => {
    _log(`Mount 2 -- ${formRef?.current==undefined ? 'waiting' : 'ready'}` )

    if (formRef?.current==undefined) {
      return
    }

    const formValidityListener = (event) => {
      const elName= event.detail.name
      //const elValid= event.detail.valid
      //const validity= event.detail.validity
      //const value= event.detail.value
      const nValid= checkIsValid()
      _log(`on ${event.type} ${elName}. Valid? ${nValid} (curr ${valid})`)
      //console.log(event.detail)


      if (valid!=nValid) {
        setValid(nValid)
      }
    }

    formRef.current.addEventListener('valium-form-change', formValidityListener)

    // clean listeners function
    const removeAllChangeListeners = () => {
     formRef.current.removeEventListener('valium-form-change', formValidityListener)
    }    

    _log(`Mount 2 -- Listeners prepared` )

    return removeAllChangeListeners    

  }, [checkIsValid, valid])


  _log(`Render, valid is ${valid}`)
  
  return (
    <form id         = {props.id}
          ref        = {formRef}
          className  = {`${props.className!=undefined ? props.className : ''} valium-form`}
          noValidate
          onSubmit   = {(e) => {props.onSubmit ? props.onSubmit() : e.preventDefault()}}>
      {/*{props.renderInputs({
        formUpdate: (elem, validity, value) => handleUpdate(elem, validity, value)
      })}*/}
      {props.children}
      {props.renderButtons(valid, readElements)}
    </form>  
    )
}


VForm.propTypes = {
  renderInputs : PropTypes.func.isRequired,
  renderButtons: PropTypes.func.isRequired,
  id           : PropTypes.string,
  className    : PropTypes.string,
  onSubmit     : PropTypes.func
}

export default VForm

