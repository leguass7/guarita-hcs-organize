import { format, isValid } from 'date-fns'
import React, { useRef, useEffect, useState } from 'react'
import { BsCheck, BsCheckAll } from 'react-icons/bs'

import type { IReadedIndex } from '../../../electron/helpers/files'
import { useAppTheme } from '../AppTheme/useAppTheme'
import { Container, ItemReportContainer, ItemReportName, Sup } from './styles'

type ItemReportType = IReadedIndex & { selected?: boolean; success?: boolean }
export interface IPreparedTree {
  name: string
  list: ItemReportType[]
}

type Props = {
  reports: IPreparedTree
}

export const MainIndex: React.FC<Props> = ({ reports }) => {
  return (
    <Container>
      <div>
        <div>
          {reports.name}{' '}
          <Sup>
            <span>{reports.list.length}</span>
          </Sup>
        </div>
        <div>
          {reports.list.map(report => (
            <ItemReport key={report.id} {...report} />
          ))}
        </div>
      </div>
      {/* <ToolBar>a</ToolBar> */}
    </Container>
  )
}

type ItemReportProps = ItemReportType & {}

const ItemReport: React.FC<ItemReportProps> = ({ id, datetime, dateDir, timeDir }) => {
  const { theme } = useAppTheme()
  const [processed, setProcessed] = useState(false)
  const ref = useRef(false)
  const nameError = !isValid(datetime)
  const dateTime = nameError ? `${dateDir} ${timeDir}` : `${format(datetime, 'dd/MM/yyyy HH:mm:ss')}`

  useEffect(() => {
    if (!ref.current) {
      window.Main.once(`processedItem-${id}`, () => {
        setProcessed(true)
      })
      ref.current = true
    }
  }, [id])

  return (
    <ItemReportContainer key={id} className={processed ? 'processed' : ''}>
      <div>
        {processed ? (
          <BsCheckAll size={16} color={theme.colors.secondary} />
        ) : (
          <BsCheck size={16} color={theme.colors.textDark} />
        )}
      </div>
      <ItemReportName color={nameError ? theme.colors.contrast : theme.colors.textDark}>{dateTime}</ItemReportName>
    </ItemReportContainer>
  )
}
