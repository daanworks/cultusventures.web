'use client'

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Skeleton from '@/components/Skeleton'
import Link from 'next/link'

config.autoAddCss = false

const SuccessPage = ({ searchParams }: { searchParams: { session_id?: string } }) => {
  const sessionId = searchParams.session_id
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) return

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/checkout?session_id=${sessionId}`)
        const data = await response.json()
        setEmail(data.session.customer_email)
      } catch (err) {
        console.error('Error fetching session:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSession()
  }, [sessionId])

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center min-h-screen">
        <Skeleton className="w-[100px] h-[100px] mb-8 !rounded-full" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <Skeleton className="h-6 w-1/4 mb-2" />
        <Skeleton className="h-6 w-1/6 mb-2" />
      </div>
    )
  return (
    <div className={classNames('h-screen flex flex-col items-center justify-center min-h-screen font-sans')}>
      <div className={classNames('w-[100px] h-[100px] mb-8')}>
        <FontAwesomeIcon icon={faCheckCircle} className="text-green" />
      </div>
      <h1 className="text-3xl font-bold mb-8">Thank you for your purchase!</h1>
      <p className="text-lg mb-2">
        We’ve sent an email to <strong>{email}</strong>.
      </p>
      <p className="text-sm">Check your inbox for further instructions.</p>
      <Link href="/" className="text-sm pt-6">
        Go back to the main page
      </Link>
    </div>
  )
}

export default SuccessPage
