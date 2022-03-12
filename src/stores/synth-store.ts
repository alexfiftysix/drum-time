import { makeAutoObservable } from 'mobx'
import { PolySynth, Synth } from 'tone'

const allSynths = ['simple', 'sawtooth', 'square', 'sine', 'triangle'] as const
export type SynthName = typeof allSynths[number]

export class SynthStore {
  bag: Record<SynthName, PolySynth> = {
    simple: new PolySynth(Synth).toDestination(),
    sawtooth: new PolySynth(Synth, {
      oscillator: { type: 'sawtooth' },
    }).toDestination(),
    square: new PolySynth(Synth, {
      oscillator: { type: 'square' },
    }).toDestination(),
    sine: new PolySynth(Synth, {
      oscillator: { type: 'sine' },
    }).toDestination(),
    triangle: new PolySynth(Synth, {
      oscillator: { type: 'triangle' },
    }).toDestination(),
  }
  constructor() {
    makeAutoObservable(this)
  }
}

export const getNextSynth = (current: SynthName) => {
  while (true) {
    const next = allSynths[Math.floor(Math.random() * allSynths.length)]
    if (next !== current) return next
  }
}
