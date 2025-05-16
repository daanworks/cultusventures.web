'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import config from '@/config'

fontAwesomeConfig.autoAddCss = false

export default function Home() {
  return (
    <Container className="flex flex-col justify-between">
      <div>
        <div className="pt-8 pb-20">
          <Logo />
        </div>
        <h1 className="pb-12">{config.content.title}</h1>
        <div className="flex gap-3 flex-col sm:flex-row">
          <Link href="https://x.com/cultusventures" target="_blank" rel="noopener noreferrer">
            <Button className="gap-1">
              Follow us on
              <FontAwesomeIcon icon={faXTwitter} />
            </Button>
          </Link>
          <a href="mailto:info@cultusventures.com" className="no-underline">
            <Button className="gap-1" variant="secondary">
              Send us a message
              <FontAwesomeIcon icon={faEnvelope} />
            </Button>
          </a>
        </div>
        <div className="pt-16 flex flex-col gap-4 text-grey-950">
          <p>
            We use AI to analyze people’s sentiment and combine it with market data analysis to deliver clear insights
            for Bitcoin investors. This dual approach helps uncover patterns in crowd behavior and market structure that
            are often missed in surface-level analysis.
          </p>
          <p>
            Access our data daily through a curated Telegram group and a public API, delivering real-time sentiment
            scores and market insights to individual investors.
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
