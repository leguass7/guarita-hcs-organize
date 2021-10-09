import styled from 'styled-components'

export const OreganizeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100%;

  width: 100%;
  max-width: 100%;
`

export const Side = styled.div`
  display: block;
  min-width: 300px;
  width: 300px;
  margin: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.2);
`

export const Content = styled.div<{ layoutHeight?: number }>`
  display: block;
  position: relative;
  width: calc(100% - 300px);
  max-width: 100%;
  max-height: ${({ layoutHeight }) => (layoutHeight ? `${layoutHeight}px` : 'auto')};
  overflow-y: scroll;
`
