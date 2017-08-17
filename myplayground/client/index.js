import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

//import routes from './routes';


import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';

const store = createStore (
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render((
  <Provider store={store}>
    <Router history={browserHistory} >
      <div>
        <Route path="/" component={App} />
        <Route exact path="/"  component={Greetings} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  </Provider>
), document.getElementById('app'));﻿


//render(<Router routes={ routes } />, document.getElementById('app'));
