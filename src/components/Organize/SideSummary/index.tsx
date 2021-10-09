import React, { useCallback, useState, useMemo } from 'react'

import { AppContainer } from '../../AppContainer'
import { useAppTheme } from '../../AppTheme/useAppTheme'
import { ActionButton, SimpleText } from '../../styled'
import { useOrganize } from '../OrganizeProvider'

export const SideSummary: React.FC = () => {
  const { theme } = useAppTheme()
  const [inputPath, setInputPath] = useState('')
  const { findFileIndexies, loadedIndex, setOutPath } = useOrganize()

  const handleSelectInput = useCallback(async () => {
    const [path] = await window.Main.sendOpenDir()
    if (path) {
      findFileIndexies(path)
      setInputPath(path)
      setOutPath(old => (!old ? `${path}/output` : old))
    }
  }, [findFileIndexies, setOutPath])

  const countReport = useMemo(() => {
    return loadedIndex.reduce((acc, item) => {
      const count = item.length
      return acc + count
    }, 0)
  }, [loadedIndex])

  return (
    <AppContainer horizontalSpaced>
      <SimpleText verticalSpaced color={theme.colors.textDark} size={14}>
        Selecione a pasta raiz para localizar os arquivos de índice do SDCArd <em>(INDEX.TXT).</em>
      </SimpleText>
      <ActionButton onClick={handleSelectInput}>{'SELECIONE'}</ActionButton>
      <br />
      {inputPath ? (
        <SimpleText size={14} verticalSpaced align="left">
          <strong>Local:</strong> {inputPath}
        </SimpleText>
      ) : null}
      {loadedIndex.length ? (
        <div>
          <SimpleText size={14} verticalSpaced align="left">
            <strong>Indices encontrados:</strong> {loadedIndex.length}
          </SimpleText>
        </div>
      ) : null}
      {countReport ? (
        <div>
          <SimpleText size={14} verticalSpaced align="left">
            <strong>Relatórios:</strong> {countReport}
          </SimpleText>
        </div>
      ) : null}
      {inputPath && !loadedIndex.length ? (
        <SimpleText size={14} verticalSpaced align="center">
          <strong>Nenhum arquivo de índice HCS encontrado</strong>
        </SimpleText>
      ) : null}
    </AppContainer>
  )
}
