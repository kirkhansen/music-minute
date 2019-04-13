import React, { Component } from 'react';
import DefaultTemplate from '../Templates/DefaultTemplate';
import Changes from './Changes';
import ContentApi from '../../Services/ContentApi';

class ChangesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      changes: null,
    })
  }

  async componentDidMount() {
    const changes = await ContentApi.fetchChanges();
    this.setState({ changes: changes});
  }

  render() {
    const { changes } = this.state;
    return (
        <DefaultTemplate>
          <Changes changes={changes} />
        </DefaultTemplate>
    );
  }
}

export default ChangesContainer;