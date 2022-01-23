import * as Tone from 'tone'
import { RecursivePartial } from 'tone/build/esm/core/util/Interface'
import { makeAutoObservable } from 'mobx'
import { range } from '../utilities/array-helpers'

export type Sequence = {
  id: string
  sequence: Tone.Sequence
  length: number
}

export class SequenceStore {
  bag: Sequence[] = []
  stopped: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  getSequencer(id: string): Sequence {
    if (!this.bag.find((s) => s.id === id)) {
      const newSeq = new Tone.Sequence().start('+0.1')
      newSeq.events = range(0, 8).map((_) => undefined)
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

  setEvents(id: string, events: (string | undefined | number)[]) {
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
    id: string,
    callback:
      | RecursivePartial<Tone.ToneEventCallback<string | undefined>>
      | undefined
  ) {
    this.getSequencer(id).sequence.set({ callback })
  }
}
