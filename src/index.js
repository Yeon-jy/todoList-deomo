import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './static/css/index.css'
import App from './components/App'
import todoApp from './reducers/todoApp'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom';

let store = createStore(todoApp)

let rootElement = document.getElementById('root');
const option = {
    basename: '/',
    forceRefresh: !('pushState' in window.history),
    getUserConfirmation: () => {},
    keyLength: 12
}
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
