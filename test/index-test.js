import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import co from "co"
import ES6Promise from 'es6-promise'
import UUID from "node-uuid"
import assert from 'assert'
import {VForm, VInput} from '../src/index'


ES6Promise.polyfill()

describe('Valium', function() {

  this.timeout(30000)
  let container;

  before(function(){
    container = document.createElement("div")
    container.id = "react"  
    document.body.appendChild(container)
  })
  
  after(function(){
    document.body.removeChild(container)
  }) 
  
  it("should render an empty form.", co.wrap(function *(){
    const id = UUID.v4()
    const App = () => {
      return (
        <div>
          <VForm id           = {id} 
                 renderButtons= {() => <div/>}
                 renderInputs={(_fUpd) => <div/>}>
          </VForm>
        </div>
      )
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    
    const emptyFormElement = document.getElementById(id)
    assert.notEqual(emptyFormElement.getAttribute('class').indexOf('valium-form'), -1)
    ReactDOM.unmountComponentAtNode(container)
  }))  
  
  it("should render custom form buttons.", co.wrap(function *(){
    const App = () => {
      const renderButtons= (_valid, _elements) => {
        return (
          <>
            <button id="test-btn-cancel">Cancel</button>
            <button id="test-btn-save">Save</button>
          </>
        )
      }

      return (
        <div>
          <VForm renderButtons= {(params) => renderButtons(params)}
                 renderInputs={(_fUpd) => <div/>}>
          </VForm>
        </div>
      )
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    
    const btnCancelElement = document.getElementById("test-btn-cancel")
    assert.equal(btnCancelElement.innerHTML, 'Cancel')

    const btnSaveElement = document.getElementById("test-btn-save")
    assert.equal(btnSaveElement.innerHTML, 'Save')
    
    ReactDOM.unmountComponentAtNode(container)
  }))  


})
