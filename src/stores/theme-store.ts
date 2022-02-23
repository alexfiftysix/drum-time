import styles from './../components/themer/Themer.module.scss'
import { makeAutoObservable } from 'mobx'

const themes = [
  styles.blue,
  styles.salmon,
  styles.pink,
  styles.honeycomb,
  styles.arctic,
  styles.gameboyGreen,
  styles.greyScale,
]

export class ThemeStore {
  private themeIndex = 0
  timer?: NodeJS.Timeout
  switching: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  switch() {
    if (themes.length === 1) return

    const previous = this.themeIndex
    while (previous === this.themeIndex) {
      this.themeIndex = Math.floor(Math.random() * themes.length)
    }
    this.switching = true
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => (this.switching = false), 200)
  }

  get theme() {
    return themes[this.themeIndex]
  }
}
