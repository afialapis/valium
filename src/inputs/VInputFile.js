import VInputBase from './VInputBase'

class VInputFile extends VInputBase {  
  _dbg_assertType= 'file'
  _force_listen_event= 'change'

  get inputValue() {
    try {
      return this.inputRef.files[0]
    } catch(e) {
      console.error('Valium Form : InputFile : ' + e.message)
      console.error(e)
    }
    return undefined
  }

  addChangeListener(eventType) {

  }

  removeChangeListener(eventType) {

  }

}


export default VInputFile