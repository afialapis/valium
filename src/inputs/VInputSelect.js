import VInputBase from './VInputBase'

class VInputSelect extends VInputBase {  

  addChangeListener(eventType) {
    this.inputRef.addEventListener(eventType, (event) => {
      // This timeout kinda fixes problems with <select>, which
      // gets updated due to the setState and does not propagate the 
      // new value on the onChange.
      // TODO Investigate me
      setTimeout(() => {
        this.handleChange(event)
      }, 10)
    })

    if (this.props.bindSetValidity!=undefined) {
      this.props.bindSetValidity(this.setValidity.bind(this))
    }
  }

  parseForCompare(value) {
    return value.toString()
  }  
}


export default VInputSelect