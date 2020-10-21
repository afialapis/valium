const EVENT_TYPES= {
  'checkbox'        : ['click'],                    // {change: 'click' , premature: []},
  'color'           : ['change', 'click'],          // {change: 'change', premature: ['click']},
  'date'            : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'datetime-local'  : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'email'           : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'file'            : ['change'],                   // {change: 'change', premature: []},
  'hidden'          : ['change'],                   // {change: 'change', premature: []},
  'image'           : ['change'],                   // {change: 'change', premature: []},
  'month'           : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'number'          : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'password'        : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'radio'           : ['change', 'click'],          // {change: 'change', premature: ['click']},
  'range'           : ['change', 'click'],          // {change: 'change', premature: ['click']},
  'search'          : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'select-multiple' : ['click'],                    // {change: 'click' , premature: []},
  'select-one'      : ['click'],                    // {change: 'click' , premature: []},
  'tel'             : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'text'            : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'textarea'        : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'time'            : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'url'             : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  'week'            : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  // Obsolete
  'datetime'        : ['change', 'keyup', 'paste'], // {change: 'change', premature: ['keyup', 'paste']},
  // No handler for these
  'button'          : [],                           // {change: '', premature: []},
  'reset'           : [],                           // {change: '', premature: []},
  'submit'          : [],                           // {change: '', premature: []} 
}


const getValidationEvents = (inputType) => {
  inputType= inputType.toLowerCase()

  return EVENT_TYPES[inputType]
}


export {getValidationEvents}