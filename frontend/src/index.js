import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import Generacion from './componentes/Generacion';
import Dragon from './componentes/Dragon';
import rootReducer from './reductores';
import './index.css';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<div>
			<h2>Dragones Web desde React</h2>
			<Generacion />
			<Dragon />
		</div>
	</Provider>,
	document.getElementById('root')
);