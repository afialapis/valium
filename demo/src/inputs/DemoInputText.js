import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputText = ({formActions, premature, onLog}) => {
  const [name, setName]= useState('John Not Doe')
  const [age, setAge]= useState('33') 
  const [words, _setWords]= useState('another dimension man!')

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
      <VInput
        type                 = "text"
        disallowedValues     = {["John Doe"]}
        prematureValidation  = {premature}
        inputFilter          = {'latin'}
        formActions          = {formActions}
        render = {({valid, message}, inputRef) => 
          <DemoInputGroup 
            label       = {"Your name here"}
            description = {"Controlled. Required. 'John Doe' is disallowed. Latin chars."}
            message     = {message}>
            <input ref      = {inputRef}
                  name      = {'name'}
                  className = {valid ? 'valid' : 'invalid'}
                  required  = {true}
                  value     = {name}
                  onChange  = {(ev) => handleNameChange(ev)}/>
          </DemoInputGroup>
        }
      />  


      <VInput
        type                 = "text"
        checkValue           = {(v) => !isNaN(v) && parseInt(v)>=18}
        prematureValidation  = {premature}
        inputFilter          = {'int'}
        formActions          = {formActions}
        render = {({valid, message}, inputRef) => 
          <DemoInputGroup 
            label       = {"Your age here"}
            description = {"Controlled. Required. Some >18 integer (through inputFilter)"}
            message     = {message}>
            <input ref      = {inputRef}
                  name      = {'age'}
                  className = {valid ? 'valid' : 'invalid'}
                  required  = {true}
                  value     = {age}
                  onChange  = {(ev) => setAge(ev.target.value)}/>
          </DemoInputGroup>
        }
      />   

      <VInput
        type                 = "text"
        prematureValidation  = {premature}
        inputFilter          = {'float'}
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
