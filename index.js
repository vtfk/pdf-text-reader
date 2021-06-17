const pdfReader = require('./lib/exportContent')

// Takes in a path to a pdf-file, returns object with pdf-metadata, text content, and style-info
module.exports = async (pdfPath) => {
  return await pdfReader(pdfPath)
}