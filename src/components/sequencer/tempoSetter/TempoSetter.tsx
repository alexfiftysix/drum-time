import React, { useEffect, useState } from 'react'
import * as Tone from 'tone'
import { Range } from '../../range/Range'

const minTempo = 1
const maxTempo = 300

export const TempoSetter = () => {
  const [tempo, setTempo] = useState(120)

  useEffect(() => {
    Tone.Transport.bpm.rampTo(tempo, 0.1)
  }, [tempo])

  return (
    <Range
      value={tempo}
      setValue={setTempo}
      label="bpm"
      min={minTempo}
      max={maxTempo}
      step={0}
    />
  )
}
