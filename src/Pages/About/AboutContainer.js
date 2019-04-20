import React from 'react';
import DefaultTemplate from '../Templates/DefaultTemplate';
import About from './About.js';
import './AboutContainer.scss';

const AboutContainer = props => {
  return (
    <DefaultTemplate>
      <About />
    </DefaultTemplate>
  );
};

export default AboutContainer;
