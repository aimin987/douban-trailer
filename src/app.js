import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Routes from './routes';

export default () => {
    <Switch>
        {
            Routes.map(({ name, path, exact = true, component }) => (
                <Route path={path} exact={exact} component={component} key={name} />
            ))
        }
    </Switch>
}