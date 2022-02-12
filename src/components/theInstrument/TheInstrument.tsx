import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/use-store'
import { Sequencer, SequencerProps } from '../sequencer/Sequencer'
import { makeScale } from '../../utilities/scales'
import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { DrumSequencer } from '../sequencer/DrumSequencer'
import styles from './TheInstrument.module.scss'

export const TheInstrument = observer(() => {
  const { songStore } = useStore()

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
      {sequencers.map((s, i) => (
        <Sequencer name={s.name} key={i} notes={s.notes} colour={s.colour} />
      ))}
      <DrumSequencer
        notes={songStore.song.drums.map((r) => r.note as Note)}
        colour="blue"
      />
    </div>
  )
})
