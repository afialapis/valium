import React from 'react';
import {VInput} from '../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputFile = ({formActions, controlled}) => {

  if (controlled) {
    return null
  }

  return (
      <VInput
          type                 = "file"
          formActions          = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label   = {"Upload a copy of your ID Card, authorities must know you"}
              message = {message}>
              <input ref      = {inputRef}
                    type      = "file"
                    name      = {'theFile'+controlled}
                    className = {valid ? 'valid' : 'invalid'}
                    required  = {true}
                    />
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputFile
