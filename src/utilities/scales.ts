import { Note } from 'tone/build/esm/core/type/NoteUnits'
import { zip } from './array-helpers'

export type ScaleGroup = {
  full: string[]
  triad: string[]
  bassTriad: string[]
  drums: string[]
}

export type Octave = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type SimpleNoteOnly = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
type Accidental = '#' | 'x' | 'b' | 'bb' | ''
type NoteOnly = `${SimpleNoteOnly}${Accidental}`

const isDoubleSharp = (s: NoteOnly) => s.endsWith('x')
const isSharp = (s: NoteOnly) => s.endsWith('#') || s.endsWith('x')
const isDoubleFlat = (s: NoteOnly) => s.endsWith('bb')
const isFlat = (s: NoteOnly) => s.endsWith('b')
const sharpen = (note: NoteOnly): NoteOnly => {
  if (isDoubleSharp(note)) throw new Error('Cannot sharpen a double-sharp')
  if (isSharp(note)) return (note.substr(0, note.length - 1) + 'x') as NoteOnly
  if (isFlat(note)) return note.substr(0, note.length - 1) as NoteOnly
  return (note + '#') as NoteOnly
}
const flatten = (note: NoteOnly): NoteOnly => {
  if (isDoubleFlat(note)) throw new Error('Cannot flatten a double-flat')
  if (isDoubleSharp(note))
    return (note.substr(0, note.length - 1) + '#') as NoteOnly
  if (isSharp(note)) return note.substr(0, note.length - 1) as NoteOnly
  return (note + 'b') as NoteOnly
}
const noteToOctave = (note: NoteOnly, octave: Octave): Note =>
  `${note}${octave}`

type MajorScale = NoteOnly[]
const cScale: MajorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
const gScale: MajorScale = ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G']
const mySpecialScales = {
  C: cScale,
  G: gScale,
}

type NoteModifier = 'natural' | 'sharpen' | 'flatten'
export type ScaleModifier = NoteModifier[]
export const majorModifier: ScaleModifier = Array(8).fill('natural')
export const minorModifier: ScaleModifier = [
  'natural',
  'natural',
  'flatten',
  'natural',
  'natural',
  'flatten',
  'flatten',
]

const modifyNote = (note: NoteOnly, mod: NoteModifier) =>
  mod === 'natural' ? note : mod === 'sharpen' ? sharpen(note) : flatten(note)

type Scale = NoteOnly[]
const modifyScale = (scale: MajorScale, modifier: ScaleModifier): Scale => {
  const zipped = zip(scale, modifier, (note, mod) => ({ note, mod }))
  return zipped.map((z) => modifyNote(z.note, z.mod))
}

type ScaleInOctave = Note[]
const scaleToOctave = (scale: Scale, octave: Octave): ScaleInOctave =>
  scale.map((note) => noteToOctave(note, octave))

const scaleToTriad = (scale: ScaleInOctave): ScaleInOctave => {
  if (scale.length < 8) throw Error('need 8 notes to make a triad')
  return [scale[0], scale[2], scale[4]]
}

export const getScale = (
  scale: 'C' | 'G',
  octave: Octave,
  modifier: ScaleModifier,
  type: 'full' | 'triad'
): ScaleInOctave => {
  let modified = scaleToOctave(
    modifyScale(mySpecialScales[scale], modifier),
    octave
  )
  return type === 'triad' ? scaleToTriad(modified) : modified
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

export const drumScale = ['G2', 'E2', 'C2']
