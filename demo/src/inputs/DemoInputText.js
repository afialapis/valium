import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'
import {fltLatin} from './util/inputFilters'

const DemoInputText = ({formActions, premature, onLog}) => {
  const [name, setName]= useState('John Not Doe')
  const [words, _setWords]= useState('another dimension man!')

  const handleNameChange = (nName) => {
    setName(nName)
    onLog(`Welcome ${nName}!`)
  }

  return (
    <>
      <VInput
        type                 = "text"
        disallowedValues     = {["John Doe"]}
        prematureValidation  = {premature}
        inputFilter          = {fltLatin}
        formActions          = {formActions}
        render = {({valid, message}, inputRef) => 
          <DemoInputGroup 
            label       = {"Your name here"}
            description = {"Controlled. Required. 'John Doe' is disallowed."}
            message     = {message}>
            <input ref      = {inputRef}
                  name      = {'name'}
                  className = {valid ? 'valid' : 'invalid'}
                  required  = {true}
                  value     = {name}
                  onChange  = {(ev) => handleNameChange(ev.target.value)}/>
          </DemoInputGroup>
        }
      />  

      <VInput
        type                 = "text"
        prematureValidation  = {premature}
        inputFilter          = {fltLatin}
        formActions          = {formActions}
        render = {({valid, message}, inputRef) => 
          <DemoInputGroup 
            label       = {"Your experience with Valium in two words"}
            description = {`Uncontrolled. Not required. Max length 20 (currently ${words.length})`}
            message     = {message}>
            <input ref         = {inputRef}
                  name         = {'why'}
                  className    = {valid ? 'valid' : 'invalid'}
                  maxLength    = {20}
                  defaultValue = {words}/>
          </DemoInputGroup>
        }
      />          
    </>
  )
}

export default DemoInputText
