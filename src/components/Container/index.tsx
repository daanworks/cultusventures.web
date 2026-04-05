import { FC } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
  children: React.ReactNode
}

const Container: FC<Props> = ({ className, children }) => (
  <div className={classNames('w-full p-6 min-h-screen', className)}>{children}</div>
)

export default Container
