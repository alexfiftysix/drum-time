import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import { useCallback, useState } from 'react'
import * as Tone from 'tone'
import styles from './Controller.module.scss'
import { TempoSetter } from '../sequencer/tempoSetter/TempoSetter'
import { Sequencer } from '../sequencer/Sequencer'
import { scales } from '../../utilities/scales'

type ControllerProps = {
  size: number
}

export const Controller = observer((props: ControllerProps) => {
  const { sequenceStore } = useStore()
  const [loading, setLoading] = useState(true)
  const [looping, setLooping] = useState(false)

  const polySynth = new Tone.PolySynth(Tone.Synth).toDestination()
  const drumSampler = new Tone.Sampler({
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
          <Sequencer
            size={props.size}
            notes={scales.triadC}
            synth={polySynth}
          />
          <Sequencer
            size={props.size}
            notes={scales.drums}
            synth={drumSampler}
          />
          <TempoSetter />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
})
