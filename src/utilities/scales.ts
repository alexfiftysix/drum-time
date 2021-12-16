export type Scale = {
  full: string[]
  triad: string[]
  bassTriad: string[]
  drums: string[]
}

export const scales = {
  c: {
    full: ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'],
    triad: ['C5', 'G4', 'E4', 'C4'],
    bassTriad: ['C3', 'G2', 'E2', 'C2'],
    drums: ['G2', 'E2', 'C2'],
  },
  cMinor: {
    full: ['Cb5', 'B4', 'Ab4', 'G4', 'F4', 'Eb4', 'D4', 'C4'],
    triad: ['C5', 'G4', 'Eb4', 'C4'],
    bassTriad: ['C3', 'G2', 'Eb2', 'C2'],
    drums: ['G2', 'E2', 'C2'],
  },
}
