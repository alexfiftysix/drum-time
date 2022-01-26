import * as Tone from 'tone'
import { RecursivePartial } from 'tone/build/esm/core/util/Interface'
import { makeAutoObservable } from 'mobx'
import { makeAndFill } from '../utilities/array-helpers'
import { SequencerName } from './song-store'

type SequenceId = 'transport' | `${SequencerName | 'drums'}-${number}`

export type Sequence = {
  id: SequenceId
  sequence: Tone.Sequence
  length: number
}

export class SequenceStore {
  bag: Sequence[] = []
  stopped: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  getSequencer(id: SequenceId): Sequence {
    if (!this.bag.find((s) => s.id === id)) {
      const newSeq = new Tone.Sequence().start('+0.1')
      newSeq.events = makeAndFill(8, undefined)
      this.bag = [
        ...this.bag,
        {
          id,
          sequence: newSeq,
          length: 8,
        },
      ]
    }
    return this.bag.find((s) => s.id === id)!
  }

  setEvents(id: SequenceId, events: (string | undefined | number)[]) {
    this.bag = this.bag.map((s) => {
      if (s.id !== id) {
        return s
      }
      const updatedSequence = s.sequence
      updatedSequence.events = events
      return {
        ...s,
        sequence: updatedSequence,
        length: updatedSequence.length,
      }
    })
  }

  setCallback(
    id: SequenceId,
    callback:
      | RecursivePartial<Tone.ToneEventCallback<string | undefined>>
      | undefined
  ) {
    this.getSequencer(id).sequence.set({ callback })
  }
}
