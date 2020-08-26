import React from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputFile = ({formActions, onLog}) => {

  return (
      <VInput
          type                 = "file"
          formActions          = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"Upload a copy of your ID Card, authorities must know you"}
              description = ""
              message     = {message}>
              <input ref      = {inputRef}
                    type      = "file"
                    name      = {'id_card'}
                    className = {valid ? 'valid' : 'invalid'}
                    required  = {true}
                    />
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputFile
