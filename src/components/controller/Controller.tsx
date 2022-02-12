import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import React, { useEffect } from 'react'
import styles from './Controller.module.scss'
import { TempoSetter } from '../sequencer/tempoSetter/TempoSetter'
import { Sequencer, SequencerProps } from '../sequencer/Sequencer'
import { ScaleSelector } from '../scaleSelector/ScaleSelector'
import { makeScale } from '../../utilities/scales'
import { SwingSetter } from '../sequencer/swingSetter/SwingSetter'
import { useQueryParams } from '../../hooks/use-query-params'
import { Clear } from '../clear/Clear'
import { DrumSequencer } from '../sequencer/DrumSequencer'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { Share } from '../share/Share'
import { LengthSetter } from '../noteCountSetter/LengthSetter'
import { GoStop } from '../goStop/GoStop'
import { useDebouncedEffect } from '../../hooks/use-debounced-effect'

export const Controller = observer(() => {
  const { songData, setParam } = useQueryParams()
  const { songStore } = useStore()

  useEffect(() => {
    songStore.loadSong(songData)
    // We only want this to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useDebouncedEffect(
    () => {
      const newSongData = songStore.getSongData()
      if (songData !== newSongData) {
        setParam(['songData', newSongData])
      }
    },
    1000,
    [setParam, songStore]
  )

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
        <GoStop />
        <Clear />
        <ScaleSelector />
        {/*<Transport />*/}
        <LengthSetter />
        {sequencers.map((s, i) => (
          <Sequencer name={s.name} key={i} notes={s.notes} colour={s.colour} />
        ))}
        <DrumSequencer
          notes={songStore.song.drums.map((r) => r.note as Note)}
          colour="blue"
        />
        <TempoSetter />
        <SwingSetter />
        <Share />
      </>
    </div>
  )
})
