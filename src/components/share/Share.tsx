import { useStore } from '../../hooks/use-store'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

export const Share = observer(() => {
  const { songStore } = useStore()
  const [clicked, setClicked] = useState(false)
  const location = window.location

  const onClick = async () => {
    await navigator.clipboard.writeText(location.href)
    setClicked(true)
  }

  useEffect(() => {
    setClicked(false)
  }, [songStore.song])

  return (
    <button onClick={onClick}>
      {clicked ? 'Link copied to clipboard!' : 'Share'}
    </button>
  )
})
