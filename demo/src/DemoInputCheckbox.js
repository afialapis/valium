import React from 'react'
import {VInput} from '../../src'
import useValue from './useValue'
import DemoInputGroup from './DemoInputGroup'

const DemoInputCheckbox = ({formActions, controlled}) => {

  const valueProps= useValue(false, controlled)

  return (
      <VInput
          type             = "checkbox"
          disallowedValues = {[true]}
          formActions      = {formActions}
          render  ={({valid, message}, inputRef) => 
            <DemoInputGroup 
              label   = {"Did you notice side effects?"}
              message = {message}>
              <input ref       = {inputRef}
                     type      = "checkbox"
                     name      = "theCheck"
                     className = {valid ? 'valid' : 'invalid'}
                     {...valueProps}>
              </input>                
            </DemoInputGroup>   
          }
      />       
  )
}

export default DemoInputCheckbox
