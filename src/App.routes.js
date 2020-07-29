import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RoutePath } from './constants';
import MMMContainer from './Pages/MMM/MMMContainer';
import AboutContainer from './Pages/About/AboutContainer';
import HomeContainer from './Pages/Home/HomeContainer';
import GenericNotFoundContainer from './Pages/Error/GenericNotFoundContainer';

const AppRoutes = () => (
    <Switch>
        <Route exact path={RoutePath.HOME} component={HomeContainer} />
        <Route exact path={RoutePath.ABOUT} component={AboutContainer} />
        <Route exact path={RoutePath.NAMES} component={GenericNotFoundContainer} />
        <Route exact path={RoutePath.VALUES} component={MMMContainer} />
        <Route component={GenericNotFoundContainer} />
    </Switch>
)

export default AppRoutes;