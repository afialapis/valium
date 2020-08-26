import React, {useState} from 'react'
import {VInput} from '../../../src'
import DemoInputGroup from './DemoInputGroup'
import {fltFloat} from './util/inputFilters'

const DemoInputNumber = ({formActions, premature, onLog}) => {

  const [pills, setPills]= useState(2)
  const [weight, setWeight]= useState(105.80)

  const handlePillsChange = (nPills) => {
    setPills(nPills)
  }

  const handleWeightChange = (nWeight) => {
    setWeight(nWeight)
  }

  return (
    <>
      <VInput
          type                 = "number"
          stepRange            = {1}
          checkValue           = {(v) => v>=6}
          prematureValidation  = {premature}
          formActions          = {formActions}
          render  ={({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"How many pills per dose would you like?"}
              description = {"Some >=6 integer. Decimals allowed but invalid (stepRange=1)."}
              message     = {message}>
              <input  ref       = {inputRef}
                      type      = "number"
                      name      = {'pills'}
                      className = {valid ? 'valid' : 'invalid'}
                      value     = {pills}
                      required  = {true}
                      onChange  = {(ev) => handlePillsChange(ev.target.value)}>
              </input>                
            </DemoInputGroup>          
          }
      />
    
      <VInput
          type                 = "number"
          inputFilter          = {fltFloat}
          prematureValidation  = {premature}
          formActions          = {formActions}
          render  ={({valid, message}, inputRef) => 
            <DemoInputGroup 
              label       = {"Hmm... sounds like too much pills. How much do you weight?"}
              description = {"Some float (through inputFilter)."}
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


      {/*  */}


    </>
  )
}

export default DemoInputNumber
