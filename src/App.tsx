import React from 'react'
import './reset.scss'
import { Sequencer } from './components/sequencer/Sequencer'
import styles from './App.module.scss'
import { scales } from './utilities/scales'

function App() {
  return (
    <div className={styles.root}>
      <Sequencer size={4} notes={scales.triadC} />
    </div>
  )
}

export default App
