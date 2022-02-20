import styles from './NumberInput.module.scss'
import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'

type NumberInputProps = {
  minSize: number
  maxSize: number
  handleSetSize: (x: number) => void
  value: number
  inputId?: string
}

export const NumberInput = observer((props: NumberInputProps) => {
  const input = useRef<HTMLInputElement | null>(null)

  return (
    <div className={styles.root}>
      <button
        className={styles.increment}
        onClick={() => {
          if (props.value <= props.minSize) return
          input.current?.stepDown()
          props.handleSetSize(props.value - 1)
        }}
      >
        ◀
      </button>
      <input
        ref={input}
        className={styles.input}
        type="number"
        min={props.minSize}
        max={props.maxSize}
        step={1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.handleSetSize(parseInt(e.target.value))
        }
        value={props.value}
        id={props.inputId}
      />
      <button
        className={styles.increment}
        onClick={() => {
          if (props.value >= props.maxSize) return
          input.current?.stepUp()
          props.handleSetSize(props.value + 1)
        }}
      >
        ▶
      </button>
    </div>
  )
})
