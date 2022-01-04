import styles from './ScaleSelector.module.scss'
import { RadioButton } from '../radioButton/RadioButton'
import React from 'react'
import { modes, startNotesOnly } from '../../utilities/numbered-scales'

type ScaleSelectorProps = {
  handleScaleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedScale: string
  setScaleModifier: (mod: number) => void
  selectedModifier: number
}

export const ScaleSelector = (props: ScaleSelectorProps) => (
  <form className={styles.buttons}>
    <div className={styles.radioGroup}>
      {startNotesOnly.map((startNote) => (
        <RadioButton
          key={startNote}
          groupName="scale"
          value={startNote}
          onChange={props.handleScaleChange}
          checked={props.selectedScale === startNote}
        />
      ))}
    </div>
    <div className={styles.radioGroup}>
      {Object.keys(modes).map((m) => {
        // @ts-ignore . TODO: Ergh - why doesn't this work?
        const mod: number = modes[m]
        return (
          <RadioButton
            key={m}
            value={m}
            onChange={(e) => {
              if (!e.target.checked) return
              props.setScaleModifier(mod)
            }}
            checked={props.selectedModifier === mod}
            groupName="mod"
          />
        )
      })}
    </div>
  </form>
)
