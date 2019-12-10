import VInputBase from './VInputBase'

const VInputNumber = (props) => { 

  const nconfig= {
    ...props.config,
    dbg_assertType : 'number',
    
    parseForCompare: (value) => {
      if (value===undefined || value==='' || isNaN(value)) {
        return undefined
      }
      return parseFloat(value)
    }
  }

  const nprops= {
    ...props,
    config: nconfig
  }

  return VInputBase(nprops)
}

export default VInputNumber