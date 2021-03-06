import { MidiNote, Note } from 'tone/build/esm/core/type/NoteUnits'
import { makeAndFill, resize, single } from '../utilities/array-helpers'
import {
  makeScale,
  drumScale,
  NoteOnly,
  Octave,
  ScaleBase,
} from '../utilities/scales'
import { SequenceStore } from './sequence-store'
import { makeAutoObservable, runInAction } from 'mobx'
import { Synth, start, PolySynth, Sampler, Transport, mtof } from 'tone'
import { Seconds } from 'tone/build/esm/core/type/Units'
import { SamplerStore } from './sampler-store'
import { DEFAULT_NOTE_COUNT } from '../utilities/constants'
import { TransportStore } from './transport-store'
import {
  compressSong,
  unCompressSong,
} from '../utilities/compression/compression'

export type SequencerName = 'treble' | 'bass'

export type Row = {
  note: MidiNote | Note
  sequence: boolean[]
}

export type Sequencer = {
  name: SequencerName
  rows: Row[]
  octave: Octave
}

export type Song = {
  length: number
  scaleBase: ScaleBase
  startNote: NoteOnly
  mode: number
  sequencers: Sequencer[]
  drums: Row[]
}

export const trebleOctave = 4
export const bassOctave = 3

export class SongStore {
  sequenceStore: SequenceStore = new SequenceStore()
  samplerStore: SamplerStore = new SamplerStore()
  transportStore: TransportStore = new TransportStore()
  playing: boolean = false
  loaded: boolean = false
  song: Song

  constructor() {
    this.song = { ...emptySong }

    const simpleSynth = new PolySynth(Synth).toDestination()
    this.initialiseSynths(simpleSynth)
    this.updateSequencers()
    makeAutoObservable(this)
  }

  private initialiseSynths(synth: Synth | PolySynth | Sampler) {
    // This is to make the sequencers play sounds when a note is triggered
    this.song.sequencers.forEach((sequencer) => {
      sequencer.rows.forEach((row, index) =>
        this.sequenceStore.setCallback(
          `${sequencer.name}-${index}`,
          (time: Seconds, note: unknown) => {
            if (note)
              synth.triggerAttackRelease(mtof(note as MidiNote), 0.1, time)
          }
        )
      )
    })

    this.song.drums.forEach((row, index) => {
      this.sequenceStore.setCallback(
        `drums-${index}`,
        (time: Seconds, note: string | undefined) => {
          if (note)
            this.samplerStore.sampler.triggerAttackRelease(note, 0.1, time)
        }
      )
    })
  }

  private updateSequencers() {
    this.song.sequencers.forEach((sequencer) => {
      sequencer.rows.forEach((row, index) =>
        this.sequenceStore.setEvents(
          `${sequencer.name}-${index}`,
          row.sequence.map((note) => (note ? row.note : undefined))
        )
      )
    })

    this.song.drums.forEach((row, index) =>
      this.sequenceStore.setEvents(
        `drums-${index}`,
        row.sequence.map((note) => (note ? row.note : undefined))
      )
    )
  }

  getSongData() {
    return btoa(compressSong(this.song))
  }

  loadSong(encodedSongData: string) {
    if (encodedSongData.length === 0) {
      this.song = emptySong
      this.loaded = true
      return
    }

    try {
      this.song = unCompressSong(atob(encodedSongData))
    } catch (e) {
      console.error(e)
      this.song = emptySong
    }
    this.loaded = true
  }

  setScaleBase(scaleBase: ScaleBase) {
    this.song.scaleBase = scaleBase
    this.updateScale()
  }

  setMode(mode: number) {
    this.song.mode = mode
    this.updateScale()
  }

  setStartNote(startNote: NoteOnly) {
    this.song.startNote = startNote
    this.updateScale()
  }

  private updateScale() {
    // TODO: Can we set this up as a Reaction?
    const makeScaleFromOctave = (octave: Octave) =>
      makeScale(
        this.song.startNote,
        undefined,
        this.song.scaleBase,
        this.song.mode,
        octave
      )

    this.song = {
      ...this.song,
      sequencers: this.song.sequencers.map((sequencer) => ({
        ...sequencer,
        rows: sequencer.rows.map((row, index) => ({
          ...row,
          note: makeScaleFromOctave(sequencer.octave)[index] as MidiNote,
        })),
      })),
    }

    this.updateSequencers()
  }

  flip(sequencerName: SequencerName, rowIndex: number, noteIndex: number) {
    if (rowIndex >= this.song.length) {
      console.error('out of range note flip')
    }

    this.song = {
      ...this.song,
      sequencers: this.song.sequencers.map((sequencer) =>
        sequencer.name === sequencerName
          ? {
              ...sequencer,
              rows: sequencer.rows.map((row, i) =>
                i !== rowIndex
                  ? row
                  : {
                      ...row,
                      sequence: row.sequence.map((n, j) =>
                        j !== noteIndex ? n : !n
                      ),
                    }
              ),
            }
          : sequencer
      ),
    }

    const updatedRow = single(
      this.song.sequencers,
      (s) => s.name === sequencerName
    ).rows[rowIndex]

    this.sequenceStore.setEvents(
      `${sequencerName}-${rowIndex}`,
      updatedRow.sequence.map((note) => (note ? updatedRow.note : undefined))
    )
  }

  drumFlip(rowIndex: number, noteIndex: number) {
    if (rowIndex >= this.song.length) {
      console.error('out of range drum note flip')
    }

    this.song = {
      ...this.song,
      drums: this.song.drums.map((row, index) =>
        index !== rowIndex
          ? row
          : {
              ...row,
              sequence: row.sequence.map((note, index) =>
                index !== noteIndex ? note : !note
              ),
            }
      ),
    }

    this.updateSequencers()
  }

  setNoteCount = (newCount: number) => {
    this.song = {
      ...this.song,
      length: newCount,
      sequencers: this.song.sequencers.map((sequencer) => ({
        ...sequencer,
        rows: sequencer.rows.map((row) => ({
          ...row,
          sequence: resize(row.sequence, newCount, false),
        })),
      })),
      drums: this.song.drums.map((row) => ({
        ...row,
        sequence: resize(row.sequence, newCount, false),
      })),
    }

    this.transportStore.setNoteCount(newCount)
    this.sequenceStore.setEvents('transport', makeAndFill(newCount, undefined))
    this.updateSequencers()
  }

  start = async () => {
    await start()
    runInAction(() => {
      Transport.start()
      this.playing = true
      this.transportStore.start()
    })
  }

  stop = () => {
    Transport.stop()
    this.playing = false
    this.transportStore.stop()
  }

  clear = () => {
    this.song = { ...emptySong }
    this.updateSequencers()
  }
}

const getEmptyRow = (noteCount: number, octave: Octave) =>
  makeScale('c', undefined, 'major', 0, octave).map((n) => ({
    note: n as MidiNote,
    sequence: makeAndFill(noteCount, false),
  }))

const emptySong: Song = {
  length: DEFAULT_NOTE_COUNT,
  sequencers: [
    {
      name: 'treble',
      rows: getEmptyRow(DEFAULT_NOTE_COUNT, trebleOctave),
      octave: trebleOctave,
    },
    {
      name: 'bass',
      rows: getEmptyRow(DEFAULT_NOTE_COUNT, bassOctave),
      octave: bassOctave,
    },
  ],
  drums: drumScale.map((note) => ({
    note,
    sequence: makeAndFill(DEFAULT_NOTE_COUNT, false),
  })),
  scaleBase: 'major',
  startNote: 'c',
  mode: 0,
}
