import { createStore } from 'redux';
import rootReducer from '../reducers';

const configureStore = (initialStore) => (
	createStore(rootReducer, initialStore, 
		window.devToolsExtension ? window.devToolsExtension() : undefined
	)
);

export default configureStore;