import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import users from '../stores/users';

import Loading from './Loading';
import Posts from './Posts';

const plugins = { dvr: validatorjs };

const fields = [{
  name: 'email',
  label: 'Email',
  placeholder: 'Insert Email',
  rules: 'required|email|string|between:5,25',
}];

class MyForm extends MobxReactForm {

  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    // get field values
    console.log('Form Values!', form.values());
  }

  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('This is a generic error message!');
  }
}

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.mformInstance = new MyForm({ fields }, { plugins });
  }
  componentWillMount() {
    users.fetch();
  }
  onReset = () => {
    this.props.appState.resetTimer();
  }
  renderContent = () => {
    if (users.isRequest('fetching')) {
      return (
        <Loading label="application" />
      );
    }

    return <Posts />;
  }
  render() {
    return (
      <div>
        <div className="App__body">
          {this.renderContent()}
        </div>
        <button onClick={this.onReset}>
          Seconds passed: {this.props.appState.timer}
        </button>
        <hr />
        <form onSubmit={this.mformInstance.onSubmit}>
          <label htmlFor={this.mformInstance.$('email').id}>
            {this.mformInstance.$('email').label}
          </label>
          <input
            {...this.mformInstance.$('email').bind()}
          />
          <p>{this.mformInstance.$('email').error}</p>

          <button type="submit" onClick={this.mformInstance.onSubmit}>Submit</button>
          <button type="button" onClick={this.mformInstance.onClear}>Clear</button>
          <button type="button" onClick={this.mformInstance.onReset}>Reset</button>

          <p>{this.mformInstance.error}</p>
        </form>
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
