import styles from './SequencerCell.module.scss'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../hooks/use-store'

export type SequenceCellProps = {
  playingNow: boolean
  className?: string
  colour: 'green' | 'purple' | 'blue'
  rowIndex: number
  noteIndex: number
}

export const DrumSequencerCell = observer((props: SequenceCellProps) => {
  const { songStore, themeStore } = useStore()

  const flip = () => {
    songStore.drumFlip(props.rowIndex, props.noteIndex)
  }

  return (
    <button
      className={cn(
        styles.root,
        {
          [styles.active]:
            songStore.song.drums[props.rowIndex].sequence[props.noteIndex],
          [styles.playingNow]: props.playingNow,
          [styles.first]: props.rowIndex === 0,
          [styles.last]: props.rowIndex === 2,
          [styles.switching]: themeStore.switching,
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
