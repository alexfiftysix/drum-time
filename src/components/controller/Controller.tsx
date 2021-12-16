import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import React, { useCallback, useState } from 'react'
import * as Tone from 'tone'
import styles from './Controller.module.scss'
import { TempoSetter } from '../sequencer/tempoSetter/TempoSetter'
import { Sequencer } from '../sequencer/Sequencer'
import { scales } from '../../utilities/scales'
import cn from 'classnames'

type ControllerProps = {
  size: number
}

export const Controller = observer((props: ControllerProps) => {
  const { sequenceStore } = useStore()
  const [loading, setLoading] = useState(true)
  const [looping, setLooping] = useState(false)
  const [scale, setScale] = useState(scales.c)

  const simpleSynth = new Tone.PolySynth(Tone.Synth).toDestination()
  const drumSampler = new Tone.Sampler({
    urls: {
      G2: '/samples/hat.mp3',
      E2: '/samples/snare.mp3',
      C2: '/samples/kick.mp3',
    },
    onload: () => {
      setLoading(false)
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'c') {
      setScale(scales.c)
    } else {
      setScale(scales.cMinor)
    }
  }, [])

  return (
    <div className={styles.root}>
      {!loading ? (
        <>
          <button onClick={onClick}> {looping ? 'Stop' : 'Go'}</button>
          <form className={styles.scaleButtons}>
            <label
              className={cn(styles.scaleButton, {
                [styles.checked]: scale === scales.c,
              })}
            >
              <span>C major</span>
              <input
                type="radio"
                value="c"
                name="scale"
                onChange={handleChange}
              />
            </label>
            <label
              className={cn(styles.scaleButton, {
                [styles.checked]: scale === scales.cMinor,
              })}
            >
              <span>C minor</span>
              <input
                type="radio"
                value="cMinor"
                name="scale"
                onChange={handleChange}
              />
            </label>
          </form>
          <Sequencer
            size={props.size}
            notes={scale.triad}
            synth={simpleSynth}
          />
          <Sequencer
            size={props.size}
            notes={scale.bassTriad}
            synth={simpleSynth}
          />
          <Sequencer
            size={props.size}
            notes={scale.drums}
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
