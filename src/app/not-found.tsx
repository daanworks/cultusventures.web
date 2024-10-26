import Link from "next/link";

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='text-5xl'>404 - Not found</div>
      <Link href='/'>Return to homepage</Link>
    </div>
  )
}

export default NotFound;