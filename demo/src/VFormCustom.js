import React, { useState } from 'react';
import {VForm, VInput} from '../../src'

const VFormCustom = () => {

  const [atext , _setAtext ] = useState("I'm too long")
  const [btext , setBtext  ] = useState("I'm required")
  const [anum  , _setAnum  ] = useState('some controlled component')
  const [acheck, _setAcheck] = useState('some controlled component')
  const [acolor, _setAcolor] = useState('#123456')
  const [adate , _setAdate ] = useState('2020-01-01')

  const onCancel = (valid, _elements) => {
    console.log('Cancelling...')
    console.log(valid)
  }
  

  const onSubmit = (valid, _elements) => {
    console.log('Submitting...')
    console.log(valid)
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
    <VForm renderButtons= {renderButtons}>
      <VInput
          type                 = "text"
          disallowedValues     = {["NO"]}
          checkValidityOnKeyup = {true}
          render =  {({valid, message}, inputRef) => 
                      <div className="valium-example-input-group">
                        <label>
                          Uncontrolled Text
                        </label>
                        <input ref          = {inputRef}
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
          type             = "text"
          disallowedValues = {["NO"]}
          render = {({valid, message}, inputRef) => 
                      <div className="valium-example-input-group">
                        <label>
                          Controlled Text
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
          type             = "number"
          disallowedValues = {[1, 2, 3.0]}
          render  ={({valid, message}, inputRef) => 
                      <div className="valium-example-input-group">
                        <label>
                          Number
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
          type = "checkbox"
          disallowedValues = {[1]}
          render  ={({valid, message}, inputRef) => 
                      <div className="valium-example-input-group">
                        <label>
                          CheckBox
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
          type          = "color"
          allowedValues = {['#000000', '#FFFFFF', '#ffffff']}
          feedback      = "Only black or white"
          render = {({valid, message}, inputRef) => 
                      <div className="valium-example-input-group">
                        <label>
                          Color
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
          type             = "date"
          disallowedValues = {['2019/10/02']}
          render = {({valid, message}, inputRef) => 
                      <div className="valium-example-input-group">
                        <label>
                          Date
                        </label>
                        <input ref          = {inputRef}
                               type         = "date"
                               name         = "adate"
                               defaultValue = {adate}
                               className    = {valid ? 'valid' : 'invalid'}
                               onChange     = {(ev) => console.log(ev.target.value)}
                               >
                        </input>
                        <div className="valium-example-input-feedback">
                          {message}
                        </div>
                      </div>
                    }
      />
    </VForm>    
  )
}

export default VFormCustom;
