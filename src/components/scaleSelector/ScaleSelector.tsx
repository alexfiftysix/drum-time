import styles from './ScaleSelector.module.scss'
import { RadioButton } from '../radioButton/RadioButton'
import { ScaleModifier, scaleModifiers } from '../../utilities/scales'
import React from 'react'

type ScaleSelectorProps = {
  handleScaleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedScale: string
  setScaleModifier: (mod: ScaleModifier) => void
  selectedModifier: ScaleModifier
}

export const ScaleSelector = (props: ScaleSelectorProps) => (
  <form className={styles.buttons}>
    <div className={styles.radioGroup}>
      <RadioButton
        groupName="scale"
        value="C"
        onChange={props.handleScaleChange}
        checked={props.selectedScale === 'C'}
      />
      <RadioButton
        groupName="scale"
        value="G"
        onChange={props.handleScaleChange}
        checked={props.selectedScale === 'G'}
      />
    </div>
    <div className={styles.radioGroup}>
      {Object.keys(scaleModifiers).map((m) => {
        // @ts-ignore . TODO: Ergh - why doesn't this work?
        const mod = scaleModifiers[m]
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
