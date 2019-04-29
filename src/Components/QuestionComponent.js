import React, { Component, Fragment } from 'react';
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
  getXRandomTimeSignaturesFromAllowed,
} from '../utilities';

class QuestionComponent extends Component {
  constructor(props) {
    super(props);

    const {allowedNotes, identifier, noteTypes} = props;
    const timeSignature = getRandomTimeSignature(props.allowedMeters);
    const noteChoices = getAllowedNotesFromTimeSignatureAndActiveNotes(timeSignature, allowedNotes);
    const randomNote = getRandomFromAllowedNotes(noteChoices);


    this.state = {
      sTimeSignature : timeSignature,
      sAllowedNotes :  noteChoices,
      sPickedNote : randomNote, 
      sNumberOfBeats : getBeatsPerMeasure(timeSignature),
      sBeatValue : getNoteTypeForBeat(timeSignature),
      sId : identifier,
      sNoteSuffix: getNoteSuffix(noteTypes),
    }

    // VEXFLOW SETUP
    this.clefType = 'percussion';
    this.fakeClefType = 'treble';
    this.notePosition = ['b/4'];
    this.barType = 'double';
    this.lineConfig = [
      { visible: false },
      { visible: false },
      { visible: true },
      { visible: false },
      { visible: false },
    ];

    
  }

  componentDidUpdate() {
    const { sTimeSignature, sAllowedNotes, sNoteSuffix, sPickedNote } = this.state;

    const { noteTypes, identifier } = this.props;
    const { timeSig, allowedNotes } = this.state;
    console.log(`Allowed Notes By User ${allowedNotes}`);

    const noteSuffix = getNoteSuffix(noteTypes);
    const OutLowedNotes = getAllowedNotesFromTimeSignatureAndActiveNotes(timeSig, allowedNotes);
    console.log(OutLowedNotes);
    const pickedNote = getRandomFromAllowedNotes(OutLowedNotes);
    const noteContainer = document.createElement('div')
    noteContainer.id = identifier;
    noteContainer.classList.add('note-question', 'col-sm-2');
    const rowContainer = document.getElementById('note-container-row');
    rowContainer.appendChild(noteContainer);

    var renderer = new Vex.Flow.Renderer(identifier, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(150, 150);
    var ctx = renderer.getContext();
    var stave = new Vex.Flow.Stave(10, 40, 120);
    stave.setConfigForLines(this.lineConfig);
    stave
      .addClef(this.clefType)
      .addTimeSignature(sTimeSignature)
      .setEndBarType(this.barType);
    var note = [];
    if (getBeatsPerMeasure(sTimeSignature) - sPickedNote.normalizedDuration === 0) {
      note.push(new Vex.Flow.StaveNote({ clef: this.fakeClefType, keys: this.notePosition, duration: pickedNote.vfNotation }));
    } else {
      // Add the note that will show up
      note.push(new Vex.Flow.StaveNote({ clef: this.fakeClefType, keys: this.notePosition, duration: `${pickedNote.vfNotation}${noteSuffix}` }));

      const remainingBeats = getBeatsPerMeasure(sTimeSignature) - pickedNote.normalizedDuration;
      const match = OutLowedNotes.find(item => item.normalizedDuration === remainingBeats);

      if (match) note.push(new Vex.Flow.GhostNote({ clef: this.fakeClefType, keys: this.notePosition, duration: match.vfNotation }));
      else {
        const remainingNotes = finishMeasure(remainingBeats, allowedNotes);
        remainingNotes.forEach(index => {
          note.push(
            new Vex.Flow.GhostNote({ clef: this.fakeClefType, keys: this.notePosition, duration:  allowedNotes[index].vfNotation })
          );
        });
      }
    }

    var voice = new Vex.Flow.Voice({
      num_beats: getBeatsPerMeasure(sTimeSignature),
      beat_value: getNoteTypeForBeat(sTimeSignature),
    });
    voice.addTickables(note);
    new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 120);
    stave.setContext(ctx).draw();
    voice.draw(ctx, stave);
  }
  componentDidMount() {
    const { sTimeSignature, sAllowedNotes, sNoteSuffix, sPickedNote } = this.state;
    console.log(`Allowed Notes By Time Signature and User: ${JSON.stringify(getAllowedNotesFromTimeSignature(sTimeSignature))}`);
    console.log(`Picked Note: ${sPickedNote}`);
    const noteContainer = document.createElement('div');
    noteContainer.id = this.identifier;
    noteContainer.classList.add('note-question', 'col-sm-2');
    const rowContainer = document.getElementById('note-container-row');
    rowContainer.appendChild(noteContainer);
    var renderer = new Vex.Flow.Renderer(noteContainer, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(150, 150);
    var ctx = renderer.getContext();
    var stave = new Vex.Flow.Stave(10, 40, 120);
    stave.setConfigForLines(this.lineConfig);
    stave
      .addClef(this.clefType)
      .addTimeSignature(sTimeSignature)
      .setEndBarType(this.barType);
    var note = [];
    if (getBeatsPerMeasure(sTimeSignature) - sPickedNote.normalizedDuration === 0) {
      note.push(new Vex.Flow.StaveNote({ clef: this.fakeClefType, keys: this.notePosition, duration: sPickedNote.vfNotation }));
    } else {
      // Add the note that will show up
    note.push(new Vex.Flow.StaveNote({ clef: this.fakeClefType, keys: this.notePosition, duration: `${sPickedNote.vfNotation}${sNoteSuffix}` }));

      const remainingBeats = getBeatsPerMeasure(sTimeSignature) - sPickedNote.normalizedDuration;
      console.log(`Remaining Beats: ${remainingBeats}`)
      
      const match = getAllowedNotesFromTimeSignature(sTimeSignature).find(item => item.normalizedDuration === remainingBeats);

      if (match) {
        note.push(new Vex.Flow.GhostNote({ clef: this.fakeClefType, keys: this.notePosition, duration: match.vfNotation }));
      }
      else {
        const remainingNotes = finishMeasure(remainingBeats, getAllowedNotesFromTimeSignature(sTimeSignature));
        remainingNotes.forEach(index => {
          note.push(
            new Vex.Flow.GhostNote({ clef: this.fakeClefType, keys: this.notePosition, duration:  getAllowedNotesFromTimeSignature(sTimeSignature)[index].vfNotation })
          );
        });
      }
    }

    var voice = new Vex.Flow.Voice({
      num_beats: getBeatsPerMeasure(sTimeSignature),
      beat_value: getNoteTypeForBeat(sTimeSignature),
    });
    voice.addTickables(note);
    new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 120);
    stave.setContext(ctx).draw();
    voice.draw(ctx, stave);
  }
  render() {
    return (
    <Fragment>
      <div id="note-container-row" className="row"></div>
    </Fragment>
    );
  }
}

export default QuestionComponent;
