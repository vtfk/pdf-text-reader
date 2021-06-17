const pdfReader = require('./index');

(async () => {
  const pdfPath = './examplePdf.pdf'
  try {
    const pdfData = await pdfReader(pdfPath)

    // console.log(pdfData.metadata);

    // console.log(pdfData.textContent);

    // console.log(pdfData.styles)

    console.log(pdfData)
  } catch (error) {
    console.log(error)
  }
})()
