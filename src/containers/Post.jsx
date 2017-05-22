import React, { Component } from 'react';
import { observer } from 'mobx-react'

export default observer(class Post extends Component {
  state = { open: false }

  onToggle () {
    this.setState(state => (
      { open: !state.open }
    ))
  }

  render () {
    const { post } = this.props

    return (
      <div className='Post'>
        <a className='Post__Link' href='#' onClick={this.onToggle.bind(this)}>
          <div className='Post__Link__Text'>
            {post.get('title')}
          </div>
        </a>
      </div>
    )
  }
})