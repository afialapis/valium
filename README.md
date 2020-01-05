# valium

![Valium logo](https://valium.afialapis.com/assets/images/logo/valium_name.png)

[![NPM Version](https://badge.fury.io/js/valium.svg)](https://www.npmjs.com/package/valium)
[![Dependency Status](https://david-dm.org/afialapis/valium.svg)](https://david-dm.org/afialapis/valium)
[![NPM Downloads](https://img.shields.io/npm/dm/valium.svg?style=flat)](https://www.npmjs.com/package/valium)


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

_HTML5 Constraint Validation API_ checks for validity changes when the input changes. Depending on the browser, it means: when the input loses the focus.

Valium is here to make your Forms much nicer: with `prematureValidation`, the ValidityState is updated while typing!

## Install

```
  npm i valium
```

## Getting started 

Valium provides just two elements: `VForm` and `VInput`.

`VForm` will be the parent element. It just renders a `form` element, and provide a couple of render props (`renderInputs` and `renderButtons`) so you can render the rest.

Then, any input inside the Form that you want to be validated, must be wrapped within a `VInput` element.

### Basic example

Let's check a basic example ([try it at CodePen](https://codepen.io/afialapis/pen/KKwgNWK)):


```javascript
import React, {useState} from 'react';
import {VForm, VInput} from 'valium'

const MyValidatedForm = () => {

  const [myText, setMyText]= React.useState('')
  
  return (
      <VForm 
        renderButtons= {(valid, elements) => null}

         renderInputs= {(formActions) => 
           <VInput
              type                 = "text"
              /* formActions must be passed to every VInput */
              formActions          = {formActions}
              /* Valium provides some custom constraints */
              disallowedValues     = {["NO"]}
              /* prematureValidation will not wait input to lose focus */
              prematureValidation  = {true}
              render = {({valid, message}, inputRef) => 
                <div>
                  <input ref       = {inputRef}
                         name      = 'myText'
                         className = {valid ? 'valid' : 'invalid'}
                         value     = {myText}
                         onChange  = {(event) => setMyText(event.target.value)}
                         /* HTML Validation constraints are managed directly on HTML input elements*/
                         required  = {true}
                         minLength = {2}
                         maxLength = {50}
                  />
                  <div className="valium-example-input-feedback">
                    {message}
                  </div>
                </div>
              }
            /> 
          }
      />
  )
} 

```

## Docs

For complete docs, check [valium.afialapis.com](https://valium.afialapis.com)

