import Image from 'next/image'
import { FC } from 'react'

const Logo: FC = () => (
  <div className="lg:w-[68px] lg:h-[68px] md:w-[58px] md:h-[58px] w-[50px] h-[50px] relative">
    <Image src="/logo.png" alt="logo" fill />
  </div>
)

export default Logo
