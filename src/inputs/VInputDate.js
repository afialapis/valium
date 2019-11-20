// import React from 'react'
// import PropTypes from 'prop-types'
import VInput from './VInput'

class VInputDate extends VInput { 

  //_dbg_assertType= 'date'
  
  constructor(props) {
    super(props)
  }

  parseForCompare(value) {
    // console.log('VInputDate parseForCompare ' + value + ' --- ' + typeof value)
    if (value==='' || value === undefined) {
      return undefined
    }
    let vdate= undefined
    if (value instanceof Date) {
      vdate= value
    }
    if (typeof value === 'string') {
      vdate= new Date(value)
    }
    if (typeof value === 'number') {
      vdate= new Date(value * 1000)
    }    
    try {
      vdate= new Date(value)
    } catch(e) {
      console.error(`SFORM : VInputDate cannot convert value ${value} to Date`)
      return undefined
    }
    const tdate= `${vdate.getFullYear()}/${vdate.getMonth()+1}/${vdate.getDate()}`
    return tdate
  }

  render() {
    //console.log('VInputDate RENDER - ' + this.state.valid)
    return this.props.render(
       this.state,
       this.innerRef)
  }  
}

/*
VInputDate.propTypes = {
  ...VInput.propTypes,
  allowedValues    : PropTypes.arrayOf(PropTypes.number),
  disallowedValues : PropTypes.arrayOf(PropTypes.number)
}
*/

export default VInputDate