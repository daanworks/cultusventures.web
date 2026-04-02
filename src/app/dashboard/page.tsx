'use client'

import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/ducks/user'
import { useGetSessionQuery, useGetUserQuery, useLogoutMutation } from '@/store/api'
import { selectSession } from '@/store/ducks/session'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const DashboardPage = () => {
  const router = useRouter()
  useGetSessionQuery()
  const session = useAppSelector(selectSession)
  const userQuery = useGetUserQuery(undefined, { skip: !session.isAuthenticated })
  const user = useAppSelector(selectUser)

  const [logout, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess }] = useLogoutMutation()

  useEffect(() => {
    if (isLogoutSuccess || (session.isChecked && !session.isAuthenticated)) router.push('/login')
  }, [isLogoutSuccess, session, router])

  if (!session.isChecked || session.isLoading || (session.isAuthenticated && userQuery.isLoading))
    return <div>Loading...</div>

  return (
    <main style={{ padding: 24 }}>
      <button type="button" onClick={async () => await logout().unwrap()} disabled={isLogoutLoading}>
        {isLogoutLoading ? 'Logging out...' : 'Logout'}
      </button>
      <section style={{ marginTop: 24 }}>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </section>
    </main>
  )
}

export default DashboardPage
