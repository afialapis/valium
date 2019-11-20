// import React from 'react'
// import PropTypes from 'prop-types'
import VInput from './VInput'

class VInputCheckbox extends VInput { 

  _dbg_assertType= 'checkbox'
  
  constructor(props) {
    super(props)
  }
  

  get inputChecked() {
    return this._inputProp('checked')
  }
  get inputValue() {
    return this.inputChecked
  }

  get eventToListenTo() {
    return 'click'
  }

  rightAfterMount() {
    //this.inputRef.removeAttribute('readonly')
    if (this.inputRef.value==='true' || this.inputRef.value===true) {
      this.inputRef.setAttribute('checked', true)
    }
  }  


  parseForCompare(value) {
    //console.log('VInputCheckbox parseForCompare ' + value + ' --- ' + typeof value)
    if (value===true || value === 'true' || value === 1 || value === '1') {
      return true
    }
    return false
  }

  render() {
    //console.log('VInputCheckbox RENDER - ' + this.state.valid)
    return this.props.render(
       this.state,
       this.innerRef)
  }  
}

/*
VInputCheckbox.propTypes = {
  ...VInput.propTypes,
  allowedValues    : PropTypes.arrayOf(PropTypes.number),
  disallowedValues : PropTypes.arrayOf(PropTypes.number)
}
*/

export default VInputCheckbox