import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'

const VForm = (props) => {

  const formRef = useRef(undefined)
  const [valid, setValid]= useState(true)
  const [elements, setElements]= useState({})
    

  const handleUpdate= (elem, validity, value) => {
    elements[elem.name]= {
        valid  : validity=='' || validity=='true',
        message: validity, 
        value  : value
    }

    let someInvalid= false
    Object.keys(elements).map((k) => {
      if (!elements[k].valid) {
        someInvalid= true
      }
    })

    setElements(elements)
    setValid(!someInvalid)
  }
  
  return (
    <form id         = {props.id}
          ref        = {formRef}
          className  = {`${props.className!=undefined ? props.className : ''} valium-form`}
          noValidate
          onSubmit   = {(e) => {props.onSubmit ? props.onSubmit() : e.preventDefault()}}>
      {props.renderInputs({
        formUpdate: (elem, validity, value) => handleUpdate(elem, validity, value)
      })}
      {props.renderButtons(valid, elements)}
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

