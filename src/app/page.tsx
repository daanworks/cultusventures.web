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
import { faCircleNotch, faCode } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { validateEmail } from '@/utils'

fontAwesomeConfig.autoAddCss = false

export default function Home() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (email: string) => {
    if (!(await validateEmail(email))) return alert('Please enter a valid email')
    setLoading(true)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (data.url) return (window.location.href = data.url)
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
          {/*<Button*/}
          {/*  tooltipId="mail"*/}
          {/*  tooltipContent={*/}
          {/*    config.content.mailButton.tooltipContent + (process.env.NODE_ENV === 'production' ? ' (soon...)' : '')*/}
          {/*  }*/}
          {/*  tooltipPlacement="top"*/}
          {/*  loading={loading}*/}
          {/*  disabled={process.env.NODE_ENV === 'production'}*/}
          {/*>*/}
          {/*  <div className="w-[20px] h-[20px] flex items-center justify-center">*/}
          {/*    <FontAwesomeIcon icon={loading ? faCircleNotch : faEnvelope} spin={loading} size="xl" />*/}
          {/*  </div>*/}
          {/*</Button>*/}
          <Button
            disabled={process.env.NODE_ENV === 'production'}
            variant="primary"
            tooltipId="api"
            tooltipContent={config.content.apiButton.tooltipContent}
            tooltipPlacement="top"
          >
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <FontAwesomeIcon icon={loading ? faCircleNotch : faCode} spin={loading} size="lg" />
            </div>
          </Button>
        </Form>
        <div className="pt-16 flex flex-col gap-4 text-grey-950">
          <p>
            We study market structure, macroeconomic cycles, and on-chain data to identify high-probability
            opportunities in Bitcoin’s evolving landscape. Our approach is built on patience, conviction, and the belief
            that disciplined strategy outperforms noise and speculation.
          </p>
          <p>
            We deliver real-time insights derived from a proprietary research framework through a <b>REST API</b>,
            empowering developers, analysts, and investors to integrate Bitcoin intelligence directly into their own
            tools and workflows.
          </p>
          <div className="font-sans text-md pt-6 text-black">
            Curious to learn more? <a href="/docs">Read the docs</a>
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
