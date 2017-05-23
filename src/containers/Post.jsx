import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class Post extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleEdit() {

  }
  handleDelete() {

  }
  render() {
    const { post } = this.props;

    return (
      <tr className="Post">
        <td>
          { post.get('title') }
        </td>
        <td>
          { post.get('body') }
        </td>
        <td>
          <button onClick={this.handleEdit}>Edit</button>
          {' '}
          <button onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Post;
