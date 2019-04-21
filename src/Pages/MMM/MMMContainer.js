import React, { Component } from 'react';
import QuestionComponent from '../../Components/QuestionComponent';

import { getRandomTimeSignature, getXRandomTimeSignatures } from '../../utilities';
import DefaultTemplate from '../Templates/DefaultTemplate';

class MMMContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTypes: 2,
      questionCount: 5,
      timeSigs: getXRandomTimeSignatures(5),
    };
    this.timeSig = getRandomTimeSignature();
    // this.timeSigs = getXRandomTimeSignatures(this.state.questionCount);
    this.handleChangeQuestionTypes = this.handleChangeQuestionTypes.bind(this);
    this.handleChangeQuestionCount = this.handleChangeQuestionCount.bind(this);
  }

  componentWillUnmount() {
    this.timesSigs = [];
  }

  handleChangeQuestionTypes(e) {
    this.setState({
      questionTypes: +e.currentTarget.value,
      timeSigs: getXRandomTimeSignatures(this.state.questionCount),
    });
  }
  handleChangeQuestionCount(e) {
    console.log(e.currentTarget.value);
    this.setState({
      questionCount: +e.currentTarget.value,
    });
  }
  render() {
    const { questionCount, questionTypes, timeSigs } = this.state;
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
                <h3>Values</h3>
                <input id="whole" type="checkbox" name="questionValues" value="w" />
                <label htmlFor="notes">Whole Notes</label>
                <br />
                <input id="half" type="checkbox" name="questionValues" value="h" />
                <label htmlFor="notes">Half Notes</label>
                <br />
                <input id="quarter" type="checkbox" name="questionValues" value="q" />
                <label htmlFor="notes">Quarter Notes</label>
                <br />
                <input id="eighth" type="checkbox" name="questionValues" value="8" />
                <label htmlFor="notes">Eighth Notes</label>
                <br />
                <input id="sixteenth" type="checkbox" name="questionValues" value="16" />
                <label htmlFor="notes">Sixteenth Notes</label>
                <br />
                <input id="thirty-second" type="checkbox" name="questionValues" value="32" />
                <label htmlFor="notes">Thirty-second Notes</label>
              </fieldset>
            </div>
            <div className="col-3">
              <fieldset>
                <h4>Number of Questions</h4>
                <input
                  id="number-of-questions"
                  type="range"
                  min="1"
                  max="60"
                  onChange={this.handleChangeQuestionCount}
                />
                <label htmlFor="number-of-questions">{questionCount}</label>
              </fieldset>
            </div>
          </div>
          <hr />
          <fieldset>
            <h3>Time Signatures</h3>
            <div className="row">
              <div className="col-6">
                <h4>Simple Meters</h4>
                <input id="whole" type="checkbox" name="questionValues" value="w" />
                <label htmlFor="notes">2/2</label>
                <br />
                <input id="whole" type="checkbox" name="questionValues" value="w" />
                <label htmlFor="notes">2/4</label>
                <br />
                <input id="half" type="checkbox" name="questionValues" value="h" />
                <label htmlFor="notes">3/4</label>
                <br />
                <input id="half" type="checkbox" name="questionValues" value="h" />
                <label htmlFor="notes">4/4</label>
                <br />
              </div>
              <div className="col-6">
                <h4>Compound Meters</h4>
                <div className="row">
                  <div className="col-6">
                    <input id="quarter" type="checkbox" name="questionValues" value="q" />
                    <label htmlFor="notes">3/2</label>
                    <br />
                    <input id="quarter" type="checkbox" name="questionValues" value="q" />
                    <label htmlFor="notes">5/4</label>
                    <br />
                    <input id="quarter" type="checkbox" name="questionValues" value="q" />
                    <label htmlFor="notes">3/8</label>
                    <br />
                    <input id="quarter" type="checkbox" name="questionValues" value="q" />
                    <label htmlFor="notes">5/8</label>
                  </div>
                  <div className="col-6">
                    <input id="quarter" type="checkbox" name="questionValues" value="q" />
                    <label htmlFor="notes">6/8</label>
                    <br />
                    <input id="quarter" type="checkbox" name="questionValues" value="q" />
                    <label htmlFor="notes">7/8</label>
                    <br />
                    <input id="quarter" type="checkbox" name="questionValues" value="q" />
                    <label htmlFor="notes">9/8</label>
                    <br />
                    <input id="quarter" type="checkbox" name="questionValues" value="q" />
                    <label htmlFor="notes">12/8</label>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        <ul>
          <li>Allow dots?</li>
          <li>Allow ties?</li>
        </ul>
        <div id="questions">
          {timeSigs.map((time, index) => (
            <QuestionComponent
              timeSignature={time}
              noteCounte={questionCount}
              noteTypes={questionTypes}
              key={`ts-${index}`}
            />
          ))}
        </div>
      </DefaultTemplate>
    );
  }
}

export default MMMContainer;
