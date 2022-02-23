import React, { createContext } from 'react'
import './reset.scss'
import './App.scss'
import { IRootStore, RootStore } from './stores/root-store'
import { Route, Routes } from 'react-router-dom'
import { FaviconAnimator } from './components/faviconAnimator/FaviconAnimator'
import { Main } from './components/main/Main'
import { Themer } from './components/themer/Themer'

export const StoreContext = createContext<IRootStore | undefined>(undefined)

export const App = () => (
  <StoreContext.Provider value={new RootStore()}>
    <Themer>
      <Routes>
        <Route path="*" element={<Main />} />
      </Routes>
    </Themer>
    <FaviconAnimator />
  </StoreContext.Provider>
)
