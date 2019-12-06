import React from 'react'
import PropTypes from 'prop-types'

class VForm extends React.Component {

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    
    this.state= {
      valid: true,
      elements: {
      }
    }
  }
  
  getElements() {
    if (this.formRef && this.formRef.current) {
      const formElements= Array.prototype.slice
        .call(this.formRef.current.elements)
        .filter((elem) => ['INPUT', 'TEXTAREA', 'CHECKBOX', 'SELECT'].indexOf(elem.tagName)>=0)

      let elements= {}

      formElements.map((elem, eidx) => {
        const elemN= elem.name || `element_${eidx}`
        elements[elemN]= {valid: true, message: '', value: undefined}
      })

      return elements
    } else {
      return {}
    }
  }

  // 
  // It's called after first handleUpdate() calls, so state.elements is already filled
  // SHould this handleUpdate() calls be made?
  // componentDidMount() {   
  //   this.setState({
  //     elements: this.getElements()
  //   })
  // }  

  handleUpdate(elem, validity, value) {
    let elements= this.state.elements
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

    this.setState({
      valid: !someInvalid,
      elements: elements 
    })
  }
  
  render() {
    return (
      <form id         = {this.props.id}
            ref        = {this.formRef}
            className  = {`${this.props.className!=undefined ? this.props.className : ''} valium-form`}
            noValidate
            onSubmit   = {(e) => e.preventDefault()}>

        {this.props.renderInputs((elem, validity, value) => this.handleUpdate(elem, validity, value))}
        {this.props.renderButtons(this.state.valid, this.state.elements)}
      </form>  
    )
  }
}


VForm.propTypes = {
  renderInputs : PropTypes.func.isRequired,
  renderButtons: PropTypes.func.isRequired,
  id           : PropTypes.string,
  className    : PropTypes.string,
}

export default VForm

