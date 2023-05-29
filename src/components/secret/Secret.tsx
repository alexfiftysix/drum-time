import React, { useState } from 'react'
import Pico8 from 'react-pico-8'
import 'react-pico-8/styles.css'

export const Secret = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(!show)} style={{ border: 'none' }}>
        :o
      </button>
      {show && <Pico8 src="crablife.js" />}
    </>
  )
}
