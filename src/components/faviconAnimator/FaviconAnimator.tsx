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
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAC1QTFRFAAAAAAEAAAAAAQAAAAABAQAAAQABAQEAAAAAAAD//wD/////AAAAAP//AP8AOf02QAAAAA90Uk5TAP/+/v//////AQEBAf8B+MR9TAAAALdJREFUeJzt0zEKgzAUgOGsxVJ4g+jqHVo8QEXc25fkAJo9Q3EvCG/sqlOv4yFyl4LU1hd3HfTf8vIRQiBCDEFyzhBzA1DHhFTU6UtMOwAYU6ExFgBQF6TsDOQlygFEiHGT2jcDAdjr5SHLexQlz0oh3BQ7oTvq0LEQnfvvn/qWGg+oKQj6VnugYUC0XUgcaMmAEFnGBwDLAyI+8NfbA/Rta8Af7GB8tPEDrwm8FgCzS60C9vZ+fQD3ZqKOyupj9QAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAEJQTFRFAAAAAAEAAAAAAQAAAAABAQAAAQABAQEAAAAAAAD//wD/AAAA/////wD+/wD9/gD+/wD//gD//wD//wH/AP8A/wH+KX8olAAAABZ0Uk5TAP/+/v//////AQEBAf/+/////v8B/4DZBRwAAAENSURBVHic7ZLRcoQgDEVhJSZqWRJo//9Xe9PW6cyOsu/KedmJcI9X2BBOiPERp5QSgTTPcwTMUUSIRJIwT7ysy3aWXzwwOxD4D8dfMCIODWwL6Arw5vSX3wXsjdCDJgjWjuADe2OaJmIXJEoY+RHlgUZ4hCZYWsJ68vo1bCSRcn6WrKa1tarNWi1mak0bZm+i2ewo/7mhmn+mlVJMNSPQFJhZzer5HwHjUT6s7wIcNSFf9F/QqpnP+oUZl8GQHTYIyK8RhvLMe6DC0Eqt+ABTt5HQjHbt7BAD/gLJw2frfiW99SsIcI3S2/BufQiuK5AXhuCagncbhmAIdvSFOwq6XEDgdA/pJoLBYHBbvgGv3jgrTcP54AAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAC1QTFRFAAAAAP8A////AAD//wD/AAAAAAEAAAAAAQAAAAABAQAAAQABAQEAAAAAAP//IJgadwAAAA90Uk5TAAEBAQEB//7+////////tSMEwgAAAOdJREFUeJzt0zEKwkAQBdCJi71HEE+grvZCvIF3mCLE1jsoHsAg9jrZPYBuv4WkFwJ7hZzBKIrOSiyTQj+kyMxjZjcQgH8aSHB7utCvFqLsTUR1vyVlF+SXARBKEKHsVIPpWAzCckWvL4blwrLijcPFMiHaGsRs7sjtsjUHAtGYExljEZH0zin7AbZHSu8gJprnazvht0C7WZ3T4yGOF5eTItwrNmHU1lHBQlQUr34wky73gHoHrZnUHsgZADmKHAc6ZQAgSXgBsX7gHC/4778H3CO/BvzCHzw/2vMHbhJ4qQF8HKpOcAXeOTrYzY6oagAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAEJQTFRFAAAAAP8A////AAD//wD/AAAAAAEAAAAAAQAAAAABAQAAAQABAQEAAAAA/wD+/wD9/gD+/wD//gD//wD//wH//wH+HdUxGwAAABZ0Uk5TAAEBAQEB//7+/////////v////7//zQqn6YAAAFGSURBVHic7ZLRjoQgDEWVIiMIDC3s///q3uqYTWYcTXx0vQ+SUu6htHbdrVuXU7+uBh86haDFZk/6DUHz7XTu/s4uTtK1Pzy9BbA04Pre0vIEY0jLMXPyVZSmzDeAcw83eu8D5KdpclCMLqUUQko+xThGlDd8A5AaJhUAukS3CCHswIBGOw2aAbjZv/wrIGpFqCOMANgdgMFZ58cxRAX44BHGh0sPVIQtVIIULUM2HxSy3RCSCzk/S2bh2lrlJq0WEZbGDbFWwllka9D9gD19ppRShDnD0BgSkZpZ/TMgYivjGR9/mlEAWh3gL/wHaFVEY/5BjGFEwGSzkdizDoTyzKuhgtBKrXiAsNJCChOqa9Z2tDlK/AJezd+6rCPZy18BgDGmvQNH+RtwXUB60w24JuDowA24Aav4Tf8RsKsLAFS7Tbo+4Bfif0n3jd7IogAAAABJRU5ErkJggg==',
]
