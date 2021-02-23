import React, { Component } from 'react';
import Select from 'react-select';
import cx from 'classnames';
import NoteValueQuestionComponent from '../../Components/NoteValueQuestionComponent';
import ErrorBoundary from '../../Components/ErrorBoundary';
import { NoteValues, KeySignatureOptions, NoteValueOptions} from '../../constants';
import {getXRandomTimeSignaturesFromAllowed} from "../../utilities";
import DefaultTemplate from '../Templates/DefaultTemplate';
import './NoteNameContainer.scss';

class NoteNameContainer extends Component {
  constructor(props) {
    const questionCount = 20;
    super(props);
    this.state = {
      questionTypes: 0,
      questionCount: questionCount,
      renderWorksheet: false,
      allowedNotes: NoteValues,
      allowedKeySignatures: null,
      keySignatures: [],
      canRender: false,
      hasNotes: false,
    };

    this.handleChangeOfAllowedValues = this.handleChangeOfAllowedValues.bind(this);
    this.handleChangeQuestionTypes = this.handleChangeQuestionTypes.bind(this);
    this.handleChangeQuestionCount = this.handleChangeQuestionCount.bind(this);
    this.handleKeySignatureChange = this.handleKeySignatureChange.bind(this);
    this.handleToggleRender = this.handleToggleRender.bind(this);
  }

  componentWillUnmount() {
    this.timesSigs = [];
  }

  handleToggleRender() {
    const { renderWorksheet, allowedKeySignatures, questionCount } = this.state;
    this.setState({
      renderWorksheet: !renderWorksheet,
      keySignatures: getXRandomTimeSignaturesFromAllowed(questionCount, allowedKeySignatures),
    });
  }

  handleChangeQuestionTypes(e) {
    this.setState({
      questionTypes: +e.currentTarget.value,
    });
  }

  handleChangeOfAllowedValues(e) {
    const { allowedNotes } = this.state;
    const copy = allowedNotes;
    const keys = Object.keys(copy);
    let hasNotes = false;
    for (let i = 0; i < keys.length; i += 1) {
      copy[keys[i]].active = false;
    }

    for (let x = 0; x < e.length; x += 1) {
      for (let i = 0; i < keys.length; i += 1) {
        if (copy[keys[i]].vfNotation === e[x].value) {
          copy[keys[i]].active = true;
          hasNotes = true;
        }
      }
    }

    this.setState({
      allowedNotes: copy,
      canRender: this.state.allowedKeySignatures && this.state.allowedKeySignatures.length !== 0 && hasNotes === true,
    });
  }

  handleKeySignatureChange(e) {
    const keySignatures = [];
    for (let i = 0; i < e.length; i += 1) keySignatures.push(e[i].value);
    this.setState({
      allowedKeySignatures: keySignatures,
    });
  }

  handleChangeQuestionCount(e) {
    this.setState({
      questionCount: +e.currentTarget.value,
    });
  }

  render() {
    const {
      questionCount,
      questionTypes,
      keySignatures,
      renderWorksheet,
      allowedNotes,
      allowedKeySignatures,
      canRender,
    } = this.state;
    const buttonText = renderWorksheet ? 'Reset' : 'Render Worksheet';

    return (
      <DefaultTemplate>
        <form className={cx({ hide: renderWorksheet })}>
          <div className="row">
            <div className="col-2">
              <fieldset>
                <h3>Clef</h3>
                <input
                  id="treble"
                  type="radio"
                  name="questionTypes"
                  value="0"
                  onClick={this.handleChangeQuestionTypes}
                  defaultChecked
                />
                <label htmlFor="notes">Treble</label>
                <br />
                <input
                  id="bass"
                  type="radio"
                  name="questionTypes"
                  value="1"
                  onClick={this.handleChangeQuestionTypes}
                />
                <label htmlFor="bass">Bass</label>
                <br />
                <input
                  id="alto"
                  type="radio"
                  name="questionTypes"
                  value="2"
                  onClick={this.handleChangeQuestionTypes}
                />
                <label htmlFor="alto">Alto</label>
                <br />
                <input
                  id="tenor"
                  type="radio"
                  name="questionTypes"
                  value="3"
                  onClick={this.handleChangeQuestionTypes}
                />
                <label htmlFor="tenor">Tenor</label>
              </fieldset>
            </div>

            <div className="col-2">
              <fieldset>
                <h4>Number of Questions</h4>
                <input
                  type="number"
                  id="number-of-questions"
                  name="numberOfQuestions"
                  min="1"
                  max="60"
                  default={questionCount}
                  placeholder={questionCount}
                  onChange={this.handleChangeQustionCount}
                  onInput={this.handleChangeQuestionCount}
                />
              </fieldset>
            </div>
            <div className="col-2">
              <div className="row">
                <div className="col-12">
                  <fieldset>
                    <h4>Keys</h4>
                    <Select
                      id="keys"
                      onChange={this.handleKeySignatureChange}
                      isMulti
                      isSearchable
                      options={KeySignatureOptions}
                      placeholder="Select key(s)"
                    />
                    <label className="sr-only" htmlFor="keys">
                      Selection of key signature(s)
                    </label>
                  </fieldset>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <fieldset>
                    <h4>Note Value Options</h4>
                    <Select
                      id="note-selection"
                      onChange={this.handleChangeOfAllowedValues}
                      isMulti
                      isSearchable
                      options={NoteValueOptions}
                      placeholder="Select note type(s)."
                    />
                    <label className="sr-only" htmlFor="time-signatures">
                      Selection of Note Values
                    </label>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </form>
        <button className="btn btn-primary mt-4 screen-only" type="button" onClick={this.handleToggleRender} disabled={!canRender}>
          {buttonText}
        </button>
        <button
          id="print-value-worksheet"
          onClick={function() {
            window.print();
          }}
          className={cx({ hide: !renderWorksheet }, 'btn', 'screen-only', 'btn-secondary', 'mt-4')}
          type="button"
        >
          <i className="fas fa-print" /> Print
        </button>

        {renderWorksheet && (
          <div id="questions">
            <div id="note-container-row" className="row">
              {keySignatures.map((time, index) => (
                <ErrorBoundary>
                  <NoteValueQuestionComponent
                    allowedNotes={allowedNotes}
                    timeSignature={time}
                    allowedMeters={allowedKeySignatures}
                    noteTypes={questionTypes}
                    key={`ts-${index}`}
                    identifier={`ts-${index}`}
                  />
                </ErrorBoundary>
              ))}
            </div>
          </div>
        )}
      </DefaultTemplate>
    );
  }
}

export default NoteNameContainer;
