import { SequencerRow } from './SequencerRow'
import styles from './Sequencer.module.scss'
import * as Tone from 'tone'
import { observer } from 'mobx-react-lite'
import { Synth } from 'tone'
import { SequenceCellProps } from './SequencerCell'
import { SequencerName } from '../../stores/song-store'

export type SequencerProps = {
  size: number
  name: SequencerName
  notes: string[] | number[]
  synth: Synth | Tone.PolySynth | Tone.Sampler
  colour: SequenceCellProps['colour']
}

export const Sequencer = observer((props: SequencerProps) => {
  return (
    <div className={styles.root}>
      {props.notes.map((note, rowIndex) => (
        <SequencerRow
          id={`${props.name}-${rowIndex}`}
          key={rowIndex}
          note={note}
          size={props.size}
          synth={props.synth}
          colour={props.colour}
          rowIndex={rowIndex}
          sequencerName={props.name}
        />
      ))}
    </div>
  )
})
