'use client'

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/store/api'
import { useAppSelector } from '@/store/hooks'
import { selectSession } from '@/store/ducks/session'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Logo from '@/components/Logo'
import { validateEmail } from '@/utils/common'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const LoginPage = () => {
  const router = useRouter()
  const session = useAppSelector(selectSession)
  const [login, { isLoading }] = useLoginMutation()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isEmailInValid, setIsEmailInValid] = useState<boolean>(false)
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!email && !password) {
      setIsEmailInValid(true)
      setIsPasswordInvalid(true)
      setErrorMessage('Email and password are required')
      return
    }
    if (!validateEmail(email)) {
      setIsEmailInValid(true)
      setErrorMessage('Invalid email format')
      return
    }
    if (!password) {
      setIsPasswordInvalid(true)
      setErrorMessage('Password is required')
      return
    }
    try {
      await login({ email, password }).unwrap()
    } catch (error) {
      setErrorMessage(((error as FetchBaseQueryError).data as Record<string, string>).error)
      setIsPasswordInvalid(true)
      setIsEmailInValid(true)
    }
  }, [email, login, password])

  useEffect(() => {
    if (session.isAuthenticated) {
      router.push('/dashboard')
    }
  }, [session, router])

  useEffect(() => {
    setIsPasswordInvalid(false)
    setIsEmailInValid(false)
    setErrorMessage('')
  }, [password, email])

  return (
    <div className="flex justify-center pt-20">
      <div className="flex flex-col w-[300px]">
        <div className="pb-12 text-3xl text-gray-600">
          <Logo />
        </div>
        <form className="flex flex-col gap-4 items-start" onSubmit={(event) => event.preventDefault()}>
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            size="lg"
            isInvalid={isEmailInValid}
            disabled={isLoading}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            size="lg"
            isInvalid={isPasswordInvalid}
            disabled={isLoading}
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={handleSubmit} variant="primary" disabled={isLoading}>
              Login
            </Button>
            <Button onClick={() => undefined} variant="outline-secondary" disabled={true}>
              Register
            </Button>
          </div>
        </form>
        {errorMessage && <div className="text-red pt-2 text-xs">{errorMessage}</div>}
      </div>
    </div>
  )
}

export default LoginPage
