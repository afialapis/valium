import React, { useState } from 'react';
import {VForm, VInput} from '../../src'

const LIST_OPTIONS= {
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

  const [atext , _setAtext ] = useState("I'm too long")
  const [btext , setBtext  ] = useState("No")
  const [anum  , _setAnum  ] = useState(2)
  const [acheck, _setAcheck] = useState(false)
  const [acolor, _setAcolor] = useState('#FF00FF')
  const [adate , _setAdate ] = useState(getToday(1))
  const [alist , _setAlist ] = useState('1')
  const [alistm , setAlistm ] = useState(['1','4'])
  
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
      <h1>
        Valium Demo
      </h1>
      <div>
        <VForm renderButtons= {renderButtons}
          renderInputs= {(formUpdate) => 
            <>
              <VInput
                  type                 = "text"
                  disallowedValues     = {["NO", "No", "no"]}
                  checkValidityOnKeyUp = {true}
                  formUpdate           = {formUpdate}
                  render = {({valid, message}, inputRef) => 
                              <div className="valium-example-input-group">
                                <label>
                                  Is your Valium dose Controlled?
                                </label>
                                <input ref       = {inputRef}
                                      name      = 'btext'
                                      value     = {btext}
                                      className = {valid ? 'valid' : 'invalid'}
                                      required  = {true}
                                      onChange  = {(event) => setBtext(event.target.value)}>
                                </input>
                                <div className="valium-example-input-feedback">
                                  {message}
                                </div>
                              </div>
                            }
              />            
              <VInput
                  type                 = "text"
                  disallowedValues     = {["NO"]}
                  checkValidityOnKeyUp = {true}
                  formUpdate           = {formUpdate}
                  render =  {({valid, message}, inputRef) => 
                              <div className="valium-example-input-group">
                                <label>
                                  Or did you leave it Uncontrolled?
                                </label>
                                <input ref         = {inputRef}
                                      name         = 'atext'
                                      defaultValue = {atext}
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
                  checkValidityOnKeyUp = {true}
                  formUpdate           = {formUpdate}
                  render  ={({valid, message}, inputRef) => 
                              <div className="valium-example-input-group">
                                <label>
                                  How many pills per dose?
                                </label>
                                <input ref          = {inputRef}
                                      type         = "number"
                                      name         = "anum"
                                      /*step         = {0.1}*/
                                      defaultValue = {anum}
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
                  checkValidityOnKeyUp = {true}
                  formUpdate           = {formUpdate}
                  render  ={({valid, message}, inputRef) => 
                              <div className="valium-example-input-group">
                                <label>
                                  Did you notice side effects?
                                </label>
                                <input ref          = {inputRef}
                                      type         = "checkbox"
                                      name         = "acheck"
                                      defaultValue = {acheck}
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
                  checkValidityOnKeyUp = {true}
                  formUpdate           = {formUpdate}
                  render = {({valid, message}, inputRef) => 
                              <div className="valium-example-input-group">
                                <label>
                                  What color has your world now?
                                </label>
                                <input ref         = {inputRef}
                                      type        = "color"
                                      name        = "acolor"
                                      defaultValue= {acolor}
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
                  checkValidityOnKeyUp = {true}
                  formUpdate           = {formUpdate}
                  render = {({valid, message}, inputRef) => 
                              <div className="valium-example-input-group">
                                <label>
                                  When will you take your next Valium?
                                </label>
                                <input ref         = {inputRef}
                                      type         = "date"
                                      name         = "adate"
                                      defaultValue = {adate}
                                      className    = {valid ? 'valid' : 'invalid'}
                                      >
                                </input>
                                <div className="valium-example-input-feedback">
                                  {message}
                                </div>
                              </div>
                            }
              />
              <VInput
                  type                 = "select"
                  disallowedValues     = {['3', '4']}
                  checkValidityOnKeyUp = {true} 
                  formUpdate           = {formUpdate}
                  render = {({valid, message}, inputRef) => 
                              <div className="valium-example-input-group">
                                <label>
                                  What do you think about Valium?
                                </label>
                                <select ref          = {inputRef}
                                        name         = "alist"
                                        defaultValue = {alist}
                                        className    = {valid ? 'valid' : 'invalid'}>
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
                  checkValidityOnKeyUp = {true}
                  formUpdate           = {formUpdate}
                  render = {({valid, message}, inputRef) => 
                              <div className="valium-example-input-group">
                                <label>
                                  What times you prefer to take a Valium?
                                </label>
                                <select ref          = {inputRef}
                                        name         = "alistm"
                                        value        = {alistm}
                                        className    = {valid ? 'valid' : 'invalid'}
                                        multiple
                                        onChange     = {(ev) => {
                                          const value= Array.prototype.slice.call(ev.target.options)
                                               .filter((opt) => opt.selected)
                                               .map((opt) => opt.value)
                                          setAlistm(value)
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
                  formUpdate           = {formUpdate}
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
            </>
          }>
        </VForm>
      </div>
    </div> 
  )
}

export default VFormCustom;
