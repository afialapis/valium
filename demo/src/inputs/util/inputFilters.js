const _fltBase = (regex, required= false) => {
  if (required) {
    return (v) => regex.test(v)
  }
  return (v) => {
    if (v===undefined || v==='') {
      return true
    }
    return regex.test(v)
  }
}

const REGEX_INT= /^-?\d+$/
const REGEX_UINT= /^\d+$/
const REGEX_FLOAT = /^-?\d*[.,]?\d*$/
const REGEX_CURRENCY = /^-?\d*[.,]?\d{0,2}$/
const REGEX_LATIN = /^[a-z ]*$/i
const REGEX_HEXADECIMAL = /^[0-9a-f]*$/i

const fltInteger = _fltBase(REGEX_INT)

const fltUnsignedInteger = _fltBase(REGEX_UINT)

const fltUnsignedIntegerLimited = (v) => {
  if (! isNaN(v)) {
    return parseInt(v) <= 500
  }
  const f= _fltBase(REGEX_UINT)
  return f(v)
}

const fltFloat = _fltBase(REGEX_FLOAT)

const fltCurrency = _fltBase(REGEX_CURRENCY)

const fltLatin = _fltBase(REGEX_LATIN)

const fltHexadecimal = _fltBase(REGEX_HEXADECIMAL)


export {fltInteger, fltUnsignedInteger, fltUnsignedIntegerLimited, 
        fltFloat, fltCurrency, fltLatin, fltHexadecimal}