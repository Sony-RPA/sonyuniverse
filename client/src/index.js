import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routers/App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store/configureStore"

store.subscribe(() => {
	const state = store.getState()
	console.log(state)
})


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
