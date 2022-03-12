import styles from './Themer.module.scss'
import React from 'react'
import cn from 'classnames'
import { useStore } from '../../hooks/use-store'
import { observer } from 'mobx-react-lite'

export const Themer: React.FC = observer((props) => {
  const { themeStore } = useStore()

  return (
    <div className={cn(styles.root, styles.themeBoss, themeStore.theme)}>
      {props.children}
    </div>
  )
})
