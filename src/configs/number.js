export default {
  dbg_assertType : 'number',
  input_filter_events : ['input', ], 
  
  parseForCompare: (value) => {
    if (value===undefined || value==='' || isNaN(value)) {
      return undefined
    }
    return parseFloat(value)
  }
}
