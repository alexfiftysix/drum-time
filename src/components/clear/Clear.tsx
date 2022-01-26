import { useStore } from '../../hooks/use-store'

export const Clear = () => {
  const { songStore } = useStore()

  return <button onClick={songStore.clear}>Clear</button>
}
