import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import React, { useCallback, useEffect, useState } from 'react'
import * as Tone from 'tone'
import styles from './Controller.module.scss'
import { TempoSetter } from '../sequencer/tempoSetter/TempoSetter'
import { Sequencer, SequencerProps } from '../sequencer/Sequencer'
import { scales } from '../../utilities/scales'
import { ScaleSelector } from '../scaleSelector/ScaleSelector'
import {
  makeScale,
  scaleBlueprints,
  NoteOnly,
  ScaleBase,
  startNotes,
} from '../../utilities/numbered-scales'
import { Seconds } from 'tone/build/esm/core/type/Units'
import { SwingSetter } from '../sequencer/swingSetter/SwingSetter'
import { useQueryParams } from '../../hooks/use-query-params'

export const Controller = observer(() => {
  const { getParam } = useQueryParams()

  const { sequenceStore } = useStore()
  const [loading, setLoading] = useState(true)
  const [looping, setLooping] = useState(false)
  const [size] = useState(8)

  useEffect(() => {
    sequenceStore.setTransportCallback(
      (time: Seconds, _: string | undefined) => {
        Tone.Draw.schedule(() => sequenceStore.increment(), time)
      }
    )
  }, [sequenceStore])

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

  const scaleBase = (getParam('scaleBase') || 'major') as ScaleBase
  const startNote = (getParam('startNote') || 'c') as NoteOnly
  const mode = parseInt(getParam('mode') || '0')

  const sequencers: Omit<SequencerProps, 'size'>[] = [
    {
      notes: makeScale(
        startNotes[startNote],
        undefined,
        scaleBlueprints[scaleBase].map((p) => p.semitonesToNextNote),
        mode,
        3
      ),
      synth: simpleSynth,
      colour: 'green',
    },
    {
      notes: makeScale(
        startNotes[startNote],
        undefined,
        scaleBlueprints[scaleBase].map((p) => p.semitonesToNextNote),
        mode,
        1
      ),
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
          <button className={styles.goButton} onClick={onClick}>
            {looping ? 'Stop' : 'Go'}
          </button>
          <ScaleSelector />
          {/*<Transport />*/}
          {/*<SizeSetter size={size} setSize={setSize} />*/}
          {sequencers.map((s, i) => (
            <Sequencer
              key={i}
              size={size}
              notes={s.notes}
              synth={s.synth}
              colour={s.colour}
            />
          ))}
          <TempoSetter />
          <SwingSetter />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
})
