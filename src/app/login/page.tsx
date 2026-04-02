'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/store/api'
import { useAppSelector } from '@/store/hooks'
import { selectSession } from '@/store/ducks/session'

const LoginPage = () => {
  const router = useRouter()
  const session = useAppSelector(selectSession)
  const [login, { isLoading, error }] = useLoginMutation()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    console.log('session', session)
    if (session.isAuthenticated) {
      router.push('/dashboard')
    }
  }, [session, router])

  return (
    <div className="p-6">
      <div>LOGIN</div>
      <form
        onSubmit={async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          await login({ email, password }).unwrap()
        }}
      >
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="border border-black mr-2"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="border border-black mr-2"
        />
        <button type="submit" className="border border-black px-2" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && (
        <p style={{ color: 'red' }}>
          {'status' in error ? 'Invalid credentials or request failed' : 'Something went wrong'}
        </p>
      )}
    </div>
  )
}

export default LoginPage
