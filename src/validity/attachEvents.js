import {getEventTypes} from '../config/getEventTypes'
import {makeInputFilter} from '../helpers/inputFilters'
import {log} from '../helpers/log'

const attachEvents = (input, inputFilter, setInputValidity ) => {
  if (input==undefined) {
    return
  }

  log('input', `${input.name} (${input.type}) #${input.id} attachEvents()`)

  const name= input.name
  const inputType= input.type.toLowerCase()
  
  // Ensure checkbox checked prop
  if (inputType === 'checkbox') {
    if (input.value==='true' || input.value===true) {
      input.setAttribute('checked', true)
    }         
  }

  // Set initial validity
  //setInputValidity()

  const handleChange = (event, why) => {
    event.stopPropagation()
    log('input', `${input.name} (${input.type}) #${input.id} attachEvents() handleChange(${why}) event ${event.type} value ${event.target.value} is calling setInputValidity`)
    setInputValidity()
  }

  // Handle listeners
  const allListeners= {}

  // Add change listener
  const changeListener= (event) => {
    handleChange(event, 'change')
  }

  const changeEvent= getEventTypes(inputType, 'change')[0]
  input.addEventListener(changeEvent, changeListener)
  allListeners[changeEvent]= changeListener

  // Add premature listeners, if any
  const prematureValidation= input?.form?.getAttribute('valium-premature') === 'true'
  if (prematureValidation) {
    let prematureEvents= []
    prematureEvents= getEventTypes(inputType, 'premature')
    prematureEvents
      .filter((eventType) => eventType != changeEvent)
      .map((eventType) => {
        const prematureListener= (event) => {
          handleChange(event, 'premature')      
        }
        input.addEventListener(eventType, prematureListener)
        allListeners[eventType]= prematureListener
      })    
  }

  // Input Filter listeners
  // Credits to:
  // https://stackoverflow.com/a/469362
  // https://jsfiddle.net/emkey08/zgvtjc51
  if (inputType == 'text' && inputFilter!=undefined) {
    
    const theInputFilter= makeInputFilter(name, inputFilter)

    // This event list would cover every need:
    // ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'],
    // But lets start simple and easy. 
    const inputFilterEvents= ['input']

    // init auxiliar properties
    input.oldValue = input.value

    const filterEventListener = function(event) {
      if (theInputFilter(event.target.value)) {
        event.target.oldValue = event.target.value
      } else if (Object.hasOwnProperty.call(event.target, "oldValue")) {
        const selectionStart = event.target.selectionStart
        const selectionEnd = event.target.selectionEnd

        event.target.value = event.target.oldValue
        try {
          event.target.setSelectionRange(selectionStart-1, selectionEnd-1)
        } catch(e) {}
      } else {
        event.target.value = ""
      }
    }

    inputFilterEvents.forEach(function(eventType) {
      input.addEventListener(eventType, filterEventListener)
      allListeners[eventType]= filterEventListener
    })
  }

  // clean listeners function
  const removeAllChangeListeners = () => {
    if (input!=undefined) {
      log('input', `${input.name} (${input.type}) #${input.id} attachEvents() dettaching events`)
      Object.keys(allListeners).map((eventType) => {
        input.removeEventListener(eventType, allListeners[eventType])
      })
    } else {
      log('input', `${input.name} (${input.type}) #${input.id} attachEvents() WARNING! Could not dettach events`)
    }
  }    
    
  // return clean function
  return removeAllChangeListeners
}

export {attachEvents}