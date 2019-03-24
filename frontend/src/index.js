import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import rootReducer from './reductores';
import history from './history';
import Root from './componentes/Root';
import CuentaDragones from './componentes/CuentaDragones';
import DragonesPublicos from './componentes/DragonesPublicos';
import { fetchAuthenticated } from './acciones/cuenta';
import './index.css';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const AuthRoute = props => {
  if (!store.getState().cuenta.loggedIn) {
    return <Redirect to={{ pathname: '/' }} />
  }

  const { component, path } = props;

  return <Route path={path} component={component} />;
}

store.dispatch(fetchAuthenticated())
  .then(() => {
		render(
			<Provider store={store}>
				<Router history={history}>
					<Switch>
						<Route exact path='/' component={Root} />
						<AuthRoute path='/cuenta-dragones' component={CuentaDragones} />
						<AuthRoute path='/dragones-publicos' component={DragonesPublicos} />
					</Switch>
				</Router>
			</Provider>,
			document.getElementById('root')
		);
 	});