import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const LISTM_OPTIONS= {
  '1': "08:00",
  '2': "10:00",
  '3': "12:00",
  '4': "14:00",
  '5': "16:00",
  '6': "18:00",
  '7': "20:00",
  '8': "22:00",
}


const DemoInputSelectMultiple = ({formActions, onLog}) => {

  const [times, setTimes]= useState(['1','2'])

  const handleTimesChange = (ev) => {
    console.log(ev.target.options)
    const nTimes= Array.prototype.slice.call(ev.target.options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value)
    
    console.log(nTimes)

    setTimes(nTimes)
    onLog(`Times for valium: ${JSON.stringify(nTimes)}`)
  }

  return (
      <VInput
          type           = "select-multiple"
          allowedValues  = {[[], ['1']]}
          formActions    = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"What times you prefer to take a Valium?"}
              description = ""
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