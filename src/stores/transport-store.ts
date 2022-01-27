import { Sequence } from './sequence-store'
import * as Tone from 'tone'
import { makeAndFill } from '../utilities/array-helpers'
import { makeAutoObservable } from 'mobx'
import { DEFAULT_NOTE_COUNT } from '../utilities/constants'
import { Seconds } from 'tone/build/esm/core/type/Units'

export class TransportStore {
  transport: Sequence & { currentNote: number | undefined }
  playing: boolean = false

  constructor() {
    this.transport = {
      sequence: new Tone.Sequence().start('+0.1'),
      length: DEFAULT_NOTE_COUNT,
      currentNote: undefined,
      id: 'transport',
    }
    this.transport.sequence.events = makeAndFill(DEFAULT_NOTE_COUNT, undefined)
    this.transport.sequence.set({
      callback: (time: Seconds, _: string | undefined) => {
        Tone.Draw.schedule(() => this.increment(), time)
      },
    })
    makeAutoObservable(this)
  }

  increment() {
    // this.playing is used because sometimes tone.js stops a little late, and we get an unwanted increment
    if (!this.playing) return
    this.transport = {
      ...this.transport,
      currentNote:
        this.transport.currentNote === undefined
          ? 0
          : (this.transport.currentNote + 1) % this.transport.length,
    }
  }

  start() {
    this.playing = true
  }

  stop() {
    this.playing = false
    this.transport.currentNote = undefined
    console.log('stop transport!')
  }

  setNoteCount(newCount: number) {
    this.transport.sequence.events = makeAndFill(newCount, undefined)
    this.transport.length = newCount
  }
}
