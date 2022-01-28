import { useStore } from '../../hooks/use-store'
import { useEffect, useState } from 'react'
import Favicon from 'react-favicon'
import { observer } from 'mobx-react-lite'

export const FaviconAnimator = observer(() => {
  const { songStore } = useStore()
  const [faviconImages, setFaviconImages] = useState<string | string[]>([
    '/favicon.ico',
  ])

  useEffect(() => {
    setFaviconImages(
      songStore.transportStore.playing ? animatedFavicon : defaultFavicon
    )
  }, [songStore.transportStore.playing])

  return <Favicon url={faviconImages} animated={true} animationDelay={200} />
})

const defaultFavicon = '/favicon.ico'
const animatedFavicon = [
  '/animated-favicon/frame_1.png',
  '/animated-favicon/frame_2.png',
  '/animated-favicon/frame_3.png',
  '/animated-favicon/frame_4.png',
]
