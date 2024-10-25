"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import content from "@/content";
import bars from '../../../public/bars.svg'
import close from '../../../public/close.svg'
import { useEffect, useState } from "react";

const Header = () => {

  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(false);
  }, [pathname]);

  const handleModalOpen = () => {
    if (modalOpen) {
      setModalOpen(false);
      // document.body.classList.remove('overflow-y-hidden');
    } else {
      setModalOpen(true);
      // document.body.classList.add('overflow-y-hidden');
    }
  }

  return (
    <header className='sticky top-0 flex w-full lg:justify-center justify-between items-center py-6 bg-white px-8'>
      <div className='lg:flex hidden h-full w-full flex-1 justify-end gap-24 lg:pr-24 pr-8'>
        {content.header.left.map(item => (
          <Link key={item.link} href={item.link}>
            <span className={item.link === pathname ? 'underline underline-offset-4' : ''}>{item.title.toUpperCase()}</span>
          </Link>
        ))}
      </div>
      <Link href='/'>
        <div className='lg:w-[74px] lg:h-[74px] md:w-[58px] md:h-[58px] w-[50px] h-[50px] relative'>
          <Image src='/logo.png' alt='logo' fill />
        </div>
      </Link>
      <div className='lg:flex hidden h-full w-full flex-1 gap-24 lg:pl-24 pl-8'>
        {content.header.right.map(item => (
          <Link key={item.link} href={item.link}>
          <span className={item.link === pathname ? 'underline underline-offset-4' : ''}>
            {item.title.toUpperCase()}
          </span>
          </Link>
        ))}
      </div>
      <div className='lg:hidden z-10'>
        <Image src={modalOpen ? close : bars} alt='bars' onClick={() => handleModalOpen()} />
      </div>
      {modalOpen &&
        <div className='absolute top-0 left-0 w-full bg-white px-8 flex flex-col gap-4 pt-24 pb-4 justify-center items-end'>
          {[...content.header.left, ...content.header.right].map(item => <Link href={item.link} key={item.link}>{item.title.toUpperCase()}</Link>)}
        </div>
      }
    </header>
  )
}

export default Header;