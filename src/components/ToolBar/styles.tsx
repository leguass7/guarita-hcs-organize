import styled, { css } from 'styled-components'

import type { FlexJustify } from '../styled'

export const Button = styled.button<{ size?: number; color?: string; disabled?: boolean }>`
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
  display: block;
  width: ${({ size = 24 }) => size}px;
  height: ${({ size = 24 }) => size}px;
  color: ${({ color, theme, disabled }) => (disabled ? theme.colors.textDark : color || theme.colors.white)};
  &:hover {
    color: ${({ color, theme, disabled }) => (disabled ? theme.colors.textDark : color || theme.colors.secondary)};
  }
`

export const Tools = styled.div<{ justify: FlexJustify; size: number }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  justify-content: ${({ justify }) => justify};
  border: 0;
  ${Button} {
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    ${({ justify, theme }) => {
      if (justify === 'flex-end') {
        return css`
          margin-left: ${theme.spacing.m}px;
        `
      }
      if (justify === 'flex-start') {
        return css`
          margin-right: ${theme.spacing.m}px;
        `
      }
    }}
  }
`
