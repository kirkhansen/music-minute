import React from 'react';
import { NavLink } from 'react-router-dom';
import DefaultTemplate from '../Templates/DefaultTemplate';
import { RoutePath } from '../../constants';
import './HomeContainer.scss';
import noteValueLogo from "../../images/screen-shot-1.png"
import noteNammerLogo from "../../images/screen-shot-2.png"

const HomeContainer = props => {
  return (
    <DefaultTemplate>
      <div className="home-container">
        <NavLink to={RoutePath.NAMES}>
          <div className="card">
            <img src={noteNammerLogo} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Note Namer</h5>
              <p className="card-text">
                Create a worksheet of random notes picking from a number of clefs, ranges, and key-signatures.
              </p>
            </div>
          </div>
        </NavLink>

        <NavLink to={RoutePath.VALUES}>
        <div className="card">
            <img src={noteValueLogo} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Note Value</h5>
              <p className="card-text">
                Create a worksheet of random notes values. Pick from a number of diferent time-signatures and note values.
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </DefaultTemplate>
  );
};

export default HomeContainer;
