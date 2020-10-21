import { useEffect } from 'react'
import {log} from '../helpers/log'


const useCheckboxEnsure = (inputRef) => {
  useEffect(() => {
    const input= inputRef?.current

    if (input==undefined) {
      return
    }

    const inputType= input.type.toLowerCase()
  
    // Ensure checkbox checked prop
    if (inputType === 'checkbox') {

      log('input', `${input.name} (${input.type}) #${input.id} useCheckboxEnsure() ensuring value`)

      if (input.value==='true' || input.value===true) {
        input.setAttribute('checked', true)
      }         
    }

  }, [inputRef])
}


export {useCheckboxEnsure}