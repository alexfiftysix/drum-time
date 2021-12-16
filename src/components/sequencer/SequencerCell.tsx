import styles from './SequencerCell.module.scss'
import cn from 'classnames'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'

export type SequenceCellProps = {
  initialState: boolean
  flip: () => void
  playingNow: boolean
  className?: string
  colour: 'green' | 'purple' | 'blue'
}

export const SequencerCell = observer((props: SequenceCellProps) => {
  const [active, setActive] = useState(props.initialState)

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
        { [styles.active]: active, [styles.playingNow]: props.playingNow },
        colourStyle,
        props.className
      )}
      onClick={() => {
        props.flip()
        setActive(!active)
      }}
    >
      {' '}
    </button>
  )
})
