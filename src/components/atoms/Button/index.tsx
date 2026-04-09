import React, { FC, PropsWithChildren } from 'react'
import classNames from 'classnames'

type Variant = 'primary' | 'outline-primary' | 'secondary' | 'outline-secondary'

type Size = 'sm' | 'md' | 'lg'

type Props = {
  size?: Size
  variant?: Variant
  onClick: () => void
  className?: string
  disabled?: boolean
  type?: 'submit'
}

const Button: FC<PropsWithChildren<Props>> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className,
  disabled = false,
  type = 'submit',
}) => {
  const variantClasses = {
    primary: 'bg-blue border border-blue text-white disabled:bg-blue-200 disabled:border-blue-200 hover:bg-blue-500',
    'outline-primary': 'bg-transparent text-blue border border-blue disabled:border-blue-200 disabled:text-blue-300',
    secondary:
      'bg-gray-300 border border-gray-300 text-gray-600 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-500 hover:bg-gray-400',
    'outline-secondary':
      'bg-transparent border border-gray-300 text-gray-600 disabled:border-gray-200 disabled:text-gray-500',
  } satisfies Record<Variant, string>

  const sizeClasses = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-7 py-2 text-base',
    lg: 'px-10 py-4 text-lg',
  } satisfies Record<Size, string>

  return (
    <button
      className={classNames(
        'h-max',
        'whitespace-nowrap',
        'rounded-lg',
        variantClasses[variant],
        className,
        sizeClasses[size],
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}
export default Button
