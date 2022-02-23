import { SongStore } from './song-store'
import { ThemeStore } from './theme-store'

export class RootStore {
  songStore: SongStore
  themeStore: ThemeStore

  constructor() {
    this.songStore = new SongStore()
    this.themeStore = new ThemeStore()
  }
}

export interface IRootStore extends RootStore {}
