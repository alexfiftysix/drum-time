import * as Tone from 'tone'
import styles from './SequencerRow.module.scss'
import { SequenceCellProps, SequencerCell } from './SequencerCell'
import { Synth } from 'tone'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { useStore } from '../../hooks/use-store'
import { SequencerName } from '../../stores/song-store'
import { single } from '../../utilities/array-helpers'

type SequencerRowProps = {
  id: string
  rowIndex: number
  sequencerName: SequencerName
  note: string | number
  size: number
  synth: Synth | Tone.PolySynth | Tone.Sampler
  colour: SequenceCellProps['colour']
}

export const SequencerRow = observer((props: SequencerRowProps) => {
  const { transportStore, songStore } = useStore()

  const myRow = toJS(
    single(songStore.song.sequencers, (s) => s.name === props.sequencerName)
      .rows[props.rowIndex]
  )
  return (
    <div className={styles.blocks}>
      {myRow.sequence.map((note, noteIndex) => (
        <SequencerCell
          key={noteIndex}
          className={styles.cell}
          playingNow={transportStore.transport.currentNote === noteIndex}
          colour={props.colour}
          rowIndex={props.rowIndex}
          noteIndex={noteIndex}
          sequencerName={props.sequencerName}
        />
      ))}
    </div>
  )
})
