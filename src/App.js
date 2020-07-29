import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import history from './history';
import AppRoutes from './App.routes';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <AppRoutes />
      </Router>
    );
  }
}

export default App;