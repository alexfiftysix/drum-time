import { SequenceStore } from './sequence-store'
import { SamplerStore } from './sampler-store'

export class RootStore {
  sequenceStore: SequenceStore
  samplerStore: SamplerStore

  constructor() {
    this.sequenceStore = new SequenceStore()
    this.samplerStore = new SamplerStore()
  }
}

export interface IRootStore extends RootStore {}
