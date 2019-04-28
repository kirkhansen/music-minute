import React, { Component } from 'react';
import Vex from 'vexflow';

import {
  getBeatsPerMeasure,
  getNoteTypeForBeat,
  getAllowedNotesFromTimeSignature,
  getRandomTimeSignature,
  getAllowedNotesFromTimeSignatureAndActiveNotes,
  getRandomFromAllowedNotes,
  finishMeasure,
  getNoteSuffix,
} from '../utilities';

class QuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.timeSig = getRandomTimeSignature();
  }
  componentDidUpdate() {
    const { noteTypes, allowedNotes } = this.props;
    console.log(`Allowed Notes By User ${allowedNotes}`);

    const noteSuffix = getNoteSuffix(noteTypes);
    const OutLowedNotes = getAllowedNotesFromTimeSignatureAndActiveNotes(this.timeSig, allowedNotes);
    console.log(OutLowedNotes);
    const pickedNote = getRandomFromAllowedNotes(OutLowedNotes);
    const container = document.getElementById('test');
    var renderer = new Vex.Flow.Renderer(container, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(150, 150);
    var ctx = renderer.getContext();
    var stave = new Vex.Flow.Stave(10, 40, 120);
    stave.setConfigForLines([
      { visible: false },
      { visible: false },
      { visible: true },
      { visible: false },
      { visible: false },
    ]);
    stave
      .addClef('percussion')
      .addTimeSignature(this.timeSig)
      .setEndBarType('double');
    var note = [];
    if (getBeatsPerMeasure(this.timeSig) - pickedNote.normalizedDuration === 0) {
      note.push(new Vex.Flow.StaveNote({ clef: 'treble', keys: ['b/4'], duration: pickedNote.vfNotation }));
    } else {
      // Add the note that will show up
      note.push(new Vex.Flow.StaveNote({ clef: 'treble', keys: ['b/4'], duration: `${pickedNote.vfNotation}${noteSuffix}` }));

      const remainingBeats = getBeatsPerMeasure(this.timeSig) - pickedNote.normalizedDuration;
      const match = OutLowedNotes.find(item => item.normalizedDuration === remainingBeats);

      if (match) note.push(new Vex.Flow.GhostNote({ clef: 'treble', keys: ['b/4'], duration: match.vfNotation }));
      else {
        const remainingNotes = finishMeasure(remainingBeats, allowedNotes);
        remainingNotes.forEach(index => {
          note.push(
            new Vex.Flow.GhostNote({ clef: 'treble', keys: ['b/4'], duration:  allowedNotes[index].vfNotation })
          );
        });
      }
    }

    var voice = new Vex.Flow.Voice({
      num_beats: getBeatsPerMeasure(this.timeSig),
      beat_value: getNoteTypeForBeat(this.timeSig),
    });
    voice.addTickables(note);
    new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 120);
    stave.setContext(ctx).draw();
    voice.draw(ctx, stave);
  }
  componentDidMount() {
    console.log(`The time signature: ${this.timeSig}`);
    const { noteTypes, allowedNotes } = this.props;
    console.log(`All Possible Notes: ${JSON.stringify(allowedNotes)}`);
    console.log(`Allowed Notes By Time Signature: ${JSON.stringify(getAllowedNotesFromTimeSignature(this.timeSig))}`);
    console.log(`Allowed Notes By User: ${JSON.stringify(getAllowedNotesFromTimeSignatureAndActiveNotes(this.timeSig, allowedNotes))}`)
    const noteSuffix = getNoteSuffix(noteTypes);
    const OutLowedNotes = getAllowedNotesFromTimeSignatureAndActiveNotes(this.timeSig, allowedNotes);
    const pickedNote = getRandomFromAllowedNotes(OutLowedNotes);
    console.log(`Picked Note: ${JSON.stringify(getRandomFromAllowedNotes(OutLowedNotes))}`);
    const container = document.getElementById('test');
    var renderer = new Vex.Flow.Renderer(container, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(150, 150);
    var ctx = renderer.getContext();
    var stave = new Vex.Flow.Stave(10, 40, 120);
    stave.setConfigForLines([
      { visible: false },
      { visible: false },
      { visible: true },
      { visible: false },
      { visible: false },
    ]);
    stave
      .addClef('percussion')
      .addTimeSignature(this.timeSig)
      .setEndBarType('double');
    var note = [];
    if (getBeatsPerMeasure(this.timeSig) - pickedNote.normalizedDuration === 0) {
      note.push(new Vex.Flow.StaveNote({ clef: 'treble', keys: ['b/4'], duration: pickedNote.vfNotation }));
    } else {
      // Add the note that will show up
      note.push(new Vex.Flow.StaveNote({ clef: 'treble', keys: ['b/4'], duration: `${pickedNote.vfNotation}${noteSuffix}` }));

      const remainingBeats = getBeatsPerMeasure(this.timeSig) - pickedNote.normalizedDuration;
      console.log(`Remaining Beats: ${remainingBeats}`)
      
      const match = getAllowedNotesFromTimeSignature(this.timeSig).find(item => item.normalizedDuration === remainingBeats);

      if (match) note.push(new Vex.Flow.GhostNote({ clef: 'treble', keys: ['b/4'], duration: match.vfNotation }));
      else {
        const remainingNotes = finishMeasure(remainingBeats, getAllowedNotesFromTimeSignature(this.timeSig));
        remainingNotes.forEach(index => {
          note.push(
            new Vex.Flow.GhostNote({ clef: 'treble', keys: ['b/4'], duration:  getAllowedNotesFromTimeSignature(this.timeSig)[index].vfNotation })
          );
        });
      }
    }

    var voice = new Vex.Flow.Voice({
      num_beats: getBeatsPerMeasure(this.timeSig),
      beat_value: getNoteTypeForBeat(this.timeSig),
    });
    voice.addTickables(note);
    new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 120);
    stave.setContext(ctx).draw();
    voice.draw(ctx, stave);
  }
  render() {
    return <div id="test" />;
  }
}

export default QuestionComponent;
