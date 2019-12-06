import VInputBase from './VInputBase'

class VInputSelectMultiple extends VInputBase {  
  _force_listen_event= 'click'
  
  get options() {
    return Array.prototype.slice.call(this.inputRef.options)
  }

  get inputValue() {
    try {
      return this.options 
             .filter((opt) => opt.selected)
             .map((opt) => opt.value)
    } catch(e) {
      console.error('Valium Form : VInputSelectMultiple error ' + e.message.toString())
    }
    return []
  }

  parseForCompare(value) {
    try {
      return value.sort().join(',')
    } catch(e) {}
    return ''
  }  

}



export default VInputSelectMultiple