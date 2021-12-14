import * as Tone from "tone";

export const Bleep = () => {
  const synth = new Tone.AMSynth().toDestination();

  return (
    <button
      onClick={() => {
        synth.triggerAttackRelease("C4", "16n");
      }}
    >
      Beep
    </button>
  );
};
