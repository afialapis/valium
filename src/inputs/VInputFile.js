// import React from 'react'
// import PropTypes from 'prop-types'
import VInput from './VInput'

class VInputFile extends VInput {  
  _dbg_assertType= 'file'

  get inputValue() {
    try {
      return this.inputRef.files[0]
    } catch(e) {
      console.log(e)
    }
    return undefined
  }


  addChangeListener() {

  }

  removeChangeListener() {

  }


  render() {
    //console.log('VInputFile RENDER - ' + this.state.valid)
    return this.props.render(
       this.state,
       this.innerRef)
  }
}

/*
VInputFile.propTypes = {
  ...VInput.propTypes
}
*/

export default VInputFile