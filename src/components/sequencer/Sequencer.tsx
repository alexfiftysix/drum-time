import { SequencerRow } from './sequencerRow/SequencerRow'
import { observer } from 'mobx-react-lite'
import { SequenceCellProps } from './sequencerCell/SequencerCell'
import { SequencerName } from '../../stores/song-store'

export type SequencerProps = {
  name: SequencerName
  notes: string[] | number[]
  colour: SequenceCellProps['colour']
}

export const Sequencer = observer((props: SequencerProps) => (
  <div>
    {props.notes.map((note, rowIndex) => (
      <SequencerRow
        key={rowIndex}
        note={note}
        colour={props.colour}
        rowIndex={rowIndex}
        sequencerName={props.name}
      />
    ))}
  </div>
))
