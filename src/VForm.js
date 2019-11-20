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
  
  isValid() {
    // console.log('FORM REF:')
    if (this.formRef && this.formRef.current) {
      const formElements= Array.prototype.slice
        .call(this.formRef.current.elements)
        .filter((elem) => ['INPUT', 'TEXTAREA', 'CHECKBOX', 'SELECT'].indexOf(elem.tagName)>=0)

      let elements= {}
      let someInvalid = false
      formElements.map((elem, eidx) => {
        const elemV= elem.checkValidity().toString()
        const elemN= elem.name || `element_${eidx}`
        elements[elemN]= {valid: true, message: elemV, value: elem.value}
        if (elemV!='true' && elemV!='') {
          someInvalid= true
          elements[elemN]['valid']= false
        } else {
          let ov= elem.getAttribute('data-valium-validity')
          if (ov!=undefined) {
            ov= ov.toString()
            elements[elemN]['message']= ov
            if (ov!='' && ov!='true') {
              elements[elemN]['valid']= false
              someInvalid= true
            }
          }
        }
      })
      
      // console.log('FORM isValid? '+!someInvalid)
      return {valid: !someInvalid, elements: elements}
    } else {
      return {valid: false, elements: {}}
    }
  }

  componentDidMount() {
    // console.log('FORM MOUNTED')
    this.setState(
      this.isValid()
    )
  }
  
  render() {
    // console.log('FORM RENDER')
    return (
      <div>
        <form ref        = {this.formRef}
              className  = {`${this.props.className!=undefined ? this.props.className : ''} valium-form`}
              onChange   = {() => this.setState(this.isValid())}
              //noValidate = {true}
              onSubmit   = {(e) => e.preventDefault()}>
          {this.props.children}

          {this.props.renderButtons(this.state)}    
        </form>  
      </div>    
    )
  }
}


VForm.propTypes = {
  className    : PropTypes.string,
  children     : PropTypes.arrayOf(PropTypes.object),
  renderButtons: PropTypes.func,
  disabled     : PropTypes.bool
  
}

export default VForm

