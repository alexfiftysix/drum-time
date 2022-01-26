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
  const { songStore } = useStore()

  const flip = () => {
    songStore.drumFlip(props.rowIndex, props.noteIndex)
  }

  let colourStyle
  switch (props.colour) {
    case 'purple':
      colourStyle = styles.purple
      break
    case 'green':
      colourStyle = styles.green
      break
    case 'blue':
      colourStyle = styles.blue
      break
  }

  return (
    <button
      className={cn(
        styles.root,
        {
          [styles.active]:
            songStore.song.drums[props.rowIndex].sequence[props.noteIndex],
          [styles.playingNow]: props.playingNow,
        },
        colourStyle,
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
