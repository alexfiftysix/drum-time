import { useStore } from '../../hooks/use-store'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

export const Share = observer(() => {
  const { songStore } = useStore()
  const [clicked, setClicked] = useState(false)
  const location = window.location

  const onClick = async () => {
    const songData = songStore.getSongData()
    const link = `${location.protocol}//${location.host}${location.pathname}?songData=${songData}`
    await navigator.clipboard.writeText(link)
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
