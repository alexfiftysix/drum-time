import { Sequence } from './sequence-store'
import * as Tone from 'tone'
import { makeAndFill } from '../utilities/array-helpers'
import { makeAutoObservable } from 'mobx'
import { RecursivePartial } from 'tone/build/esm/core/util/Interface'

const noteCount = 8

export class TransportStore {
  transport: Sequence & { currentNote: number | undefined }
  stopped: boolean = true

  constructor() {
    this.transport = {
      sequence: new Tone.Sequence().start('+0.1'),
      length: noteCount,
      currentNote: undefined,
      id: 'transport',
    }
    this.transport.sequence.events = makeAndFill(noteCount, undefined)
    makeAutoObservable(this)
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
