import { FC } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
}

const Skeleton: FC<Props> = ({ className }) => (
  <div className={classNames('animate-pulse bg-grey-300 rounded', className)} />
)

export default Skeleton
