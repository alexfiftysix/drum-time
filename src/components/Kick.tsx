import * as Tone from 'tone'

export const Kick = () => {
  const synth = new Tone.MembraneSynth().toDestination()

  return (
    <button onClick={() => synth.triggerAttackRelease('C1', '8n')}>Kick</button>
  )
}
