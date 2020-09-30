import React, {useState} from 'react'
import {useValiumInput} from '../../../src'
import {DemoInputGroup} from './DemoInputGroup'

const DemoInputText = ({premature, onLog}) => {
  const [name, setName]= useState('John Not Doe')
  const [age, setAge]= useState('33') 
  const [words, _setWords]= useState('another dimension man!')

  const [nameRef, nameValid, nameMessage, _setNameValidity] = useValiumInput({
    type: 'text',
    disallowedValues: ["John Doe"],
    prematureValidation: premature,
    inputFilter: 'latin'
  })

  const [ageRef, ageValid, ageMessage, _setAgeValidity] = useValiumInput({
    type: 'text',
    checkValue: (v) => !isNaN(v) && parseInt(v)>=18,
    prematureValidation: premature,
    inputFilter: 'int'
  })

  const [wordsRef, wordsValid, wordsMessage, _setWordsValidity] = useValiumInput({
    type: 'text',
    prematureValidation: premature
  })

  const handleNameChange = (event) => {
    const nName= event.target.value
    const focused= event.target.ownerDocument.activeElement === event.target
    setName(nName)
    if (! focused) {
      onLog(`Welcome ${nName}!`)
    }
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
        description = {"Controlled. Required. Some >18 integer (through inputFilter)"}
        message     = {ageMessage}>
        <input ref       = {ageRef}
               name      = {'age'}
               className = {ageValid ? 'valid' : 'invalid'}
               required  = {true}
               value     = {age}
               onChange  = {(ev) => setAge(ev.target.value)}/>
      </DemoInputGroup>

      <DemoInputGroup
        label       = {"Your experience with Valium in two words"}
        description = {`Uncontrolled. Not required. Max length 20 (currently ${words.length})`}
        message     = {wordsMessage}>
        <input ref          = {wordsRef}
               name         = {'why'}
               className    = {wordsValid ? 'valid' : 'invalid'}
               maxLength    = {20}
               defaultValue = {words}/>
      </DemoInputGroup>

    </>
  )
}

export {DemoInputText}
