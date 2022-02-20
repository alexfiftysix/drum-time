import { Row, Sequencer, SequencerName, Song } from '../../stores/song-store'
import { MidiNote } from 'tone/build/esm/core/type/NoteUnits'
import { NoteOnly, Octave, ScaleBase } from '../scales'

const separators = {
  row: '+',
  rows: ',',
  sequencer: ';',
  sequencers: '|',
  song: '*',
}

export const sequenceToBinary = (sequence: boolean[]) =>
  parseInt(sequence.map((b) => (b ? '1' : '0')).join(''), 2)

export const decimalToBinary = (decimal: number, length: number) =>
  (decimal >>> 0).toString(2).padStart(length, '0')

export const unCompressSequence = (compressed: string, length: number) => {
  const asNumber = parseInt(compressed)
  if (isNaN(asNumber)) {
    throw new Error('That is not a compress sequence')
  }
  return decimalToBinary(asNumber, length)
    .split('')
    .map((x) => x === '1')
}

export const compressRow = (row: Row) => {
  return `${row.note}${separators.row}${sequenceToBinary(row.sequence)}`
}

export const unCompressRow = (compressedRow: string, length: number): Row => {
  const split = compressedRow.split(separators.row)

  return {
    note: parseInt(split[0]) as MidiNote,
    sequence: unCompressSequence(split[1], length),
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
  length: number
): Row[] => {
  const split = compressedRows.split(separators.rows)
  return split.map((s) => unCompressRow(s, length))
}

export const unCompressSequencer = (
  compressedSequencer: string,
  length: number
): Sequencer => {
  const pieces = compressedSequencer.split(separators.sequencer)
  const compressedRows = pieces[2]

  return {
    name: pieces[0] as SequencerName,
    octave: parseInt(pieces[1]) as Octave,
    rows: unCompressRows(compressedRows, length),
  }
}

export const compressSequencers = (sequencers: Sequencer[]): string => {
  return sequencers.map((s) => compressSequencer(s)).join(separators.sequencers)
}

export const unCompressSequencers = (compressed: string, length: number) => {
  const split = compressed.split(separators.sequencers)
  return split.map((s) => unCompressSequencer(s, length))
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

  return {
    length,
    scaleBase: split[1] as ScaleBase,
    startNote: split[2] as NoteOnly,
    mode: parseInt(split[3]),
    sequencers: unCompressSequencers(split[4], length),
    drums: unCompressRows(split[5], length),
  }
}
