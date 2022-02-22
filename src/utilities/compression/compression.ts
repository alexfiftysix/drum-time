import { Row, Sequencer, SequencerName, Song } from '../../stores/song-store'
import { MidiNote, Note } from 'tone/build/esm/core/type/NoteUnits'
import { drumScale, makeScale, NoteOnly, Octave, ScaleBase } from '../scales'

const separators = {
  rows: ',',
  sequencer: ';',
  sequencers: '|',
  song: '*',
}

export const sequenceToBinary = (sequence: boolean[]) =>
  parseInt(sequence.map((b) => (b ? '1' : '0')).join(''), 2)

export const decimalToBinary = (decimal: number, length: number) =>
  (decimal >>> 0).toString(2).padStart(length, '0')

export const unCompressSequence = (
  compressed: string,
  length: number
): boolean[] => {
  const asNumber = parseInt(compressed)
  if (isNaN(asNumber)) {
    throw new Error('That is not a compress sequence')
  }
  return decimalToBinary(asNumber, length)
    .split('')
    .map((x) => x === '1')
}

export const compressRow = (row: Row) => {
  return `${sequenceToBinary(row.sequence)}`
}

export const unCompressRow = (
  compressedRow: string,
  length: number,
  note: MidiNote | Note
): Row => {
  return {
    note,
    sequence: unCompressSequence(compressedRow, length),
  }
}

const compressRows = (rows: Row[]) =>
  rows.map((row) => compressRow(row)).join(separators.rows)

export const compressSequencer = (sequencer: Sequencer) => {
  const rows = compressRows(sequencer.rows)
  return `${sequencer.name}${separators.sequencer}${sequencer.octave}${separators.sequencer}${rows}`
}

export const unCompressRows = (
  compressedRows: string,
  length: number,
  scale: MidiNote[] | Note[]
): Row[] => {
  const split = compressedRows.split(separators.rows)
  return split.map((s, i) => unCompressRow(s, length, scale[i]))
}

type ScaleOrInstructions =
  | {
      type: 'instructions'
      scaleBase: ScaleBase
      startNote: NoteOnly
      mode: number
    }
  | { type: 'scale'; notes: Note[] }

export const unCompressSequencer = (
  compressedSequencer: string,
  length: number,
  seqThing: ScaleOrInstructions
): Sequencer => {
  const pieces = compressedSequencer.split(separators.sequencer)
  const name = pieces[0] as SequencerName
  const octave = parseInt(pieces[1]) as Octave
  const compressedRows = pieces[2]
  const scale =
    seqThing.type === 'scale'
      ? seqThing.notes
      : makeScale(
          seqThing.startNote,
          undefined,
          seqThing.scaleBase,
          seqThing.mode,
          octave
        )

  return {
    name,
    octave,
    rows: unCompressRows(compressedRows, length, scale),
  }
}

export const compressSequencers = (sequencers: Sequencer[]): string => {
  return sequencers.map((s) => compressSequencer(s)).join(separators.sequencers)
}

export const unCompressSequencers = (
  compressed: string,
  length: number,
  scaleBase: ScaleBase,
  startNote: NoteOnly,
  mode: number
) => {
  const split = compressed.split(separators.sequencers)
  return split.map((s) =>
    unCompressSequencer(s, length, {
      type: 'instructions',
      scaleBase,
      startNote,
      mode,
    })
  )
}

export const compressSong = (song: Song) => {
  return `${song.length}${separators.song}${song.scaleBase}${separators.song}${
    song.startNote
  }${separators.song}${song.mode}${separators.song}${compressSequencers(
    song.sequencers
  )}${separators.song}${compressRows(song.drums)}`
}

export const unCompressSong = (compressed: string): Song => {
  const split = compressed.split(separators.song)
  const length = parseInt(split[0])
  if (isNaN(length)) throw new Error('Song data is bad')

  const scaleBase = split[1] as ScaleBase
  const startNote = split[2] as NoteOnly
  const mode = parseInt(split[3])

  return {
    length,
    scaleBase,
    startNote,
    mode,
    sequencers: unCompressSequencers(
      split[4],
      length,
      scaleBase,
      startNote,
      mode
    ),
    drums: unCompressRows(split[5], length, drumScale),
  }
}
