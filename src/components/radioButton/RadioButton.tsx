import cn from 'classnames'
import styles from './RadioButton.module.scss'
import React from 'react'

type RadioButtonProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  groupName: string
}

export const RadioButton = (props: RadioButtonProps) => (
  <label
    className={cn(styles.radioButton, {
      [styles.checked]: props.checked,
    })}
  >
    <span>{props.value}</span>
    <input
      type="radio"
      value={props.value}
      name={props.groupName}
      onChange={props.onChange}
    />
  </label>
)
