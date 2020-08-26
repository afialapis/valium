import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputCheckbox = ({formActions, onLog}) => {

  const [effects, setEffects]= useState(false)

  const handleEffectsChange = (nEffects) => {
    setEffects(nEffects)
  }

  return (
      <VInput
          type             = "checkbox"
          disallowedValues = {[true]}
          formActions      = {formActions}
          render  ={({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"Did you notice side effects?"}
              description = ""
              message     = {message}>
              <input ref       = {inputRef}
                     type      = "checkbox"
                     name      = {'effects'}
                     className = {valid ? 'valid' : 'invalid'}
                     value     = {effects}
                     onChange  = {(ev) => handleEffectsChange(ev.target.checked)}>
              </input>                
            </DemoInputGroup>   
          }
      />       
  )
}

export default DemoInputCheckbox
