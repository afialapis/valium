import React, {useState, useRef, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import getEventTypes from './validity/getEventTypes'



const VForm = (props) => {

  

  const formRef = useRef(undefined)
  const [valid, setValid]= useState(true)

  /*
  const [elements, setElements]= useState({})

  const getFormElements = () => {
    if (formRef?.current==undefined) {
      return undefined
    }

    const formElements= formRef.current.elements
    if (formElements.length==0) {
      return undefined
    }
    return formElements
  }

  const readElements = useCallback(() => {
    const formElements= getFormElements()
    if (! formElements) {
      return {}
    }

    let nElements= {}
    for (let idx = 0; idx < formElements.length; idx++) {
      const el= formElements.item(idx)

      const msg= el.getAttribute('data-valium-validity') || ''
      const val= el.getAttribute('data-valium-value') || ''
      const valid = msg==''

      console.log('check INPUT ' + el.name + ' with msg ' + msg)

      nElements[el.name]= {
        valid  : valid,
        message: msg, 
        value  : val
      }
    } 
    
    return nElements
  }, [])
  */

  /*
  const prepareInputListeners = useCallback(() => {
    const formElements= getFormElements()
    if (! formElements) {
      return {}
    }

    const changeListener = (event) => {
      console.log('VForm: Input change: ' + event.target.name)
      const nElements= readElements()
      setElements(nElements)
    }

    let allListeners= {}
    for (let idx = 0; idx < formElements.length; idx++) {
      const input= formElements.item(idx)
      const inputType= input.type.toLowerCase()
      const eventType= getEventTypes(inputType, 'change')[0]
      const name= input.name
      input.addEventListener(eventType, changeListener)
      allListeners[name]= [input, eventType, changeListener]
    }

    return allListeners
  }, [readElements])
  */


  useEffect(() => {
    console.log(`VForm: Mount -- ${formRef?.current==undefined ? 'waiting' : 'ready'}` )

    if (formRef?.current==undefined) {
      return
    }

    // Initial check of form validity
    const formElements= formRef.current.elements
    let isValid= true
    for (let idx = 0; idx < formElements.length; idx++) {
      const el= formElements.item(idx)
      const msg= el.getAttribute('data-valium-validity') || ''
      console.log('check INPUT ' + el.name + ' with msg ' + msg)

      if (msg!='') {
        isValid= false
        break
      }
      
    } 

    console.log(`VForm: Mount -- setting valid to ${isValid}` )
    setValid(isValid)


  }, [])


  useEffect(() => {
    console.log(`VForm: Mount -- ${formRef?.current==undefined ? 'waiting' : 'ready'}` )

    if (formRef?.current==undefined) {
      return
    }



    //const allListeners= prepareInputListeners()

    /*const formChangeListener = (event) => {
      console.log(`VForm: on ${event.type} ${event.target.name}`)
      const nElements= readElements()
      setElements(nElements)
    }*/

    const formValidityListener = (event) => {
      const elName= event.detail.name
      const elValid= event.detail.valid
      //const validity= event.detail.validity
      //const value= event.detail.value
      console.log(`VForm: on ${event.type} ${elName}. Valid? ${elValid} (curr ${valid})`)
      console.log(event.detail)

      /*if (Object.keys(elements).indexOf(name)<0 ||
          elements[name].valid!=valid ||
          elements[name].validity!=validity ||
          elements[name].value!=value) {
            console.log(`VForm: on ${event.type} ${name} -- updating elements`)
            const nElements= {
              ...elements,
              [name]: {valid, validity, value}
            }
            setElements(nElements)
      }*/
      if (valid!=elValid) {
        setValid(elValid)
      }


    }


    //formRef.current.addEventListener('change', formChangeListener)
    formRef.current.addEventListener('valium-form-change', formValidityListener)


    

    // clean listeners function
    const removeAllChangeListeners = () => {
      /*
      Object.keys(allListeners).map((inputName) => {
        const [input, eventType, changeListener]= allListeners[inputName]
        input.removeEventListener(eventType, changeListener)
      })
      */
     //formRef.current.removeEventListener('change', formChangeListener)
     formRef.current.removeEventListener('valium-form-change', formValidityListener)

    }    

    console.log(`VForm: Mount -- Listeners prepared` )

    return removeAllChangeListeners    

  }, [/*prepareInputListeners*/ valid])

  //  useEffect(() => {
  //    console.log(`VForm EFFECT -- ${formRef?.current==undefined ? 'waiting' : 'ready'}` )
  //
  //    if (formRef?.current==undefined) {
  //      return
  //    }
  //    /*
  //    const changeListener = (event) => {
  //      console.log('CHANGING INPUT ' + event.target.name)
  //
  //      const nElements= getElements()
  //
  //      setElements(nElements)
  //    }
  //
  //    const formElements= formRef.current.elements
  //    if (formElements.length==0) {
  //      return []
  //    }
  //
  //    let allListeners= {}
  //    for (let idx = 0; idx < formElements.length; idx++) {
  //      const input= formElements.item(idx)
  //      const inputType= input.type.toLowerCase()
  //      const eventType= getEventTypes(inputType, 'change')[0]
  //      const name= input.name
  //      input.addEventListener(eventType, changeListener)
  //      allListeners[name]= [input, eventType, changeListener]
  //    }
  //    */
  //
  //    const allListeners= prepareInputListeners()
  //
  //
  //    // clean listeners function
  //    const removeAllChangeListeners = () => {
  //      Object.keys(allListeners).map((inputName) => {
  //        const [input, eventType, changeListener]= allListeners[inputName]
  //        input.removeEventListener(eventType, changeListener)
  //      })
  //    }    
  //    return removeAllChangeListeners
  //
  //  }, [formRef])

  /*
  useEffect(() => {
    console.log(`VForm: Effect valid...` )
    const nValid= elements.length>0 && elements.filter((e) => e.valid===false).length==0
    console.log(`VForm: Effect valid... ` + nValid )
    setValid(nValid)
  }, [elements])
  */

  /*
  const getElements = () => {
    if (formRef?.current==undefined) {
      return []
    }

    const formElements= formRef.current.elements
    let elements= []
    for (let idx = 0; idx < formElements.length; idx++) {
      const el= formElements.item(idx)
      const msg= el.getAttribute('data-valium-validity')
      const val= el.getAttribute('data-valium-value')
      elements.push({
        valid  : msg=='',
        message: msg, 
        value  : val
      })
    }
    return elements
  }
  */

  const handleUpdate= (elem, validity, value) => {
    return
    /*
    const nElements= {
      ...elements,
      [elem.name]: {
        valid  : validity=='' || validity=='true',
        message: validity, 
        value  : value
      }
    }

    let someInvalid= false
    Object.keys(nElements).map((k) => {
      if (!nElements[k].valid) {
        someInvalid= true
      }
    })

    setElements(nElements)
    setValid(!someInvalid)
    */
  }

  //console.log(`VForm: Render, ${Object.keys(elements).length} elements and valid is ${valid}`)
  console.log(`VForm: Render, valid is ${valid}`)
  
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
      {props.renderButtons(valid /*, elements*/)}
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

