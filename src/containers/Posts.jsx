import React, { Component } from 'react';
import { shape } from 'prop-types';
import { observer, PropTypes } from 'mobx-react';

import Post from './Post';
import Loading from './Loading';

@observer
class Posts extends Component {
  componentWillMount() {
  }

  render() {
    const { posts } = this.props;
    if (posts.isRequest('fetching')) {
      return <Loading label="posts" />;
    }

    return (
      <table className="posts">
        <thead>
          <tr>
            <th className="title">Title</th>
            <th className="body">Body</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {
            posts.models.map(post => (
              <Post key={post.id} post={post} />
            ))
          }
        </tbody>
      </table>
    );
  }
}

Posts.propTypes = {
  posts: shape({
    models: PropTypes.observableArray.isRequired,
  }).isRequired,
};

export default Posts;
