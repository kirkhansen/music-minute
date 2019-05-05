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
} from '../utilities';

class QuestionComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const {allowedNotes, identifier, noteTypes} = props;
    const timeSignature = getRandomTimeSignature(props.allowedMeters);
    const noteChoices = getAllowedNotesFromTimeSignatureAndActiveNotes(timeSignature, allowedNotes);
    const randomNote = getRandomFromAllowedNotes(noteChoices);


    this.state = {
      sTimeSignature : timeSignature,
      sAllowedNotes :  noteChoices,
      sAllowedMeters: props.allowedMeters,
      sPickedNote : randomNote, 
      sNumberOfBeats : getBeatsPerMeasure(timeSignature),
      sBeatValue : getNoteTypeForBeat(timeSignature),
      sId : identifier,
      sNoteSuffix: getNoteSuffix(noteTypes),
    }

    console.log(this.state);
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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state);
    // Find the right question in the DOM
    const {sId, sAllowedMeters, sAllowedNotes, sTimeSignature, sPickedNote, sNumberOfBeats, sNoteSuffix, sBeatValue} = this.state;
    // Empty the question but keep the container.
    document.getElementById(sId).innerHTML = '';
    const noteContainer = document.getElementById(sId);

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

  componentDidMount() {
    const { sTimeSignature, sAllowedNotes, sId, sNoteSuffix, sPickedNote } = this.state;
    const noteContainer = document.createElement('div');
    noteContainer.id = sId;
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

  handleClick(e) {
    const { sAllowedMeters, sAllowedNotes } = this.state;
    const timeSignature = getRandomTimeSignature(sAllowedMeters);
    //send onr time signature not an array.

    const noteChoices = getAllowedNotesFromTimeSignatureAndActiveNotes(timeSignature, sAllowedNotes);
    const randomNote = getRandomFromAllowedNotes(noteChoices);

    this.setState({
      sTimeSignature: timeSignature,
      sAllowedNotes: noteChoices,
      sPickedNote: randomNote,
      sNumberOfBeats : getBeatsPerMeasure(timeSignature),
      sBeatValue : getNoteTypeForBeat(timeSignature),
    })

  }
  render() {
    const { sId } = this.state;
    return (
    <Fragment>
      <i className="fa fa-redo-alt" data-id={sId} onClick={this.handleClick}></i>
    </Fragment>
    );
  }
}

export default QuestionComponent;
