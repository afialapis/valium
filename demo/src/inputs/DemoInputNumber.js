import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'

const DemoInputNumber = ({formActions, premature, onLog}) => {

  const [pills, setPills]= useState(2)
  const [weight, setWeight]= useState(105.876)
  const [size, setSize]= useState(1.44)

  const handlePillsChange = (nPills) => {
    setPills(nPills)
  }

  const handleWeightChange = (nWeight) => {
    setWeight(nWeight)
  }

  return (
    <>
      <VInput
          decimals            = {1}
          checkValue           = {(v) => v>=6}
          prematureValidation  = {premature}
          formActions          = {formActions}
          render  ={({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"How many pills per dose would you like?"}
              description = {"Some >=6 integer. Decimals allowed but invalid (decimals=1)."}
              message     = {message}>
              <input  ref       = {inputRef}
                      type      = "number"
                      name      = {'pills'}
                      className = {valid ? 'valid' : 'invalid'}
                      value     = {pills}
                      required  = {false}
                      onChange  = {(ev) => handlePillsChange(ev.target.value)}>
              </input>                
            </DemoInputGroup>          
          }
      />
    
      <VInput
          decimals             = {3}
          prematureValidation  = {premature}
          formActions          = {formActions}
          render  ={({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"Hmm... sounds like too much pills. How much do you weight?"}
              description = {"Some float (max 3 decimals, decimals = 3)."}
              message     = {message}>
              
              <input  ref       = {inputRef}
                      type      = "number"
                      name      = {'weight'}
                      className = {valid ? 'valid' : 'invalid'}
                      value     = {weight}
                      required  = {true}
                      onChange  = {(ev) => handleWeightChange(ev.target.value)}>
              </input>                
            </DemoInputGroup>          
          }
      />

      <VInput
          prematureValidation  = {premature}
          formActions          = {formActions}
          render  ={({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"Still not sure... Your size?"}
              description = {"Some float (max 2 decimals, native step = 0.01)."}
              message     = {message}>
              
              <input  ref       = {inputRef}
                      type      = "number"
                      name      = {'size'}
                      className = {valid ? 'valid' : 'invalid'}
                      value     = {size}
                      step      = {0.01}
                      required  = {true}
                      onChange  = {(ev) => setSize(ev.target.value)}>
              </input>                
            </DemoInputGroup>          
          }
      />
      {/*  */}


    </>
  )
}

export default DemoInputNumber
