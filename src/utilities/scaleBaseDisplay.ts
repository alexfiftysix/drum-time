import { ScaleBase } from './scales'

export const displayScaleBase = (scaleBase: ScaleBase) => {
  switch (scaleBase) {
    case 'major':
      return 'Major'
    case 'harmonicMinor':
      return 'Harmonic Minor'
    default:
      throw new Error("That's not a valid scale base")
  }
}
