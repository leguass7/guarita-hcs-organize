import styled, { keyframes } from 'styled-components'

import { alpha } from '../../helpers/colors'

export const Sup = styled.sup`
  position: relative;
  width: ${({ theme }) => theme.spacing.xl}px;
  height: ${({ theme }) => theme.spacing.xl}px;
  display: inline-block;
  background-color: ${({ theme }) => alpha(theme.colors.white, 0.7)};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  span {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    margin: 50% 50%;
    transform: translate(-50%, -50%);
    font-size: ${({ theme }) => theme.spacing.l}px;
  }
`

const highlight = keyframes`
  from{
    background-color: #FFFFFFE1;
    
  }
  to{
    background-color: #FFFFFF01;
  }
  
`

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  flex-flow: row nowrap;
  padding-top: ${({ theme }) => theme.spacing.m}px;

  .processed {
    transition: all ease-in-out 0.5s;
    animation: ${highlight} 0.5s linear;
  }
`

export const ItemReportContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
  border-radius: ${({ theme }) => theme.spacing.s}px;
  padding-left: ${({ theme }) => theme.spacing.m}px;
`
export const ItemReportName = styled.p<{ color?: string }>`
  display: block;
  font-size: 14px;
  color: ${({ theme, color }) => color || theme.colors.textDark};
`

export const Path = styled.p`
  position: fixed;
  right: 0;
  top: 0;
  padding: 3px 3px 3px 0;
`
