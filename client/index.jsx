import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import App from './containers/App';
import configureStore from './configureStore';
import 'normalize.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <div className="app-wrapper">
        <Route exact path="/" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
