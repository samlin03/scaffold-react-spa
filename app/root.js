import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';

import RouteMap from './router/route_map';

//模拟获取服务器端的initialState
const fetchOptions = {
	method: 'GET'
};

fetch('/app/data/initialState.json'
, fetchOptions)
	.then(res => res.json())
	.then(json => {
		const store = configureStore(json);
		render(
			<Provider store={store}>
				<RouteMap />
			</Provider>,
			document.getElementById('root')
		);
	});