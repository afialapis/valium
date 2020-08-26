import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const LIST_OPTIONS= {
  '1': "It's fascinating",
  '2': "It's cool",
  '3': "Well... beh!",
  '4': "Take it away from me",
  '': '---',
}

const DemoInputSelect = ({formActions, onLog}) => {
  const [experience, setExperience]= useState('1')
  
  const handleExperienceChange = (nExperience) => {
    setExperience(nExperience)
  }

  return (
      <VInput
          type                 = "select"
          disallowedValues     = {['3', '4']}
          formActions          = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"What do you think about Valium?"}
              description = ""
              message     = {message}>

              <select ref          = {inputRef}
                      name         = {'experience'}
                      className    = {valid ? 'valid' : 'invalid'}
                      required     = {true}
                      value        = {experience}
                      onChange     = {(ev) => handleExperienceChange(ev.target.value)}>
                {Object.keys(LIST_OPTIONS).map((o) => 
                  <option key={`single-select-option-${o}`}
                          value={o}>
                    {LIST_OPTIONS[o]}
                  </option>
                )}
              </select>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputSelect
