import React from 'react';
import {VInput} from '../../src'
import useValue from './useValue'
import DemoInputGroup from './DemoInputGroup'

const LIST_OPTIONS= {
  '1': "It's fascinating",
  '2': "It's cool",
  '3': "Well... beh!",
  '4': "Take it away from me",
  '': '---',
}

const DemoInputSelect = ({formActions, controlled}) => {

  const valueProps= useValue("1", controlled)

  return (
      <VInput
          type                 = "select"
          disallowedValues     = {['3', '4']}
          formActions          = {formActions}
          render = {({valid, message}, inputRef) => 
            <DemoInputGroup 
              label   = {"What do you think about Valium?"}
              message = {message}>

              <select ref          = {inputRef}
                      name         = "theList"
                      className    = {valid ? 'valid' : 'invalid'}
                      required     = {true}
                      {...valueProps}>
                {Object.keys(LIST_OPTIONS).map((o) => 
                  <option key={`single-select-option-${o}`}
                          value={o}>
                    {LIST_OPTIONS[o]}
                  </option>
                )}
              </select>
            </DemoInputGroup>
          }
      />            
  )
}

export default DemoInputSelect
