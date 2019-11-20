import React, { useState } from 'react';
import {VForm, VInputText, VInputNumber, VInputCheckbox, VInputColor, VInputDate} from '../../src'

const VFormCustom = () => {

  const [atext, setAtext] = useState('some uncontrolled component')
  const [btext, setBtext] = useState('some controlled component')
  const [anum, setAnum] = useState('some controlled component')
  const [acheck, setAcheck] = useState('some controlled component')
  const [acolor, setAcolor] = useState('some controlled component')
  const [adate, setAdate] = useState('some controlled component')

  const onCancel = ev => {
    console.log('Cancelling...')
    console.log(ev)
  }
  

  const onSubmit = ev => {
    console.log('Submitting...')
    console.log(ev)
  }
  

  return (
    <div>
        <VForm onSave  = {onSubmit} 
               onCancel= {onCancel}
               renderButtons= {({valid, elements}) => 
                  <div className="form-buttons">
                    <button onClick={onCancel}>Cancel</button>
                    <button /*disabled = {! valid || props.disabled == false}*/
                            onClick  = {() => onSubmit({valid, elements})}>Save</button>
                  </div>                  
                }>
                <VInputText
                    disallowedValues = {["NO"]}
                    checkValidityOnKeyup= {true}
                    render  ={({valid, message}, inputRef) => 
                                <div>
                                  <label>Text</label>
                                  <input ref          = {inputRef}
                                          name         = 'atext'
                                          defaultValue = {atext}
                                          style        = {{borderColor: `${valid ? 'blue' : 'red'}`}}
                                          required     = {false}
                                          maxLength    = {5}>
                                  </input>
                                  {valid!==true
                                    ? <span style={{color: "grey"}}>{message}</span>
                                    : null}
                                </div>
                              }
                />
                <VInputText
                    disallowedValues = {["NO"]}
                    render  ={({valid, message}, inputRef) => 
                                <div>
                                  <label>Text</label>
                                  <input ref           = {inputRef}
                                          name         = 'btext'
                                          value        = {btext}
                                          style        = {{borderColor: `${valid ? 'blue' : 'red'}`}}
                                          required     = {false}
                                          onChange     = {(event) => setBtext(event.target.value)}>
                                  </input>
                                  {valid!==true
                                    ? <span style={{color: "grey"}}>{message}</span>
                                    : null}
                                </div>
                              }
                />
                <VInputNumber
                    disallowedValues = {[1,2,3.0]}
                    render  ={({valid, message}, inputRef) => 
                                <div>
                                  <label>Number</label>
                                  <input ref          = {inputRef}
                                          type         = "number"
                                          name         = "anum"
                                          /*step         = {0.1}*/
                                          defaultValue = {anum}
                                          style        = {{borderColor: `${valid ? 'blue' : 'red'}`}}>
                                  </input>
                                  {valid!==true
                                    ? <span style={{color: "grey"}}>{message}</span>
                                    : null}
                                </div>
                              }
                />
                <VInputCheckbox
                    disallowedValues = {[1]}
                    render  ={({valid, message}, inputRef) => 
                                <div>
                                  <label>Check</label>
                                  <input ref          = {inputRef}
                                          type         = "checkbox"
                                          name         = "acheck"
                                          defaultValue = {acheck}
                                          style        = {{borderColor: `${valid ? 'blue' : 'red'}`}}>
                                  </input>
                                  {valid!==true
                                    ? <span style={{color: "grey"}}>{message}</span>
                                    : null}
                                </div>
                              }
                />
                <VInputColor
                    disallowedValues = {['#000000']}
                    render  ={({valid, message}, inputRef) => 
                                <div>
                                  <label>Color</label>
                                  <input ref          = {inputRef}
                                          type         = "color"
                                          name         = "acolor"
                                          defaultValue = {acolor}
                                          style        = {{borderColor: `${valid ? 'blue' : 'red'}`}}>
                                  </input>
                                  {valid!==true
                                    ? <span style={{color: "grey"}}>{message}</span>
                                    : null}
                                </div>
                              }
                />      
                <VInputDate
                    disallowedValues = {['2019/10/02']}
                    render  ={({valid, message}, inputRef) => 
                                <div>
                                  <label>Date</label>
                                  <input ref          = {inputRef}
                                          type         = "date"
                                          name         = "adate"
                                          defaultValue = {adate}
                                          style        = {{borderColor: `${valid ? 'blue' : 'red'}`}}>
                                  </input>
                                  {valid!==true
                                    ? <span style={{color: "grey"}}>{message}</span>
                                    : null}
                                </div>
                              }
                /> 

               
        </VForm>    
    </div>
  );
}

export default VFormCustom;
