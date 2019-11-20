// import React from 'react'
// import PropTypes from 'prop-types'
import VInput from './VInput'

class VInputNumber extends VInput { 

  _dbg_assertType= 'number'
  
  constructor(props) {
    super(props)
  }
  
  parseForCompare(value) {
    if (value===undefined || value==='' || isNaN(value)) {
      return undefined
    }
    return parseFloat(value)
  }

  render() {
    //console.log('VInputNumber RENDER - ' + this.state.valid)
    return this.props.render(
       this.state,
       this.innerRef)
  }  
}

/*
VInputNumber.propTypes = {
  ...VInput.propTypes,
  allowedValues    : PropTypes.arrayOf(PropTypes.number),
  disallowedValues : PropTypes.arrayOf(PropTypes.number)
}
*/

export default VInputNumber