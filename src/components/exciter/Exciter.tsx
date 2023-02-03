import styles from './Exciter.module.scss'
import { useCallback } from 'react'
import { create } from 'canvas-confetti'
import { randomChoice } from '../../utilities/array-helpers'

const buttonId = 'excited-button'

type ConfettiOrigin = {
  origin: {
    x: number
    y: number
  }
  angle: number
}

const confettiOrigins: ConfettiOrigin[] = [
  {
    angle: 0,
    origin: {
      x: 0,
      y: 0.5,
    },
  },
  {
    angle: 90,
    origin: {
      x: 0.5,
      y: 1,
    },
  },
  {
    angle: 180,
    origin: {
      x: 1,
      y: 0.5,
    },
  },
  {
    angle: 270,
    origin: {
      x: 0.5,
      y: 0,
    },
  },
]

export const Exciter = () => {
  const makeConfetti = useCallback(() => {
    const makeConfetti = create(undefined, {
      resize: true,
      disableForReducedMotion: true,
    })

    const button = document.getElementById(buttonId)
    if (!button) throw Error('No button')
    const style = getComputedStyle(button)
    const primary = style.getPropertyValue('--primary')
    const secondary = style.getPropertyValue('--secondary')
    const onSecondary = style.getPropertyValue('--on-secondary')
    const background = style.getPropertyValue('--background')

    const origin = randomChoice(confettiOrigins)

    makeConfetti({
      particleCount: 100,
      spread: 90,
      colors: [primary, secondary, onSecondary, background],
      ...origin,
    })
  }, [])

  return (
    <button className={styles.root} onClick={makeConfetti} id={buttonId}>
      !
    </button>
  )
}
