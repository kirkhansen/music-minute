import React, { Component, Fragment } from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h6>Did you select a not and time signature that are not compatible?</h6>;
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary;