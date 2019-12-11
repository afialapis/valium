import VInputBase from './VInputBase'

const VInputSelectMultiple = (props) => { 

  const nconfig= {
    ...props.config,
    premature_check: false,
    change_event   : 'click',

    getValue       : (inputRef) => {
      const options= Array.prototype.slice.call(inputRef.current.options)
      const value = options 
                    .filter((opt) => opt.selected)
                    .map((opt) => opt.value)
      return value
    },
    
    parseForCompare: (value) => {
      try {
        return value.sort().join(',')
      } catch(e) {}
      return ''
    }  
  }

  const nprops= {
    ...props,
    config: nconfig
  }

  return VInputBase(nprops)
}

export default VInputSelectMultiple