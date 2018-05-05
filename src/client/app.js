import React, { Component } from 'react';
import _ from 'lodash';

import './Styles/App.scss';

import Routes from './routes';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app">
				<div className="wrapper">
					<main id="page-content">
						<Routes />
					</main>
				</div>
			</div>
		);
	}
}

export default App;
