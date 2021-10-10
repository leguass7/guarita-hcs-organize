import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import styled from 'styled-components'

import { useIsMounted } from '../useIsMounted'

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100%;
  div {
    width: 180px;
    max-width: 100%;
    margin: 0 auto;
  }
`

export const CircularProgressFiles: React.FC = () => {
  const ref = useRef(false)
  const isMounted = useIsMounted()
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(
    ({ total = 0, current = 0 }) => {
      if (isMounted.current) {
        const percent = Math.ceil(total && current ? (current * 100) / total : 0)
        setProgress(percent)
      }
    },
    [isMounted]
  )

  useEffect(() => {
    if (!ref.current) {
      window.Main.on('onReadProgress', updateProgress)
    }
    return () => {
      window.Main.remove('onReadProgress', updateProgress)
    }
  }, [updateProgress])

  return (
    <Container>
      <div>
        <CircularProgressbar strokeWidth={5} value={progress} text={`${progress}%`} />
      </div>
    </Container>
  )
}
