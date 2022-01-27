import styles from '../range/Range.module.scss'
import React, { useCallback } from 'react'
import { useStore } from '../../hooks/use-store'
import { observer } from 'mobx-react-lite'

export const NoteCountSetter = observer(() => {
  const { songStore } = useStore()

  const handleSetSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value)
      songStore.setNoteCount(value)
    },
    [songStore]
  )

  return (
    <label className={styles.root}>
      <span className={styles.label}>Size</span>
      <input
        type="number"
        min={1}
        max={32}
        step={1}
        onInput={handleSetSize}
        value={songStore.song.noteCount}
      />
    </label>
  )
})
