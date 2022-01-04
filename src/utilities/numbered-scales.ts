import { mtof } from 'tone'
import { MidiNote } from 'tone/build/esm/core/type/NoteUnits'

// Numbers are gaps in semitones to the next note
export const scaleBlueprints = {
  major: [2, 2, 1, 2, 2, 2, 1],
  harmonicMinor: [2, 1, 2, 2, 1, 3, 1],
}

const toUsefulBlueprint = (scaleBlueprint: number[]) => {
  let sum = 0
  return scaleBlueprint.map((v) => (sum += v))
}

// number is how many degrees to rotate the scale
export const modes = {
  ionan: 0,
  dorian: 1,
  phrygian: 2,
  lydian: 3,
  mixolydian: 4,
  aeolian: 5,
  locrian: 6,
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
  return scale.slice(0, mode).concat(scale.slice(mode))
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
    ...rotateScale(toUsefulBlueprint(scaleBlueprint), mode).map(
      (n) => addAccidental(startNote, accidental) + n + octave * 12
    ),
  ]
    .map((n) => mtof(n as MidiNote))
    .reverse()
