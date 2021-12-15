import * as Tone from 'tone'
import { RecursivePartial } from 'tone/build/esm/core/util/Interface'
import { makeAutoObservable } from 'mobx'

export class SequenceStore {
  sequence: Tone.Sequence
  currentNote: number = 0
  length: number

  constructor() {
    this.sequence = new Tone.Sequence().start('+0.1')
    this.length = 8
    makeAutoObservable(this)
  }

  setEvents(events: (string | string[] | undefined)[]) {
    this.sequence.events = events
    this.length = events.length
  }

  setCallback(
    callback:
      | RecursivePartial<Tone.ToneEventCallback<string | undefined>>
      | undefined
  ) {
    this.sequence.set({ callback })
  }

  increment() {
    this.currentNote = (this.currentNote + 1) % this.length
  }
}
