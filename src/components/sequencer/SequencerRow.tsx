import * as Tone from 'tone'
import { useCallback, useEffect, useState } from 'react'
import styles from './SequencerRow.module.scss'
import { SequencerCell } from './SequencerCell'
import { Synth } from 'tone'
import { Seconds } from 'tone/build/esm/core/type/Units'
import { range } from '../../utilities/array-helpers'
import { useStore } from '../../hooks/use-store'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

type SequencerRowProps = {
  note: string | string[]
  size: number
  synth: Synth | Tone.PolySynth | Tone.Sampler
}

const getRandom = (length: number) => `${Math.random() * length}`

export const SequencerRow = observer((props: SequencerRowProps) => {
  console.log('render')
  const [id] = useState(getRandom(10))
  const { sequenceStore } = useStore()

  useEffect(() => {
    sequenceStore.setEvents(
      id,
      range(0, props.size).map(() => undefined)
    )
  }, [id, props.size, sequenceStore])

  useEffect(() => {
    sequenceStore.setCallback(id, (time: Seconds, note: string | undefined) => {
      if (note) props.synth.triggerAttackRelease(note, 0.1, time)
      Tone.Draw.schedule(() => sequenceStore.increment(id), time)
    })
  }, [id, props.synth, sequenceStore])

  const flip = useCallback(
    (index: number) => {
      sequenceStore.setEvents(
        id,
        sequenceStore.getSequencer(id).sequence.events.map((note, i) => {
          if (i === index) return note === undefined ? props.note : undefined
          return note
        })
      )
    },
    [id, props.note, sequenceStore]
  )

  return (
    <div className={styles.blocks}>
      {toJS(sequenceStore.getSequencer(id).sequence.events).map(
        (note, index) => (
          <SequencerCell
            key={index}
            initialState={note !== undefined}
            flip={() => flip(index)}
            className={styles.cell}
            playingNow={sequenceStore.getSequencer(id).currentNote === index}
          />
        )
      )}
    </div>
  )
})
