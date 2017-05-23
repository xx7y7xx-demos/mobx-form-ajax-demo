import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import users from '../stores/users';
import posts from '../stores/posts';

import Loading from './Loading';
import Posts from './Posts';

const plugins = { dvr: validatorjs };

const fields = [
  {
    name: 'title',
    label: 'Title',
    placeholder: 'Insert title',
    rules: 'required',
  },
  {
    name: 'body',
    label: 'Body',
    placeholder: 'Insert body',
    rules: 'required|between:1,200',
  },
];

class MyForm extends MobxReactForm {

  onSuccess(form) {
    // get field values
    // console.log('Form Values!', form.values());
    posts.create({
      ...form.values(),
    });
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
    posts.fetch();
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

    return <Posts posts={posts} />;
  }
  render() {
    const titleField = this.mformInstance.$('title');
    const bodyField = this.mformInstance.$('body');
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds passed: {this.props.appState.timer}
        </button>
        <hr />
        <form onSubmit={this.mformInstance.onSubmit}>
          <div>
            <label htmlFor={titleField.id}>
              {titleField.label}
            </label>
            <input
              {...titleField.bind()}
            />
            <p className="error">{titleField.error}</p>
          </div>
          <div>
            <label htmlFor={bodyField.id}>
              {bodyField.label}
            </label>
            <textarea
              {...bodyField.bind()}
            />
            <p className="error">{bodyField.error}</p>
          </div>
          <button type="submit" onClick={this.mformInstance.onSubmit}>Submit</button>
          <button type="button" onClick={this.mformInstance.onClear}>Clear</button>
          <button type="button" onClick={this.mformInstance.onReset}>Reset</button>

          <p className="error">{this.mformInstance.error}</p>
        </form>
        <div className="App__body">
          {this.renderContent()}
        </div>
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
