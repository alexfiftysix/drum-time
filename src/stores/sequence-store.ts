import * as Tone from 'tone'
import { RecursivePartial } from 'tone/build/esm/core/util/Interface'
import { makeAutoObservable } from 'mobx'

type Sequence = {
  sequence: Tone.Sequence
  length: number
  currentNote: number
}

export class SequenceStore {
  bag: Map<string, Sequence> = new Map<string, Sequence>()
  stopped: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  getSequencer(id: string) {
    const seq = this.bag.get(id)
    if (seq) {
      return seq
    } else {
      const newSeq: Sequence = {
        sequence: new Tone.Sequence().start('+0.1'),
        length: 8,
        currentNote: 0,
      }
      this.bag.set(id, newSeq)
      return newSeq
    }
  }

  setEvents(id: string, events: (string | undefined | number)[]) {
    const seq = this.getSequencer(id)
    seq.sequence.events = events
    seq.length = events.length
  }

  setCallback(
    id: string,
    callback:
      | RecursivePartial<Tone.ToneEventCallback<string | undefined>>
      | undefined
  ) {
    this.getSequencer(id).sequence.set({ callback })
  }

  increment(id: string) {
    if (this.stopped) return
    const seq = this.getSequencer(id)
    seq.currentNote = (seq.currentNote + 1) % seq.length
  }

  stop() {
    this.stopped = true
    this.bag.forEach((value, key) =>
      this.bag.set(key, { ...value, currentNote: 0 })
    )
  }

  go() {
    this.stopped = false
  }
}
