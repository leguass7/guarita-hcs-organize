// import { useRef, useEffect } from 'react'

import { Button } from '../Button'
import { LogoDSSvg } from '../images/LogoDSSvg'
import { InputSelectIndex } from '../InputSelectIndex'
import { Container, Text } from './styles'

export function Greetings() {
  // const ref = useRef<HTMLInputElement>(null)
  function handleSayHello() {
    window.Main.sendMessage('Hello World')

    console.log('Message sent! Check main process log in terminal.')
  }

  return (
    <Container>
      <LogoDSSvg width={180} />
      <Text>An Electron boilerplate including TypeScript, React, Jest and ESLint.</Text>
      <Button onClick={handleSayHello}>Send message to main process</Button>
      <InputSelectIndex name="dir" folder={false} />
    </Container>
  )
}
