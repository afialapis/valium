// import React from 'react'
// import PropTypes from 'prop-types'
import VInput from './VInput'

class VInputSelectMultiple extends VInput {  

  get options() {
    return Array.prototype.slice.call(this.inputRef.options)
  }

  get inputValue() {
    try {
      return this.options 
             .filter((opt) => opt.selected)
             .map((opt) => opt.value)
    } catch(e) {
      console.error(e)
    }
    return []
  }

  /*
  addChangeListener() {
    this.options.map((opt) => {
      opt.addEventListener('click', (event) => {
        this.handleChange(event)
      })
    })
  }

  removeChangeListener() {
    this.options.map((opt) => {
      opt.removeEventListener('click')
    })
  }
  */

  parseForCompare(value) {
    try {
      return value.sort().join(',')
    } catch(e) {}
    return ''
  }  

  render() {
    //console.log('VInputSelectMultiple RENDER - ' + this.state.valid)
    return this.props.render(
       this.state,
       this.innerRef)
  }
}

/*
VInputSelectMultiple.propTypes = {
  ...VInput.propTypes
}
*/

export default VInputSelectMultiple