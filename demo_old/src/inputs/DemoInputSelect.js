import React, {useState} from 'react'
import {useInput} from '../../../src'
import {DemoInputGroup} from './DemoInputGroup'

const LIST_OPTIONS= [
  ['' , '---'],
  ['1', "It's fascinating"],
  ['2', "It's cool"],
  ['3', "Well... beh!"],
  ['4', "Take it away from me"],
]

const DemoInputSelect = () => {
  const [experience, setExperience]= useState(undefined /*'1'*/)

  const [inputRef, valid, message] = useInput({
    type: 'select',
    disallowedValues: ['3', '4']
  })
  
  return (
    <DemoInputGroup 
      label       = {"What do you think about Valium?"}
      description = ""
      message     = {message}>

      <select ref          = {inputRef}
              name         = {'experience'}
              className    = {valid ? 'valid' : 'invalid'}
              required     = {true}
              value        = {experience}
              onChange     = {(ev) => setExperience(ev.target.value)}>
        {LIST_OPTIONS.map(([k,v]) => 
          <option key={`single-select-option-${k}`}
                  value={k}>
            {v}
          </option>
        )}
      </select>
    </DemoInputGroup>   
  )
}

export {DemoInputSelect}
