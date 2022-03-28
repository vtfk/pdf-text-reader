const { expect } = require('@jest/globals')
const pdfReader = require('../lib/exportContent')
const pdfPath = './data/examplePdf.pdf'

test('Check that output is object with correct properties', async () => {
  const testObject = await pdfReader(pdfPath)
  expect(typeof testObject).toBe('object')
  expect(typeof testObject.metadata).toBe('object')
  expect(Array.isArray(testObject.textContent)).toBe(true)
  expect(typeof testObject.styles).toBe('object')
  expect('lines' in testObject).toBe(false)
})

test('Check that option inferlines returns line property correct', async () => {
  const testObject = await pdfReader(pdfPath, { inferLines: { normalizeY: true } })
  expect('lines' in testObject).toBe(true)
})
