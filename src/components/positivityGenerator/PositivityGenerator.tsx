import { useState } from 'react'
import styles from './PositivityGenerator.module.scss'
import { generateCompliment } from "complimentr";

const defaultMessage = ':)'

export const PositivityGenerator = () => {
  const [message, setMessage] = useState(defaultMessage)

  const onClick = () => {
    setMessage(generateCompliment())

    setTimeout(() => setMessage(defaultMessage), 2500)
  }

  return (
    <button
      onClick={onClick}
      disabled={message !== defaultMessage}
      className={styles.root}
    >
      {message}
    </button>
  )
}
