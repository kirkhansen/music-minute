import React, { Component } from 'react';
import Vex from 'vexflow';

import MMMPage from './MMMPage';
import {TimeSignatures, NoteValues} from '../../constants';
import {getBeatsPerMeasure, getNoteTypeForBeat, getNoteValuesFromTimeSignature} from '../../utilities';
import DefaultTemplate from '../Templates/DefaultTemplate';

class MMMContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(Vex.Flow);
    console.log(getBeatsPerMeasure(TimeSignatures[0]));
    console.log(getNoteTypeForBeat(TimeSignatures[0]));
    console.log(getNoteValuesFromTimeSignature(TimeSignatures[5]));

    const container = document.getElementById('test');
    var renderer = new Vex.Flow.Renderer(container, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(500, 500);
    var ctx = renderer.getContext();
    var stave = new Vex.Flow.Stave(10, 40, 120);
    stave.setConfigForLines([{ visible: false}, {visible: false}, {visible: true}, {visible: false}, {visible: false}]);
    stave.addClef('percussion').addTimeSignature('3/8');
    stave.setEndBarType("double");
    var note = [
        new Vex.Flow.StaveNote({clef: "treble", keys: ["b/4"], duration: "8d" }).addDotToAll(),
        new Vex.Flow.GhostNote({clef: "treble", keys: ["b/4"], duration: "16" }),
        new Vex.Flow.GhostNote({clef: "treble", keys: ["b/4"], duration: "8" }),
    ]
    var voice = new Vex.Flow.Voice({num_beats: 3, beat_value: 8});
    voice.addTickables(note);
    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 120);
    stave.setContext(ctx).draw();
    voice.draw(ctx, stave);

   

  }
  render() {
    return (
      <DefaultTemplate>
        <MMMPage />
        <div id="test" />
      </DefaultTemplate>
    );
  }
}

export default MMMContainer;
