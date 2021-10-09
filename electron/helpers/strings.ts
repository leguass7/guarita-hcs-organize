export const defaultForbidenChars = "'@#$%¨&*()_+{}?^:><|¹²³£¢¬§ªº°;.,~´`=-"

export function replaceAll(str: string, needle: string | string[], replacement = '') {
  if (!str) return ''
  if (Array.isArray(needle)) {
    let rtn = `${str}`
    for (let i = 0; i < needle.length; i++) {
      rtn = replaceAll(rtn, needle[i], replacement)
    }
    return rtn
  }
  return str.split(needle).join(replacement)
}

export function removeAll(str?: string, chars = defaultForbidenChars, replacement = '') {
  if (!str) return ''
  if (Array.isArray(str)) return str.map(r => removeAll(r, chars, replacement))
  const c = Array.isArray(chars) ? chars : chars.split('')
  let result = str
  for (let i = 0; i < c.length; i++) result = replaceAll(result, c[i], replacement)
  return result
}

export function timeStamp(radix = 16): string {
  return (+new Date()).toString(radix)
}
