### Doing:
- [ ] Play note on click when paused

### To Do:
- [ ] [TECH/BUG] Performance! How do we make this thing run better?
- [ ] [TECH] Combine drums and treble and bass into one object somehow
- [ ] [BUG] The first harmonic minor mode isn't ionian 
- [ ] Volume slider
  - [ ] Individual volume slider per sequencer
- [ ] More scales
- [ ] Delete old sequencers
- [ ] Separate the various components
- [ ] [BUG] Buffer not set or not loaded on change
- [ ] [BUG] Why am I seeing 38 rows rendered in logging and only 19 are visible?
- [ ] Make a transport bar
- [ ] Some keyboard control
  - [ ] Space to go/stop
  - [ ] Arrow keys to go up/down/left/right on sequencerCells
- [ ] Allow scales with different note counts
- [ ] sharp and flat scales
- [ ] Title + Favicon
- [ ] Update the readme
- [ ] Reset on corrupted SongData in URL
- [ ] Repair corrupted SongData in URL
- [ ] [BUG] Looks like yer drums are backwards
- [ ] This separation between the standard and drums samplers is a bit crappy

### Done:
- [x] Allow different note counts
  - [x] Update note count visualization right away
- [x] Title / favicon
- [x] Save and Load
  - [x] Store major vs minor in the URL
  - [x] Store start note in URL
  - [x] Store mode in URL
  - [x] Store tempo in URL
  - [x] Store swing in URL
  - [x] Store the treble notes in URL
    - Methinks lzstring is a good option https://www.npmjs.com/package/lz-string
      - Turns out it's not - can use atob() and btoa() instead.
      - TSPlayground has a 'share' button which triggers compression + saves into the URL
  - [x] Store the bass notes in URL
  - [x] Store the drums in URL
    - [x] Bring back the drums
  - [x] Find a better way to deal with treble and bass
    - This should work:
      - song = {..., sequencers: [{name: "treble", ...}, {name: "bass"}]}
  - [x] Add a clear button - Now that refresh doesn't clear
  - [x] Add a Share link (just needs to make sure the URL is fresh, and copy it to the clipboard)
- [x] Modes
  - [x] Change notes to midi
  - [x] Change scale def to [2, 1, 2] (semitones) style
  - [x] For modes, rotate the scale def
- [x] [BUG] Fix the beat marker
  - Do I need to store the state in mobx, and update the sequencer accordingly?
- [x] [BUG] All components should be visible on load
- [x] Swing
- [x] [BUG] What happened to the bass?
  - Need to change scale once for the notes to be in the right octaves 🤔
- [x] [BUG] Why are modes changing the octave so much?


