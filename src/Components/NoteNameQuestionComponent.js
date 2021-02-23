import React, { Component} from 'react';
import Vex from 'vexflow';
import './QuestionComponent.scss';

import {
  getBeatsPerMeasure,
  getNoteTypeForBeat,
  getAllowedNotesFromKeySignature,
  getRandomKeySignature,
  getAllowedNotesFromKeySignatureAndActiveNotes,
  getRandomFromAllowedNotes,
  finishMeasure,
  getNoteSuffix,
} from '../utilities';

class NoteNameQuestionComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const {allowedNotes, identifier, noteTypes} = props;
    const keySignature = getRandomKeySignature(props.allowedMeters);
    const noteChoices = getAllowedNotesFromKeySignatureAndActiveNotes(keySignature, allowedNotes);
    const randomNote = getRandomFromAllowedNotes(noteChoices);
    let {allowedClefs} = props;
    // TODO: add a different function that just gets a random element from a list
    if (allowedClefs === undefined) {
      allowedClefs = ["percussion"]
    }
    const clef = getRandomKeySignature(allowedClefs)


    this.state = {
      sKeySignature : keySignature,
      sAllowedNotes :  noteChoices,
      sAllowedMeters: props.allowedMeters,
      sPickedNote : randomNote,
      sNumberOfBeats : getBeatsPerMeasure(keySignature),
      sBeatValue : getNoteTypeForBeat(keySignature),
      sId : identifier,
      sNoteSuffix: getNoteSuffix(noteTypes),
      clef: clef,
    }

    console.log(this.state);
    // VEXFLOW SETUP
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

  drawQuestion = (noteContainer) => {
    const {sKeySignature, sPickedNote, sNoteSuffix, clef} = this.state;

    var renderer = new Vex.Flow.Renderer(noteContainer, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(150, 150);
    var ctx = renderer.getContext();
    var stave = new Vex.Flow.Stave(10, 40, 120);
    stave.setConfigForLines(this.lineConfig);
    stave
      .addClef(clef)
      .addKeySignature(sTimeSignature)
      .setEndBarType(this.barType);
    var note = [];
    if (getBeatsPerMeasure(sKeySignature) - sPickedNote.normalizedDuration === 0) {
      note.push(new Vex.Flow.StaveNote({ clef: clef, keys: this.notePosition, duration: sPickedNote.vfNotation }));
    } else {
      // Add the note that will show up
    note.push(new Vex.Flow.StaveNote({ clef: clef, keys: this.notePosition, duration: `${sPickedNote.vfNotation}${sNoteSuffix}` }));

      const remainingBeats = getBeatsPerMeasure(sKeySignature) - sPickedNote.normalizedDuration;
      const match = getAllowedNotesFromKeySignature(sTimeSignature).find(item => item.normalizedDuration === remainingBeats);

      if (match) {
        note.push(new Vex.Flow.GhostNote({ clef: clef, keys: this.notePosition, duration: match.vfNotation }));
      }
      else {
        const remainingNotes = finishMeasure(remainingBeats, getAllowedNotesFromKeySignature(sTimeSignature));
        remainingNotes.forEach(index => {
          note.push(
            new Vex.Flow.GhostNote({ clef: clef, keys: this.notePosition, duration:  getAllowedNotesFromKeySignature(sTimeSignature)[index].vfNotation })
          );
        });
      }
    }

    var voice = new Vex.Flow.Voice({
      num_beats: getBeatsPerMeasure(sKeySignature),
      beat_value: getNoteTypeForBeat(sKeySignature),
    });
    voice.addTickables(note);
    new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 120);
    stave.setContext(ctx).draw();
    voice.draw(ctx, stave);
  }

  componentDidUpdate() {
    const { sId } = this.state;
    // Empty the question but keep the container.
    document.getElementById(sId).innerHTML = '';
    const noteContainer = document.getElementById(sId);
    this.drawQuestion(noteContainer)
  }

  componentDidMount() {
    const { sId } = this.state;

    const noteContainer = document.createElement('div');
    noteContainer.id = sId;
    noteContainer.classList.add('note-question', 'col-sm-2');

    const rowContainer = document.getElementById('note-container-row');
    const container = document.getElementsByClassName(sId)[0];
    container.appendChild(noteContainer);
    rowContainer.appendChild(container);
    this.drawQuestion(noteContainer)
  }

  handleClick(e) {
    const { sAllowedMeters } = this.state;
    const { allowedNotes } = this.props;
    const keySignature = getRandomKeySignature(sAllowedMeters);
    //send onr time signature not an array.
    // should we reset allowed notes?
    const noteChoices = getAllowedNotesFromKeySignatureAndActiveNotes(keySignature, allowedNotes);
    const randomNote = getRandomFromAllowedNotes(noteChoices);

    this.setState({
      sKeySignature: keySignature,
      sAllowedNotes: noteChoices,
      sPickedNote: randomNote,
      sNumberOfBeats : getBeatsPerMeasure(keySignature),
      sBeatValue : getNoteTypeForBeat(keySignature),
    })

  }
  render() {
    const { sId } = this.state;
    const questionContainerClass = `${sId} quest-container`;
    return (
    <div className={questionContainerClass}>
      <button type="button" data-id={sId} onClick={this.handleClick}><i className="screen-only fa fa-redo-alt"></i></button>
    </div>
    );
  }
}

export default NoteNameQuestionComponent;
