import { useStore } from '../../hooks/use-store'
import styles from './Transport.module.scss'
import { observer } from 'mobx-react-lite'

export const Transport = observer(() => {
  const { songStore } = useStore()

  return (
    <div className={styles.root}>
      <p>
        {songStore.transportStore.transport.currentNote !== undefined
          ? songStore.transportStore.transport.currentNote + 1
          : '-'}
      </p>
    </div>
  )
})
