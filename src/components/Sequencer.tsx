import * as Tone from "tone";
import { useCallback, useState } from "react";

export const Sequencer = () => {
  const [looping, setLooping] = useState(false);

  const onClick = useCallback(() => {
    if (looping) {
      Tone.Transport.stop();
      setLooping(false);
    } else {
      Tone.Transport.start();
      setLooping(true);
    }
  }, [looping]);

  const synth = new Tone.Synth().toDestination();
  new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, 0.1, time);
      // subdivisions are given as sub-arrays
    },
    ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]
  ).start(0);

  return <button onClick={onClick}>Sequence</button>;
};
