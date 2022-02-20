import {
  compressRow,
  compressSequencer,
  compressSequencers,
  compressSong,
  decimalToBinary,
  sequenceToBinary,
  unCompressRow,
  unCompressRows,
  unCompressSequence,
  unCompressSequencer,
  unCompressSequencers,
  unCompressSong,
} from './compression'
import { Row, Sequencer, Song } from '../../stores/song-store'

test('sequenceToBinary', () => {
  const sequence = [false, true, true, false, true, true, true, true]

  const compressed = sequenceToBinary(sequence)

  expect(compressed).toBe(111)
})

test('compresses to correct binary string', () => {
  const sequence = [false, true, true, false, true, true, true, true]

  const compressed = sequenceToBinary(sequence)
  const asBinary = decimalToBinary(compressed, 8)

  expect(asBinary).toBe('01101111')
})

test('un-compresses good', () => {
  // '00001111'
  const compressed = '15'
  const asSequence = unCompressSequence(compressed, 8)

  expect(asSequence).toEqual([
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
  ])
})

test('can compress a Row', () => {
  const row: Row = {
    note: 3,
    sequence: [false, true, false, false],
  }

  const compressed = compressRow(row)

  expect(compressed).toBe('3+4')
})

test('can unCompress a Row 1', () => {
  const compressed = '5+8'
  const length = 7

  const unCompressed = unCompressRow(compressed, length)

  const expected: Row = {
    note: 5,
    sequence: [false, false, false, true, false, false, false],
  }
  expect(unCompressed).toEqual(expected)
})

test('can unCompress a Row 2', () => {
  const compressed = '1+0'
  const length = 3

  const unCompressed = unCompressRow(compressed, length)

  const expected: Row = { note: 1, sequence: [false, false, false] }
  expect(unCompressed).toEqual(expected)
})

test('can compress a sequencer', () => {
  // songLength = 3
  const sequencer: Sequencer = {
    name: 'treble',
    octave: 3,
    rows: [
      { note: 1, sequence: [false, false, false] },
      { note: 2, sequence: [false, false, true] },
      { note: 3, sequence: [false, true, false] },
      { note: 4, sequence: [false, true, true] },
      { note: 5, sequence: [true, false, false] },
      { note: 6, sequence: [true, false, true] },
      { note: 7, sequence: [true, true, false] },
      { note: 8, sequence: [true, true, true] },
    ],
  }

  const compressed = compressSequencer(sequencer)

  expect(compressed).toBe('treble;3;1+0,2+1,3+2,4+3,5+4,6+5,7+6,8+7')
})

test('unCompressRows', () => {
  const length = 3
  const compressed = '1+0,2+1,3+2,4+3,5+4,6+5,7+6,8+7'
  const unCompressed = unCompressRows(compressed, length)

  const expected: Row[] = [
    { note: 1, sequence: [false, false, false] },
    { note: 2, sequence: [false, false, true] },
    { note: 3, sequence: [false, true, false] },
    { note: 4, sequence: [false, true, true] },
    { note: 5, sequence: [true, false, false] },
    { note: 6, sequence: [true, false, true] },
    { note: 7, sequence: [true, true, false] },
    { note: 8, sequence: [true, true, true] },
  ]

  expect(unCompressed).toEqual(expected)
})

test('unCompressSequencer', () => {
  const length = 3
  const compressed = 'bass;5;1+7,2+6,3+5,4+3,5+4,6+5,7+6,8+7'
  const unCompressed = unCompressSequencer(compressed, length)

  const expected: Sequencer = {
    name: 'bass',
    octave: 5,
    rows: [
      { note: 1, sequence: [true, true, true] },
      { note: 2, sequence: [true, true, false] },
      { note: 3, sequence: [true, false, true] },
      { note: 4, sequence: [false, true, true] },
      { note: 5, sequence: [true, false, false] },
      { note: 6, sequence: [true, false, true] },
      { note: 7, sequence: [true, true, false] },
      { note: 8, sequence: [true, true, true] },
    ],
  }

  expect(unCompressed).toEqual(expected)
})

test('compressSequencers', () => {
  const sequencers: Sequencer[] = [
    {
      name: 'bass',
      octave: 1,
      rows: [
        { note: 1, sequence: [false, false, false] },
        { note: 2, sequence: [false, false, true] },
        { note: 3, sequence: [false, true, false] },
        { note: 4, sequence: [false, true, true] },
        { note: 5, sequence: [true, false, false] },
        { note: 6, sequence: [true, false, true] },
        { note: 7, sequence: [true, true, false] },
        { note: 8, sequence: [true, true, true] },
      ],
    },
    {
      name: 'treble',
      octave: 8,
      rows: [
        { note: 1, sequence: [true, true, true] },
        { note: 2, sequence: [true, true, false] },
        { note: 3, sequence: [true, false, true] },
        { note: 4, sequence: [true, false, false] },
        { note: 5, sequence: [false, true, true] },
        { note: 6, sequence: [false, true, false] },
        { note: 7, sequence: [false, false, true] },
        { note: 8, sequence: [false, false, false] },
      ],
    },
  ]

  const compressed = compressSequencers(sequencers)

  expect(compressed).toBe(
    'bass;1;1+0,2+1,3+2,4+3,5+4,6+5,7+6,8+7|treble;8;1+7,2+6,3+5,4+4,5+3,6+2,7+1,8+0'
  )
})

test('unCompressSequencers', () => {
  const length = 3
  const compressed =
    'bass;1;1+0,2+1,3+2,4+3,5+4,6+5,7+6,8+7|treble;8;1+7,2+6,3+5,4+4,5+3,6+2,7+1,8+0'
  const unCompressed = unCompressSequencers(compressed, length)

  const expected: Sequencer[] = [
    {
      name: 'bass',
      octave: 1,
      rows: [
        { note: 1, sequence: [false, false, false] },
        { note: 2, sequence: [false, false, true] },
        { note: 3, sequence: [false, true, false] },
        { note: 4, sequence: [false, true, true] },
        { note: 5, sequence: [true, false, false] },
        { note: 6, sequence: [true, false, true] },
        { note: 7, sequence: [true, true, false] },
        { note: 8, sequence: [true, true, true] },
      ],
    },
    {
      name: 'treble',
      octave: 8,
      rows: [
        { note: 1, sequence: [true, true, true] },
        { note: 2, sequence: [true, true, false] },
        { note: 3, sequence: [true, false, true] },
        { note: 4, sequence: [true, false, false] },
        { note: 5, sequence: [false, true, true] },
        { note: 6, sequence: [false, true, false] },
        { note: 7, sequence: [false, false, true] },
        { note: 8, sequence: [false, false, false] },
      ],
    },
  ]

  expect(unCompressed).toEqual(expected)
})

test('compressSong', () => {
  const song: Song = {
    length: 3,
    scaleBase: 'major',
    startNote: 'e',
    mode: 2,
    sequencers: [
      {
        name: 'bass',
        octave: 1,
        rows: [
          { note: 1, sequence: [false, false, false] },
          { note: 2, sequence: [false, false, true] },
          { note: 3, sequence: [false, true, false] },
          { note: 4, sequence: [false, true, true] },
          { note: 5, sequence: [true, false, false] },
          { note: 6, sequence: [true, false, true] },
          { note: 7, sequence: [true, true, false] },
          { note: 8, sequence: [true, true, true] },
        ],
      },
      {
        name: 'treble',
        octave: 8,
        rows: [
          { note: 1, sequence: [true, true, true] },
          { note: 2, sequence: [true, true, false] },
          { note: 3, sequence: [true, false, true] },
          { note: 4, sequence: [true, false, false] },
          { note: 5, sequence: [false, true, true] },
          { note: 6, sequence: [false, true, false] },
          { note: 7, sequence: [false, false, true] },
          { note: 8, sequence: [false, false, false] },
        ],
      },
    ],
    drums: [
      { note: 1, sequence: [false, false, false] },
      { note: 2, sequence: [false, false, true] },
      { note: 3, sequence: [true, true, true] },
    ],
  }

  const compressed = compressSong(song)

  const expectedBassSequencer = 'bass;1;1+0,2+1,3+2,4+3,5+4,6+5,7+6,8+7'
  const expectedTrebleSequencer = 'treble;8;1+7,2+6,3+5,4+4,5+3,6+2,7+1,8+0'
  const expectedSequencers = `${expectedBassSequencer}|${expectedTrebleSequencer}`
  const expectedDrums = '1+0,2+1,3+7'

  expect(compressed).toBe(`3*major*e*2*${expectedSequencers}*${expectedDrums}`)
})

test('unCompressSong', () => {
  const compressed = `3*major*e*2*bass;1;1+0,2+1,3+2,4+3,5+4,6+5,7+6,8+7|treble;8;1+7,2+6,3+5,4+4,5+3,6+2,7+1,8+0*1+0,2+1,3+7`

  const unCompressed = unCompressSong(compressed)

  const expected: Song = {
    length: 3,
    scaleBase: 'major',
    startNote: 'e',
    mode: 2,
    sequencers: [
      {
        name: 'bass',
        octave: 1,
        rows: [
          { note: 1, sequence: [false, false, false] },
          { note: 2, sequence: [false, false, true] },
          { note: 3, sequence: [false, true, false] },
          { note: 4, sequence: [false, true, true] },
          { note: 5, sequence: [true, false, false] },
          { note: 6, sequence: [true, false, true] },
          { note: 7, sequence: [true, true, false] },
          { note: 8, sequence: [true, true, true] },
        ],
      },
      {
        name: 'treble',
        octave: 8,
        rows: [
          { note: 1, sequence: [true, true, true] },
          { note: 2, sequence: [true, true, false] },
          { note: 3, sequence: [true, false, true] },
          { note: 4, sequence: [true, false, false] },
          { note: 5, sequence: [false, true, true] },
          { note: 6, sequence: [false, true, false] },
          { note: 7, sequence: [false, false, true] },
          { note: 8, sequence: [false, false, false] },
        ],
      },
    ],
    drums: [
      { note: 1, sequence: [false, false, false] },
      { note: 2, sequence: [false, false, true] },
      { note: 3, sequence: [true, true, true] },
    ],
  }

  expect(unCompressed).toEqual(expected)
})
