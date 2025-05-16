import { FC } from 'react'
import classNames from 'classnames'
import { Tooltip } from 'react-tooltip'

type Variant = 'primary' | 'secondary'

type Props = {
  variant?: Variant
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
  tooltipId?: string
  tooltipContent?: string
  tooltipPlacement?: 'top' | 'bottom'
  loading?: boolean
  className?: string
}

const Button: FC<Props> = ({
  variant = 'primary',
  onClick,
  disabled,
  children,
  tooltipId,
  tooltipContent,
  tooltipPlacement,
  loading,
  className,
}) => {
  const variantClasses: Record<Variant, string> = {
    primary: 'bg-blue text-white border-blue shadow-md',
    secondary: 'text-black bg-white',
  }
  return (
    <>
      <button
        className={classNames(
          'p-3 font-sans text-sm max-w-max rounded-full cursor-pointer flex items-center whitespace-nowrap justify-center',
          variantClasses[variant],
          !disabled && 'hover:brightness-95 transition duration-200',
          loading && '!cursor-progress opacity-70 brightness-110',
          disabled && '!cursor-not-allowed opacity-70 brightness-110',
          className,
        )}
        onClick={onClick}
        disabled={disabled}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        data-tooltip-place={tooltipPlacement}
      >
        {children}
      </button>
      {tooltipId && <Tooltip id={tooltipId} className="!p-3 !rounded-full font-sans !text-xs" />}
    </>
  )
}

export default Button
