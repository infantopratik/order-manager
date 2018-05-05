import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Scenes/Home/Home';
import Login from './Scenes/Login/Login';
import Register from './Scenes/Register/Register';

const Routes = () => (
	<Switch>
		<Route exact path="/login" component={Login} />
		<Route exact path="/register" component={Register} />
		<Route exact path="/" component={Home} />
	</Switch>
);

export default Routes;
