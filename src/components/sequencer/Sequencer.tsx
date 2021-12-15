import { SequencerRow } from './SequencerRow'
import styles from './Sequencer.module.scss'
import { useCallback, useState } from 'react'
import * as Tone from 'tone'
import { TempoSetter } from './tempoSetter/TempoSetter'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'

type ControllerProps = {
  size: number
  notes: (string | string[])[]
}

export const Sequencer = observer((props: ControllerProps) => {
  const { sequenceStore } = useStore()
  const [looping, setLooping] = useState(false)

  const synth = new Tone.PolySynth(Tone.Synth).toDestination()

  const onClick = useCallback(() => {
    if (!looping) {
      sequenceStore.go()
      Tone.Transport.start()
      setLooping(true)
    } else {
      sequenceStore.stop()
      Tone.Transport.stop()
      setLooping(false)
    }
  }, [looping, sequenceStore])

  return (
    <div className={styles.root}>
      <button onClick={onClick}> {looping ? 'Stop' : 'Go'}</button>
      <div className={styles.sequencer}>
        {props.notes.map((note, index) => (
          <SequencerRow
            key={index}
            note={note}
            size={props.size}
            synth={synth}
          />
        ))}
      </div>
      <TempoSetter />
    </div>
  )
})
