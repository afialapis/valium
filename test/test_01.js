import React from 'react'
import ReactDOM from 'react-dom'
import co from "co"
import ES6Promise from 'es6-promise'
import assert from 'assert'
import {useForm} from '../src/index'


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
    const fid= 'valium_empty_form'
    const App = () => {
      const [formRef, valid, readElements] = useForm()

      return (
        <div>
          <form ref = {formRef}
                id  = {fid}
                className= 'valium-form'>
            <div/>
          </form>
        </div>
      )
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    
    const emptyFormElement = document.getElementById(fid)
    assert.ok(emptyFormElement.classList.contains('valium-form'))
    ReactDOM.unmountComponentAtNode(container)
  }))  
  
  it("should render custom form buttons.", co.wrap(function *(){
    const App = () => {
      const [formRef, valid, readElements] = useForm()

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
          <form ref = {formRef}>
            <button id="test-btn-cancel">Cancel</button>
            <button id="test-btn-save">Save</button>
          </form>
        </div>
      )
    }

    yield new Promise(function(resolve, _reject){
      ReactDOM.render(<App />, container, resolve)
    })
    
    const btnCancelElement = document.getElementById("test-btn-cancel")
    assert.strictEqual(btnCancelElement.innerHTML, 'Cancel')

    const btnSaveElement = document.getElementById("test-btn-save")
    assert.strictEqual(btnSaveElement.innerHTML, 'Save')
    
    ReactDOM.unmountComponentAtNode(container)
  }))  


})
