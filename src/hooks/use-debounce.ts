import { DependencyList, useEffect } from 'react'

export const useDebounce = (
  delay: number,
  delegate: () => void,
  deps: DependencyList
) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      delegate()
    }, delay)

    // Prevents the timeout from going off if we call it again
    return () => {
      clearTimeout(handler)
    }
  }, [delay, delegate, deps])
}
