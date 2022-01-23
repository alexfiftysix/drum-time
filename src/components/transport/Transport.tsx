import { useStore } from '../../hooks/use-store'
import styles from './Transport.module.scss'
import { observer } from 'mobx-react-lite'

export const Transport = observer(() => {
  const { transportStore } = useStore()

  return (
    <div className={styles.root}>
      <p>
        {transportStore.transport.currentNote !== undefined
          ? transportStore.transport.currentNote + 1
          : '-'}
      </p>
    </div>
  )
})
