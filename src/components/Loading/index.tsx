import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white flex items-center justify-center">
      <FontAwesomeIcon icon={faCircleNotch} spin={true} size="3x" className="text-gray" />
    </div>
  )
}

export default Loading
