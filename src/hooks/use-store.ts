import { useContext } from 'react'
import { StoreContext } from '../App'

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('Store context has not been initialized')
  return store
}
