const { expect } = require('@jest/globals')
const pdfReader = require('../lib/exportContent')

test("Check that output is object with correct properties", async () => {
    let pdfPath = "./examplePdf.pdf"
    const testObject = await pdfReader(pdfPath)
    expect(typeof testObject).toBe("object")
    expect(typeof testObject.metadata).toBe("object")
    expect(Array.isArray(testObject.textContent)).toBe(true)
    expect(typeof testObject.styles).toBe("object")
    console.log(testObject)
})
