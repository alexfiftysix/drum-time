import * as Tone from 'tone'
import {Looper} from "./Looper";

export const Controller = () => {
  const player = new Tone.Player()
  const distortion = new Tone.Distortion(1).toDestination();
  player.connect(distortion)
  const synth = new Tone.AMSynth().toDestination()

  return <div>
    <button onClick={() => {
      synth.triggerAttackRelease('C4', '16n');
    }}>
      Beep
    </button>
    <Looper/>
  </div>
}
