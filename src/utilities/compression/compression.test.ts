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

  expect(compressed).toBe('4')
})

test('can unCompress a Row 1', () => {
  const compressed = '8'
  const length = 7

  const unCompressed = unCompressRow(compressed, length, 5)

  const expected: Row = {
    note: 5,
    sequence: [false, false, false, true, false, false, false],
  }
  expect(unCompressed).toEqual(expected)
})

test('can unCompress a Row 2', () => {
  const compressed = '0'
  const length = 3

  const unCompressed = unCompressRow(compressed, length, 1)

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

  expect(compressed).toBe('t;3;0,1,2,3,4,5,6,7')
})

test('unCompressRows', () => {
  const length = 3
  const compressed = '0,1,2,3,4,5,6,7'
  const unCompressed = unCompressRows(
    compressed,
    length,
    [1, 2, 3, 4, 5, 6, 7, 8]
  )

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
  const compressed = 't;4;7,6,5,3,4,5,6,7'
  const unCompressed = unCompressSequencer(compressed, length, {
    type: 'instructions',
    mode: 0,
    scaleBase: 'major',
    startNote: 'c',
  })

  const expected: Sequencer = {
    name: 'treble',
    octave: 4,
    rows: [
      { note: 72, sequence: [true, true, true] },
      { note: 71, sequence: [true, true, false] },
      { note: 69, sequence: [true, false, true] },
      { note: 67, sequence: [false, true, true] },
      { note: 65, sequence: [true, false, false] },
      { note: 64, sequence: [true, false, true] },
      { note: 62, sequence: [true, true, false] },
      { note: 60, sequence: [true, true, true] },
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

  expect(compressed).toBe('b;1;0,1,2,3,4,5,6,7|t;8;7,6,5,4,3,2,1,0')
})

test('unCompressSequencers', () => {
  const length = 3
  const compressed = 'b;1;0,1,2,3,4,5,6,7|t;8;7,6,5,4,3,2,1,0'
  const unCompressed = unCompressSequencers(compressed, length, 'major', 'c', 0)

  const expected: Sequencer[] = [
    {
      name: 'bass',
      octave: 1,
      rows: [
        { note: 36, sequence: [false, false, false] },
        { note: 35, sequence: [false, false, true] },
        { note: 33, sequence: [false, true, false] },
        { note: 31, sequence: [false, true, true] },
        { note: 29, sequence: [true, false, false] },
        { note: 28, sequence: [true, false, true] },
        { note: 26, sequence: [true, true, false] },
        { note: 24, sequence: [true, true, true] },
      ],
    },
    {
      name: 'treble',
      octave: 8,
      rows: [
        { note: 120, sequence: [true, true, true] },
        { note: 119, sequence: [true, true, false] },
        { note: 117, sequence: [true, false, true] },
        { note: 115, sequence: [true, false, false] },
        { note: 113, sequence: [false, true, true] },
        { note: 112, sequence: [false, true, false] },
        { note: 110, sequence: [false, false, true] },
        { note: 108, sequence: [false, false, false] },
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
    mode: 0,
    sequencers: [
      {
        name: 'bass',
        octave: 1,
        rows: [
          { note: 40, sequence: [false, false, false] },
          { note: 39, sequence: [false, false, true] },
          { note: 37, sequence: [false, true, false] },
          { note: 35, sequence: [false, true, true] },
          { note: 33, sequence: [true, false, false] },
          { note: 32, sequence: [true, false, true] },
          { note: 30, sequence: [true, true, false] },
          { note: 28, sequence: [true, true, true] },
        ],
      },
      {
        name: 'treble',
        octave: 8,
        rows: [
          { note: 124, sequence: [true, true, true] },
          { note: 123, sequence: [true, true, false] },
          { note: 121, sequence: [true, false, true] },
          { note: 119, sequence: [true, false, false] },
          { note: 117, sequence: [false, true, true] },
          { note: 115, sequence: [false, true, false] },
          { note: 114, sequence: [false, false, true] },
          { note: 112, sequence: [false, false, false] },
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

  const expectedBassSequencer = 'b;1;0,1,2,3,4,5,6,7'
  const expectedTrebleSequencer = 't;8;7,6,5,4,3,2,1,0'
  const expectedSequencers = `${expectedBassSequencer}|${expectedTrebleSequencer}`
  const expectedDrums = '0,1,7'

  expect(compressed).toBe(`3*m*e*0*${expectedSequencers}*${expectedDrums}`)
})

test('unCompressSong', () => {
  const compressed = `3*m*e*0*b;1;0,1,2,3,4,5,6,7|t;8;7,6,5,4,3,2,1,0*0,1,7`

  const unCompressed = unCompressSong(compressed)

  const expected: Song = {
    length: 3,
    scaleBase: 'major',
    startNote: 'e',
    mode: 0,
    sequencers: [
      {
        name: 'bass',
        octave: 1,
        rows: [
          { note: 40, sequence: [false, false, false] },
          { note: 39, sequence: [false, false, true] },
          { note: 37, sequence: [false, true, false] },
          { note: 35, sequence: [false, true, true] },
          { note: 33, sequence: [true, false, false] },
          { note: 32, sequence: [true, false, true] },
          { note: 30, sequence: [true, true, false] },
          { note: 28, sequence: [true, true, true] },
        ],
      },
      {
        name: 'treble',
        octave: 8,
        rows: [
          { note: 124, sequence: [true, true, true] },
          { note: 123, sequence: [true, true, false] },
          { note: 121, sequence: [true, false, true] },
          { note: 119, sequence: [true, false, false] },
          { note: 117, sequence: [false, true, true] },
          { note: 116, sequence: [false, true, false] },
          { note: 114, sequence: [false, false, true] },
          { note: 112, sequence: [false, false, false] },
        ],
      },
    ],
    drums: [
      { note: 'G2', sequence: [false, false, false] },
      { note: 'E2', sequence: [false, false, true] },
      { note: 'C2', sequence: [true, true, true] },
    ],
  }

  expect(unCompressed).toEqual(expected)
})
