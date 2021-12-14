import * as Tone from 'tone'
import { useCallback, useEffect, useState } from 'react'
import styles from './SequencerRow.module.scss'
import { SequencerCell } from './SequencerCell'

type SequencerRowProps = {
  note: string
  size: number
}

export const SequencerRow = (props: SequencerRowProps) => {
  const [looping, setLooping] = useState(false)

  const synth = new Tone.Synth().toDestination()
  const toneSequence = new Tone.Sequence(
    (time, note) => {
      if (note) synth.triggerAttackRelease(note, 0.1, time)
    },
    // @ts-ignore
    [...Array(props.size).keys()].map(() => undefined)
  ).start(0)

  useEffect(() => {
    console.log(toneSequence.events)
  }, [toneSequence.events])

  const flip = useCallback(
    (index: number) => {
      toneSequence.events = toneSequence.events.map((note, i) => {
        if (i === index) return note === undefined ? props.note : undefined
        return note
      })
    },
    [props.note, toneSequence]
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
        {toneSequence.events.map((note, index) => (
          <SequencerCell
            key={index}
            text={`${index + 1}`}
            initialState={note !== undefined}
            flip={() => flip(index)}
            className={styles.cell}
          />
        ))}
      </div>
    </div>
  )
}
