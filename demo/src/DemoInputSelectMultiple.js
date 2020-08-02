import React, {useState} from 'react';
import {VInput} from '../../src'
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


const DemoInputSelectMultiple = ({formActions, controlled}) => {

  const [value, setValue]= useState(['1','4'])

  const valueProps= controlled
    ? {value  : value,
      onChange: (ev) => {
          const value= Array.prototype.slice.call(ev.target.options)
              .filter((opt) => opt.selected)
              .map((opt) => opt.value)
          setValue(value)
        }
      }
    : {
      defaultValue: value
      }


  return (
      <VInput
          type           = "select-multiple"
          allowedValues  = {[[], ['1']]}
          formActions    = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label   = {"What times you prefer to take a Valium?"}
              message = {message}>

              <select ref          = {inputRef}
                      name         = "theListMultiple"
                      className    = {valid ? 'valid' : 'invalid'}
                      multiple
                      {...valueProps}>
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