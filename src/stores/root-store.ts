import { SongStore } from './song-store'
import { TransportStore } from './transport-store'

export class RootStore {
  songStore: SongStore
  transportStore: TransportStore

  constructor() {
    this.songStore = new SongStore()
    this.transportStore = new TransportStore()
  }
}

export interface IRootStore extends RootStore {}
