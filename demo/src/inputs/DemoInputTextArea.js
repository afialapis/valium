import React, {useState} from 'react'
import {useValium} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputTextArea = ({premature, onLog}) => {
  const [story, setStory]= useState('It started a warm Friday\'s night. I was bored...')

  const [inputRef, valid, message] = useValium({
    type: 'textarea',
    prematureValidation: premature
  })

  const handleStoryChange = (nStory) => {
    setStory(nStory)
  }

  return (
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
  )
}

export default DemoInputTextArea