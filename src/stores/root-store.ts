import { SequenceStore } from "./sequence-store";

export class RootStore {
  sequenceStore: SequenceStore

  constructor() {
    this.sequenceStore = new SequenceStore()
  }
}

export interface IRootStore extends RootStore {}
