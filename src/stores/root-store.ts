import { SongStore } from './song-store'

export class RootStore {
  songStore: SongStore

  constructor() {
    this.songStore = new SongStore()
  }
}

export interface IRootStore extends RootStore {}
