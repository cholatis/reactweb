import React from 'react';
import { Route, IndexRoute } from 'react-router-dom';

import App from './components/App';
import Greetings from './components/Greetings';

class routes extends React.Component {
  render() {
    return(
      <Route path="/" component={App}>
        <IndexRoute component={Greetings} />
      </Route>
    );
  }
}
export default routes;
