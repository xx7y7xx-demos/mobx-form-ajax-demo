import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';
import AppState from './stores/AppState';

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
