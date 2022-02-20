import styles from '../range/Range.module.scss'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../hooks/use-store'
import { observer } from 'mobx-react-lite'
import { useDebouncedEffect } from '../../hooks/use-debounced-effect'
import { NumberInput } from '../numberInput/NumberInput'

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

  const handleSetSize = (value: number) =>
    setNewLength(clamp(value, minSize, maxSize))

  useDebouncedEffect(
    () => {
      if (loaded) songStore.setNoteCount(newLength)
    },
    200,
    [newLength, songStore, loaded]
  )

  return (
    <div className={styles.root}>
      <label htmlFor={'length'} className={styles.label}>
        Length
      </label>
      <NumberInput
        value={newLength}
        minSize={minSize}
        maxSize={maxSize}
        handleSetSize={handleSetSize}
        inputId={'length'}
      />
    </div>
  )
})

const clamp = (x: number, min: number, max: number) =>
  x < min ? min : x > max ? max : x
