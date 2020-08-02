import React from 'react';
import {VInput} from '../../src'
import useValue from './useValue'
import DemoInputGroup from './DemoInputGroup'


const DemoInputFile = ({formActions, controlled}) => {

  const valueProps= useValue(undefined, controlled)

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
                    name      = 'theFile'
                    className = {valid ? 'valid' : 'invalid'}
                    required  = {true}
                    {...valueProps}/>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputFile
