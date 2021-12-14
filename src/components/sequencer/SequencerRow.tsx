import * as Tone from 'tone'
import { useCallback } from 'react'
import styles from './SequencerRow.module.scss'
import { SequencerCell } from './SequencerCell'

type SequencerRowProps = {
  note: string
  size: number
}

export const SequencerRow = (props: SequencerRowProps) => {
  const synth = new Tone.Synth().toDestination()
  const toneSequence = new Tone.Sequence(
    (time, note) => {
      if (note) synth.triggerAttackRelease(note, 0.1, time)
    },
    // @ts-ignore
    [...Array(props.size).keys()].map(() => undefined)
  ).start(0)

  const flip = useCallback(
    (index: number) => {
      toneSequence.events = toneSequence.events.map((note, i) => {
        if (i === index) return note === undefined ? props.note : undefined
        return note
      })
    },
    [props.note, toneSequence]
  )

  return (
    <div className={styles.blocks}>
      <p className={styles.noteName}>{props.note}</p>
      {toneSequence.events.map((note, index) => (
        <SequencerCell
          key={index}
          initialState={note !== undefined}
          flip={() => flip(index)}
          className={styles.cell}
        />
      ))}
    </div>
  )
}
