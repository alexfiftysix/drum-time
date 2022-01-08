import { useStore } from '../../hooks/use-store'
import styles from './Transport.module.scss'
import { observer } from 'mobx-react-lite'

export const Transport = observer(() => {
  const { sequenceStore } = useStore()

  return (
    <div className={styles.root}>
      <p>
        {sequenceStore.transport.currentNote !== undefined
          ? sequenceStore.transport.currentNote + 1
          : '-'}
      </p>
    </div>
  )
})
