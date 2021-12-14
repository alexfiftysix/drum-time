import styles from './TempoSetter.module.scss'
import { useEffect, useState } from 'react'
import * as Tone from 'tone'

export const TempoSetter = () => {
  const [tempo, setTempo] = useState(120)

  useEffect(() => {
    Tone.Transport.bpm.rampTo(tempo, 0.1)
  }, [tempo])

  return (
    <label className={styles.root}>
      <span className={styles.label}>bpm</span>
      <input
        type="number"
        step={0}
        // @ts-ignore
        onInput={(event) => setTempo(event.target.value)}
        value={tempo}
      />
    </label>
  )
}
