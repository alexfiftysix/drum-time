import styles from './SequencerRow.module.scss'
import {
  SequenceCellProps,
  SequencerCell,
} from '../sequencerCell/SequencerCell'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { useStore } from '../../../hooks/use-store'
import { SequencerName } from '../../../stores/song-store'
import { single } from '../../../utilities/array-helpers'

type SequencerRowProps = {
  rowIndex: number
  sequencerName: SequencerName
  note: string | number
  colour: SequenceCellProps['colour']
}

export const SequencerRow = observer((props: SequencerRowProps) => {
  const { songStore } = useStore()

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
          playingNow={
            songStore.transportStore.transport.currentNote === noteIndex
          }
          colour={props.colour}
          rowIndex={props.rowIndex}
          noteIndex={noteIndex}
          sequencerName={props.sequencerName}
        />
      ))}
    </div>
  )
})
