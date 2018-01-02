import React from 'react';
import { 
	Route, 
	Switch, 
	HashRouter,
	Link
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import App from '../containers/App.js';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

class RouteMap extends React.Component {
	render() {
		return (
			<HashRouter>
				<CookiesProvider>
					<App>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route component={NotFound} />
						</Switch>
					</App>
				</CookiesProvider>
			</HashRouter>
		);
	}
}

export default RouteMap;