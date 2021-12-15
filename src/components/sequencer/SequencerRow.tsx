import * as Tone from 'tone'
import { useCallback, useEffect } from 'react'
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
  synth: Synth | Tone.PolySynth
}

export const SequencerRow = observer((props: SequencerRowProps) => {
  const { sequenceStore } = useStore()

  useEffect(() => {
    sequenceStore.setEvents(range(0, props.size).map(() => undefined))
  }, [props.size, sequenceStore])

  useEffect(() => {
    sequenceStore.setCallback((time: Seconds, note: string | undefined) => {
      if (note) props.synth.triggerAttackRelease(note, 0.1, time)
      Tone.Draw.schedule(() => sequenceStore.increment(), time)
    })
  }, [props.synth, sequenceStore])

  const flip = useCallback(
    (index: number) => {
      sequenceStore.setEvents(
        sequenceStore.sequence.events.map((note, i) => {
          if (i === index) return note === undefined ? props.note : undefined
          return note
        })
      )
    },
    [props.note, sequenceStore]
  )

  return (
    <div className={styles.blocks}>
      {toJS(sequenceStore.sequence.events).map((note, index) => (
        <SequencerCell
          key={index}
          initialState={note !== undefined}
          flip={() => flip(index)}
          className={styles.cell}
          playingNow={sequenceStore.currentNote === index}
        />
      ))}
    </div>
  )
})
