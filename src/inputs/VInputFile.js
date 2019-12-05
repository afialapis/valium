import VInputBase from './VInputBase'

class VInputFile extends VInputBase {  
  _dbg_assertType= 'file'

  get inputValue() {
    try {
      return this.inputRef.files[0]
    } catch(e) {
      console.log(e)
    }
    return undefined
  }


  addChangeListener(eventType) {

  }

  removeChangeListener(eventType) {

  }

}


export default VInputFile