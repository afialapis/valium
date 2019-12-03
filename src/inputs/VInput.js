import React     from 'react'
import PropTypes from 'prop-types'
import VInputText           from './VInputText'
import VInputNumber         from './VInputNumber'
import VInputCheckbox       from './VInputCheckbox'
import VInputColor          from './VInputColor'
import VInputDate           from './VInputDate'
import VInputSelect         from './VInputSelect'
import VInputSelectMultiple from './VInputSelectMultiple'
import VInputFile           from './VInputFile'

const VInput = ({type, ...props}) => {
  if (type=="text")
    return <VInputText {...props}/>

  if (type=="number")
    return <VInputNumber {...props}/>

  if (type=="checkbox")
    return <VInputCheckbox {...props}/>

  if (type=="color")
    return <VInputColor {...props}/>

  if (type=="date")
    return <VInputDate {...props}/>
  
  if (type=="select")
    return <VInputSelect {...props}/>  

  if (type=="select-multiple")
    return <VInputSelectMultiple {...props}/>
  
  if (type=="file")
    return <VInputFile {...props}/>
  
  return <VInputText {...props}/>
}


VInput.propTypes = {
  //this.props.config : PropTypes.object,
  feedback            : PropTypes.string,
  render              : PropTypes.func.isRequired,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  checkValidityOnKeyup: PropTypes.bool
}


export default VInput