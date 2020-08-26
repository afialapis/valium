export default {
  dbg_assertType : 'checkbox',
  premature_check: false,
  change_event   : 'click',
  getValue       : (inputRef) => (inputRef!=undefined && inputRef.current!=undefined) 
                                   ? inputRef.current.checked 
                                   : undefined,
  rightAfterMount: (inputRef) => {
    if (inputRef!=undefined && inputRef.current!=undefined) {
      if (inputRef.current.value==='true' || inputRef.current.value===true) {
        inputRef.current.setAttribute('checked', true)
      }        
    }
  },

  parseForCompare: (value) => {
    if (value===true || value === 'true' || value === 1 || value === '1') {
      return true
    }
    return false
  }
}