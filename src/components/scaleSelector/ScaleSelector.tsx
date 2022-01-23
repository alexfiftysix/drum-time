import styles from './ScaleSelector.module.scss'
import { RadioButton } from '../radioButton/RadioButton'
import React from 'react'
import {
  ScaleBase,
  scaleBlueprints,
  startNotesOnly,
} from '../../utilities/scales'
import { useQueryParams } from '../../hooks/use-query-params'

export const ScaleSelector = () => {
  const { scaleBase, mode, startNote, setParam } = useQueryParams()

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
