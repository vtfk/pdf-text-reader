const inferLines = require('./inferLines')

const getPdfDocument = async (pdf) => {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.min.mjs')
  return await getDocument(pdf)
}

// Need the legacy build to work with Node - newer versions require Canvas to work, we don't want it

module.exports = async (pdfPath, options) => {
  const pdfData = {
    metadata: '',
    textContent: [],
    styles: {}
  }
  const loadingTask = await getPdfDocument(pdfPath)
  const doc = await loadingTask.promise
  pdfData.metadata = await doc.getMetadata()
  const numPages = doc.numPages
  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i)
    const txtContent = await page.getTextContent()
    pdfData.textContent = pdfData.textContent.concat(txtContent.items.map(itm => ({ ...itm, page: i })))
    for (const [key, value] of Object.entries(txtContent.styles)) {
      pdfData.styles[key] = value
    }
  }

  if (options && options.inferLines) {
    pdfData.lines = inferLines(pdfData, options.inferLines.normalizeY)
  }

  return pdfData
}
