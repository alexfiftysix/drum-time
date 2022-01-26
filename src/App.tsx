import React, { createContext } from 'react'
import './reset.scss'
import styles from './App.module.scss'
import { IRootStore, RootStore } from './stores/root-store'
import { Controller } from './components/controller/Controller'
import { Route, Routes } from 'react-router-dom'

export const StoreContext = createContext<IRootStore | undefined>(undefined)

export const App = () => (
  <StoreContext.Provider value={new RootStore()}>
    <div className={styles.root}>
      <Routes>
        <Route path="/:songData" element={<Controller />} />
        <Route path="*" element={<Controller />} />
      </Routes>
    </div>
  </StoreContext.Provider>
)
