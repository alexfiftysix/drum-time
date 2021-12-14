import {useState} from "react";
import * as Tone from "tone";

export const Looper = () => {
  const [looping, setLooping] = useState(false)

  const synthA = new Tone.FMSynth().toDestination();
  new Tone.Loop(time => {
    synthA.triggerAttackRelease("C2", "8n", time);
  }, "4n").start(Tone.now());

  return <button onClick={() => {
    if (looping) {
      Tone.Transport.stop()
      setLooping(false)
    } else {
      Tone.Transport.start()
      setLooping(true)
    }
  }}>Loop</button>
}
