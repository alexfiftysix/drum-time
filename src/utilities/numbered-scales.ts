import { mtof } from 'tone'
import { MidiNote } from 'tone/build/esm/core/type/NoteUnits'

export type ScaleBase = 'major' | 'harmonicMinor'

type ScaleDegree = { semitonesToNextNote: number; mode: string }

export const scaleBlueprints: Record<ScaleBase, ScaleDegree[]> = {
  major: [
    { semitonesToNextNote: 2, mode: 'ionan' },
    { semitonesToNextNote: 2, mode: 'dorian' },
    { semitonesToNextNote: 1, mode: 'phrygian' },
    { semitonesToNextNote: 2, mode: 'lydian' },
    { semitonesToNextNote: 2, mode: 'mixolydian' },
    { semitonesToNextNote: 2, mode: 'aeolian' },
    { semitonesToNextNote: 1, mode: 'locrian' },
  ],
  harmonicMinor: [
    { semitonesToNextNote: 2, mode: 'ionan' },
    { semitonesToNextNote: 1, mode: 'locrian 6' },
    { semitonesToNextNote: 2, mode: 'ionion #5' },
    { semitonesToNextNote: 2, mode: 'dorian #11' },
    { semitonesToNextNote: 1, mode: 'phyrgian dominant' },
    { semitonesToNextNote: 3, mode: 'lydian #2' },
    { semitonesToNextNote: 1, mode: 'super locrian bb7' },
  ],
  // pentatonic: [
  //   { semitonesToNextNote: 2, mode: 'ionan' },
  //   { semitonesToNextNote: 2, mode: 'dorian' },
  //   { semitonesToNextNote: 3, mode: 'phrygian' },
  //   { semitonesToNextNote: 2, mode: 'mixolydian' },
  //   { semitonesToNextNote: 3, mode: 'aeolian' },
  // ],
}

const toUsefulBlueprint = (scaleBlueprint: number[]) => {
  let sum = 0
  return scaleBlueprint.map((v) => (sum += v))
}

export type NoteOnly = 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'b'
export const startNotesOnly = ['c', 'd', 'e', 'f', 'g', 'a', 'b']

export const startNotes = {
  c: 24,
  d: 26,
  e: 28,
  f: 29,
  g: 31,
  a: 33,
  b: 35,
}

const rotateScale = (scale: number[], mode: number) => {
  if (mode > scale.length) throw new Error('rotation too big')
  return scale.slice(mode).concat(scale.slice(0, mode))
}

type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type Accidental = 'sharp' | 'flat' | undefined

const addAccidental = (note: number, accidental: Accidental) =>
  accidental === undefined ? note : accidental === 'sharp' ? note + 1 : note - 1

export const makeScale = (
  startNote: number,
  accidental: Accidental,
  scaleBlueprint: number[],
  mode: number,
  octave: Octave
) =>
  [
    startNote + octave * 12,
    ...toUsefulBlueprint(rotateScale(scaleBlueprint, mode)).map(
      (n) => addAccidental(startNote, accidental) + n + octave * 12
    ),
  ]
    .map((n) => mtof(n as MidiNote))
    .reverse()

export const makeMidiScale = (
  startNote: number,
  accidental: Accidental,
  scaleBlueprint: number[],
  mode: number,
  octave: Octave
) =>
  [
    startNote + octave * 12,
    ...toUsefulBlueprint(rotateScale(scaleBlueprint, mode)).map(
      (n) => addAccidental(startNote, accidental) + n + octave * 12
    ),
  ].reverse()
