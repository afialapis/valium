import React, {useState} from 'react'
import {useInput} from '../../../src'
import {DemoInputGroup} from './DemoInputGroup'

const pad = (n) => 
  n.toString().padStart(2, '0')

const getToday = (add= 0) => {
  const n= new Date()
  return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate() + add)}`
}

const DemoInputDate = () => {

  const [inputRef, valid, message] = useInput({
    type: 'text',
    disallowedValues: [getToday()]
  })

  const [when, setWhen]= useState(getToday(1))
  
  const handleWhenChange = (nWhen) => {
    setWhen(nWhen)
  }

  return (
    <DemoInputGroup 
      label       = {"When will you take your next Valium?"}
      description = "Why would you wait till tomorrow"
      message     = {message}>
      <input ref          = {inputRef}
             type         = "date"
             name         = {'when'}
             className    = {valid ? 'valid' : 'invalid'}
             value        = {when}
             onChange     = {(ev) => handleWhenChange(ev.target.value)}/>
    </DemoInputGroup>
  )
}

export {DemoInputDate}