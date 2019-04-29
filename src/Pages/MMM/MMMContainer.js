import React, { Component, Fragment } from 'react';
import Select from 'react-select';

import QuestionComponent from '../../Components/QuestionComponent';
import { NoteValues, TimeSignatures, TimeSignatureOptions, NoteValueOptions } from '../../constants';
import { getRandomTimeSignature, getXRandomTimeSignatures,getXRandomTimeSignaturesFromAllowed } from '../../utilities';
import DefaultTemplate from '../Templates/DefaultTemplate';

class MMMContainer extends Component {
  constructor(props) {
    const questionCount = 12;
    super(props);
    this.state = {
      questionTypes: 0,
      questionCount: questionCount,
      renderWorksheet: false,
      timeSigs: [],
      allowedNotes: NoteValues,
      allowedMeters: null,
    };

    this.handleChangeOfAllowedValues = this.handleChangeOfAllowedValues.bind(this);
    this.handleChangeQuestionTypes = this.handleChangeQuestionTypes.bind(this);
    this.handleChangeQuestionCount = this.handleChangeQuestionCount.bind(this);
    this.handleMeterChange = this.handleMeterChange.bind(this);
    this.handleToggleRender = this.handleToggleRender.bind(this);
  }

  componentWillUnmount() {
    this.timesSigs = [];
  }

  handleToggleRender() {
    const { renderWorksheet, allowedMeters } = this.state;
    console.log(getXRandomTimeSignaturesFromAllowed(10, allowedMeters));
    this.setState({
      renderWorksheet: !renderWorksheet,
      timeSigs: getXRandomTimeSignaturesFromAllowed(12, allowedMeters),
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
    for (let i = 0; i < keys.length; i += 1) {
      copy[keys[i]].active = false;
    }

    for (let x = 0; x < e.length; x += 1) {
      for (let i = 0; i < keys.length; i += 1) {
        if (copy[keys[i]].vfNotation === e[x].value) {
          copy[keys[i]].active = true;
        }
      }
    }

    this.setState({
      allowedNotes: copy,
    });
  }

  handleMeterChange(e) {
    const meters = [];
    for (let i = 0; i < e.length; i+=1) (
      meters.push(e[i].value)
    )

    this.setState({
      allowedMeters: meters,
    });
  }

  handleChangeQuestionCount(e) {
    this.setState({
      questionCount: +e.currentTarget.value,
    });
  }

  render() {
    const { questionCount, questionTypes, timeSigs, renderWorksheet, allowedNotes, allowedMeters } = this.state;
    const allowedNotesKeys = Object.keys(allowedNotes);
    const buttonText = renderWorksheet ? 'Clear Progress' : 'Render Worksheet';

    return (
      <DefaultTemplate>
        <form>
          <div className="row">
            <div className="col-3">
              <fieldset>
                <h3>Note Types</h3>
                <input
                  id="notes"
                  type="radio"
                  name="questionTypes"
                  value="0"
                  onClick={this.handleChangeQuestionTypes}
                  defaultChecked
                />
                <label htmlFor="notes">Only Notes</label>
                <br />
                <input
                  id="rests"
                  type="radio"
                  name="questionTypes"
                  value="1"
                  onClick={this.handleChangeQuestionTypes}
                />
                <label htmlFor="rests">Only Rests</label>
                <br />
                <input
                  id="notes|rests"
                  type="radio"
                  name="questionTypes"
                  value="2"
                  onClick={this.handleChangeQuestionTypes}
                />
                <label htmlFor="notes">Notes &amp; Rests</label>
              </fieldset>
            </div>

            <div className="col-3">
              <fieldset>
                <h4>Number of Questions</h4>
                <input
                  type="number"
                  id="number-of-questions"
                  name="numberOfQuestions"
                  min="1"
                  max="60"
                  onChange={this.handleChangeQustionCount}
                />
                <label htmlFor="number-of-questions">{questionCount}</label>
              </fieldset>
            </div>
          </div>
          <hr />
          <fieldset>
            <div className="row">
              <div className="col-6">
                <fieldset>
                  <h4>Time Signatures</h4>
                  <Select
                    id="time-signatures"
                    onChange={this.handleMeterChange}
                    isMulti
                    isSearchable
                    options={TimeSignatureOptions}
                    placeholder="Select time signature(s)."
                  />
                  <label className="sr-only" htmlFor="time-signatures">
                    Selection of time signatures
                  </label>
                </fieldset>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="row">
              <div className="col-6">
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
          </fieldset>
        </form>
        {allowedMeters && (
          <button className="btn btn-primary mt-4" type="button" onClick={this.handleToggleRender}>
            {buttonText}
          </button>
        )}


        {renderWorksheet && (
          <div id="questions">
            {timeSigs.map((time, index) => (
              <QuestionComponent
                allowedNotes={allowedNotes}
                timeSignature={time}
                allowedMeters={allowedMeters}
                noteTypes={questionTypes}
                key={`ts-${index}`}
                identifier={`ts-${index}`}
              />
            ))}
          </div>
        )}
      </DefaultTemplate>
    );
  }
}

export default MMMContainer;
