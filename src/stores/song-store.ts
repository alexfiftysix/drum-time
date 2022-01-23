import { MidiNote } from 'tone/build/esm/core/type/NoteUnits'
import { range } from '../utilities/array-helpers'
import { makeScale, NoteOnly, ScaleBase } from '../utilities/scales'
import { SequenceStore } from './sequence-store'
import { makeAutoObservable } from 'mobx'
import { Synth } from 'tone'
import * as Tone from 'tone'
import { Seconds } from 'tone/build/esm/core/type/Units'

export type SequencerName = 'treble' | 'bass'

type Row = {
  note: MidiNote
  sequence: boolean[]
}

type Song = {
  noteCount: number
  treble: Row[]
  bass: Row[]
  scaleBase: ScaleBase
  startNote: NoteOnly
  mode: number
}
const trebleOctave = 3
const bassOctave = 2

const validateSong = (song: Song) => {
  return song.treble.every((row) => row.sequence.length === song.noteCount)
}

export class SongStore {
  sequenceStore: SequenceStore = new SequenceStore()
  song: Song

  constructor() {
    const noteCount = 8

    this.song = {
      noteCount: noteCount,
      treble: this.getEmptyRow(noteCount),
      bass: this.getEmptyRow(noteCount),
      scaleBase: 'major',
      startNote: 'c',
      mode: 0,
    }

    this.updateSequencers()

    const simpleSynth = new Tone.PolySynth(Tone.Synth).toDestination()
    this.initialiseSequencers(simpleSynth)

    makeAutoObservable(this)
  }

  private initialiseSequencers(synth: Synth | Tone.PolySynth | Tone.Sampler) {
    // This is to make the sequencers play sounds when a note is triggered

    // TODO: surely we can reuse this chunk of code for treble + bass bits
    this.song.treble.forEach((row, index) =>
      this.sequenceStore.setCallback(
        `treble-${index}`,
        (time: Seconds, note: string | undefined) => {
          if (note) synth.triggerAttackRelease(note, 0.1, time)
        }
      )
    )

    this.song.bass.forEach((row, index) =>
      this.sequenceStore.setCallback(
        `bass-${index}`,
        (time: Seconds, note: string | undefined) => {
          if (note) synth.triggerAttackRelease(note, 0.1, time)
        }
      )
    )
  }

  private getEmptyRow(noteCount: number) {
    return makeScale('c', undefined, 'major', 0, 4).map((n) => ({
      note: n as MidiNote,
      sequence: range(0, noteCount).map(() => false),
    }))
  }

  private updateSequencers() {
    if (!validateSong(this.song)) {
      console.error('song invalid')
    }

    this.song.treble.forEach((row, index) =>
      this.sequenceStore.setEvents(
        `treble-${index}`,
        row.sequence.map((note) => (note ? row.note : undefined))
      )
    )

    this.song.bass.forEach((row, index) =>
      this.sequenceStore.setEvents(
        `bass-${index}`,
        row.sequence.map((note) => (note ? row.note : undefined))
      )
    )
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
    const trebleScale = makeScale(
      this.song.startNote,
      undefined,
      this.song.scaleBase,
      this.song.mode,
      trebleOctave
    )
    const bassScale = makeScale(
      this.song.startNote,
      undefined,
      this.song.scaleBase,
      this.song.mode,
      bassOctave
    )

    this.song = {
      ...this.song,
      treble: this.song.treble.map((row, index) => ({
        ...row,
        note: trebleScale[index] as MidiNote,
      })),
      bass: this.song.bass.map((row, index) => ({
        ...row,
        note: bassScale[index] as MidiNote,
      })),
    }

    this.updateSequencers()
  }

  flip(box: 'treble' | 'bass', rowIndex: number, noteIndex: number) {
    if (rowIndex >= this.song.treble.length) {
      console.error('out of range note flip')
    }

    this.song = {
      ...this.song,
      [box]: this.song[box].map((row, i) =>
        i !== rowIndex
          ? row
          : {
              ...row,
              sequence: row.sequence.map((n, j) => (j !== noteIndex ? n : !n)),
            }
      ),
    }

    this.updateSequencers()
  }
}
