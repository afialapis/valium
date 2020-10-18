const defaultMessages = {
  badInput        : 'Value is wrong',
  customError     : 'Value does not match custom validity',
  patternMismatch : 'Value does not match expected pattern',
  rangeOverflow   : 'Value is greater than expected',
  rangeUnderflow  : 'Value is lesser than expected',
  stepMismatch    : 'Value has an incorrect number of decimals',
  tooShort        : 'Value is shorter than expected',
  tooLong         : 'Value is longer than expected',
  typeMismatch    : 'Value type is wrong',
  valueMissing    : 'Value is required',
  valid           : 'Value is not valid',
  // custom validations
  customAllowList    : 'Value is not allowed',
  customDisallowList : 'Value is disallowed',
  customDoRepeat     : 'Value must be repeated',
  customDoNotRepeat  : 'Value cannot be repeated'
}

export {defaultMessages}