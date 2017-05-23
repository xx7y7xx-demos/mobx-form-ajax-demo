import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';

import { apiClient } from 'mobx-rest';
import adapter from 'mobx-rest-fetch-adapter';

import Root from './containers/Root';
import AppState from './stores/AppState';

// Initialize mob-rest API adapter
// const apiPath = 'https://jsonplaceholder.typicode.com';
const apiPath = 'http://localhost:3009';
apiClient(adapter, { apiPath });

const appState = new AppState();

const render = (Component, state) => {
  ReactDOM.render(
    <AppContainer>
      <Component appState={state} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root, appState);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(Root, appState);
  });
}
