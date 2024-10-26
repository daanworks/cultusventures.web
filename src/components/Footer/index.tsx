"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import content from "@/content";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Footer = () => {
  const menus = [...content.header.left, ... content.header.right].map((item, index) => (
    <Link href={item.link} key={index} className='px-4'>
      {item.title}
    </Link>

  ))

  const pathname = usePathname();

  if (pathname === '/') return <></>

  return (
    <footer className='p-8 bg-blue text-white flex flex-col items-center'>
      <div className='flex items-center gap-8 pb-6'>
        <hr className='bg-white lg:w-60 md:w-40 w-20' />
        {content.socials.map(item => <FontAwesomeIcon key={item.link} icon={item.icon} className='sm:text-2xl text-xl' />)}
        <hr className='bg-white lg:w-60 md:w-40 w-20' />
      </div>
      <div className='text-2xl font-sans'>Cultus Ventures</div>
      <div className='font-sans text-xs pb-8'>Copyright © 2024</div>
      <div className='font-sans flex items-center divide-x divide-solid text-sm'>
        {menus}
      </div>
    </footer>
  )
}

export default Footer;