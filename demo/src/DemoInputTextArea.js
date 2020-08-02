import React from 'react';
import {VInput} from '../../src'
import useValue from './useValue'
import DemoInputGroup from './DemoInputGroup'


const DemoInputTextArea = ({formActions, premature, controlled}) => {

  const valueProps= useValue("It started a sunny Summer's Friday...", controlled)

  return (
      <VInput
          type                 = "textarea"
          prematureValidation  = {premature}
          formActions          = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label   = {"Tell us more about your love story with Valium"}
              message = {message}>
              <textarea 
                    ref      = {inputRef}
                    name      = 'theTextArea'
                    className = {valid ? 'valid' : 'invalid'}
                    {...valueProps}/>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputTextArea