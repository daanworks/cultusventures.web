import { RefObject, useEffect } from 'react'

type Event = MouseEvent | TouchEvent

const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const element = ref?.current
      if (!element || element.contains((event?.target as Node) || null)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default useOnClickOutside
