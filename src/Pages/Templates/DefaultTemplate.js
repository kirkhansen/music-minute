import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import { RoutePath } from '../../constants';
import './DefaultTemplate.scss';


class DefaultTemplate extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <i className="fas fa-music"></i> Mad Minute Music 2<sup><small>.5</small></sup>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink activeClassName="active" className="nav-item nav-link" exact to={RoutePath.HOME}>
                Create
              </NavLink>
              <NavLink activeClassName="active" className="nav-item nav-link" to={RoutePath.ABOUT}>
                About
              </NavLink>
              <NavLink activeClassName="active" className="nav-item nav-link" to={RoutePath.CHANGES}>
                Changes
              </NavLink>
              <NavLink activeClassName="active" className="nav-item nav-link" to={RoutePath.CONTACT}>
                Contact
              </NavLink>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer>
           Mad Minute Music © Jeff Smykil 2012-{moment().format('YYYY')}
        </footer>
      </Fragment>
    );
  }
}

export default DefaultTemplate;
