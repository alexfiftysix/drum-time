import * as Tone from 'tone'
import { useCallback, useEffect, useState } from 'react'
import styles from './SequencerRow.module.scss'
import { SequencerCell } from './SequencerCell'

type Note = string | undefined

type Sequence = Note[]

type SequencerRowProps = {
  note: string
  size: number
}

export const SequencerRow = (props: SequencerRowProps) => {
  const [looping, setLooping] = useState(false)
  const [sequence, setSequence] = useState<Sequence>(
    // @ts-ignore
    [...Array(5).keys()].map(() => undefined),
  )

  const synth = new Tone.Synth().toDestination()
  const toneSequence = new Tone.Sequence((time, note) => {
    if (note) synth.triggerAttackRelease(note, 0.1, time)
  }, sequence).start(0)

  useEffect(() => {
    console.log(sequence)
    toneSequence.events = sequence
  }, [toneSequence, sequence])

  const flip = useCallback(
    (index: number) => {
      setSequence(
        sequence.map((x, i) => {
          if (i === index) {
            if (x === undefined) return props.note
            else return undefined
          }
          return x
        }),
      )
    },
    [props.note, sequence],
  )

  const onClick = useCallback(() => {
    if (looping) {
      Tone.Transport.stop()
      setLooping(false)
    } else {
      Tone.Transport.start()
      setLooping(true)
    }
  }, [looping])

  return (
    <div className={styles.root}>
      <button onClick={onClick}>{looping ? 'Stop' : 'Go'}</button>
      <div className={styles.blocks}>
        {sequence.map((note, index) => (
          <SequencerCell
            key={index}
            text={`${index + 1}`}
            isOn={note !== undefined}
            flip={() => flip(index)}
            className={styles.cell}
          />
        ))}
      </div>
    </div>
  )
}
