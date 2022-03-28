# pdf-text-reader
Exctracts metadata, text, and styling from a pdf-file

## Installation
```bash
npm i @vtfk/pdf-text-reader
```
## Usage
```js
(async () => {
  const pdfReader = require('./index')
  
  const pdfPath = './data/examplePdf.pdf'
  try {
    const pdfData = await pdfReader(pdfPath)
    console.log(pdfData)
  } catch (error) {
    console.log(error)
  }
})()
```

returns:
```js
{
    metadata: {'some metadata about pdf'},
    textContent: [
        {
            str: 'Hello',
            dir: 'ltr',
            width: 6.87792,
            height: 11.04,
            transform: [
                8.87003171296,
                0,
                0,
                9.00064,
                87.8488,
                401.468
            ],
            fontName: 'g_d1_f1',
            page: 1
        },
        ...
    }
}
```
## Options
### InferLines

normalizeY is set to 300 by default

```js
(async () => {
  const pdfReader = require('./index')
  
  const pdfPath = './data/examplePdf.pdf'
  try {
    const options = {
        inferLines: {
            normalizeY: true // can be true, a number, false, or undefined
        }
    }
    const pdfData = await pdfReader(pdfPath, options)
    console.log(pdfData)
  } catch (error) {
    console.log(error)
  }
})()
```
returns:
```js
{
    metadata: {'some metadata about pdf'},
    textContent: [
        {
            str: 'Hello',
            dir: 'ltr',
            width: 6.87792,
            height: 11.04,
            transform: [
                8.87003171296,
                0,
                0,
                9.00064,
                87.8488,
                401.468
            ],
            fontName: 'g_d1_f1',
            page: 1
        },
        ...
    },
    lines: {
        '300': 'Hello , this is the first l ine'
    }
}
```
