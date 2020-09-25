import React, {useState, useEffect} from 'react'
import {useValiumForm} from '../../src'
import DemoInputCheckbox from './inputs/DemoInputCheckbox'
import DemoInputColor from './inputs/DemoInputColor'
import DemoInputDate from './inputs/DemoInputDate'
import DemoInputFile from './inputs/DemoInputFile'
import DemoInputNumber from './inputs/DemoInputNumber'
import DemoInputSelect from './inputs/DemoInputSelect'
import DemoInputSelectMultiple from './inputs/DemoInputSelectMultiple'
import DemoInputTextArea from './inputs/DemoInputTextArea'
import DemoInputText from './inputs/DemoInputText'

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
  const [formRef, valid, readElements] = useValiumForm()
  const [premature, setPremature]= useState(true)
  const [showInputType, setShowInputType]= useState('text')

  const [log, setLog]= useState([{msg: "Hi! I'm your Valium dispenser!"}])

  useEffect(() => {
    window.onhashchange = function() { 
      const current= window.location.hash.replace('#', '')
      const avail= INPUT_TYPES.map((i) => i.type)
      if (avail.indexOf(current)>=0) {
        setShowInputType(current)
      }
    }
  })

  const addLog = (msg, style) => {
    const nLog= [...log]
    nLog.push({msg, style: style || {}})
    setLog(nLog)
  }

  const handleSubmit = (valid, felements) => {
    const nLog= [...log]
    nLog.push({msg: 'Validating inputs:'})

    const elements= felements()
    Object.keys(elements)
      .map((name) => {
        const el= elements[name]
        nLog.push({msg: name, style:  {marginTop: '1em', fontWeight: 'bold'}})
        nLog.push({msg: el.value, style: {fontStyle: 'italic'}})
        nLog.push({msg: `is ${el.valid ? 'valid!' : `invalid (${el.message})`}`, 
                   style: {color: el.valid ? 'green' : 'red'}})
      })

    setLog(nLog)
  }

  return (  
    <div className="container">
      <header>
        <div>
          <h1>
            <img className="logo" src="img/valium.png"></img>
            demo
          </h1>
        </div>        
      </header>
      <nav>
        <h2>Input Types</h2>
        <ul>
          {INPUT_TYPES.map((inputType) => 
            <li key={`menu-${inputType.type}`}
                className={inputType.type==showInputType ? 'active' : ''}>
              <a href={`#${inputType.type}`}
                 onClick={() => setShowInputType(inputType.type)}>
                {inputType.type}
              </a>
            </li>          
          )}
        </ul>
      </nav>
      <main>

        <div className="valium-example">

          <form ref = {formRef}>

              
            {INPUT_TYPES.map((inputType) => 
                <section key={`section_${inputType.type}`}
                      id={inputType.type}>
                  <h3>{inputType.type}</h3>
                    <inputType.comp premature={premature}
                                    onLog={addLog}/>
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
        </div>

      </main>
      <aside>
        <h2>Options</h2>
        <div className="mgbottom">
          <label>
            <input type   = "checkbox"
                  name    = "premature"
                  checked = {premature}
                  onChange= {(ev) => setPremature(ev.target.checked)}/>
            {"Premature Validation"}
          </label>     
        </div>

        <h2>Log</h2>

        <div className="log">
          {log.map((s, i) => 
            <div key={`log_line_${i}`}
                 className="log_line" style={{...s.style || {}}}>{s.msg}</div>
          )}
        </div>
      </aside>
      <footer>
        Footer
      </footer>
    </div>
  )
}

export default Demo