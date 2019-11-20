// import React from 'react'
// import PropTypes from 'prop-types'
import VInput from './VInput'

class VInputSelect extends VInput {  

  addChangeListener() {
    this.inputRef.addEventListener(this.eventToListenTo, (event) => {
      // This timeout kinda fixes problems with <select>, which
      // gets updated due to the setState and does not propagate the 
      // new value on the onChange.
      // TODO Investigate me
      setTimeout(() => {
        this.handleChange(event)
      }, 10)
    })

    if (this.props.bindSetValidity!=undefined) {
      this.props.bindSetValidity(this.setValidity.bind(this))
    }
  }

  parseForCompare(value) {
    return value.toString()
  }  

  render() {
    //console.log('VInputSelect RENDER - ' + this.state.valid)
    return this.props.render(
       this.state,
       this.innerRef)
  }
}

/*
VInputSelect.propTypes = {
  ...VInput.propTypes
}
*/

export default VInputSelect