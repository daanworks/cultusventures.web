import { FC } from 'react'
import classNames from 'classnames'
import { Tooltip } from 'react-tooltip'

type Variant = 'primary' | 'secondary'

type Props = {
  variant?: Variant
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
  tooltipId: string
  tooltipContent: string
  tooltipPlacement: 'top' | 'bottom'
  loading?: boolean
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
}) => {
  const variantClasses: Record<Variant, string> = {
    primary: 'bg-blue text-white border-blue shadow-md',
    secondary: 'text-black bg-white border-white',
  }
  return (
    <>
      <button
        className={classNames(
          'p-3 border max-w-max rounded-full cursor-pointer flex items-center whitespace-nowrap',
          variantClasses[variant],
          loading && '!cursor-progress opacity-70 brightness-110',
          disabled && '!cursor-not-allowed opacity-70 brightness-110',
        )}
        onClick={onClick}
        disabled={disabled}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        data-tooltip-place={tooltipPlacement}
      >
        {children}
      </button>
      <Tooltip id={tooltipId} className="!p-3 !rounded-full font-sans !text-xs" />
    </>
  )
}

export default Button
