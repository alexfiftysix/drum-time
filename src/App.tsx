import React from 'react'
import './reset.scss'
import { Controller } from './components/Controller'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.root}>
      <Controller />
    </div>
  )
}

export default App
