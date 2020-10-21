/*
 * Predefined input filter by Valium
 */
const VALIUM_INPUT_FILTERS= {
  'int'         : /^-?\d+$/,
  'uint'        : /^\d+$/,
  'float'       : /^-?\d*[.,]?\d*$/,
  //'float'       : /[+-]?([0-9]*[.])?[0-9]+/,
  'dollar'      : /^-?\d*[.,]?\d{0,2}$/,
  //'euro'        : /^-?\d*[.,]?\d{0,2}$/,
  'latin'       : /^[a-z ]*$/i,
  'hexadecimal' : /^[0-9a-f]*$/i
}


const _fltBase = (regex) => {
  return (v) => {
    if (v===undefined || v==='') {
      return true
    }
    return regex.test(v)
  }
}


const makeInputFilter = (inputFilter, inputName) => {

  if (inputFilter == undefined || inputFilter === '') {
    return undefined
  }

  if (typeof inputFilter === 'string') {
    const regex= VALIUM_INPUT_FILTERS[inputFilter]
    if (regex===undefined) {
      console.error(`Valium: error on Input Element (${inputName}). (${inputFilter}) is not a valid inputFilter`)
      return undefined
    }
    return _fltBase(regex)
  }

  if (inputFilter instanceof RegExp) {
    return _fltBase(inputFilter)
  }

  if (typeof inputFilter === "function") {
    return inputFilter
  }

  console.error(`Valium: error on Input Element (${inputName}). (${inputFilter}) of type (${typeof inputFilter}) is not a valid inputFilter`)
  return undefined

}




export {makeInputFilter}