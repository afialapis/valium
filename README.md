# valium

A Form validator for React, using and customizing [HTML5 Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation).

## Demo

Check a live demo at [valium.afialapis.com](https://valium.afialapis.com)

## HTML5 Constraint Validation API?

Yes: instead of providing lots of verbose-methods-you-must-learn to validate your inputs, Valium will just:
  - let you render your input elements _completely as you need_
  - check [validation constraints](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) in those inputs (`required`, `minLength`, `maxLength`, `pattern`, ...)
  - provide you the validation status so you can render them in consequence

Even more: Valium extends these constraints:
  - it accepts some custom constraints (`allowedValues` or `disallowedValues` lists, `doRepeat` or `doNotRepeat` other form's fields, or even a custom `checkValue` callback)
  - checks these custom constraints and updates accordingly the element's [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)

## Premature Validation?

Constraint Validation API checks for validation changes when the input changes. Depending on the browser, it may mean: when the input loses the focus.

Valium is here to make your Forms much nicer: with `prematureValidation`, the ValidityState is updated while typing!

## Install

```
  npm i valium
```

## Intro and example

Valium provides just two elements: `VForm` and `VInput`.

`VForm` will be the parent element. It just renders a <form> element, and provide a couple of render props (`renderInputs` and `renderButtons`) so you can render the rest.

Then, any input inside the Form that you want to be validated, must be wrapped within a `VInput` element.

Let's check a basic example [check it at CodePen](https://codepen.io/afialapis/pen/KKwgNWK):


```
import React, {useState} from 'react';
import {VForm, VInput} from 'valium'


const MyValidatedForm = () => {

  const [myText, setMyText]= useState('')

  const onSubmit = (elements) => {
    //
    // elements
    //
  }

  return (
     
    <VForm renderButtons= {(valid, elements) => 
             <button disabled={! valid}
                     onClick={(ev) => onSubmit(elements)}>
               Save
             </button>
            }

           renderInputs= {(formActions) => 
                <VInput
                    type                 = "text"
                    formActions          = {formActions}
                    {/* Validation constraints are passed as common HTML attributes*/}
                    disallowedValues     = {["Don't say no"]}
                    render = {({valid, message}, inputRef) => 

                                  <input ref       = {inputRef}
                                         name      = 'myText'
                                         className = {valid ? 'is-valid' : 'is-invalid'}
                                         value     = {myText}
                                         onChange  = {(event) => setMyText(event.target.value)}
                                         {/* Validation constraints are passed as common HTML attributes*/}
                                         required  = {true}
                                         minLength = {10}
                                         maxLength = {50}
                                         
                                  />

                              }
                /> 
           }
    />
  )
} 

```


## Docs

For complete docs, check [valium.afialapis.com](https://valium.afialapis.com)

