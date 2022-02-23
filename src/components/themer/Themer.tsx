import styles from './Themer.module.scss'
import React, { useEffect } from 'react'
import cn from 'classnames'
import { useStore } from '../../hooks/use-store'
import { observer } from 'mobx-react-lite'

export const Themer: React.FC = observer((props) => {
  const { themeStore } = useStore()

  useEffect(() => {
    console.log(themeStore.theme)
  }, [themeStore.theme])

  return (
    <div className={cn(styles.root, styles.themeBoss, themeStore.theme)}>
      {props.children}
    </div>
  )
})
