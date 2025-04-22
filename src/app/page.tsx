'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch, faCode } from '@fortawesome/free-solid-svg-icons'
import { faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useState } from 'react'
import { validateEmail } from '@/utils'

config.autoAddCss = false

export default function Home() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = async (email: string) => {
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
    <div className="px-6 sm:px-0 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto flex flex-col min-h-screen justify-between">
      <div>
        <div className="flex gap-3 items-center pt-8 pb-16">
          <div className="lg:w-[68px] lg:h-[68px] md:w-[58px] md:h-[58px] w-[50px] h-[50px] relative">
            <Image src="/logo.png" alt="logo" fill />
          </div>
        </div>
        <div className="text-3xl pb-12">
          Providing data-driven analysis on Bitcoin market trends for individuals and businesses
        </div>
        <div
          className="flex gap-2 xl:p-10 lg:p-8 p-6 rounded-full"
          style={{
            backgroundImage: `url(/noisy-gradients.png)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Input
            placeholder={'Enter your email'}
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            disabled={loading}
          />
          <Button
            onClick={() => handleClick(email)}
            disabled={loading}
            tooltipId="telegram"
            tooltipContent="Join the Community"
            tooltipPlacement="top"
            loading={loading}
          >
            <div className={`w-[20px] h-[20px] flex items-center ${loading ? 'animate-spin' : ''}`}>
              <FontAwesomeIcon icon={loading ? faCircleNotch : faTelegram} spin={loading} />
            </div>
          </Button>
          <Button
            onClick={() => handleClick(email)}
            disabled={true}
            variant="secondary"
            tooltipId="api"
            tooltipContent="Get API Access (soon...)"
            tooltipPlacement="top"
          >
            <div className={`w-[20px] h-[20px] flex items-center`}>
              <FontAwesomeIcon icon={faCode} />
            </div>
          </Button>
        </div>
        <div className="pt-16 pb-2">
          We leverage cutting-edge data analytics to provide real-time insights into Bitcoin market trends.
        </div>
        <div>
          Our data-driven solutions empowers individuals and businesses with advanced market analytics, enabling them to
          navigate the volatile crypto landscape with precision and confidence.
        </div>
      </div>
      <div className="font-sans text-xs pb-6 pt-32">
        <div className="pb-6 text-grey">
          This service does not provide financial or investment advice. All signals are generated automatically and
          should not be relied upon for making trading decisions. Users should conduct their own research before
          investing. By using this service, you acknowledge that trading cryptocurrencies carries risk and that past
          performance is not indicative of future results.
        </div>
        <div className="flex flex-row items-center gap-1">
          <div>© {new Date().getFullYear()}, Cultus Ventures</div>
          <div>|</div>
          <Link
            href="https://x.com/cultusventures"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-1 no-underline text-black"
          >
            <div>Follow us on</div>
            <div className="h-[11px] w-[11px]">
              <FontAwesomeIcon icon={faXTwitter} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
