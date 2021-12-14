import styles from './SequencerCell.module.scss'
import cn from 'classnames'
import { useState } from 'react'

type SequenceBlockProps = {
  text: string
  initialState: boolean
  flip: () => void
  className?: string
}

export const SequencerCell = (props: SequenceBlockProps) => {
  const [on, setOn] = useState(props.initialState)

  return (
    <button
      className={cn(styles.root, { [styles.on]: on }, props.className)}
      onClick={() => {
        props.flip()
        setOn(!on)
      }}
    >
      {props.text}
    </button>
  )
}
