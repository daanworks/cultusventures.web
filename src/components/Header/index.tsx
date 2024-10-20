"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import content from "@/content";

const Header = () => {

  const pathname = usePathname();

  return (
    <header className='sticky top-0'>
      <div className='flex w-full justify-center items-center py-6 bg-white'>
        <div className='flex h-full w-full flex-1 justify-end gap-24'>
          {content.header.left.map(item => (
            <Link key={item.link} href={item.link}>
              <span className={item.link === pathname ? 'underline underline-offset-4' : ''}>{item.title.toUpperCase()}</span>
            </Link>
          ))}
        </div>
        <div className='px-24'>
          <Link href='/'>
            <Image src={'/logo.png'} alt={'logo'} width={74} height={74} />
          </Link>
        </div>
        <div className='flex h-full w-full flex-1 gap-24'>
          {content.header.right.map(item => (
            <Link key={item.link} href={item.link}>
            <span className={item.link === pathname ? 'underline underline-offset-4' : ''}>
              {item.title.toUpperCase()}
            </span>
            </Link>
          ))}
        </div>
      </div>
      {/*<div className='h-8 w-full bg-gradient-to-b from-white' />*/}
    </header>
  )
}

export default Header;