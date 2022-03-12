import { useCallback } from 'react'
import { getNextSynth } from '../../../stores/synth-store'
import { observer } from 'mobx-react-lite'
import { SequencerName } from '../../../stores/song-store'
import { useStore } from '../../../hooks/use-store'
import styles from './InstrumentSwitcher.module.scss'

export type InstrumentSwitcherProps = {
  sequencer: SequencerName
}

export const InstrumentSwitcher = observer((props: InstrumentSwitcherProps) => {
  const { songStore } = useStore()
  const mySequencer = songStore.song.sequencers.filter(
    (s) => s.name === props.sequencer
  )[0]

  const onClick = useCallback(() => {
    const next = getNextSynth(mySequencer.synth)
    songStore.setSynth(props.sequencer, next)
  }, [mySequencer.synth, props.sequencer, songStore])

  return (
    <button className={styles.root} onClick={onClick}>
      {mySequencer.synth}
    </button>
  )
})
