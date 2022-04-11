import React, { useEffect } from 'react'
import * as Tone from 'tone'
import { Range } from '../../range/Range'
import { useQueryParams } from '../../../hooks/use-query-params'

export const SwingSetter = () => {
  const { swing, setParam } = useQueryParams()

  useEffect(() => {
    Tone.Transport.swing = swing / 100
  }, [swing])

  return (
    <Range
      value={swing}
      setValue={(v) => setParam(['swing', v])}
      label="Swing"
      min={0}
      max={100}
      step={1}
    />
  )
}
