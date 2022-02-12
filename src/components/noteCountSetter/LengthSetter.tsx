import styles from '../range/Range.module.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { observer } from 'mobx-react-lite'
import { useDebouncedEffect } from '../../hooks/use-debounced-effect'

const minSize = 1
const maxSize = 64

export const LengthSetter = observer(() => {
  const { songStore } = useStore()
  const [newLength, setNewLength] = useState(songStore.song.noteCount)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setNewLength(songStore.song.noteCount)
    setLoaded(true)
  }, [songStore.song.noteCount])

  const handleSetSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value)
      setNewLength(clamp(value, minSize, maxSize))
    },
    []
  )

  useDebouncedEffect(
    () => {
      if (loaded) songStore.setNoteCount(newLength)
    },
    200,
    [newLength, songStore, loaded]
  )

  return (
    <label className={styles.root}>
      <span className={styles.label}>Length</span>
      <input
        type="number"
        min={minSize}
        max={maxSize}
        step={1}
        onInput={handleSetSize}
        value={newLength}
      />
    </label>
  )
})

const clamp = (x: number, min: number, max: number) =>
  x < min ? min : x > max ? max : x
