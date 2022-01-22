import React, { useEffect } from 'react'
import * as Tone from 'tone'
import { Range } from '../../range/Range'
import { useQueryParams } from '../../../hooks/use-query-params'

const minTempo = 1
const maxTempo = 300

export const TempoSetter = () => {
  const { tempo, setParam } = useQueryParams()

  useEffect(() => {
    Tone.Transport.bpm.rampTo(tempo, 0.1)
  }, [tempo])

  return (
    <Range
      value={tempo}
      setValue={(v) => setParam(['tempo', v])}
      label="bpm"
      min={minTempo}
      max={maxTempo}
      step={0}
    />
  )
}
