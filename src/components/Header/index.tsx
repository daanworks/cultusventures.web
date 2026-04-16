'use client'

import Logo from '@/components/Logo'
import { useLogoutMutation } from '@/store/api'
import { useCallback, useState } from 'react'
import { selectSession } from '@/store/ducks/session'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import Button from '@/components/atoms/Button'
import Loading from '@/components/Loading'

const Header = () => {
  const router = useRouter()
  const session = useAppSelector(selectSession)
  const [logout, { isLoading }] = useLogoutMutation()
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false)

  const handleLogout = useCallback(async (): Promise<void> => {
    await logout().unwrap()
    setIsRedirecting(true)
    router.replace('/login')
  }, [logout, router])

  if (!session.isAuthenticated) return null

  if (isLoading || isRedirecting) return <Loading />

  return (
    <nav className="px-6 py-2 sticky top-0 left-0 flex items-center justify-between bg-white drop-shadow">
      <Logo />
      {session.isChecked && session.isAuthenticated && (
        <Button variant="secondary" onClick={handleLogout} disabled={isLoading}>
          Logout
        </Button>
      )}
    </nav>
  )
}

export default Header
