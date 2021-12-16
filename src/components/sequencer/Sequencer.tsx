import { SequencerRow } from './SequencerRow'
import styles from './Sequencer.module.scss'
import * as Tone from 'tone'
import { observer } from 'mobx-react-lite'
import { Synth } from 'tone'
import { SequenceCellProps } from './SequencerCell'

export type SequencerProps = {
  size: number
  notes: string[]
  synth: Synth | Tone.PolySynth | Tone.Sampler
  colour: SequenceCellProps['colour']
}

export const Sequencer = observer((props: SequencerProps) => {
  return (
    <div className={styles.root}>
      {props.notes.map((note, index) => (
        <SequencerRow
          key={index}
          note={note}
          size={props.size}
          synth={props.synth}
          colour={props.colour}
        />
      ))}
    </div>
  )
})
