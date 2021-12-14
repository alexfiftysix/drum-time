import { SequencerRow } from './SequencerRow'
import styles from './Controller.module.scss'
import { useCallback, useState } from 'react'
import * as Tone from 'tone'

type ControllerProps = {
  size: number
}

export const Controller = (props: ControllerProps) => {
  const [looping, setLooping] = useState(false)

  const onClick = useCallback(() => {
    if (looping) {
      Tone.Transport.stop()
      setLooping(false)
    } else {
      Tone.Transport.start()
      setLooping(true)
    }
  }, [looping])

  return (
    <div className={styles.root}>
      <button onClick={onClick}> {looping ? 'Stop' : 'Go'}</button>
      <SequencerRow note="C5" size={props.size} />
      <SequencerRow note="G4" size={props.size} />
      <SequencerRow note="E4" size={props.size} />
      <SequencerRow note="C4" size={props.size} />
    </div>
  )
}
