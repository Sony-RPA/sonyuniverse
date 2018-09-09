import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routers/App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store/configureStore"

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
