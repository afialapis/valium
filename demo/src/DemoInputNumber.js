import React from 'react'
import {VInput} from '../../src'
import useValue from './useValue'
import DemoInputGroup from './DemoInputGroup'
import {fltFloat} from './inputFilters'

const DemoInputNumber = ({formActions, premature, controlled}) => {

  const valueProps= useValue(123, controlled)

  return (

      <VInput
          type                 = "number"
          disallowedValues     = {[0, 3]}
          stepRange            = {0.00000000001} // This disables the input's step
          prematureValidation  = {premature}
          inputFilter          = {fltFloat}
          formActions          = {formActions}
          render  ={({valid, message}, inputRef) => 
            <DemoInputGroup 
              label   = {"How many pills per dose?"}
              message = {message}>
              <input ref       = {inputRef}
                      type      = "number"
                      name      = "theNumber"
                      className = {valid ? 'valid' : 'invalid'}
                      {...valueProps}>
              </input>                
            </DemoInputGroup>          
          }
      />
  )
}

export default DemoInputNumber
