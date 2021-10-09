import React, { useCallback, useMemo } from 'react'
import { IoArrowBack } from 'react-icons/io5'
// import { useHistory } from 'react-router-dom'

import { VariantColorsTypes } from '../AppTheme/types'
import { useAppTheme } from '../AppTheme/useAppTheme'
import { MarginProps } from '../styled'
import { BackContainer, PageTitleContainer, Title, Tools } from './styles'

export type PageTitleProps = MarginProps & {
  title: string
  spotlight?: string
  themeColor?: VariantColorsTypes
  back?: boolean
}

export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  title,
  spotlight,
  themeColor = 'primary',
  back,
  ...rest
}) => {
  const { theme, matchingBackgroudText } = useAppTheme()
  // const { go } = useHistory()

  const textColor = useMemo(() => matchingBackgroudText(themeColor), [matchingBackgroudText, themeColor])
  const handleBack = useCallback(() => {
    // go(-1)
  }, [])

  return (
    <PageTitleContainer {...rest}>
      {back ? (
        <BackContainer bgColor={theme.colors[themeColor]} textColor={textColor}>
          <button type="button" onClick={handleBack}>
            <IoArrowBack size={18} />
          </button>
        </BackContainer>
      ) : null}
      <Title color={theme.colors[themeColor]}>
        <h2>
          {spotlight ? <span>{spotlight} </span> : null}
          {title}
        </h2>
      </Title>
      <Tools>{children}</Tools>
    </PageTitleContainer>
  )
}
