import React, {useState} from 'react'
import {useValiumInput} from '../../../src'
import {DemoInputGroup} from './DemoInputGroup'

const DemoInputText = () => {
  const [name, setName]= useState('John Not Doe')
  const [age, _setAge]= useState('33') 
  const [words, setWords]= useState('another dimension man!')

  const [nameRef, nameValid, nameMessage] = useValiumInput({
    type: 'text',
    disallowedValues: ["John Doe"],
    inputFilter: 'latin'
  })

  const [ageRef, ageValid, ageMessage] = useValiumInput({
    type: 'text',
    checkValue: (v) => !isNaN(v) && parseInt(v)>=18,
    inputFilter: 'int'
  })

  const [wordsRef, wordsValid, wordsMessage] = useValiumInput({
    type: 'text'
  })

  const handleNameChange = (event) => {
    const nName= event.target.value
    setName(nName)
  }

  return (
    <>
      <DemoInputGroup 
        label       = {"Your name here"}
        description = {"Controlled. Required. 'John Doe' is disallowed. Latin chars."}
        message     = {nameMessage}>
        <input ref       = {nameRef}
               name      = {'name'}
               className = {nameValid ? 'valid' : 'invalid'}
               required  = {true}
               value     = {name}
               onChange  = {(ev) => handleNameChange(ev)}/>
      </DemoInputGroup>

      <DemoInputGroup 
        label       = {"Your age here"}
        description = {"Uncontrolled. Required. Some >18 integer (through inputFilter)"}
        message     = {ageMessage}>
        <input ref       = {ageRef}
               name      = {'age'}
               className = {ageValid ? 'valid' : 'invalid'}
               required  = {true}
               defaultValue = {age}
               /*onChange  = {(ev) => setAge(ev.target.value)}*//>
      </DemoInputGroup>

      <DemoInputGroup
        label       = {"Your experience with Valium in two words"}
        description = {`Controlled. Not required. Max length 20 (currently ${words ? words.length : 0})`}
        message     = {wordsMessage}>
        <input ref          = {wordsRef}
               name         = {'why'}
               className    = {wordsValid ? 'valid' : 'invalid'}
               maxLength    = {20}
               value        = {words}
               onChange     = {(ev) => setWords(ev.target.value)}/>
      </DemoInputGroup>

    </>
  )
}

export {DemoInputText}
