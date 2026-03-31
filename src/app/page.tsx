'use client'

import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Container from '@/components/Container'
import Logo from '@/components/Logo'

fontAwesomeConfig.autoAddCss = false

export default function Home() {
  if (process.env.NODE_ENV === 'production') return <h1>Not in prod yet...</h1>

  return (
    <Container className="flex flex-col justify-center items-center">
      <div>
        <Logo />
      </div>
    </Container>
  )
}
