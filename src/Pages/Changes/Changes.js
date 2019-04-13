import React, { Component } from 'react';
import moment from 'moment';

const Changes = props => {
  const { changes } = props;
  return <ul>{changes && changes.map((change, index) => <li key={`t-${index}`}> <span className="badge badge-primary">{moment(change.commit.committer.date).format('MM/DD/YYYY')}</span> {change.commit.message}</li>)}</ul>;
};

export default Changes;
