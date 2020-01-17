import defaultMessages from './messages'

const countDecimals = (f) => {
  try {
    return f.toString().split('.')[1].length
  } catch(e) {
    return 0
  }
}


const  checkValidity = (inputRef, value, parseForCompare, checkValue, allowedValues, disallowedValues, doRepeat, doNotRepeat, stepRange) => {
  const input= inputRef.current
  if (input==undefined) {
    return ''
  }

  // NOTE Manage 'disable' prop? sure?
  if (inputRef.current.disabled===true) {
    return ''
  }

  const name= input.name

  const vs= input.validity
  if (vs!=undefined) {
    if (vs.badInput       ) { return defaultMessages['badInput'] }
    if (vs.patternMismatch) { return defaultMessages['patternMismatch'] }
    if (vs.rangeOverflow  ) { return defaultMessages['rangeOverflow'] }
    if (vs.rangeUnderflow ) { return defaultMessages['rangeUnderflow'] }
    if (vs.tooLong        ) { return defaultMessages['tooLong'] }
    if (vs.tooShort       ) { return defaultMessages['tooShort'] }
    if (vs.typeMismatch   ) { return defaultMessages['typeMismatch'] }
    if (vs.valueMissing   ) { return defaultMessages['valueMissing'] }
    if (input.step!=undefined /*&& input.step!=='' && input.step!=='any'*/) {
      //
      // For steppable inputs
      //
      if (stepRange==undefined || isNaN(stepRange)) {
        //
        // If stepRange is specified, we omit the standard validations...
        //
        if (vs.stepMismatch   ) { return defaultMessages['stepMismatch'] }
        if (vs.valid===false  ) { return defaultMessages['valid'] }
      } else {
        //
        // ... and we proceed with our custom stepRange
        //
        if (countDecimals(stepRange)<countDecimals(value)) {
          return defaultMessages['stepMismatch']
        }          
      }
    } else {
      //
      // for non steppable inputs
      //
      if (vs.valid===false  ) { return defaultMessages['valid'] }
    }
    
  }

  // When loading document, minlength/maxlength/step constraints are not checked
  // Check this pen: https://codepen.io/afialapis/pen/NWKJoPJ?editors=1111
  // and /issues/validity_on_load
  if (input.maxLength && input.maxLength>0 && value.length>input.maxLength) {
    return defaultMessages['tooLong']
  }
  if (input.minLength && input.minLength>0 && value.length<input.minLength) {
    return defaultMessages['tooShort']
  }
  
  if (input.step!=undefined && input.step!=='' && input.step!=='any') {
    if (stepRange==undefined || isNaN(stepRange)) {
      if (countDecimals(input.step)!=countDecimals(value)) {
        return defaultMessages['stepMismatch']
      }
    }
  }

  // Custom validate function
  if (checkValue!=undefined) {
    const result= checkValue(value)
    if (result == Promise.resolve(result)) {
      result.then((r) => {
        if (! r) {
          return defaultMessages['customError']
        }
      })
    } else {
      if (! result) {
        return defaultMessages['customError']
      }
    }
  }

  // Allowed values list
  if (allowedValues != undefined && value!=undefined) {
    const exists= allowedValues
      .map((v) => parseForCompare(v))
      .indexOf(parseForCompare(value)) >= 0
    if (! exists) {
      return defaultMessages['customAllowList']
    }
  }

  // Disallowed values list
  if (disallowedValues != undefined && value!=undefined) {
    const exists= disallowedValues
      .map((v) => parseForCompare(v))
      .indexOf(parseForCompare(value)) >= 0
    if (exists) {
      return defaultMessages['customDisallowList']
    }
  }

  // Must repeat other's input value
  if (doRepeat!=undefined && value!=undefined) {
    const otherInput= input.form.elements[doRepeat]
    if (otherInput!=undefined) {
      if(otherInput.value != value) {
        return defaultMessages['customDoRepeat']
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Valium: You passed doRepeat=${doRepeat} to the Input Element (${name}), but there is no input with that name`)
      }
    }
  }

  // Do not repeat other's input value
  if (doNotRepeat!=undefined && value!=undefined) {
    const otherInput= input.form.elements[doNotRepeat]
    if (otherInput!=undefined) {
      if(otherInput.value == value) {
        return defaultMessages['customDoNotRepeat']
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Valium: You passed doNotRepeat=${doNotRepeat} to the Input Element (${name}), but there is no input with that name`)
      }
    }
  }

  return ''
}  

export default checkValidity