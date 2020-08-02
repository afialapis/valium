import React from 'react';
import {VForm} from '../../src'

import DemoInputText from './DemoInputText'
import DemoInputNumber from './DemoInputNumber'
import DemoInputCheckbox from './DemoInputCheckbox'
import DemoInputColor from './DemoInputColor'
import DemoInputDate from './DemoInputDate'
import DemoInputSelect from './DemoInputSelect'
import DemoInputSelectMultiple from './DemoInputSelectMultiple'
import DemoInputFile from './DemoInputFile'
import DemoInputTextArea from './DemoInputTextArea'

const DemoForm = ({premature, controlled}) => {
  const onSubmit = (valid, elements) => {
    console.log('Submitting...')
    console.log(valid)
    console.log(elements)
    //alert(JSON.stringify(elements, null, 2))
  }

  const renderButtons = (valid, elements) => {
    return (
      <div className="valium-example-buttons">
        <button onClick={(_ev) => onSubmit(valid, elements)}>Validate</button>
      </div>      
    )
  }

  return (
        <VForm 
         renderButtons= {renderButtons}

          renderInputs= {(formActions) => 
            <div className="row">
              <div className="column">
                <DemoInputText     fromActions = {formActions}
                                   premature   = {premature}
                                   controlled  = {controlled}/>
                
                <DemoInputNumber   fromActions = {formActions}
                                   premature   = {premature}
                                   controlled  = {controlled}/>
                
                <DemoInputCheckbox fromActions = {formActions}
                                   controlled  = {controlled}/>
                
                <DemoInputColor    fromActions = {formActions}
                                   controlled  = {controlled}/>


                <DemoInputDate     fromActions = {formActions}
                                   premature   = {premature}
                                   controlled  = {controlled}/>
              </div>
              <div className="column">

                <DemoInputSelect   fromActions = {formActions}
                                   controlled  = {controlled}/>              

                <DemoInputSelectMultiple
                                   fromActions = {formActions}
                                   controlled  = {controlled}/>

                <DemoInputFile     fromActions = {formActions}
                                   controlled  = {controlled}/>                                   

                <DemoInputTextArea fromActions = {formActions}
                                   premature   = {premature}
                                   controlled  = {controlled}/>            
              </div>
            </div>
          }>
        </VForm>
  )
}

export default DemoForm;
