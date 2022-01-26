import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import React, { useCallback, useEffect, useState } from 'react'
import * as Tone from 'tone'
import styles from './Controller.module.scss'
import { TempoSetter } from '../sequencer/tempoSetter/TempoSetter'
import { Sequencer, SequencerProps } from '../sequencer/Sequencer'
import { ScaleSelector } from '../scaleSelector/ScaleSelector'
import { makeScale } from '../../utilities/scales'
import { Seconds } from 'tone/build/esm/core/type/Units'
import { SwingSetter } from '../sequencer/swingSetter/SwingSetter'
import { useQueryParams } from '../../hooks/use-query-params'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from '../../hooks/use-debounce'

export const Controller = observer(() => {
  const navigate = useNavigate()
  const params = useParams()
  const { mode, scaleBase, startNote } = useQueryParams()
  const { songStore } = useStore()
  const { songData } = useParams()
  const { transportStore } = useStore()
  const [looping, setLooping] = useState(false)
  const [size] = useState(8)

  useEffect(() => {
    if (songData !== undefined) songStore.updateTheWholeSong(songData)
    // We only want this to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useDebounce(
    1000,
    () => {
      const newSongData = songStore.getSongData()
      if (songData !== newSongData) {
        navigate(`/${newSongData}`)
      }
    },
    [navigate, params, songStore.getSongData]
  )

  useEffect(() => {
    transportStore.setTransportCallback(
      (time: Seconds, _: string | undefined) => {
        Tone.Draw.schedule(() => transportStore.increment(), time)
      }
    )
  }, [transportStore])

  const simpleSynth = new Tone.PolySynth(Tone.Synth).toDestination()
  // const drumSampler = new Tone.Sampler({
  //   urls: {
  //     G2: '/samples/hat.mp3',
  //     E2: '/samples/snare.mp3',
  //     C2: '/samples/kick.mp3',
  //   },
  //   onload: () => {
  //     setLoading(false)
  //   },
  //   onerror: () => console.error('oh no'),
  // }).toDestination()

  const onClick = useCallback(() => {
    if (!looping) {
      transportStore.go()
      Tone.Transport.start()
      setLooping(true)
    } else {
      transportStore.stop()
      Tone.Transport.stop()
      setLooping(false)
    }
  }, [looping, transportStore])

  const sequencers: Omit<SequencerProps, 'size'>[] = [
    {
      name: 'treble',
      notes: makeScale(startNote, undefined, scaleBase, mode, 3),
      synth: simpleSynth,
      colour: 'green',
    },
    {
      name: 'bass',
      notes: makeScale(startNote, undefined, scaleBase, mode, 1),
      synth: simpleSynth,
      colour: 'purple',
    },
    // TODO: Bring this back
    // {
    //   name: 'drums',
    //   notes: drumScale,
    //   synth: drumSampler,
    //   colour: 'blue',
    // },
  ]

  return (
    <div className={styles.root}>
      <>
        <button className={styles.goButton} onClick={onClick}>
          {looping ? 'Stop' : 'Go'}
        </button>
        <ScaleSelector />
        {/*<Transport />*/}
        {/*<SizeSetter size={size} setSize={setSize} />*/}
        {sequencers.map((s, i) => (
          <Sequencer
            name={s.name}
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
    </div>
  )
})
