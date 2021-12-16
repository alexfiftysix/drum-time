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
  const [loading, setLoading] = useState(true)
  const [looping, setLooping] = useState(false)

  const sampler = new Tone.Sampler({
    urls: {
      G2: '/samples/hat.mp3',
      E2: '/samples/snare.mp3',
      C2: '/samples/kick.mp3',
    },
    onload: () => {
      setLoading(false)
      console.log('loaded')
    },
    onerror: () => console.error('oh no'),
  }).toDestination()

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
      {!loading ? (
        <>
          <button onClick={onClick}> {looping ? 'Stop' : 'Go'}</button>
          <div className={styles.sequencer}>
            {props.notes.map((note, index) => (
              <SequencerRow
                key={index}
                note={note}
                size={props.size}
                synth={sampler}
              />
            ))}
          </div>
          <TempoSetter />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
})
