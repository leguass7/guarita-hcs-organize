export function round(number: number, precision = 4): number {
  if (!number || (number && number === 0)) return 0
  const factor = Math.pow(10, precision)
  const tempNumber = number * factor
  const roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

export const wait = (timeout: number): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

/**
 * Sorts array of objects
 * credits: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
 * @function compareValues
 * @example
 * myArray.sort(compareValues('name', 'desc'));
 */
export function compareValues(key: string, order = 'asc') {
  return function innerSort(a: any, b: any) {
    if (!(key in a) || !(key in b)) return 0
    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}
