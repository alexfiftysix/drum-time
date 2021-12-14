import React from 'react'
import './reset.scss'
import { Controller } from './components/sequencer/Controller'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.root}>
      <Controller size={8} />
    </div>
  )
}

export default App
