import { useEffect } from 'react'
import {getValidationEvents} from '../config/getValidationEvents'
import {log} from '../helpers/log'

const useValidationListener = (inputRef, handler ) => {

  useEffect(() => {
      
    const input= inputRef?.current

    if (input==undefined) {
      return
    }

    //log('input', `${input.name} (${input.type}) #${input.id} useValidationListener()`)

    const validationEvents= getValidationEvents(input.type) || []
    validationEvents
      .map((eventType) => {
        input.addEventListener(eventType, handler)
      })    


    log('input', `${input.name} (${input.type}) #${input.id} useValidationListener() attached: ${validationEvents.join(', ')}`)

    // clean listeners function
    const removeAllChangeListeners = () => {
      if (input!=undefined) {
        log('input', `${input.name} (${input.type}) #${input.id} useValidationListener() dettaching events`)
        validationEvents.map((eventType) => {
          input.removeEventListener(eventType, handler)
        })
      } else {
        log('input', `${input.name} (${input.type}) #${input.id} useValidationListener() WARNING! Could not dettach events`)
      }
    }    
      
    // return clean function
    return removeAllChangeListeners
  }, [inputRef, handler])
}

export {useValidationListener}