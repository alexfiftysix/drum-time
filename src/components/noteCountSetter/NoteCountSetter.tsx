import styles from '../range/Range.module.scss'
import React, { useCallback, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { observer } from 'mobx-react-lite'
import { useDebounce } from '../../hooks/use-debounce'

const minSize = 1
const maxSize = 64

export const NoteCountSetter = observer(() => {
  const { songStore } = useStore()
  const [newSize, setNewSize] = useState(songStore.song.noteCount)

  const handleSetSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value)
      setNewSize(clamp(value, minSize, maxSize))
    },
    []
  )

  useDebounce(
    200,
    () => {
      songStore.setNoteCount(newSize)
    },
    [newSize, songStore]
  )

  return (
    <label className={styles.root}>
      <span className={styles.label}>Size</span>
      <input
        type="number"
        min={minSize}
        max={maxSize}
        step={1}
        onInput={handleSetSize}
        value={newSize}
      />
    </label>
  )
})

const clamp = (x: number, min: number, max: number) =>
  x < min ? min : x > max ? max : x
