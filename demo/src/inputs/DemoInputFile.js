import React from 'react'
import {useValiumInput} from '../../../src'
import {DemoInputGroup} from './DemoInputGroup'

const DemoInputFile = () => {

  const [inputRef, valid, message] = useValiumInput({
    type: 'file'
  })


  return (
    <DemoInputGroup 
      label       = {"Upload a copy of your ID Card, authorities must know you"}
      description = ""
      message     = {message}>
      <input ref       = {inputRef}
             type      = "file"
             name      = {'id_card'}
             className = {valid ? 'valid' : 'invalid'}
             required  = {true}
             />
    </DemoInputGroup>       
  )
}

export {DemoInputFile}
