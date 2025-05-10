'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

config.autoAddCss = false

const SuccessPage = ({ searchParams }: { searchParams: { email?: string } }) => {
  const router = useRouter()
  if (!searchParams.email) return router.push('/')
  return (
    <div className={classNames('h-screen flex flex-col items-center justify-center min-h-screen font-sans')}>
      <FontAwesomeIcon icon={faCheckCircle} className="text-green mb-8" size="6x" />
      <h1 className="text-3xl font-bold mb-8">Thank you for subscribing!</h1>
      <p className="text-lg mb-8">
        We’ve sent an email to <strong>{searchParams.email}</strong>.
      </p>
      <Link href="/" className="text-sm">
        Go back to the main page
      </Link>
    </div>
  )
}

export default SuccessPage
