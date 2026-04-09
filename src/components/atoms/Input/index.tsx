import classNames from 'classnames'
import { FC, ChangeEventHandler, HTMLAttributes } from 'react'

const Input: FC<
  HTMLAttributes<HTMLInputElement> & {
    id?: string
    className?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    readOnly?: boolean
    disabled?: boolean
    isInvalid?: boolean
    size?: 'sm' | 'md' | 'lg'
    type: string
    value?: string | string[] | number
    placeholder?: string
  }
> = ({ id, type, size = 'md', readOnly = false, onChange, className, disabled, isInvalid, value, placeholder }) => {
  const sizeClasses: Record<string, string> = {
    sm: 'text-xs p-2',
    md: 'text-sm p-2.5',
    lg: 'text-md p-3',
  }
  return (
    <input
      id={id}
      className={classNames(
        'block w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-100 focus:ring-blue-100 focus:ring-1',
        sizeClasses[size],
        className,
        disabled && 'cursor-not-allowed',
        isInvalid && 'border !border-red !bg-red-50 !text-red placeholder-red focus:border-red focus:ring-red',
      )}
      type={type}
      readOnly={readOnly}
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  )
}

export default Input
