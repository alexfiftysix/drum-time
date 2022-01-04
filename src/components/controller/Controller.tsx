import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import React, { useCallback, useState } from 'react'
import * as Tone from 'tone'
import styles from './Controller.module.scss'
import { TempoSetter } from '../sequencer/tempoSetter/TempoSetter'
import { Sequencer, SequencerProps } from '../sequencer/Sequencer'
import { majorModifier, ScaleModifier, scales } from '../../utilities/scales'
import { ScaleSelector } from '../scaleSelector/ScaleSelector'
import {
  makeScale,
  modes,
  NoteOnly,
  scaleBlueprints,
  startNotes,
} from '../../utilities/numbered-scales'

type ControllerProps = {
  size: number
}

export const Controller = observer((props: ControllerProps) => {
  const { sequenceStore } = useStore()
  const [loading, setLoading] = useState(true)
  const [looping, setLooping] = useState(false)
  const [startNote, setStartNote] = useState<NoteOnly>('c')
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
      setStartNote(e.target.value as 'c' | 'g')
    },
    [setStartNote]
  )

  const sequencers: Omit<SequencerProps, 'size'>[] = [
    {
      notes: makeScale(
        startNotes[startNote],
        undefined,
        scaleBlueprints.major,
        modes.ionan,
        3
      ),
      synth: simpleSynth,
      colour: 'green',
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
          <button className={styles.goButton} onClick={onClick}>
            {' '}
            {looping ? 'Stop' : 'Go'}
          </button>
          <ScaleSelector
            handleScaleChange={handleScaleChange}
            selectedScale={startNote}
            setScaleModifier={setScaleMod}
            selectedModifier={scaleMod}
          />
          {sequencers.map((s, i) => (
            <Sequencer
              key={i}
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
