import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputTextArea = ({formActions, premature, onLog}) => {
  const [story, setStory]= useState('It started a warm Friday\'s night. I was bored...')

  const handleStoryChange = (nStory) => {
    setStory(nStory)
  }

  return (
      <VInput
          type                 = "textarea"
          prematureValidation  = {premature}
          formActions          = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"Tell us more about your love story with Valium"}
              description = {`Not required. Min length 50 (currently ${story.length}).`}
              message     = {message}>
              <textarea 
                    ref       = {inputRef}
                    name      = {'story'}
                    className = {valid ? 'valid' : 'invalid'}
                    value     = {story}
                    minLength = {50}
                    onChange  = {(ev) => handleStoryChange(ev.target.value)}/>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputTextArea