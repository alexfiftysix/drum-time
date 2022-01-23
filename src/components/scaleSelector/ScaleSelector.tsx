import styles from './ScaleSelector.module.scss'
import { RadioButton } from '../radioButton/RadioButton'
import React, { useEffect } from 'react'
import {
  ScaleBase,
  scaleBlueprints,
  startNotesOnly,
} from '../../utilities/scales'
import { useQueryParams } from '../../hooks/use-query-params'
import { useStore } from '../../hooks/use-store'

export const ScaleSelector = () => {
  const { songStore } = useStore()
  const { scaleBase, mode, startNote, setParam } = useQueryParams()

  useEffect(() => {
    songStore.setScaleBase(scaleBase)
  }, [scaleBase, songStore])

  useEffect(() => {
    songStore.setMode(mode)
  }, [mode, songStore])

  useEffect(() => {
    songStore.setStartNote(startNote)
  }, [songStore, startNote])

  return (
    <form className={styles.buttons}>
      <div className={styles.radioGroup}>
        {/*  TODO: Split out RadioGroup into a new component */}
        {(Object.keys(scaleBlueprints) as ScaleBase[]).map((thisScaleBase) => (
          <RadioButton
            key={thisScaleBase}
            groupName="scaleBase"
            value={thisScaleBase}
            onChange={(e) => {
              if (!e.target.checked) return
              setParam(['scaleBase', thisScaleBase])
            }}
            checked={scaleBase === thisScaleBase}
          />
        ))}
      </div>
      <div className={styles.radioGroup}>
        {startNotesOnly.map((thisStartNote) => (
          <RadioButton
            key={thisStartNote}
            groupName="startNote"
            value={thisStartNote}
            onChange={() => {
              setParam(['startNote', thisStartNote])
            }}
            checked={startNote === thisStartNote}
          />
        ))}
      </div>
      <div className={styles.radioGroup}>
        {scaleBlueprints[scaleBase].map((scaleDegree, i) => (
          <RadioButton
            key={i}
            value={i.toString()}
            onChange={() => {
              setParam(['mode', i])
            }}
            checked={mode === i}
            groupName="mode"
          >
            {scaleDegree.mode}
          </RadioButton>
        ))}
      </div>
    </form>
  )
}
