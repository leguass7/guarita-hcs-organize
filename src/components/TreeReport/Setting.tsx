import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useAppTheme } from '../AppTheme/useAppTheme'
import { useOrganize } from '../Organize/OrganizeProvider'
import { ToolBar } from '../ToolBar'
import { ToolButton } from '../ToolBar/ToolButton'

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.s}px;
  background-color: #fff;
  margin-top: ${({ theme }) => theme.spacing.s}px;
  margin-bottom: ${({ theme }) => theme.spacing.s}px;
`
const Input = styled.p<{ color?: string }>`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: ${({ theme }) => theme.spacing.m}px;
  color: ${({ color = 'inherit' }) => color};
`
type Props = {
  disabled?: boolean
}
export const Setting: React.FC<Props> = ({ disabled }) => {
  const { theme } = useAppTheme()
  const { outPath, setOutPath } = useOrganize()

  const handleSelectOutput = useCallback(async () => {
    const [path] = await window.Main.sendOpenDir()
    if (path) {
      setOutPath(path)
    }
  }, [setOutPath])

  return (
    <Container>
      <Input color={theme.colors.primary}>{outPath || 'Selecione um caminho para salvar'}</Input>
      <ToolBar>
        <ToolButton
          iconName="settings"
          color={theme.colors.primary}
          onClick={handleSelectOutput}
          disabled={!!disabled}
        />
      </ToolBar>
    </Container>
  )
}
