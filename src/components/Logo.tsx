import Image from 'next/image'
import { FC } from 'react'

const Logo: FC = () => (
  <div className="w-[50px] h-[50px] relative">
    <Image src="/logo.png" alt="logo" fill />
  </div>
)

export default Logo
