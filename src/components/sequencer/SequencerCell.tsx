import styles from './SequencerCell.module.scss'
import cn from 'classnames'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'

type SequenceBlockProps = {
  initialState: boolean
  flip: () => void
  playingNow: boolean
  className?: string
}

export const SequencerCell = observer((props: SequenceBlockProps) => {
  const [active, setActive] = useState(props.initialState)

  return (
    <button
      className={cn(
        styles.root,
        { [styles.active]: active, [styles.playingNow]: props.playingNow },
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
