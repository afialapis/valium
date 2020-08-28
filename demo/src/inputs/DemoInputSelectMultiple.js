import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const LISTM_OPTIONS= {
  '1': "08:00",
  '2': "09:00",
  '3': "10:00",
  '4': "11:00",
  '5': "12:00",
  '6': "13:00",
  '7': "14:00",
  '8': "15:00",
}


const DemoInputSelectMultiple = ({formActions, onLog}) => {

  const [times, setTimes]= useState(['3', '5', '7'])

  const handleTimesChange = (ev) => {
    const nTimes= Array.prototype.slice.call(ev.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value)
    
    setTimes(nTimes)
    onLog(`Times for valium: ${JSON.stringify(nTimes)}`)
  }

  return (
      <VInput
          type           = "select-multiple"
          allowedValues  = {[['1', '3', '5', '7']]}
          formActions    = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"What times you prefer to take a Valium?"}
              description = "All even hours required"
              message     = {message}>

              <select ref          = {inputRef}
                      name         = {'times'}
                      className    = {valid ? 'valid' : 'invalid'}
                      multiple
                      value        = {times}
                      onChange     = {(ev) => handleTimesChange(ev)}>
                {Object.keys(LISTM_OPTIONS).map((o) => 
                  <option key={`multiple-select-option-${o}`}
                          value={o}>
                    {LISTM_OPTIONS[o]}
                  </option>
                )}
              </select>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputSelectMultiple