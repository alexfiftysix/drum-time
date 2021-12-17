import styles from './TempoSetter.module.scss'
import React, { useCallback, useEffect, useState } from 'react'
import * as Tone from 'tone'

const minTempo = 1
const maxTempo = 300

export const TempoSetter = () => {
  const [tempo, setTempo] = useState(120)

  useEffect(() => {
    Tone.Transport.bpm.rampTo(tempo, 0.1)
  }, [tempo])

  const handleSetTempo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value)
      if (Number.isNaN(value) || value < minTempo || value > maxTempo) return
      setTempo(value)
    },
    [setTempo]
  )

  return (
    <label className={styles.root}>
      <span className={styles.label}>bpm</span>
      <input
        type="range"
        min={minTempo}
        max={maxTempo}
        step={1}
        onInput={handleSetTempo}
        value={tempo}
      />
      <input
        className={styles.numberInput}
        type="number"
        min={minTempo}
        max={maxTempo}
        step={0}
        onInput={handleSetTempo}
        value={tempo}
      />
    </label>
  )
}
