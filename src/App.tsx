import React, { createContext } from 'react'
import './reset.scss'
import styles from './App.module.scss'
import { IRootStore, RootStore } from './stores/root-store'
import { Controller } from './components/controller/Controller'

export const StoreContext = createContext<IRootStore | undefined>(undefined)

export const App = () => (
  <StoreContext.Provider value={new RootStore()}>
    <div className={styles.root}>
      <Controller size={8} />
    </div>
  </StoreContext.Provider>
)
