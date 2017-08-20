import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';

//import routes from './routes';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import NewEventPage from './components/events/NewEventPage';

import requireAuth from './utils/requireAuth';

const store = createStore (
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render((
  <Provider store={store}>
    <Router history={browserHistory} >
      <div>
        <Route path="/" component={App} />
        <Route exact path="/"  component={Greetings} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/new-event" component={requireAuth(NewEventPage)} />
      </div>
    </Router>
  </Provider>
), document.getElementById('app'));﻿


//render(<Router routes={ routes } />, document.getElementById('app'));
