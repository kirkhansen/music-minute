import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RoutePath } from './constants';
import NoteNameContainer from './Pages/NoteName/NoteNameContainer';
import NoteValueContainer from './Pages/NoteValue/NoteValueContainer';
import AboutContainer from './Pages/About/AboutContainer';
import HomeContainer from './Pages/Home/HomeContainer';
import GenericNotFoundContainer from './Pages/Error/GenericNotFoundContainer';

const AppRoutes = () => (
    <Switch>
        <Route exact path={RoutePath.HOME} component={HomeContainer} />
        <Route exact path={RoutePath.ABOUT} component={AboutContainer} />
        <Route exact path={RoutePath.NAMES} component={NoteNameContainer} />
        <Route exact path={RoutePath.VALUES} component={NoteValueContainer} />
        <Route component={GenericNotFoundContainer} />
    </Switch>
)

export default AppRoutes;