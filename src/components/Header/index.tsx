'use client'

import Logo from '@/components/Logo'
import { useLogoutMutation } from '@/store/api'
import { useEffect } from 'react'
import { selectSession } from '@/store/ducks/session'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/ducks/user'

const Header = () => {
  const router = useRouter()
  const session = useAppSelector(selectSession)
  const user = useAppSelector(selectUser)
  const [logout, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess }] = useLogoutMutation()

  useEffect(() => {
    if (isLogoutSuccess || (session.isChecked && !session.isAuthenticated)) router.push('/login')
  }, [isLogoutSuccess, session, router])

  return (
    <nav className="px-6 py-2 sticky top-0 left-0 flex items-center justify-between">
      <Logo />
      {session.isChecked && session.isAuthenticated && (
        <div className="flex items-center gap-2">
          {user && (
            <div>
              Signed in: {user.email} Currency: {user.currency}
            </div>
          )}
          <button type="button" onClick={async () => await logout().unwrap()} disabled={isLogoutLoading}>
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Header
