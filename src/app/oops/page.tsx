import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const OopsPage = () => {
  return (
    <div className={classNames('h-screen flex flex-col items-center justify-center min-h-screen font-sans')}>
      <div className={classNames('w-[100px] h-[100px] mb-8')}>
        <FontAwesomeIcon icon={faCircleXmark} className="text-red" />
      </div>
      <h1 className="text-3xl font-bold mb-8">Something went wrong!</h1>
      <Link href="/" className="text-sm">
        Return to homepage
      </Link>
      <p>or</p>
      <Link href="mailto:info@cultusventures.com" className="text-sm">
        Contact Us
      </Link>
    </div>
  )
}

export default OopsPage
