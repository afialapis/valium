// import React from 'react'
// import PropTypes from 'prop-types'
import VInput from './VInput'

class VInputText extends VInput {  
  /*
  checkValidity(value) {
    console.log('VInputText checkValidity - ' + value)
    const fdb= super.checkValidity(value)
    if (fdb!='') {
      return fdb
    }
    return ''
  }
  */


  render() {
    //console.log('VInputText RENDER - ' + this.state.valid)
    return this.props.render(
       this.state,
       this.innerRef)
  }
}

/*
VInputText.propTypes = {
  ...VInput.propTypes
}
*/

export default VInputText