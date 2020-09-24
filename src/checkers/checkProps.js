// Check some props consistency
const checkProps = (input, doRepeat, doNotRepeat, inputFilter, prematureValidation) => {
  const name= input.name
  const inputType= input.type.toLowerCase()

  // Check prematureValidation
  if (prematureValidation && ['text', 'textarea', 'number', 'color', 'date'].indexOf(inputType)<0) {
    console.warn(`Valium: You passed prematureValidation=true to the Input Element (${name}) of type (${inputType}), but it does not support it`)
  }
  // Check inputFilter
  if (inputFilter && ['text'].indexOf(inputType)<0) {
    console.warn(`Valium: You passed inputFilter to the Input Element (${name}) of type (${inputType}), but it does not support it`)
  }        
  // Check doRepeat
  if (doRepeat!=undefined && doRepeat==name) {
    console.warn(`Valium: You passed doRepeat prop to the Input Element (${name}) with the same name`)
  }
  // Check doNotRepeat
  if (doNotRepeat!=undefined && doNotRepeat==name) {
    console.warn(`Valium: You passed doNotRepeat prop to the Input Element (${name}) with the same name`)
  }
}

export {checkProps}