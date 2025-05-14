import { FC, FormEventHandler } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
  onSubmit: FormEventHandler<HTMLFormElement>
  children: React.ReactNode
}

const Form: FC<Props> = ({ className, onSubmit, children }) => {
  return (
    <form
      className={classNames(
        'flex gap-2 xl:p-10 lg:p-8 md:p-6 sm:p-4 p-4 rounded-full bg-gradient bg-no-repeat bg-cover bg-top md:-mx-24 sm:-mx-8 -mx-0',
        className,
      )}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}

export default Form
