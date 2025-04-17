'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

export default function Home() {
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
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="https://x.com/cultusventures" target="_blank" rel="noopener noreferrer">
            <div className="py-3 px-6 border max-w-max rounded-full cursor-pointer flex items-center bg-blue text-white">
              <div className="font-sans text-sm mr-1">Join the Community</div>
              <div className="w-[16px] h-[16px]">
                <FontAwesomeIcon icon={faTelegram} size="xs" />
              </div>
            </div>
          </Link>
          <Link href="https://x.com/cultusventures" target="_blank" rel="noopener noreferrer" className="no-underline">
            <div className="py-3 px-6 border max-w-max rounded-full cursor-pointer flex items-center text-black">
              <div className="font-sans text-sm mr-1">Get API Access</div>
              <div className="w-[16px] h-[12px]">
                <FontAwesomeIcon icon={faCode} size="xs" />
              </div>
            </div>
          </Link>
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
