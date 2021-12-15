import React, { createContext } from 'react'
import './reset.scss'
import { Sequencer } from './components/sequencer/Sequencer'
import styles from './App.module.scss'
import { scales } from './utilities/scales'
import { IRootStore, RootStore } from './stores/root-store'

export const StoreContext = createContext<IRootStore | undefined>(undefined)

function App() {
  return (
    <StoreContext.Provider value={new RootStore()}>
      <div className={styles.root}>
        <Sequencer size={8} notes={scales.triadC} />
      </div>
    </StoreContext.Provider>
  )
}

export default App
