import PropTypes from 'prop-types'
import useValium from '../useValium'

const VInput = (props) => {
  const [inputRef, valid, message]= useValium(props)
  return props.render(valid, message, inputRef)
}


VInput.propTypes = {
  render              : PropTypes.func.isRequired,
  formActions         : PropTypes.object , 

  prematureValidation : PropTypes.bool,

  feedback            : PropTypes.string,  
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  doRepeat            : PropTypes.string,
  doNotRepeat         : PropTypes.string,
  decimals           : PropTypes.number,
  inputFilter         : PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(RegExp), PropTypes.string])
}


VInput.defaultProps= {
  
}

export default VInput