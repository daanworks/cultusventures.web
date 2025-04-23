import { FC } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
  children: React.ReactNode
}

const Container: FC<Props> = ({ className, children }) => (
  <div
    className={classNames(
      'px-6 sm:px-0 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto min-h-screen',
      className,
    )}
  >
    {children}
  </div>
)

export default Container
