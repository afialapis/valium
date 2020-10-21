import React, {useState} from 'react'
import {useValiumForm} from '../../src'

import {Base} from '../base/Base'

import {DemoInputCheckbox} from './inputs/DemoInputCheckbox'
import {DemoInputColor} from './inputs/DemoInputColor'
import {DemoInputDate} from './inputs/DemoInputDate'
import {DemoInputFile} from './inputs/DemoInputFile'
import {DemoInputNumber} from './inputs/DemoInputNumber'
import {DemoInputSelect} from './inputs/DemoInputSelect'
import {DemoInputSelectMultiple} from './inputs/DemoInputSelectMultiple'
import {DemoInputTextArea} from './inputs/DemoInputTextArea'
import {DemoInputText} from './inputs/DemoInputText'

const INPUT_TYPES= [
  {type: 'text', comp: DemoInputText},
  {type: 'textarea', comp: DemoInputTextArea},
  {type: 'number', comp: DemoInputNumber},
  {type: 'date', comp: DemoInputDate},
  {type: 'checkbox', comp: DemoInputCheckbox},
  {type: 'select', comp: DemoInputSelect},
  {type: 'select-multiple', comp: DemoInputSelectMultiple},
  {type: 'color', comp: DemoInputColor},
  {type: 'file', comp: DemoInputFile}
]


const Demo = () => {
  const [resume, setResume]= useState([{msg: "Save form to see a resume here!"}])

  const [formRef, valid, readElements] = useValiumForm()

  const handleSubmit = (valid, felements) => {
    const nResume= []
    const elements= felements()
    Object.keys(elements)
      .map((name) => {
        const el= elements[name]
        nResume.push({msg: name, style:  {marginTop: '1em', fontWeight: 'bold'}})
        nResume.push({msg: el.value, style: {fontStyle: 'italic'}})
        nResume.push({msg: `is ${el.valid ? 'valid!' : `invalid (${el.message})`}`, 
                   style: {color: el.valid ? 'green' : 'red'}})
      })

    setResume(nResume)
  }

  const getMenuItems= () => {
    let items= []
    INPUT_TYPES.map((inputType) => {
      let item= {
        key: inputType.type,
        label: inputType.type,
      }

      items.push(item)
    })
    return items
  }

  return (  

      <Base logoSrc   = "assets/img/valium.png"
            menuTitle = "Input Types"
            menuItems = {getMenuItems()}
            options   = {[]}
            resume    = {resume}>

          <form ref = {formRef}>
             
            {INPUT_TYPES.map((inputType) => 
                <section key={`section_${inputType.type}`}
                      id={inputType.type}>
                  <h2>{inputType.type}</h2>
                    <inputType.comp/>
                </section>
              )
            }

            <section className="centered">
              <a className="btn btn-primary"
                      onClick={(_ev) => handleSubmit(valid, readElements)}>
                        {valid ? 'Submit' : 'Invalid yet'}
                      </a>
            </section>                 
          </form>
      </Base>

  )
}

export {Demo}