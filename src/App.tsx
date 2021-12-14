import React from 'react'
import './reset.scss'
import { Controller } from './components/sequencer/Controller'
import styles from './App.module.scss'
import { scales } from './utilities/scales'

function App() {
  return (
    <div className={styles.root}>
      <Controller size={4} notes={scales.triadC} />
    </div>
  )
}

export default App
