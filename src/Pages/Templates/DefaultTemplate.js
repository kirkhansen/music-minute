import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { RoutePath } from '../../constants';
import './DefaultTemplate.scss';


class DefaultTemplate extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <nav className="screen-only navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to={RoutePath.HOME}>
            <i className="fas fa-music"></i> Music Minute
          </Link>
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
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </Fragment>
    );
  }
}

export default DefaultTemplate;
