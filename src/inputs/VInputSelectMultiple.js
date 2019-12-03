import VInputBase from './VInputBase'

class VInputSelectMultiple extends VInputBase {  

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

  /*
  addChangeListener() {
    this.options.map((opt) => {
      opt.addEventListener('click', (event) => {
        this.handleChange(event)
      })
    })
  }

  removeChangeListener() {
    this.options.map((opt) => {
      opt.removeEventListener('click')
    })
  }
  */

  parseForCompare(value) {
    try {
      return value.sort().join(',')
    } catch(e) {}
    return ''
  }  

}



export default VInputSelectMultiple