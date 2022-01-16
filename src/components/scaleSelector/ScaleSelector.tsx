import styles from './ScaleSelector.module.scss'
import { RadioButton } from '../radioButton/RadioButton'
import React from 'react'
import {
  ScaleBase,
  scaleBlueprints,
  startNotesOnly,
} from '../../utilities/numbered-scales'
import { useQueryParams } from '../../hooks/use-query-params'

export const ScaleSelector = () => {
  const { getParam, addParam } = useQueryParams()

  return (
    <form className={styles.buttons}>
      <div className={styles.radioGroup}>
        {/*  TODO: Split out RadioGroup into a new component */}
        {Object.keys(scaleBlueprints).map((scaleBase) => (
          <RadioButton
            key={scaleBase}
            groupName="scaleBase"
            value={scaleBase}
            onChange={(e) => {
              if (!e.target.checked) return
              addParam(['scaleBase', scaleBase])
            }}
            checked={getParam('scaleBase') === scaleBase}
          />
        ))}
      </div>
      <div className={styles.radioGroup}>
        {startNotesOnly.map((startNote) => (
          <RadioButton
            key={startNote}
            groupName="startNote"
            value={startNote}
            onChange={() => {
              addParam(['startNote', startNote])
            }}
            checked={getParam('startNote') === startNote}
          />
        ))}
      </div>
      <div className={styles.radioGroup}>
        {scaleBlueprints[getParam('scaleBase') as ScaleBase].map(
          (scaleDegree, i) => (
            <RadioButton
              key={i}
              value={i.toString()}
              onChange={() => {
                addParam(['mode', i.toString()])
              }}
              checked={parseInt(getParam('mode') || '') === i}
              groupName="mode"
            >
              {scaleDegree.mode}
            </RadioButton>
          )
        )}
      </div>
    </form>
  )
}
