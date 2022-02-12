import styles from './ScaleSelector.module.scss'
import { RadioButton } from '../radioButton/RadioButton'
import React, { useCallback } from 'react'
import {
  NoteOnly,
  ScaleBase,
  scaleBlueprints,
  startNotesOnly,
} from '../../utilities/scales'
import { useStore } from '../../hooks/use-store'
import { displayScaleBase } from '../../utilities/scaleBaseDisplay'
import { observer } from 'mobx-react-lite'

export const ScaleSelector = observer(() => {
  const { songStore } = useStore()

  const setScaleBase = useCallback(
    (scaleBase: ScaleBase) => {
      songStore.setScaleBase(scaleBase)
    },
    [songStore]
  )

  const setMode = useCallback(
    (mode: number) => {
      songStore.setMode(mode)
    },
    [songStore]
  )

  const setStartNote = useCallback(
    (startNote: NoteOnly) => {
      songStore.setStartNote(startNote)
    },
    [songStore]
  )

  return (
    <form className={styles.buttons}>
      <div className={styles.radioGroup}>
        {/*  TODO: Split out RadioGroup into a new component */}
        {(Object.keys(scaleBlueprints) as ScaleBase[]).map((thisScaleBase) => (
          <RadioButton
            key={thisScaleBase}
            groupName="scaleBase"
            value={thisScaleBase}
            onChange={() => setScaleBase(thisScaleBase)}
            checked={songStore.song.scaleBase === thisScaleBase}
          >
            {displayScaleBase(thisScaleBase)}
          </RadioButton>
        ))}
      </div>
      <div className={styles.radioGroup}>
        {startNotesOnly.map((thisStartNote) => (
          <RadioButton
            key={thisStartNote}
            groupName="startNote"
            value={thisStartNote}
            onChange={() => setStartNote(thisStartNote)}
            checked={songStore.song.startNote === thisStartNote}
          />
        ))}
      </div>
      <div className={styles.radioGroup}>
        {scaleBlueprints[songStore.song.scaleBase].map((scaleDegree, i) => (
          <RadioButton
            key={i}
            value={i.toString()}
            onChange={() => setMode(i)}
            checked={songStore.song.mode === i}
            groupName="mode"
          >
            {scaleDegree.mode}
          </RadioButton>
        ))}
      </div>
    </form>
  )
})
