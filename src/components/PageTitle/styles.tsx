import styled from 'styled-components'

import { alpha, darken } from '../../helpers/colors'
import { MarginProps } from '../styled'

export const BackContainer = styled.div<{ bgColor: string; textColor?: string }>`
  margin-right: ${({ theme }) => theme.spacing.m}px;
  border: 0;
  button {
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    padding: 0;
    margin: 0;
    color: ${({ textColor = 'currentColor' }) => textColor};
    width: 22px;
    height: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    &:hover {
      background-color: ${({ bgColor }) => darken(bgColor)};
    }
  }
`

export const PageTitleContainer = styled.div<MarginProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => alpha(theme.colors.white, 0.5)};
  padding-bottom: ${({ theme }) => theme.spacing.s}px;

  width: 100%;
  max-width: 100%;
  /* border: 1px dashed #000; */

  margin: 0 auto;
  padding-left: ${({ theme, leftMargin = 0, horizontalSpaced }) => (horizontalSpaced ? theme.spacing.l : leftMargin)}px;
  padding-right: ${({ theme, rightMargin = 0, horizontalSpaced }) =>
    horizontalSpaced ? theme.spacing.l : rightMargin}px;
  padding-top: ${({ theme, topMargin = 0, verticalSpaced }) => (verticalSpaced ? theme.spacing.l : topMargin)}px;
  margin-bottom: ${({ theme, bottomMargin = 0, verticalSpaced }) =>
    verticalSpaced ? theme.spacing.l : bottomMargin}px;
`

export const Title = styled.div<{ color: string }>`
  flex: 1;
  h2 {
    color: ${({ theme }) => theme.colors.white};
    font-weight: normal;
    font-size: 18px;
  }

  span {
    color: ${({ color }) => color};
  }
`
export const Tools = styled.div``
