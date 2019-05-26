import React from 'react';
import { NavLink } from 'react-router-dom';
import DefaultTemplate from '../Templates/DefaultTemplate';
import { RoutePath } from '../../constants';
import './HomeContainer.scss';
const HomeContainer = props => {
  return (
    <DefaultTemplate>
      <div className="home-container">
        <NavLink to={RoutePath.NAMES}>
          <div class="card">
            <img src="/images/screen-shot-2.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Note Namer</h5>
              <p class="card-text">
                Quickly create a worksheet of random notes picking from a number of clefs, ranges, and key-signatures.
              </p>
              <p><small>Since 2012</small></p>

            </div>
          </div>
        </NavLink>

        <NavLink to={RoutePath.VALUES}>
        <div class="card">
            <img src="/images/screen-shot-1.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Note Value</h5>
              <p class="card-text">
                Quickly create a worksheet of random notes values. Pick from a number of diferent time-signatures and note values.
              </p>
              <p><small>Since 2019</small></p>
            </div>
          </div>
        </NavLink>
      </div>
    </DefaultTemplate>
  );
};

export default HomeContainer;
