'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import config from '@/config'
import Form from '@/components/Form'
import Input from '@/components/Input'
import { faCircleNotch, faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { validateEmail } from '@/utils'

fontAwesomeConfig.autoAddCss = false

export default function Home() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (email: string) => {
    if (!validateEmail(email)) return alert('Please enter a valid email')
    setLoading(true)
    try {
      console.log('Submitting ' + email)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="flex flex-col justify-between">
      <div>
        <div className="pt-8 pb-20">
          <Logo />
        </div>
        <h1 className="pb-12">{config.content.title}</h1>
        <Form
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit(email)
          }}
        >
          <Input
            placeholder={config.content.input.placeholder}
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            disabled={loading}
          />
          <Button
            tooltipId="mail"
            tooltipContent={config.content.mailButton.tooltipContent}
            tooltipPlacement="top"
            loading={loading}
          >
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <FontAwesomeIcon icon={loading ? faCircleNotch : faEnvelope} spin={loading} size="xl" />
            </div>
          </Button>
          <Button
            disabled={true}
            variant="secondary"
            tooltipId="api"
            tooltipContent={config.content.apiButton.tooltipContent}
            tooltipPlacement="top"
          >
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <FontAwesomeIcon icon={faCode} size="lg" />
            </div>
          </Button>
        </Form>
        <div className="pt-16 flex flex-col gap-4 text-grey-950">
          <p>
            We are dedicated to delivering clear, independent insights into Bitcoin’s market dynamics. Through
            research-driven content and transparent portfolio updates, we aim to cut through noise and provide strategic
            guidance for navigating market cycles.
          </p>
          <p>
            Our mission is rooted in disciplined observation and continuous learning. By tracking macro trends, on-chain
            signals, and sentiment shifts, we seek to better understand Bitcoin&apos;s long-term trajectory—and share
            those insights in real time.
          </p>
          <div className="font-sans text-md pt-6 text-black">
            Curious to learn more? <a href="mailto:info@cultusventures.com">Let&#39;s talk.</a>
          </div>
        </div>
      </div>
      <div className="font-sans text-xs pb-6 pt-20">
        <div className="pb-6 text-grey">{config.content.disclaimer}</div>
        <div className="flex sm:flex-row flex-col items-start sm:items-center gap-1">
          <div>© {new Date().getFullYear()}, Cultus Ventures</div>
          <div className="hidden sm:block">|</div>
          <div>info@cultusventures.com</div>
          <div className="hidden sm:block">|</div>
          <Link
            href="https://x.com/cultusventures"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-1 no-underline text-black"
          >
            <div>Follow us on</div>
            <div className="h-[11px] w-[11px]">
              <FontAwesomeIcon icon={faXTwitter} />
            </div>
          </Link>
        </div>
      </div>
    </Container>
  )
}
