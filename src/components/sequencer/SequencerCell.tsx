import styles from './SequencerCell.module.scss'
import cn from 'classnames'

type SequenceBlockProps = {
  text: string
  isOn: boolean
  flip: () => void
  className?: string
}

export const SequencerCell = (props: SequenceBlockProps) => (
  <button
    className={cn(styles.root, { [styles.on]: props.isOn }, props.className)}
    onClick={props.flip}
  >
    {props.text}
  </button>
)
