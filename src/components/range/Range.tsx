import React, { useCallback } from 'react'
import styles from './Range.module.scss'

type RangeProps = {
  value: number
  setValue: (x: number) => void
  label: string
  min: number
  max: number
  step: number
}

export const Range = (props: RangeProps) => {
  const handleSet = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value)
      if (Number.isNaN(value) || value < props.min || value > props.max) return
      props.setValue(value)
    },
    [props]
  )

  return (
    <label className={styles.root}>
      <span className={styles.label}>{props.label}</span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        onInput={handleSet}
        value={props.value}
      />
      <input
        className={styles.numberInput}
        type="number"
        min={props.min}
        max={props.max}
        step={props.step}
        onInput={handleSet}
        value={props.value}
      />
    </label>
  )
}
