'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import config from '@/config'
import Form from '@/components/Form'
import Input from '@/components/Input'
import { faCircleNotch, faCode } from '@fortawesome/free-solid-svg-icons'
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
            tooltipId="telegram"
            tooltipContent={config.content.telegramButton.tooltipContent}
            tooltipPlacement="top"
            loading={loading}
          >
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <FontAwesomeIcon icon={loading ? faCircleNotch : faTelegram} spin={loading} size="xl" />
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
            We use AI to analyze people’s sentiment and combine it with market data analysis to deliver clear insights
            for Bitcoin investors. This dual approach helps uncover patterns in crowd behavior and market structure that
            are often missed in surface-level analysis.
          </p>
          <p>
            Access our data daily through a curated <b>Telegram group</b> and an <b>API</b>, delivering real-time
            sentiment scores and market cycle insights to investors.
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
