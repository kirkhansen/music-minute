import React, { Component } from 'react';
import QuestionComponent from '../../Components/QuestionComponent';

import MMMPage from './MMMPage';
import {
  getRandomTimeSignature,
  getXRandomTimeSignatures,
} from '../../utilities';
import DefaultTemplate from '../Templates/DefaultTemplate';

class MMMContainer extends React.Component {
  constructor(props) {
    super(props);

    this.timeSig = getRandomTimeSignature();
    this.timeSigs = getXRandomTimeSignatures(60);
    console.log(this.timeSigs);
  }
 
  componentWillUnmount() {
      this.timesSigs = [];
  }
  render() {
    return (
      <DefaultTemplate>
        {this.timeSigs.map((time, index) => (
            <QuestionComponent
                timeSignature = {time}
                key= {`ts-${index}`}
            />
        ))}
      </DefaultTemplate>
    );
  }
}

export default MMMContainer;
