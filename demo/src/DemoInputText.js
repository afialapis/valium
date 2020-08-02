import React from 'react';
import {VInput} from '../../src'
import useValue from './useValue'
import DemoInputGroup from './DemoInputGroup'
import {fltLatin} from './inputFilters'

const DemoInputText = ({formActions, premature, controlled}) => {

  const valueProps= useValue("John No Doe", controlled)

  return (

      <VInput
          type                 = "text"
          disallowedValues     = {["John Doe"]}
          prematureValidation  = {premature}
          inputFilter          = {fltLatin}
          formActions          = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label   = {"Your name here (you can lie us, John Doe)"}
              message = {message}>
              <input ref      = {inputRef}
                    name      = 'theText'
                    className = {valid ? 'valid' : 'invalid'}
                    required  = {true}
                    minLength = {5}
                    maxLength = {50}
                    {...valueProps}/>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputText;
