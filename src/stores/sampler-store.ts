import { makeAutoObservable } from 'mobx'
import * as Tone from 'tone'

export class SamplerStore {
  sampler: Tone.Sampler
  isLoaded: boolean = false

  constructor() {
    // TODO: these notes are backwards?
    this.sampler = new Tone.Sampler({
      urls: {
        G2: '/samples/hat.mp3',
        E2: '/samples/snare.mp3',
        C2: '/samples/kick.mp3',
      },
      onload: () => {
        this.isLoaded = true
      },
      onerror: () => console.error('sampler failed to initialize'),
      volume: -4.5,
    }).toDestination()

    makeAutoObservable(this)
  }
}
