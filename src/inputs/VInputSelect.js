import VInputBase from './VInputBase'

class VInputSelect extends VInputBase {  
  _force_listen_event= 'click'
  
  /*
  addChangeListener(eventType) {
    this.changeListener= (event) => {
      // This timeout kinda fixes problems with <select>, which
      // gets updated due to the setState and does not propagate the 
      // new value on the onChange.
      // TODO Investigate me
      setTimeout(() => {      
        this.handleChange(event)
      }, 10)
    }    
    this.inputRef.addEventListener(eventType, this.changeListener)
  }
  */

  parseForCompare(value) {
    return value.toString()
  }  
}


export default VInputSelect