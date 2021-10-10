import styled, { css } from 'styled-components'

import { alpha } from '../helpers/colors'
import { VariantColorsTypes } from './AppTheme/types'

export type FlexJustify = 'space-between' | 'flex-start' | 'flex-end' | 'space-around' | 'center' | 'space-evenly'
export type FlexAlign = 'center' | 'stretch' | 'baseline' | 'flex-start' | 'flex-end'

export type MarginProps = {
  topMargin?: number
  bottomMargin?: number
  leftMargin?: number
  rightMargin?: number
  verticalSpaced?: boolean
  horizontalSpaced?: boolean
}

export type ColorsProps = {
  color?: string
  themeColor?: VariantColorsTypes
}

export type SimpleTextProps = MarginProps & {
  bold?: boolean
  themeColor?: VariantColorsTypes
  size?: number
  color?: string
  align?: 'center' | 'left' | 'right' | 'justify'
}

export const SimpleText = styled.p<SimpleTextProps>`
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ themeColor = 'text', theme, color }) => color || theme.colors[themeColor]};
  font-size: ${({ size = 16 }) => size}px;
  margin-left: ${({ theme, leftMargin = 0, horizontalSpaced }) => (horizontalSpaced ? theme.spacing.l : leftMargin)}px;
  margin-right: ${({ theme, rightMargin = 0, horizontalSpaced }) =>
    horizontalSpaced ? theme.spacing.l : rightMargin}px;
  margin-top: ${({ theme, topMargin = 0, verticalSpaced }) => (verticalSpaced ? theme.spacing.l : topMargin)}px;
  margin-bottom: ${({ theme, bottomMargin = 0, verticalSpaced }) =>
    verticalSpaced ? theme.spacing.l : bottomMargin}px;
  text-align: ${({ align = 'left' }) => align};
`

export const ActionButton = styled.button<MarginProps & ColorsProps & { disabled?: boolean }>`
  max-width: 100%;
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 14px;
  outline: none;
  border: 0;
  cursor: pointer;

  padding: ${({ theme }) => `${theme.spacing.l}px ${theme.spacing.xl}px`};

  border-radius: ${({ theme }) => theme.rounded}px;
  background-color: ${({ themeColor = 'secondary', theme }) => theme.colors[themeColor]};
  color: ${({ color, theme }) => color || theme.colors.text};

  margin-left: ${({ theme, leftMargin = 0, horizontalSpaced }) => (horizontalSpaced ? theme.spacing.l : leftMargin)}px;
  margin-right: ${({ theme, rightMargin = 0, horizontalSpaced }) =>
    horizontalSpaced ? theme.spacing.l : rightMargin}px;
  margin-top: ${({ theme, topMargin = 0, verticalSpaced }) => (verticalSpaced ? theme.spacing.l : topMargin)}px;
  margin-bottom: ${({ theme, bottomMargin = 0, verticalSpaced }) =>
    verticalSpaced ? theme.spacing.l : bottomMargin}px;
  &:hover {
    background-color: ${({ themeColor = 'secondary', theme }) => alpha(theme.colors[themeColor], 0.8)};
  }
  ${({ disabled }) =>
    disabled
      ? css`
          filter: grayscale(100%);
          cursor: default;
        `
      : css``}
`
