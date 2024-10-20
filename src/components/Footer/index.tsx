import Image from "next/image";

const Footer = () => {
  return (
    <footer className='p-24 bg-blue text-white flex justify-between'>
      <div className='font-sans'>
        <div className='text-4xl pb-8'>Cultus Ventures</div>
        <div>Coming soon...</div>
      </div>
      <Image src={'/logo_white.png'} alt={'logo white'} width={180} height={180} />
    </footer>
  )
}

export default Footer;