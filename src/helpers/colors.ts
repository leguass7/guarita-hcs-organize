import chroma from 'chroma-js'

export function darken(color: string, radix: number = 0.5) {
  return chroma(color).darken(radix).hex('rgb')
}

export function alpha(color: string, radix: number = 0.5) {
  return chroma(color).alpha(radix).hex('rgba')
}
