'use client'

import Logo from '@/components/Logo'
import { useLogoutMutation } from '@/store/api'
import { useEffect } from 'react'
import { selectSession } from '@/store/ducks/session'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import Button from '@/components/atoms/Button'

const Header = () => {
  const router = useRouter()
  const session = useAppSelector(selectSession)
  const [logout, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess }] = useLogoutMutation()

  useEffect(() => {
    if (isLogoutSuccess || (session.isChecked && !session.isAuthenticated)) router.push('/login')
  }, [isLogoutSuccess, session, router])

  if (!session.isAuthenticated) return null

  return (
    <nav className="px-6 py-2 sticky top-0 left-0 flex items-center justify-between bg-white drop-shadow">
      <Logo />
      {session.isChecked && session.isAuthenticated && (
        <Button variant="secondary" onClick={async () => await logout().unwrap()} disabled={isLogoutLoading}>
          Logout
        </Button>
      )}
    </nav>
  )
}

export default Header
