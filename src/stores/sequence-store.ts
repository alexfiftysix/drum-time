import * as Tone from 'tone'
import { RecursivePartial } from 'tone/build/esm/core/util/Interface'
import { makeAutoObservable } from 'mobx'
import { range } from '../utilities/array-helpers'

type Sequence = {
  id: string
  sequence: Tone.Sequence
  length: number
}

export class SequenceStore {
  bag: Sequence[] = []
  transport: Sequence & { currentNote: number | undefined }
  stopped: boolean = true

  constructor() {
    this.transport = {
      sequence: new Tone.Sequence().start('+0.1'),
      length: 8,
      currentNote: undefined,
      id: '',
    }
    this.transport.sequence.events = range(0, 8).map((_) => undefined)
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

  setTransportCallback(
    callback:
      | RecursivePartial<Tone.ToneEventCallback<string | undefined>>
      | undefined
  ) {
    this.transport.sequence.set({ callback })
  }

  increment() {
    if (this.stopped) {
      return
    }
    this.transport = {
      ...this.transport,
      currentNote:
        this.transport.currentNote === undefined
          ? 0
          : (this.transport.currentNote + 1) % this.transport.length,
    }
  }

  stop() {
    this.stopped = true
    this.transport.currentNote = undefined
  }

  go() {
    this.stopped = false
  }
}
