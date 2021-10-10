import React, { useCallback, useState } from 'react'

import { IReadedIndex } from '../../../electron/helpers/files'
import { compareValues } from '../../helpers'
import { useOrganize } from '../Organize/OrganizeProvider'
import { PageTitle } from '../PageTitle'
import { ToolBar } from '../ToolBar'
import { ToolButton } from '../ToolBar/ToolButton'
import { IPreparedTree, ItemReportType, MainIndex } from './MainIndex'
import { Path } from './styles'

type Props = {}

function loadedIndexDto(list: IReadedIndex[]): IPreparedTree[] {
  const result: IPreparedTree[] = []
  list.forEach(item => {
    const found = result.find(f => f.name === item.line1)
    if (found) {
      const duplicated = found.list.find(f => !!(f.dateDir === item.dateDir && f.timeDir === item.timeDir))
      if (!duplicated) {
        found.list.push(item)
        found.list = found.list.sort(compareValues('datetime', 'desc'))
      }
    } else {
      result.push({
        name: item.line1,
        list: [item]
      })
    }
  })
  return result
}

export const TreeReport: React.FC<Props> = () => {
  const [processing, setProcessing] = useState(false)
  const [currentFile, setCurrentFile] = useState('')
  const { outPath, loadedIndex, processIndexFile } = useOrganize()
  const [listed] = useState(loadedIndexDto(loadedIndex))

  const handleProcessAll = useCallback(async () => {
    setProcessing(true)
    await Promise.all(
      listed
        .reduce((acc, item) => {
          item.list.forEach(i => acc.push(i))
          return acc
        }, [])
        .map(async (item: ItemReportType) => {
          const task = await processIndexFile(item)
          setCurrentFile(task.outDir)
          return null
        })
    )
    setProcessing(false)
  }, [listed, processIndexFile])

  return (
    <>
      <PageTitle title="Relatórios">
        {listed.length ? (
          <ToolBar>
            <ToolButton
              iconName="serverProc"
              size={24}
              onClick={handleProcessAll}
              disabled={!outPath || !!processing}
            />
          </ToolBar>
        ) : null}
      </PageTitle>
      {currentFile && processing ? <Path>{currentFile}</Path> : null}
      <div>
        {listed.map((item, i) => {
          return <MainIndex key={`${item.name}`} reports={item} />
        })}
      </div>
    </>
  )
}
