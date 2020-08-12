import React from 'react'
import {VInput} from '../../src'
import useValue from './useValue'
import DemoInputGroup from './DemoInputGroup'


const DemoInputColor = ({formActions, controlled}) => {

  const valueProps= useValue("#FF00FF", controlled)

  return (

      <VInput
          type                 = "color"
          disallowedValues     = {['#000000', '#FFFFFF', '#ffffff']}
          feedback             = "Neither black nor white"
          formActions          = {formActions}
          prematureValidation = {true}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label   = {"What color has your world now?"}
              message = {message}>
              <input ref         = {inputRef}
                     type        = "color"
                     name        = "theColor"
                     className   = {valid ? 'valid' : 'invalid'}
                     {...valueProps}>
              </input>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputColor
