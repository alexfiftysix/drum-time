import { useState } from 'react'
import { randomChoice } from '../../utilities/array-helpers'
import styles from './PositivityGenerator.module.scss'

const defaultMessage = ':)'

export const PositivityGenerator = () => {
  const [message, setMessage] = useState(defaultMessage)

  const onClick = () => {
    const adjective = randomChoice(adjectives)
    const noun = randomChoice(nouns)

    setMessage(`You ${adjective} ${noun}!`)

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

const adjectives: string[] = [
  'wonderful',
  'magical',
  'amazing',
  'awesome',
  'stellar',
  'absolute',
  'dynamic',
  'diligent',
  'generous',
  'fabulous',
  'stunning',
  'wondrous',
  'brave',
  'breathtaking',
  'dazzling',
  'enchanting',
  'fearless',
  'magnificent',
  'plucky',
  'vibrant',
  'organized',
  'resourceful',
  'fantastic',
  'powerful',
  'first-class',
]

const nouns: string[] = [
  'champion',
  'cupcake',
  'unicorn',
  'dream',
  'earl',
  'exemplar',
  'maestro',
  'phenom',
  'star',
  'standout',
  'winner',
  'comrade',
  'prodigy',
]
