import React from 'react'
import PropTypes from 'prop-types'

const DEFAULT_FEEDBACK= {
  badInput        : 'Value is wrong',
  customError     : 'Value does not match custom validity',
  patternMismatch : 'Value does not match expected pattern',
  rangeOverflow   : 'Value is greater than expected',
  rangeUnderflow  : 'Value is lesser than expected',
  stepMismatch    : 'Value has an incorrect number of decimals',
  tooLong         : 'Value is longer than expected',
  typeMismatch    : 'Value type is wrong',
  valueMissing    : 'Value is required',
  valid           : 'Value is not valid'
}

const countDecimals = (f) => {
  try {
    return f.toString().split('.')[1].length
  } catch(e) {
    return 0
  }
}

const debugIt = (f) => {
  if (process.env.NODE_ENV !== "production") {
    f()
  }
}

class VInput extends React.Component {  

  _dbg_assertType= undefined

  constructor(props) {
    super(props)  
    this.innerRef= React.createRef()
    this.state= {
      valid: false,
      message: ''
    }
    //console.log('VInput PROPS ' + JSON.stringify(props))
  }

  get inputRef() {
    if (this.innerRef!=undefined && this.innerRef.current!=null) {
      return this.innerRef.current
    }
    return undefined
  }

  _inputProp(propName) {
    try {
      if (this.innerRef.current[propName] != undefined) {
        return this.innerRef.current[propName]
      }
    } catch(e) {}
    return undefined
  }

  get inputName() {
    return this._inputProp('name')
  }

  get inputType() {
    return this._inputProp('type')
  }
  
  get inputValue() {
    return this._inputProp('value')
  }

  get inputDisabled() {
    return this._inputProp('disabled')
  }  

  get inputMinLength() {
    return this._inputProp('minLength')
  }

  get inputMaxLength() {
    return this._inputProp('maxLength')
  }  

  get inputStep() {
    return this._inputProp('step')
  }  


  get eventToListenTo() {
    try {
      if (this.props.checkValidityOnKeyup) {
        return 'keyup'
      }
    } catch(e) {}
    return 'change'
  }

  rightAfterMount() {

  }

  addChangeListener() {
    this.inputRef.addEventListener(this.eventToListenTo, (event) => {
      this.handleChange(event)
    })
  }

  removeChangeListener() {
    if (this.inputRef!=undefined) {
      this.inputRef.removeEventListener(this.eventToListenTo)
    }    
  }

  componentDidMount() {
    // console.log('VInput MOUNTED')
    if (this.inputRef!=undefined) {
      this.rightAfterMount()

      this.setValidity()

      this.addChangeListener()

      debugIt(() => {
        if (this._dbg_assertType!=undefined) {
          if (this.inputType.toString().toUpperCase()!=this._dbg_assertType.toString().toUpperCase()) {
            console.error(`SFORM : an Input Element (${this.inputName}) has an incorrect Type (${this.inputType} instead of ${this._dbg_assertType})`)
          }
        }
      })
    } else {
      console.error('SFORM : No ref for the input.')
    }
  }

  componentWillUnmount() {
    // console.log('VInput UNMOUNTING')
    this.removeChangeListener()
  }

  validityMessage(errorName) {
    //console.log('VInput : validityMessage for ' + errorName)
    /*
    if (this.config.useCustomMessageOnly!==true && errorName!='customError') {
        return this.config.messages[errorName] + ` ${v!=undefined ? v.toString() : ''}`
    }
    return `${this.props.feedback || this.config.messages.customError} ${v!=undefined ? v.toString() : ''}`
    */
   return this.props.feedback || DEFAULT_FEEDBACK[errorName]
  }

  
  parseForCompare(value) {
    return value
  }
  
  
  /*
  badInput: false
  customError: true
  patternMismatch: false
  rangeOverflow: false
  rangeUnderflow: false
  stepMismatch: true
  tooLong: false
  tooShort: false
  typeMismatch: false
  valid: false
  valueMissing: false
  */

  checkValidity() {
    if (this.inputRef==undefined) {
      return ''
    }
    
    const value = this.inputValue

    //console.log('VInput checkValidity() for value  ' + value)

    //console.log(this.inputRef.validity)
    // NOTE Manage 'disable' prop? sure?
    if (this.inputDisabled===true) {
      return ''
    }

    const vs= this.inputRef.validity
    if (vs!=undefined) {
      //console.log(vs)
      if (vs.badInput       ) { return this.validityMessage('badInput') }
      if (vs.patternMismatch) { return this.validityMessage('patternMismatch') }
      if (vs.rangeOverflow  ) { return this.validityMessage('rangeOverflow') }
      if (vs.rangeUnderflow ) { return this.validityMessage('rangeUnderflow') }
      if (vs.stepMismatch   ) { return this.validityMessage('stepMismatch') }
      if (vs.tooLong        ) { return this.validityMessage('tooLong') }
      if (vs.tooShort       ) { return this.validityMessage('tooShort') }
      if (vs.typeMismatch   ) { return this.validityMessage('typeMismatch') }
      if (vs.valueMissing   ) { return this.validityMessage('valueMissing') }
      if (vs.valid===false  ) { return this.validityMessage('valid') }
    }

    // When loading document, minlength/maxlength/step constraints are not checked
    // Check this pen: https://codepen.io/afialapis/pen/NWKJoPJ?editors=1111
    // and /issues/validity_on_load

    if (this.inputMaxLength && this.inputMaxLength>0 && value.length>this.inputMaxLength) {
      return this.validityMessage('tooLong')
    }
    if (this.inputMinLength && this.inputMinLength>0 && value.length<this.inputMinLength) {
      return this.validityMessage('tooShort')
    }
    if (this.inputStep!=undefined && this.inputStep!=='') {
      if (countDecimals(this.inputStep)<countDecimals(value)) {
        return this.validityMessage('stepMismatch')
      }      
    }

    // Custom validate function
    if (this.props.checkValue!=undefined) {
      const result= this.props.checkValue(value)
      if (result == Promise.resolve(result)) {
        result.then((r) => {
          if (! r) {
            return this.validityMessage('customError')
          }
        })
      } else {
        if (! result) {
          return this.validityMessage('customError')
        }
      }
    }

    // Allowed values list
    if (this.props.allowedValues != undefined && value) {
      const exists= this.props.allowedValues
        .map((v) => this.parseForCompare(v))
        .indexOf(this.parseForCompare(value)) >= 0
      if (! exists) {
        return this.validityMessage('customError')
      }
    }
    
    // Disallowed values list

    if (this.props.disallowedValues != undefined && value) {
      const exists= this.props.disallowedValues
        .map((v) => this.parseForCompare(v))
        .indexOf(this.parseForCompare(value)) >= 0
      if (exists) {
        return this.validityMessage('customError')
      }
    }
    
    // console.log('VInput checkValidity() for value  ' + value + ' --- IS VALID')
    // console.log(this.inputRef)
    return ''
  }  
  
  setValidity() {
    // Clear previous custom error
    if (this.inputRef!=undefined) {
      this.inputRef.setCustomValidity('')
    }

    // Check error if any
    let validity= this.checkValidity()

    // Set it
    // console.log('VInput setValidity to ' + validity)
    if (this.inputRef!=undefined) {
      //this.inputRef.removeAttribute('readonly')
      this.inputRef.setCustomValidity(validity)
      this.inputRef.setAttribute('data-sform-validity', validity)  
    }

    // Update state
    this.setState({
      valid: (validity===true || validity===''),
      message: validity
    })
  }

  handleChange(_event) {
    //console.log('VInput handleChange => ' + _event.target.value)

    this.setValidity()
    /*if (this.props.onChange!=undefined) {
      this.props.onChange(value, this.inputName)
    }*/
  }

}


VInput.propTypes = {
  //this.props.config           : PropTypes.object,
  feedback         : PropTypes.string,
  render           : PropTypes.func.isRequired,
  checkValue       : PropTypes.Promise || PropTypes.func,
  allowedValues    : PropTypes.arrayOf(PropTypes.any),
  disallowedValues : PropTypes.arrayOf(PropTypes.any),
  checkValidityOnKeyup: PropTypes.bool
}



export default VInput