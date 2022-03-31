const { expect } = require('@jest/globals')
const inferLines = require('../lib/inferLines')

const pdfContent = {
  textContent: [
    {
      str: 'outputname',
      dir: 'ltr',
      width: 44.35015856480001,
      height: 9.00064,
      transform: [
        8.87003171296,
        0,
        0,
        9.00064,
        87.8488,
        401.468
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 1
    },
    {
      str: ' ',
      dir: 'ltr',
      width: 23.578942974866823,
      height: 0,
      transform: [
        8.87003171296,
        0,
        0,
        9.00064,
        132.19895856479994,
        401.468
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 1
    },
    {
      str: '=',
      dir: 'ltr',
      width: 1.9801993041600001,
      height: 9.00064,
      transform: [
        3.9603986083200002,
        0,
        0,
        9.00064,
        142.574,
        401.468
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 1
    },
    {
      str: ' ',
      dir: 'ltr',
      width: 8.02496477868144,
      height: 0,
      transform: [
        3.9603986083200002,
        0,
        0,
        9.00064,
        144.55419930416002,
        401.468
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 1
    },
    {
      str: 'str(sys.argv[2])',
      dir: 'ltr',
      width: 72.68556838400002,
      height: 9.00064,
      transform: [
        9.085696048,
        0,
        0,
        9.00064,
        152.655,
        401.468
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 1
    },
    {
      str: '',
      dir: 'ltr',
      width: 0,
      height: 0,
      transform: [
        7.56076266596,
        0,
        0,
        8.00057,
        88.209,
        371.586
      ],
      fontName: 'g_d0_f1',
      hasEOL: true,
      page: 1
    },
    {
      str: 'ipdf',
      dir: 'ltr',
      width: 15.12152533192,
      height: 8.00057,
      transform: [
        7.56076266596,
        0,
        0,
        8.00057,
        88.209,
        371.586
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 2
    },
    {
      str: ' ',
      dir: 'ltr',
      width: 19.273102164742472,
      height: 0,
      transform: [
        7.56076266596,
        0,
        0,
        8.00057,
        103.33052533192,
        371.586
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 1
    },
    {
      str: '=',
      dir: 'ltr',
      width: 1.9802010792749998,
      height: 8.00057,
      transform: [
        3.9604021585499996,
        0,
        0,
        8.00057,
        112.871,
        371.586
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 1
    },
    {
      str: ' ',
      dir: 'ltr',
      width: 6.742827037307402,
      height: 0,
      transform: [
        3.9604021585499996,
        0,
        0,
        8.00057,
        114.851201079275,
        371.586
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 1
    },
    {
      str: 'PdfFileReader(open(filename,',
      dir: 'ltr',
      width: 131.57577410600007,
      height: 8.00057,
      transform: [
        9.398269579,
        0,
        0,
        8.00057,
        122.772,
        371.586
      ],
      fontName: 'g_d0_f1',
      hasEOL: false,
      page: 1
    }
  ]
}

const optionsNotDefined = {
  inferLines: {
  }
}
const optionsSetToTrue = {
  inferLines: {
    normalizeY: true
  }
}
const optionsSetToFalse = {
  inferLines: {
    normalizeY: false
  }
}
const optionsSetManually = {
  inferLines: {
    normalizeY: 800
  }
}

test('Check that inferLines gather lines correct when normalizeY is not defined', () => {
  const lines = inferLines(pdfContent, optionsNotDefined.inferLines.normalizeY)
  expect('300-p1' in lines).toBe(true)
})

test('Check that inferLines gather lines correct when normalizeY is set to true', () => {
  const lines = inferLines(pdfContent, optionsSetToTrue.inferLines.normalizeY)
  expect('300-p1' in lines).toBe(true)
})

test('Check that inferLines gather lines correct when normalizeY is set to false', () => {
  const lines = inferLines(pdfContent, optionsSetToFalse.inferLines.normalizeY)
  expect('371.586-p1' in lines).toBe(true)
})

test('Check that inferLines gather lines correct when normalizeY is set to false, also on page 2', () => {
  const lines = inferLines(pdfContent, optionsSetToFalse.inferLines.normalizeY)
  expect('371.586-p2' in lines).toBe(true)
})

test('Check that inferLines gather lines correct when normalizeY is set manually', () => {
  const lines = inferLines(pdfContent, optionsSetManually.inferLines.normalizeY)
  expect(`${optionsSetManually.inferLines.normalizeY}-p1` in lines).toBe(true)
})
