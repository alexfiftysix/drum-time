import { useStore } from '../../hooks/use-store'
import { observer } from 'mobx-react-lite'
import styles from './ThemeSwitcher.module.scss'

export const ThemeSwitcher = observer(() => {
  const { themeStore } = useStore()

  return (
    <button className={styles.root} onClick={() => themeStore.switch()}>
      ?
    </button>
  )
})
