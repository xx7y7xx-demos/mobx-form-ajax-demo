import { Collection, Model } from 'mobx-rest';
// import { PropTypes } from 'mobx-react';
import users from './users';

class PostModel extends Model {
  get user() {
    return users.get(this.get('userId')) ||
      users.build({ name: 'Unknown user' }); // null object
  }
}

class PostsCollection extends Collection {
  // url () { return '/posts'; }
  url() { return '/mobx/posts'; }
  model() { return PostModel; }
  // shape() {
  //   return PropTypes.shape({
  //     posts: PropTypes.observableArray.isRequired,
  //   });
  // }
}

// singleton
export default new PostsCollection();
