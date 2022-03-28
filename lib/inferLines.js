// Gather lines of text based on Y-coordinates - normalizes the Y-coordinates before gathering

module.exports = (pdfContent, normalizeY = 300) => {
  if (normalizeY && typeof normalizeY === 'boolean') normalizeY = 300
  const lines = {}
  let maxY = 0
  for (const text of pdfContent.textContent) {
    if (!normalizeY) break
    const y = text.transform[5]
    if (y > maxY) maxY = y
  }
  for (const text of pdfContent.textContent) {
    const y = normalizeY ? `${Math.round(text.transform[5] / maxY * normalizeY)}` : `${text.transform[5]}`
    if (!((y) in lines)) lines[y] = []
    if (text.str.trim().length > 1) lines[y].push(text.str)
  }
  for (const y of Object.keys(lines)) {
    lines[y] = lines[y].join(' ')
  }
  return lines
}
