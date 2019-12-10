import VInputBase from './VInputBase'

const VInputSelect = (props) => { 

  const nconfig= {
    ...props.config,
    premature_check: false,
    change_event   : 'click',
    
    parseForCompare: (value) => value.toString()
  }

  const nprops= {
    ...props,
    config: nconfig
  }

  return VInputBase(nprops)
}

export default VInputSelect