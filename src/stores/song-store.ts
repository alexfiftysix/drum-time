import { MidiNote } from 'tone/build/esm/core/type/NoteUnits'
import { range } from '../utilities/array-helpers'
import { makeScale, NoteOnly, Octave, ScaleBase } from '../utilities/scales'
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

type Sequencer = {
  name: SequencerName
  rows: Row[]
  octave: Octave
}

type Song = {
  noteCount: number
  sequencers: Sequencer[]
  scaleBase: ScaleBase
  startNote: NoteOnly
  mode: number
}

const trebleOctave = 3
const bassOctave = 2
const noteCount = 8

const validateSong = (song: Song) => {
  return song.sequencers.every((sequencer) =>
    sequencer.rows.every((row) => row.sequence.length === song.noteCount)
  )
}

export class SongStore {
  sequenceStore: SequenceStore = new SequenceStore()
  song: Song

  constructor() {
    this.song = {
      noteCount: noteCount,
      sequencers: [
        {
          name: 'treble',
          rows: this.getEmptyRow(noteCount),
          octave: trebleOctave,
        },
        { name: 'bass', rows: this.getEmptyRow(noteCount), octave: bassOctave },
      ],
      scaleBase: 'major',
      startNote: 'c',
      mode: 0,
    }

    const simpleSynth = new Tone.PolySynth(Tone.Synth).toDestination()
    this.initialiseSequencers(simpleSynth)

    this.updateSequencers()

    makeAutoObservable(this)
  }

  private initialiseSequencers(synth: Synth | Tone.PolySynth | Tone.Sampler) {
    // This is to make the sequencers play sounds when a note is triggered
    this.song.sequencers.forEach((sequencer) => {
      sequencer.rows.forEach((row, index) =>
        this.sequenceStore.setCallback(
          `${sequencer.name}-${index}`,
          (time: Seconds, note: string | undefined) => {
            if (note) synth.triggerAttackRelease(note, 0.1, time)
          }
        )
      )
    })
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

    this.song.sequencers.forEach((sequencer) => {
      sequencer.rows.forEach((row, index) =>
        this.sequenceStore.setEvents(
          `${sequencer.name}-${index}`,
          row.sequence.map((note) => (note ? row.note : undefined))
        )
      )
    })
  }

  getSongData() {
    return btoa(JSON.stringify(this.song))
  }

  updateTheWholeSong(encodedSongData: string) {
    this.song = JSON.parse(atob(encodedSongData))
    this.updateSequencers()
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
    if (rowIndex >= this.song.noteCount) {
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

    this.updateSequencers()
  }

  clear = () => {
    this.song = {
      noteCount: noteCount,
      sequencers: [
        {
          name: 'treble',
          rows: this.getEmptyRow(noteCount),
          octave: trebleOctave,
        },
        { name: 'bass', rows: this.getEmptyRow(noteCount), octave: bassOctave },
      ],
      scaleBase: 'major',
      startNote: 'c',
      mode: 0,
    }

    this.updateSequencers()
  }
}
