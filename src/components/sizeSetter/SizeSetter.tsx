import styles from '../range/Range.module.scss'
import React, { useCallback } from 'react'

type SizeSetterProps = {
  size: number
  setSize: (x: number) => void
}

const minSize = 1

export const SizeSetter = (props: SizeSetterProps) => {
  const handleSetSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value)
      if (Number.isNaN(value) || value < minSize) return
      props.setSize(value)
    },
    [props]
  )

  return (
    <label className={styles.root}>
      <span className={styles.label}>Size</span>
      <input
        type="number"
        min={1}
        step={1}
        onInput={handleSetSize}
        value={props.size}
      />
    </label>
  )
}
