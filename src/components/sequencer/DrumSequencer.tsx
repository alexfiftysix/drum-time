import { observer } from 'mobx-react-lite'
import { SequenceCellProps } from './sequencerCell/SequencerCell'
import { DrumSequencerRow } from './sequencerRow/DrumSequencerRow'
import { Note } from 'tone/build/esm/core/type/NoteUnits'

export type SequencerProps = {
  notes: Note[]
  colour: SequenceCellProps['colour']
}

export const DrumSequencer = observer((props: SequencerProps) => (
  <div>
    {props.notes.map((note, rowIndex) => (
      <DrumSequencerRow
        key={rowIndex}
        note={note}
        colour={props.colour}
        rowIndex={rowIndex}
      />
    ))}
  </div>
))
