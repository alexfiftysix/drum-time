import { SequencerRow } from './SequencerRow'
import styles from './Sequencer.module.scss'
import { useCallback, useState } from 'react'
import * as Tone from 'tone'
import { TempoSetter } from './tempoSetter/TempoSetter'

type ControllerProps = {
  size: number
  notes: string[]
}

export const Sequencer = (props: ControllerProps) => {
  const [looping, setLooping] = useState(false)

  const synth = new Tone.PolySynth(Tone.Synth).toDestination()

  const onClick = useCallback(() => {
    if (looping) {
      Tone.Transport.stop()
      setLooping(false)
    } else {
      Tone.Transport.start()
      setLooping(true)
    }
  }, [looping])

  return (
    <div className={styles.root}>
      <button onClick={onClick}> {looping ? 'Stop' : 'Go'}</button>
      {props.notes.map((note, index) => (
        <SequencerRow key={index} note={note} size={props.size} synth={synth} />
      ))}
      <TempoSetter />
    </div>
  )
}
