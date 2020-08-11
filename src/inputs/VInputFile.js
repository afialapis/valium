import VInputBase from './VInputBase'

const VInputFile = (props) => { 

  const nconfig= {
    ...props.config,
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
  
  const nprops= {
    ...props,
    config: nconfig
  }

  return VInputBase(nprops)
}

export default VInputFile