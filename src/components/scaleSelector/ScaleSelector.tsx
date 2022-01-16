import styles from './ScaleSelector.module.scss'
import { RadioButton } from '../radioButton/RadioButton'
import React from 'react'
import {
  scaleBlueprints,
  ScaleBase,
  startNotesOnly,
} from '../../utilities/numbered-scales'

type ScaleSelectorProps = {
  handleScaleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  scale: string
  setModeIndex: (mod: number) => void
  modeIndex: number
  scaleBase: ScaleBase
  setScaleBase: (s: ScaleBase) => void
}

export const ScaleSelector = (props: ScaleSelectorProps) => (
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
            props.setScaleBase(scaleBase as ScaleBase)
          }}
          checked={props.scaleBase === scaleBase}
        />
      ))}
    </div>
    <div className={styles.radioGroup}>
      {startNotesOnly.map((startNote) => (
        <RadioButton
          key={startNote}
          groupName="startNote"
          value={startNote}
          onChange={props.handleScaleChange}
          checked={props.scale === startNote}
        />
      ))}
    </div>
    <div className={styles.radioGroup}>
      {scaleBlueprints[props.scaleBase].map((scaleDegree, i) => (
        <RadioButton
          key={i}
          value={i.toString()}
          onChange={(e) => {
            if (!e.target.checked) return
            props.setModeIndex(i)
          }}
          checked={props.modeIndex === i}
          groupName="mode"
        >
          {scaleDegree.mode}
        </RadioButton>
      ))}
    </div>
  </form>
)
