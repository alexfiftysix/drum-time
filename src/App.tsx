import React, { createContext } from 'react'
import './reset.scss'
import styles from './App.module.scss'
import { IRootStore, RootStore } from './stores/root-store'
import { Route, Routes } from 'react-router-dom'
import { FaviconAnimator } from './components/faviconAnimator/FaviconAnimator'
import { Main } from './components/main/Main'

export const StoreContext = createContext<IRootStore | undefined>(undefined)

export const App = () => (
  <StoreContext.Provider value={new RootStore()}>
    <div className={styles.root}>
      <Routes>
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
    <FaviconAnimator />
  </StoreContext.Provider>
)
