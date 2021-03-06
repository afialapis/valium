import React, {useState} from 'react'
import {useInput} from '../../../src'
import {DemoInputGroup} from './DemoInputGroup'

const DemoInputNumber = () => {

  const [pills, setPills]= useState(2)
  const [weight, setWeight]= useState(105.876)
  const [size, setSize]= useState(1.44)

  const [pillsRef, pillsValid, pillsMessage] = useInput({
    decimals: 1,
    checkValue: (v) => v>=6,
    feedback: 'Hey folk, give yourself a bit of fun!'
  })

  const [weightRef, weightValid, weightMessage] = useInput({
    decimals: 3
  })
  
  const [sizeRef, sizeValid, sizeMessage] = useInput({})  


  const handlePillsChange = (nPills) => {
    setPills(nPills)
  }

  const handleWeightChange = (nWeight) => {
    setWeight(nWeight)
  }

  return (
    <>

      <DemoInputGroup 
        label       = {"How many pills per dose would you like?"}
        description = {"Some >=6 integer. Decimals allowed but invalid (decimals=1)."}
        message     = {pillsMessage}>
        <input  ref       = {pillsRef}
                type      = "number"
                name      = {'pills'}
                className = {pillsValid ? 'valid' : 'invalid'}
                value     = {pills}
                required  = {false}
                onChange  = {(ev) => handlePillsChange(ev.target.value)}>
        </input>                
      </DemoInputGroup>          

      <DemoInputGroup 
        label       = {"Hmm... sounds like too much pills. How much do you weight?"}
        description = {"Some float (max 3 decimals, decimals = 3)."}
        message     = {weightMessage}>
        
        <input  ref       = {weightRef}
                type      = "number"
                name      = {'weight'}
                className = {weightValid ? 'valid' : 'invalid'}
                value     = {weight}
                required  = {true}
                onChange  = {(ev) => handleWeightChange(ev.target.value)}>
        </input>                
      </DemoInputGroup>          

      <DemoInputGroup 
        label       = {"Still not sure... Your size?"}
        description = {"Some float (max 2 decimals, native step = 0.01)."}
        message     = {sizeMessage}>
        
        <input  ref       = {sizeRef}
                type      = "number"
                name      = {'size'}
                className = {sizeValid ? 'valid' : 'invalid'}
                value     = {size}
                step      = {0.01}
                required  = {true}
                onChange  = {(ev) => setSize(ev.target.value)}>
        </input>                
      </DemoInputGroup>          


    </>
  )
}

export {DemoInputNumber}
