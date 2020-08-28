import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputColor = ({formActions, onLog}) => {

  const [color, setColor]= useState('#FF00FF')
  
  const handleColorChange = (nColor) => {
    setColor(nColor)
  }

  return (

      <VInput
          type                 = "color"
          disallowedValues     = {['#000000', '#FFFFFF', '#ffffff']}
          feedback             = "Neither black nor white"
          formActions          = {formActions}
          prematureValidation = {true}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"What color has your world now?"}
              description = "Neither black nor white!"
              message     = {message}>
              <input ref         = {inputRef}
                     type        = "color"
                     name        = {'color'}
                     className   = {valid ? 'valid' : 'invalid'}
                     value       = {color}
                     onChange    = {(ev) => handleColorChange(ev.target.value)}>
              </input>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputColor
