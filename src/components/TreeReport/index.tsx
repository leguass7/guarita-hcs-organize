import React, { useMemo, useCallback, useState } from 'react'

import type { IReadedIndex } from '../../../electron/helpers/files'
import { compareValues } from '../../helpers'
import { useOrganize } from '../Organize/OrganizeProvider'
import { PageTitle } from '../PageTitle'
import { ToolBar } from '../ToolBar'
import { ToolButton } from '../ToolBar/ToolButton'
import { IPreparedTree, MainIndex } from './MainIndex'
import { Setting } from './Setting'

type Props = {
  treeList: IReadedIndex[]
}

export const TreeReport: React.FC<Props> = ({ treeList }) => {
  const [loading, setLoading] = useState(false)
  const { processAllIndexFiles, outPath } = useOrganize()

  const preparedList: IPreparedTree[] = useMemo(() => {
    const result: IPreparedTree[] = []
    treeList.forEach(item => {
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
  }, [treeList])

  const handleProcessAll = useCallback(async () => {
    setLoading(true)
    const all = preparedList.reduce((acc, item) => {
      item.list.forEach(i => acc.push(i))
      return acc
    }, [])
    await processAllIndexFiles(all)
    setLoading(false)
  }, [preparedList, processAllIndexFiles])

  return (
    <>
      <PageTitle title="Relatórios">
        {preparedList.length ? (
          <ToolBar>
            <ToolButton iconName="serverProc" size={24} onClick={handleProcessAll} disabled={!outPath || !!loading} />
          </ToolBar>
        ) : null}
      </PageTitle>
      {preparedList.length ? <Setting disabled={!!loading} /> : null}
      <div>
        {preparedList.map((item, i) => {
          const key = `${i}`
          return <MainIndex key={key} reports={item} />
        })}
      </div>
    </>
  )
}
