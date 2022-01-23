import { SamplerStore } from './sampler-store'
import { SongStore } from './song-store'
import { TransportStore } from './transport-store'

export class RootStore {
  samplerStore: SamplerStore
  songStore: SongStore
  transportStore: TransportStore

  constructor() {
    this.samplerStore = new SamplerStore()
    this.songStore = new SongStore()
    this.transportStore = new TransportStore()
  }
}

export interface IRootStore extends RootStore {}
