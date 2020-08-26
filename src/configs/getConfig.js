
const defaultConfig = {
  dbg_assertType   : undefined,
  change_event     : 'change' ,
  premature_check  : true     ,
  //
  // Catching 'input' event will not work
  // on Controlled components. The event gets fired
  // and handled correctly (at least it seems so),
  // but the input gets never updated.
  // React seems to be doing something hacky about it.
  // TODO Investigate why
  //
  premature_event  : 'keyup,paste', // 'input',
  //
  // This event list would cover every need:
  // ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'],
  // But lets start simple and easy. 
  // TODO Input Filters must be tested on every input type. Right now just accept them on 'text' inputs
  input_filter_events : ['input'], 
  //
  getValue         : (inputRef) => {
    if(inputRef!=undefined && inputRef.current!=undefined) {
      if (inputRef.current.value==undefined) {
        return ''
      }
      return inputRef.current.value
    } else {
      return undefined
    }
  },
  rightAfterMount  : (inputRef) => {},
  parseForCompare  : (v) => v.toString()
}

function getConfig(inputType) {

  let config= {}
  try {
    config= require(`./${inputType}`)
  } catch(e) {}

  return {
    ...defaultConfig,
    config
  }

}

export default getConfig