import React, { useCallback } from 'react'
import { useStore } from '../../hooks/use-store'
import { observer } from 'mobx-react-lite'

export const GoStop = observer(() => {
  const { songStore } = useStore()

  const onClick = useCallback(() => {
    if (!songStore.playing) {
      songStore.start()
    } else {
      songStore.stop()
    }
  }, [songStore])

  return <button onClick={onClick}>{songStore.playing ? 'Stop' : 'Go'}</button>
})
