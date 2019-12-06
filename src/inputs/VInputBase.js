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
  valid           : 'Value is not valid',
  // custom validations
  customAllowList    : 'Value is not allowed',
  customDisallowList : 'Value is disallowed'
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

class VInputBase extends React.Component {  

  _dbg_assertType= undefined
  _keyup_event = true

  constructor(props) {
    super(props)  
    this.innerRef= React.createRef()
    this.state= {
      valid: false,
      message: ''
    }
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

  rightAfterMount() {

  }

  addChangeListener(eventType) {
    this.changeListener= (event) => {
      this.handleChange(event)
    }

    this.inputRef.addEventListener(eventType, this.changeListener)
    if (this.props.bindSetValidity!=undefined) {
      this.props.bindSetValidity(this.setValidity.bind(this))
    }    
  }

  removeChangeListener(eventType) {
    if (this.inputRef!=undefined) {
      this.inputRef.removeEventListener(eventType, this.changeListener)
    }
    if (this.props.bindSetValidity!=undefined) {
      this.props.bindSetValidity(() => {})
    }
  }

  componentDidMount() {
    if (this.inputRef!=undefined) {
      this.rightAfterMount()

      this.setValidity()

      this.addChangeListener(this.props.checkValidityOnKeyUp && this._keyup_event ? 'keyup' : 'change')

      debugIt(() => {
        if (this._dbg_assertType!=undefined) {
          if (this.inputType.toString().toUpperCase()!=this._dbg_assertType.toString().toUpperCase()) {
            console.error(`Valium Form : an Input Element (${this.inputName}) has an incorrect Type (${this.inputType} instead of ${this._dbg_assertType})`)
          }
        }
      })
    } else {
      console.error('Valium Form : No ref for the input.')
    }
  }

  componentWillUnmount() {
    this.removeChangeListener(this.props.checkValidityOnKeyUp && this._keyup_event ? 'keyup' : 'change')
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    if (prevProps.checkValidityOnKeyUp != this.props.checkValidityOnKeyUp) {
      this.removeChangeListener(prevProps.checkValidityOnKeyUp && this._keyup_event ? 'keyup' : 'change')
      this.addChangeListener(this.props.checkValidityOnKeyUp && this._keyup_event ? 'keyup' : 'change')
    }
  }

  validityMessage(errorName) {
   return this.props.feedback || DEFAULT_FEEDBACK[errorName]
  }

  parseForCompare(value) {
    return value
  }

  checkValidity() {
    if (this.inputRef==undefined) {
      return ''
    }

    // NOTE Manage 'disable' prop? sure?
    if (this.inputDisabled===true) {
      return ''
    }

    const value = this.inputValue

    const vs= this.inputRef.validity
    if (vs!=undefined) {
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
    if (this.props.allowedValues != undefined && value!=undefined) {
      const exists= this.props.allowedValues
        .map((v) => this.parseForCompare(v))
        .indexOf(this.parseForCompare(value)) >= 0
      if (! exists) {
        return this.validityMessage('customAllowList')
      }
    }
    
    // Disallowed values list
    if (this.props.disallowedValues != undefined && value!=undefined) {
      const exists= this.props.disallowedValues
        .map((v) => this.parseForCompare(v))
        .indexOf(this.parseForCompare(value)) >= 0
      if (exists) {
        return this.validityMessage('customDisallowList')
      }
    }

    return ''
  }  
  
  setValidity() {
    // Clear previous custom error
    if (this.inputRef!=undefined) {
      this.inputRef.setCustomValidity('')
      this.inputRef.setAttribute('data-valium-validity', '')  
    }

    // Check error if any
    let validity= this.checkValidity()

    // Set it
    if (this.inputRef!=undefined) {
      //this.inputRef.removeAttribute('readonly')
      this.inputRef.setCustomValidity(validity)
      this.inputRef.setAttribute('data-valium-validity', validity)  
    }

    // Update state
    this.setState({
      valid: (validity===true || validity===''),
      message: validity
    })

    // Update form
    if (this.props.formUpdate!=undefined) {
      this.props.formUpdate(this.inputRef, validity, this.inputValue)
    }
  }

  handleChange(_event) {
    this.setValidity()
    /*if (this.props.onChange!=undefined) {
      this.props.onChange(value, this.inputName)
    }*/
  }

  render() {
    return this.props.render(
       this.state,
       this.innerRef)
  }
}


VInputBase.propTypes = {
  feedback            : PropTypes.string,
  render              : PropTypes.func.isRequired,
  checkValue          : PropTypes.Promise || PropTypes.func,
  allowedValues       : PropTypes.arrayOf(PropTypes.any),
  disallowedValues    : PropTypes.arrayOf(PropTypes.any),
  checkValidityOnKeyUp: PropTypes.bool,
  formUpdate          : PropTypes.func
}



export default VInputBase