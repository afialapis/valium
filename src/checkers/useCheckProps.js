import {useEffect} from 'react'
import {log} from '../helpers/log'
import {checkProps} from './checkProps'

const useCheckProps = (inputRef, doRepeat, doNotRepeat, inputFilter) => {

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      if (inputRef!=undefined && inputRef.current!=undefined) {
        const input= inputRef.current

        log('input', `${input.name} (${input.type}) #${input.id} useCheckProps()`)

        checkProps(input, doRepeat, doNotRepeat, inputFilter)
      }
    }
  }, 
    [inputRef, doRepeat, doNotRepeat, inputFilter]
  )

}

export {useCheckProps}