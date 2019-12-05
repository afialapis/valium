import VInputBase from './VInputBase'

class VInputCheckbox extends VInputBase { 

  _dbg_assertType= 'checkbox'
  _keyup_event = false
  
  get inputChecked() {
    return this._inputProp('checked')
  }
  get inputValue() {
    return this.inputChecked
  }

  rightAfterMount() {
    if (this.inputRef.value==='true' || this.inputRef.value===true) {
      this.inputRef.setAttribute('checked', true)
    }
  }  

  parseForCompare(value) {
    if (value===true || value === 'true' || value === 1 || value === '1') {
      return true
    }
    return false
  }
}


export default VInputCheckbox