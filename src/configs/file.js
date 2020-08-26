export default {
  dbg_assertType : 'file',
  premature_check: false,
  
  getValue       : (inputRef) => {
    try {
      return inputRef.current.files[0]
    } catch(e) {
      console.error('Valium: error on InputFile: ' + e.message)
      console.error(e)
    }
    return undefined      
  }
}