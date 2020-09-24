import React from 'react'
import {useValium} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputFile = ({onLog}) => {

  const [inputRef, valid, message] = useValium({
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

export default DemoInputFile
