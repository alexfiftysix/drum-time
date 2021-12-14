import * as Tone from 'tone'
import { useCallback } from 'react'
import styles from './SequencerRow.module.scss'
import { SequencerCell } from './SequencerCell'
import { Synth } from 'tone'

type SequencerRowProps = {
  note: string
  size: number
  synth: Synth | Tone.PolySynth
}

export const SequencerRow = (props: SequencerRowProps) => {
  const toneSequence = new Tone.Sequence(
    (time, note) => {
      if (note) props.synth.triggerAttackRelease(note, 0.1, time)
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
