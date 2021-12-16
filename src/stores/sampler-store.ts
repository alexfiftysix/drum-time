import { makeAutoObservable } from 'mobx'
import * as Tone from 'tone'

export class SamplerStore {
  sampler: Tone.Sampler
  isLoaded: boolean = false

  constructor() {
    this.sampler = new Tone.Sampler({
      urls: {
        G2: '/samples/hat.mp3',
        E2: '/samples/snare.mp3',
        C2: '/samples/kick.mp3',
      },
      onload: () => {
        this.isLoaded = true
        console.log('loaded')
      },
      onerror: () => console.error('oh no'),
    }).toDestination()

    makeAutoObservable(this)
  }
}
