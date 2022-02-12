import { Controller } from '../controller/Controller'
import { TheInstrument } from '../theInstrument/TheInstrument'
import { observer } from 'mobx-react-lite'
import { useQueryParams } from '../../hooks/use-query-params'
import { useStore } from '../../hooks/use-store'
import { useEffect } from 'react'
import styles from './Main.module.scss'

export const Main = observer(() => {
  const { songData } = useQueryParams()
  const { songStore } = useStore()

  useEffect(() => {
    songStore.loadSong(songData)
    // We only want this to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.root}>
      <Controller />
      <TheInstrument />
    </div>
  )
})
