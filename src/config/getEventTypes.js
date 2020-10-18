const getEventTypes = (inputType, where) => {

  if (where == 'change') {
    return ['checkbox', /*'select-one',*/ 'select-multiple'].indexOf(inputType)>=0
            ? ['click']
            : ['change']
  }

  if (where == 'premature') {
    //
    // Catching 'input' event will not work
    // on Controlled components. The event gets fired
    // and handled correctly (at least it seems so),
    // but the input gets never updated.
    // React seems to be doing something hacky about it.
    // TODO Investigate why
    //    
    return ['color', 'select-one'].indexOf(inputType)>=0
           ? ['change']
           : ['keyup', 'paste'] // 'input'    
  }

  return []
}

export {getEventTypes}