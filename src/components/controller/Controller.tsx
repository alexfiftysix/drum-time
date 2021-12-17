import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import React, { useCallback, useState } from 'react'
import * as Tone from 'tone'
import styles from './Controller.module.scss'
import { TempoSetter } from '../sequencer/tempoSetter/TempoSetter'
import { Sequencer, SequencerProps } from '../sequencer/Sequencer'
import {
  getScale,
  majorModifier,
  ScaleModifier,
  scales,
} from '../../utilities/scales'
import cn from 'classnames'

type ControllerProps = {
  size: number
}

export const Controller = observer((props: ControllerProps) => {
  const { sequenceStore } = useStore()
  const [loading, setLoading] = useState(true)
  const [looping, setLooping] = useState(false)
  const [scale, setScale] = useState<'C' | 'G'>('C')
  const [scaleMod, setScaleMod] = useState<ScaleModifier>(majorModifier)

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

  const handleScaleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setScale(e.target.value as 'C' | 'G')
    },
    []
  )

  const sequencers: Omit<SequencerProps, 'size'>[] = [
    {
      notes: getScale(scale, 4, scaleMod, 'full').reverse(),
      synth: simpleSynth,
      colour: 'green',
    },
    {
      notes: getScale(scale, 2, scaleMod, 'triad').reverse(),
      synth: simpleSynth,
      colour: 'purple',
    },
    {
      notes: scales.c.drums,
      synth: drumSampler,
      colour: 'blue',
    },
  ]

  return (
    <div className={styles.root}>
      {!loading ? (
        <>
          <button onClick={onClick}> {looping ? 'Stop' : 'Go'}</button>
          <form className={styles.scaleButtons}>
            <label
              className={cn(styles.scaleButton, {
                [styles.checked]: scale === 'C',
              })}
            >
              <span>C</span>
              <input
                type="radio"
                value="C"
                name="scale"
                onChange={handleScaleChange}
              />
            </label>
            <label
              className={cn(styles.scaleButton, {
                [styles.checked]: scale === 'G',
              })}
            >
              <span>G</span>
              <input
                type="radio"
                value="G"
                name="scale"
                onChange={handleScaleChange}
              />
            </label>
          </form>
          {sequencers.map((s) => (
            <Sequencer
              size={props.size}
              notes={s.notes}
              synth={s.synth}
              colour={s.colour}
            />
          ))}
          <TempoSetter />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
})
