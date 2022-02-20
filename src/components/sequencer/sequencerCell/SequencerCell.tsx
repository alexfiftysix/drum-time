import styles from './SequencerCell.module.scss'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../hooks/use-store'
import { SequencerName } from '../../../stores/song-store'
import { single } from '../../../utilities/array-helpers'

export type SequenceCellProps = {
  playingNow: boolean
  className?: string
  colour: 'green' | 'purple' | 'blue'
  sequencerName: SequencerName
  rowIndex: number
  noteIndex: number
}

export const SequencerCell = observer((props: SequenceCellProps) => {
  const { songStore } = useStore()

  const flip = () => {
    songStore.flip(props.sequencerName, props.rowIndex, props.noteIndex)
  }

  return (
    <button
      className={cn(
        styles.root,
        {
          [styles.active]: single(
            songStore.song.sequencers,
            (s) => s.name === props.sequencerName
          ).rows[props.rowIndex].sequence[props.noteIndex],
          [styles.playingNow]: props.playingNow,
          [styles.first]: props.rowIndex === 0,
          [styles.last]: props.rowIndex === songStore.song.noteCount - 1,
        },
        props.className
      )}
      onClick={() => {
        flip()
      }}
    >
      {' '}
    </button>
  )
})
