
export function dataFormateToDot(date) {
  return date.split('-').join('.')
}

export function dataFormateToDash(date) {
  const [dd, mm, yyyy] = date.split('.')
  return `${yyyy}-${mm}-${dd}`
}
