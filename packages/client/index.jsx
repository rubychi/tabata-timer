import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import App from './containers/App';
import configureStore from './configureStore';
import 'normalize.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <CookiesProvider>
      <Router>
        <div className="app-wrapper">
          <Route exact path="/" component={App} />
        </div>
      </Router>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
