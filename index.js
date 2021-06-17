const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js') // Need the legacy build to work with Node - do not know why...

// Takes in a path to a pdf-file, returns object with pdf-metadata, text content, and style-info
module.exports = async (pdfPath) => {
  const pdfData = {
    metadata: '',
    textContent: [],
    styles: {}
  }
  const loadingTask = await pdfjsLib.getDocument(pdfPath)
  const doc = await loadingTask.promise
  pdfData.metadata = await doc.getMetadata()
  const numPages = doc.numPages
  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i)
    const txtContent = await page.getTextContent()
    pdfData.textContent = pdfData.textContent.concat(txtContent.items)
    for (const [key, value] of Object.entries(txtContent.styles)) {
      pdfData.styles[key] = value
    }
  }
  return pdfData
}
