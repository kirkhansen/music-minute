import React, { Component } from 'react';
import Select from 'react-select';
import cx from 'classnames';
import QuestionComponent from '../../Components/QuestionComponent';
import ErrorBoundary from '../../Components/ErrorBoundary';
import { NoteValues, TimeSignatureOptions, NoteValueOptions } from '../../constants';
import { getXRandomTimeSignaturesFromAllowed, checkForCustomNotes } from '../../utilities';
import DefaultTemplate from '../Templates/DefaultTemplate';
import './MMMContainer.scss';

class MMMContainer extends Component {
  constructor(props) {
    const questionCount = 20;
    super(props);
    this.state = {
      questionTypes: 0,
      questionCount: questionCount,
      renderWorksheet: false,
      timeSigs: [],
      allowedNotes: NoteValues,
      allowedMeters: null,
      hasCustomNotes: false,
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
    const { renderWorksheet, allowedMeters, questionCount } = this.state;
    console.log(getXRandomTimeSignaturesFromAllowed(10, allowedMeters));
    this.setState({
      renderWorksheet: !renderWorksheet,
      timeSigs: getXRandomTimeSignaturesFromAllowed(questionCount, allowedMeters),
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

    if (this.state.allowedMeters && this.state.allowedMeters.length !== 0 && hasNotes === true) {
    }
    this.setState({
      allowedNotes: copy,
      canRender: this.state.allowedMeters && this.state.allowedMeters.length !== 0 && hasNotes === true,
    });
  }

  handleMeterChange(e) {
    console.log(e);
    const meters = [];
    for (let i = 0; i < e.length; i += 1) meters.push(e[i].value);
    console.log(meters);
    const customNotes = checkForCustomNotes(this.state.allowedNotes);
    this.setState({
      allowedMeters: meters,
      canRender: meters && customNotes,
    });
  }

  handleChangeQuestionCount(e) {
    console.log(e);
    this.setState({
      questionCount: +e.currentTarget.value,
    });
  }

  render() {
    const {
      questionCount,
      questionTypes,
      timeSigs,
      renderWorksheet,
      allowedNotes,
      allowedMeters,
      canRender,
    } = this.state;
    const buttonText = renderWorksheet ? 'Reset' : 'Render Worksheet';

    return (
      <DefaultTemplate>
        <form className={cx({ hide: renderWorksheet })}>
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
                  default={questionCount}
                  placeholder={questionCount}
                  onChange={this.handleChangeQustionCount}
                  onInput={this.handleChangeQuestionCount}
                />
              </fieldset>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-12">
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
              {timeSigs.map((time, index) => (
                <ErrorBoundary>
                  <QuestionComponent
                    allowedNotes={allowedNotes}
                    timeSignature={time}
                    allowedMeters={allowedMeters}
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

export default MMMContainer;
