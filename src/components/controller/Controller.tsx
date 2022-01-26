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
import { useDebounce } from '../../hooks/use-debounce'
import { Clear } from '../clear/Clear'
import { DrumSequencer } from '../sequencer/DrumSequencer'
import { Note } from 'tone/build/esm/core/type/NoteUnits'

export const Controller = observer(() => {
  const { songData, setParam } = useQueryParams()
  const { songStore } = useStore()
  const { transportStore } = useStore()
  const [looping, setLooping] = useState(false)

  useEffect(() => {
    if (songData.length !== 0) {
      songStore.updateTheWholeSong(songData)
    }
    // We only want this to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useDebounce(
    1000,
    () => {
      const newSongData = songStore.getSongData()
      if (songData !== newSongData) {
        setParam(['songData', newSongData])
      }
    },
    [setParam, songStore]
  )

  useEffect(() => {
    transportStore.setTransportCallback(
      (time: Seconds, _: string | undefined) => {
        Tone.Draw.schedule(() => transportStore.increment(), time)
      }
    )
  }, [transportStore])

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
      notes: makeScale(
        songStore.song.startNote,
        undefined,
        songStore.song.scaleBase,
        songStore.song.mode,
        3
      ),
      colour: 'green',
    },
    {
      name: 'bass',
      notes: makeScale(
        songStore.song.startNote,
        undefined,
        songStore.song.scaleBase,
        songStore.song.mode,
        1
      ),
      colour: 'purple',
    },
  ]

  return (
    <div className={styles.root}>
      <>
        <button onClick={onClick}>{looping ? 'Stop' : 'Go'}</button>
        <ScaleSelector />
        <Clear />
        {/*<Transport />*/}
        {/*<SizeSetter size={size} setSize={setSize} />*/}
        {sequencers.map((s, i) => (
          <Sequencer name={s.name} key={i} notes={s.notes} colour={s.colour} />
        ))}
        <DrumSequencer
          notes={songStore.song.drums.map((r) => r.note as Note)}
          colour="blue"
        />
        <TempoSetter />
        <SwingSetter />
      </>
    </div>
  )
})
