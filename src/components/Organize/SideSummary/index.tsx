import React, { useCallback, useState } from 'react'

import { AppContainer } from '../../AppContainer'
import { useAppTheme } from '../../AppTheme/useAppTheme'
import { ActionButton, SimpleText } from '../../styled'
import { useOrganize } from '../OrganizeProvider'

export const SideSummary: React.FC = () => {
  const { theme } = useAppTheme()
  const [inputPath, setInputPath] = useState('')
  const { findFileIndexies, loadedIndex, loading, clearLoadedIndex, outPath, setOutPath } = useOrganize()

  const handleSelectInput = useCallback(async () => {
    const [path] = await window.Main.sendOpenDir(inputPath)
    if (path) {
      setInputPath(path)
      clearLoadedIndex()
      await findFileIndexies(path)
      // setOutPath(old => (!old ? `${path}/output` : old))
    }
  }, [findFileIndexies, clearLoadedIndex, inputPath])

  const handleSelectOutPut = useCallback(async () => {
    const [path] = await window.Main.sendOpenDir(outPath)
    if (path) {
      setOutPath(path)
    }
  }, [setOutPath, outPath])

  return (
    <AppContainer horizontalSpaced>
      <SimpleText verticalSpaced color={theme.colors.textDark} size={14}>
        Selecione a pasta raiz para localizar os arquivos de índice do SDCArd <em>(INDEX.TXT).</em>
      </SimpleText>
      <ActionButton disabled={!!loading} onClick={handleSelectInput}>
        {'SELECIONE'}
      </ActionButton>
      <br />
      {inputPath ? (
        <SimpleText size={14} verticalSpaced align="left">
          <strong>Entrada:</strong> {inputPath}
        </SimpleText>
      ) : null}
      {loadedIndex.length ? (
        <div>
          <SimpleText size={14} verticalSpaced align="left">
            <strong>Relatórios:</strong> {loadedIndex.length}
          </SimpleText>
          <hr />
          <SimpleText verticalSpaced color={theme.colors.textDark} size={14}>
            Selecione a pasta de saída para organizar os arquivos.
          </SimpleText>
          <ActionButton disabled={!!loading} onClick={handleSelectOutPut}>
            {'SELECIONE'}
          </ActionButton>
          <br />
          <SimpleText size={14} verticalSpaced align="left">
            <strong>Saída:</strong> {outPath}
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
