import React from 'react';
import {VInput} from '../../src'
import useValue from './useValue'
import DemoInputGroup from './DemoInputGroup'

const pad = (n) => 
  n.toString().padStart(2, '0')


const getToday = (add= 0) => {
  const n= new Date()
  return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate() + add)}`
}


const DemoInputDate = ({formActions, premature, controlled}) => {

  const valueProps= useValue(getToday(1), controlled)

  return (

      <VInput
          type                 = "text"
          allowedValues        = {[getToday()]}
          prematureValidation  = {premature}
          formActions          = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label   = {"When will you take your next Valium?"}
              message = {message}>
              <input ref         = {inputRef}
                     type         = "date"
                     name         = "theDate"
                     className    = {valid ? 'valid' : 'invalid'}
                     {...valueProps}/>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputDate