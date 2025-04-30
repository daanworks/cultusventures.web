import { FC, ChangeEventHandler, HTMLAttributes } from 'react'
import classNames from 'classnames'

const Input: FC<
  HTMLAttributes<HTMLInputElement> & {
    onChange?: ChangeEventHandler<HTMLInputElement>
    disabled?: boolean
    value?: string
    placeholder?: string
    type: string
  }
> = ({ onChange, disabled, value, type, ...props }) => {
  return (
    <input
      className={classNames(
        'px-3 font-sans block w-full rounded-full border border-grey text-black focus:outline-none focus:ring-0 text-base',
        disabled && 'cursor-not-allowed',
      )}
      disabled={disabled}
      onChange={onChange}
      value={value}
      type={type}
      {...props}
    />
  )
}

export default Input
