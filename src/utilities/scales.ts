import { mtof } from 'tone'
import { MidiNote, Note } from 'tone/build/esm/core/type/NoteUnits'

export type ScaleBase = 'major' | 'harmonicMinor'
export type NoteOnly = 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'b'
export const startNotesOnly: NoteOnly[] = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
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
    { semitonesToNextNote: 2, mode: 'aeolian ♯7' },
    { semitonesToNextNote: 1, mode: 'Locrian ♮6' },
    { semitonesToNextNote: 2, mode: 'ionian ♯5' },
    { semitonesToNextNote: 2, mode: 'ukrainian dorian' },
    { semitonesToNextNote: 1, mode: 'phrygian dominant' },
    { semitonesToNextNote: 3, mode: 'lydian ♯2' },
    { semitonesToNextNote: 1, mode: 'superlocrian ♭♭7' },
  ],
  // pentatonic: [
  //   { semitonesToNextNote: 2, mode: 'ionan' },
  //   { semitonesToNextNote: 2, mode: 'dorian' },
  //   { semitonesToNextNote: 3, mode: 'phrygian' },
  //   { semitonesToNextNote: 2, mode: 'mixolydian' },
  //   { semitonesToNextNote: 3, mode: 'aeolian' },
  // ],
}
type ScaleDegree = { semitonesToNextNote: number; mode: string }

const toUsefulBlueprint = (scaleBlueprint: number[]) => {
  let sum = 0
  return scaleBlueprint.map((v) => (sum += v))
}

const startNotes: Record<NoteOnly, MidiNote> = {
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

export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type Accidental = 'sharp' | 'flat' | undefined

const addAccidental = (note: number, accidental: Accidental) =>
  accidental === undefined ? note : accidental === 'sharp' ? note + 1 : note - 1

export const makeScale = (
  startNote: NoteOnly,
  accidental: Accidental,
  scaleBase: ScaleBase,
  mode: number,
  octave: Octave
) =>
  [
    startNotes[startNote] + octave * 12,
    ...toUsefulBlueprint(
      rotateScale(
        scaleBlueprints[scaleBase].map((p) => p.semitonesToNextNote),
        mode
      )
    ).map(
      (n) => addAccidental(startNotes[startNote], accidental) + n + octave * 12
    ),
  ]
    .map((n) => mtof(n as MidiNote))
    .reverse()

export const drumScale: Note[] = ['G2', 'E2', 'C2']
