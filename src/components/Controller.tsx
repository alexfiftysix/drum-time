import { Bleep } from "./Bleep";
import { Kick } from "./Kick";
import { Sequencer } from "./Sequencer";

export const Controller = () => (
  <div>
    <Sequencer />
    <Kick />
    <Bleep />
  </div>
);
