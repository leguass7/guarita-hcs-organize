import type { SVGAttributes, SVGProps } from 'react'

export type CommonSvgTypes = SVGAttributes<SVGSVGElement>

export const svgProps: SVGProps<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  xmlSpace: 'preserve',
  version: '1.1',
  shapeRendering: 'geometricPrecision',
  textRendering: 'geometricPrecision',
  imageRendering: 'optimizeQuality',
  fillRule: 'evenodd',
  clipRule: 'evenodd'
}
