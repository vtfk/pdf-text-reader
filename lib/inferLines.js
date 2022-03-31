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
    const y = normalizeY ? `${Math.round(text.transform[5] / maxY * normalizeY)}-p${text.page}` : `${text.transform[5]}-p${text.page}`
    if (!/\S/.test(text.str)) continue // Do not include only whitespace strings
    if (!((y) in lines)) lines[y] = []
    if (text.str.trim().length > 1) lines[y].push(text.str.replace(/\s\s+/g, ' ').trim()) // Replace multiple whitespace with single, and add to list
  }
  for (const y of Object.keys(lines)) {
    lines[y] = lines[y].join(' ')
  }
  return lines
}
