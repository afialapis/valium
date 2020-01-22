import React, { useState } from 'react';
import {VForm, VInput} from '../../src'

const LIST_OPTIONS= {
  '': '---',
  '1': "It's fascinating",
  '2': "It's cool",
  '3': "Well... beh!",
  '4': "Take it away from me"
}

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

const pad = (n) => 
  n.toString().padStart(2, '0')

const getToday = (add= 0) => {
  const n= new Date()
  return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate() + add)}`
}



const VFormCustom = () => {
  const [optPremature , setOptPremature] = useState(true)

  const [controlledText , setControlledText ] = useState("NO")
  const [uncontrolledText , _setUncontrolledText  ] = useState("I'm too long")
  const [longText , setLongText  ] = useState("Why are you staring at me, little Monster?")
  const [aNumber, _setANumber  ] = useState(2.123456)
  const [aCheck , _setACheck] = useState(false)
  const [aColor , _setAColor] = useState('#FF00FF')
  const [aDate  , _setaDate ] = useState(getToday(1))
  const [aList  , setAList ] = useState('1')
  const [aListm , setAListm ] = useState(['1','4'])
  
  const onCancel = (valid, elements) => {
    console.log('Cancelling...')
    console.log(valid)
    console.log(elements)
  }
  

  const onSubmit = (valid, elements) => {
    console.log('Submitting...')
    console.log(valid)
    console.log(elements)
  }

  const renderButtons = (valid, elements) => {
    return (
      <div className="valium-example-buttons">
        <button onClick={(_ev) => onCancel(valid, elements)}>Cancel</button>
        <button onClick={(_ev) => onSubmit(valid, elements)}>Save</button>
      </div>      
    )
  }
  

  return (
    <div className="valium-example">
      <div className="centered">
        <h1>
          Valium Demo
        </h1>
      </div>
      <div className="centered mgbottom">
        <label>
          <input type   = "checkbox"
                name    = "optPremature"
                checked = {optPremature}
                onChange= {(ev) => setOptPremature(ev.target.checked)}/>
          {"Enable Premature Validation"}
        </label>
      </div>
      
        <VForm renderButtons= {renderButtons}
          renderInputs= {(formActions) => 
            <div className="row">
              <div className="column">
                <VInput
                    type                 = "text"
                    disallowedValues     = {["NO", "No", "no"]}
                    prematureValidation  = {optPremature}
                    formActions          = {formActions}
                    render = {({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    Is your Valium dose Controlled?
                                  </label>
                                  <input ref      = {inputRef}
                                        name      = 'controlledText'
                                        value     = {controlledText}
                                        className = {valid ? 'valid' : 'invalid'}
                                        required  = {true}
                                        minLength = {10}
                                        maxLength = {50}
                                        onChange  = {(event) => setControlledText(event.target.value)}>
                                  </input>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />            
                <VInput
                    type                 = "text"
                    prematureValidation  = {optPremature}
                    doNotRepeat          = "controlledText"
                    formActions          = {formActions}
                    render =  {({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    Or did you leave it Uncontrolled?
                                  </label>
                                  <input ref         = {inputRef}
                                        name         = 'uncontrolledText'
                                        defaultValue = {uncontrolledText}
                                        className    = {valid ? 'valid' : 'invalid'}
                                        required     = {false}
                                        maxLength    = {5}>
                                  </input>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />

                <VInput
                    type                 = "number"
                    disallowedValues     = {[0, 3]}
                    stepRange            = {0.00000000001} // This disables the input's step
                    prematureValidation  = {optPremature}
                    formActions          = {formActions}
                    render  ={({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    How many pills per dose?
                                  </label>
                                  <input ref          = {inputRef}
                                        type         = "number"
                                        name         = "aNumber"
                                        //step         = "any"
                                        value = {aNumber}
                                        onChange = {(ev) => _setANumber(ev.target.value)}
                                        className    = {valid ? 'valid' : 'invalid'}>
                                  </input>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />
                <VInput
                    type                 = "checkbox"
                    disallowedValues     = {[true]}
                    formActions          = {formActions}
                    render  ={({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    Did you notice side effects?
                                  </label>
                                  <input ref          = {inputRef}
                                        type         = "checkbox"
                                        name         = "aCheck"
                                        defaultValue = {aCheck}
                                        className    = {valid ? 'valid' : 'invalid'}>
                                  </input>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />
                <VInput
                    type                 = "color"
                    disallowedValues     = {['#000000', '#FFFFFF', '#ffffff']}
                    feedback             = "Neither black nor white"
                    prematureValidation  = {optPremature}
                    formActions          = {formActions}
                    render = {({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    What color has your world now?
                                  </label>
                                  <input ref         = {inputRef}
                                        type        = "color"
                                        name        = "aColor"
                                        defaultValue= {aColor}
                                        className   = {valid ? 'valid' : 'invalid'}>
                                  </input>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />
                <VInput
                    type                 = "date"
                    allowedValues        = {[getToday()]}
                    feedback             = "Don't Leave for Tomorrow What You Can Do Today"
                    formActions          = {formActions}
                    render = {({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    When will you take your next Valium?
                                  </label>
                                  <input ref         = {inputRef}
                                        type         = "date"
                                        name         = "aDate"
                                        defaultValue = {aDate}
                                        className    = {valid ? 'valid' : 'invalid'}
                                        >
                                  </input>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />                
              </div>
              <div className="column">
                <VInput
                    type                 = "select"
                    /*disallowedValues     = {['3', '4']}*/
                    formActions          = {formActions}
                    render = {({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    What do you think about Valium?
                                  </label>
                                  <select ref          = {inputRef}
                                          name         = "aList"
                                          value        = {aList}
                                          onChange     = {(ev) => setAList(ev.target.value)}
                                          className    = {valid ? 'valid' : 'invalid'}
                                          required     = {true}
                                          >
                                    {Object.keys(LIST_OPTIONS).map((o) => 
                                      <option key={`single-select-option-${o}`}
                                              value={o}>
                                        {LIST_OPTIONS[o]}
                                      </option>
                                    )}
                                  </select>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />    
                <VInput
                    type                 = "select-multiple"
                    formActions          = {formActions}
                    allowedValues = {[[], ['1']]}
                    render = {({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    What times you prefer to take a Valium?
                                  </label>
                                  <select ref          = {inputRef}
                                          name         = "aListm"
                                          value        = {aListm}
                                          className    = {valid ? 'valid' : 'invalid'}
                                          multiple
                                          onChange     = {(ev) => {
                                            const value= Array.prototype.slice.call(ev.target.options)
                                                .filter((opt) => opt.selected)
                                                .map((opt) => opt.value)
                                            setAListm(value)
                                          }}
                                          >
                                    {Object.keys(LISTM_OPTIONS).map((o) => 
                                      <option key={`multiple-select-option-${o}`}
                                              value={o}>
                                        {LISTM_OPTIONS[o]}
                                      </option>
                                    )}
                                  </select>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />  
                <VInput
                    type                 = "file"
                    formActions          = {formActions}
                    render = {({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    Upload a copy of your ID Card, authorities must know you
                                  </label>
                                  <input ref      = {inputRef}
                                        type     = "file"
                                        name      = 'afile'
                                        className = {valid ? 'valid' : 'invalid'}
                                        required  = {true}
                                        >
                                  </input>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />
                <VInput
                    type                 = "textarea"
                    prematureValidation  = {optPremature}
                    formActions          = {formActions}
                    render = {({valid, message}, inputRef) => 
                                <div className="valium-example-input-group">
                                  <label>
                                    Tell us more about your love story with Valium
                                  </label>
                                  <textarea ref      = {inputRef}
                                        lines     = {5}
                                        name      = 'longText'
                                        value     = {longText}
                                        className = {valid ? 'valid' : 'invalid'}
                                        onChange  = {(event) => setLongText(event.target.value)}>
                                  </textarea>
                                  <div className="valium-example-input-feedback">
                                    {message}
                                  </div>
                                </div>
                              }
                />                                                 
              </div>
            </div>
          }>
        </VForm>
    </div> 
  )
}

export default VFormCustom;
