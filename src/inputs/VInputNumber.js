import VInputBase from './VInputBase'

class VInputNumber extends VInputBase { 

  _dbg_assertType= 'number'
  
  constructor(props) {
    super(props)
  }
  
  parseForCompare(value) {
    if (value===undefined || value==='' || isNaN(value)) {
      return undefined
    }
    return parseFloat(value)
  }
}

export default VInputNumber