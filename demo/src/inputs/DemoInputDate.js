import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const pad = (n) => 
  n.toString().padStart(2, '0')

const getToday = (add= 0) => {
  const n= new Date()
  return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate() + add)}`
}

const DemoInputDate = ({formActions, premature, onLog}) => {

  const [when, setWhen]= useState(getToday(1))
  
  const handleWhenChange = (nWhen) => {
    setWhen(nWhen)
  }

  return (
      <VInput
          type                 = "text"
          allowedValues        = {[getToday()]}
          prematureValidation  = {premature}
          formActions          = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"When will you take your next Valium?"}
              description = ""
              message     = {message}>
              <input ref          = {inputRef}
                     type         = "date"
                     name         = {'when'}
                     className    = {valid ? 'valid' : 'invalid'}
                     value        = {when}
                     onChange     = {(ev) => handleWhenChange(ev.target.value)}/>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputDate