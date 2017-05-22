import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

@observer
class App extends Component {
  onReset = () => {
    this.props.appState.resetTimer();
  }
  render() {
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds passed: {this.props.appState.timer}
        </button>
        {/* <DevTools />*/}
      </div>
    );
  }
}

App.propTypes = {
  appState: PropTypes.shape({
    timer: PropTypes.number.isRequired,
    resetTimer: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
