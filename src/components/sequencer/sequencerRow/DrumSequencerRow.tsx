import styles from './SequencerRow.module.scss'
import { SequenceCellProps } from '../sequencerCell/SequencerCell'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../hooks/use-store'
import { DrumSequencerCell } from '../sequencerCell/DrumSequencerCell'

type DrumSequencerRowProps = {
  rowIndex: number
  note: string | number
  colour: SequenceCellProps['colour']
}

export const DrumSequencerRow = observer((props: DrumSequencerRowProps) => {
  const { songStore } = useStore()

  return (
    <div className={styles.blocks}>
      {songStore.song.drums[props.rowIndex].sequence.map((note, noteIndex) => (
        <DrumSequencerCell
          key={noteIndex}
          className={styles.cell}
          playingNow={
            songStore.transportStore.transport.currentNote === noteIndex
          }
          colour={props.colour}
          rowIndex={props.rowIndex}
          noteIndex={noteIndex}
        />
      ))}
    </div>
  )
})
