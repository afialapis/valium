import VInputBase from './VInputBase'

const VInputCheckbox = (props) => { 

  const nconfig= {
    ...props.config,
    dbg_assertType : 'checkbox',
    premature_check: false,
    change_event   : 'click',
    getValue       : (inputRef) => (inputRef!=undefined && inputRef.current!=undefined) 
                                     ? inputRef.current.checked 
                                     : undefined,
    rightAfterMount: (inputRef) => {
      if (inputRef!=undefined && inputRef.current!=undefined) {
        if (inputRef.value==='true' || inputRef.value===true) {
          inputRef.setAttribute('checked', true)
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

  const nprops= {
    ...props,
    config: nconfig
  }

  return VInputBase(nprops)
}


export default VInputCheckbox