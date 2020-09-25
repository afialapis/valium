import React, {useState} from 'react'
import {useValiumInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputColor = ({premature, onLog}) => {

  const [inputRef, valid, message, _setValidity] = useValiumInput({
    type: 'color',
    disallowedValues: ['#000000', '#FFFFFF', '#ffffff'],
    feedback: 'Neither black nor white',
    prematureValidation: premature
  })

  const [color, setColor]= useState('#FF00FF')
  
  const handleColorChange = (nColor) => {
    setColor(nColor)
  }

  return (
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
  )
}

export default DemoInputColor
