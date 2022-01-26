### Doing:
- [ ] Save and Load
  - [ ] Store major vs minor in the URL
  - [ ] Store start note in URL
  - [ ] Store mode in URL
  - [ ] Store tempo in URL
  - [ ] Store swing in URL
  - [x] Store the treble notes in URL
    - Methinks lzstring is a good option https://www.npmjs.com/package/lz-string
      - Turns out it's not - can use atob() and btoa() instead. 
      - TSPlayground has a 'share' button which triggers compression + saves into the URL
  - [x] Store the bass notes in URL
  - [ ] Store the drums in URL
    - [ ] Bring back the drums
  - [x] Find a better way to deal with treble and bass
    - This should work:
      - song = {..., sequencers: [{name: "treble", ...}, {name: "bass"}]}
  - [ ] Add a clear button - Now that refresh doesn't clear 

### To Do:
- [ ] Title / favicon
- [ ] Allow different note counts
  - [ ] Update note count visualization right away
- [ ] More scales
- [ ] Delete old sequencers
- [ ] Separate the various components
- [ ] [BUG] Buffer not set or not loaded on change
- [ ] [BUG] Why am I seeing 38 rows rendered in logging and only 19 are visible?
- [ ] Make a transport bar
- [ ] Some keyboard control
  - [ ] Space to go/stop
- [ ] Allow scales with different note counts
- [ ] sharp and flat scales
- [ ] Title + Favicon
- [ ] Update the readme

### Done:
- [x] Modes
  - [x] Change notes to midi
  - [x] Change scale def to [2, 1, 2] (semitones) style
  - [x] For modes, rotate the scale def
- [x] [BUG] Fix the beat marker
  - Do I need to store the state in mobx, and update the sequencer accordingly?
- [x] [BUG] All components should be visible on load
- [x] Swing


