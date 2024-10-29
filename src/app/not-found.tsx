import Link from "next/link";

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='text-5xl'>404 - Not found</div>
      <Link href='/' className='pb-8'>Return to homepage</Link>
      <div className='relative text-green'>
        <div className='absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]'>⬤</div>
        <div className='animate-ping'>⬤</div>
      </div>
    </div>
  )
}

export default NotFound;