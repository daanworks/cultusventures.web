'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faCircleNotch, faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useState } from 'react'
import { validateEmail } from '@/utils'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import config from '@/config'

fontAwesomeConfig.autoAddCss = false

export default function Home() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (email: string) => {
    if (!validateEmail(email)) return alert('Please enter a valid email')
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      if (response.status === 409) return alert('Your email is already in use')
      const data = await response.json()
      if (data.url) return (window.location.href = data.url)
      alert('Something went wrong. Please try again.')
    } catch (error) {
      alert(`Failed to start checkout: ${(error as Error).message} Please refresh and try again.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="flex flex-col justify-between">
      <div>
        <div className="pt-8 pb-16">
          <Logo />
        </div>
        <h1 className="pb-12">{config.content.title}</h1>
        <form
          className="flex gap-2 xl:p-10 lg:p-8 md:p-6 sm:p-4 p-4 rounded-full bg-gradient bg-no-repeat bg-cover bg-top md:-mx-24 sm:-mx-8 -mx-0"
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
            tooltipContent={config.content.newsletterButton.tooltipContent}
            tooltipPlacement="top"
            loading={loading}
          >
            <FontAwesomeIcon icon={loading ? faCircleNotch : faEnvelope} spin={loading} size="lg" />
          </Button>
          <Button
            disabled={true}
            variant="secondary"
            tooltipId="api"
            tooltipContent={config.content.apiButton.tooltipContent}
            tooltipPlacement="top"
          >
            <FontAwesomeIcon icon={faCode} />
          </Button>
        </form>
        <div className="pt-16 flex flex-col gap-4 text-grey-950">
          <p>
            We guide individuals and businesses through the Bitcoin landscape with clarity and strategic insight. We
            believe Bitcoin offers a rare opportunity to build meaningful wealth—but only through patience, timing, and
            independent thinking.
          </p>
          <p>
            Through our <b>weekly newsletter, direct API access, and tailored consulting sessions</b>, we empower our
            clients to shape their Bitcoin strategy with confidence and control—free from the noise of hype and
            speculation.
          </p>
          <div className="font-sans text-md pt-6 text-black">
            Curious to learn more? <a href="mailto:info@cultusventures.com">Let&#39;s talk.</a>
          </div>
        </div>
      </div>
      <div className="font-sans text-xs pb-6 pt-20">
        <div className="pb-6 text-grey">{config.content.disclaimer}</div>
        <div className="flex flex-row items-center gap-1">
          <div>© {new Date().getFullYear()}, Cultus Ventures</div>
          <div>|</div>
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
