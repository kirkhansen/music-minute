import React from 'react';
import { NavLink } from 'react-router-dom';
import DefaultTemplate from '../Templates/DefaultTemplate';
import { RoutePath } from '../../constants';

const HomeContainer = props => {
  return (
    <DefaultTemplate>
      <div>
        <ul>
          <li>
            {' '}
            <NavLink to={RoutePath.NAMES}>Create Note Name Worksheet</NavLink>
          </li>
          <li>
            <NavLink to={RoutePath.VALUES}>Create Note Value Worksheet</NavLink>
          </li>
        </ul>
      </div>
    </DefaultTemplate>
  );
};

export default HomeContainer;
