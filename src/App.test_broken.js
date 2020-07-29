// TODO: Figure out why we get a syntax error testing, but not when running
//    SyntaxError: Cannot use import statement outside a module
//1 | import React, { Component, Fragment } from 'react';
//2 | import cx from 'classnames';
//> 3 | import Vex from 'vexflow';
//  | ^
//4 | import './QuestionComponent.scss';
//5 |
//6 | import {

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});