import { format, isValid } from 'date-fns'
import React, { useRef, useEffect, useState } from 'react'
import { BsCheck, BsCheckAll } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

import type { IReadedIndex, ITaskCopy } from '../../../electron/helpers/files'
import { useAppTheme } from '../AppTheme/useAppTheme'
import { useIsMounted } from '../useIsMounted'
import { Container, ItemReportContainer, ItemReportName, Sup } from './styles'

export type ItemReportType = IReadedIndex & { selected?: boolean; success?: boolean; loading?: boolean }
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
          {/* {reports.name
            .split('')
            .map(a => a.charCodeAt(0))
            .join('-')} */}
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

type StateEvent = {
  success?: boolean
  processed?: boolean
  loading?: boolean
}
type ItemReportProps = ItemReportType & {}

const ItemReport: React.FC<ItemReportProps> = ({ id, datetime, dateDir, timeDir, loading, success }) => {
  const isMounted = useIsMounted()
  const { theme } = useAppTheme()
  const [processed, setProcessed] = useState<StateEvent>({ success: !!success, processed: false, loading: !!loading })
  const ref = useRef(false)
  const nameError = !isValid(datetime)
  const dateTime = nameError ? `${dateDir} ${timeDir}` : `${format(datetime, 'dd/MM/yyyy HH:mm:ss')}`

  useEffect(() => {
    if (!ref.current) {
      window.Main.once(`processedItem-${id}`, (task: ITaskCopy) => {
        if (isMounted.current) {
          setProcessed({ processed: true, success: !!task?.copied, loading: false })
        }
      })
      window.Main.once(`startProcessItem-${id}`, () => {
        if (isMounted.current) {
          setProcessed({ loading: true })
        }
      })
      ref.current = true
    }
  }, [id, isMounted])

  return (
    <ItemReportContainer key={id} className={processed.processed ? 'processed' : ''}>
      <div>
        {processed.processed ? (
          <>
            {processed.success ? (
              <BsCheckAll size={16} color={theme.colors.secondary} />
            ) : (
              <IoClose size={16} color={theme.colors.contrast} />
            )}
          </>
        ) : (
          <BsCheck size={16} color={theme.colors.textDark} />
        )}
      </div>
      <ItemReportName color={nameError ? theme.colors.contrast : theme.colors.textDark}>
        {dateTime} {!!processed.loading && '(na fila)'}
      </ItemReportName>
    </ItemReportContainer>
  )
}
