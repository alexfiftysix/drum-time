import React, { useEffect, useState } from 'react'
import * as Tone from 'tone'
import { Range } from '../../range/Range'

export const SwingSetter = () => {
  const [swing, setSwing] = useState(0)

  useEffect(() => {
    Tone.Transport.swing = swing / 100
  }, [swing])

  return (
    <Range
      value={swing}
      setValue={setSwing}
      label="swing"
      min={1}
      max={100}
      step={1}
    />
  )
}
