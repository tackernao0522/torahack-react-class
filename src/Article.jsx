import React, { Component } from 'react'
import LikeButton from './LikeButton'

class Article extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    const { title, isPublished, toggle, count } = this.props
    return (
      <div>
        <h2>{title}</h2>
        <label htmlFor="check">公開状態:</label>
        <input
          type="checkbox"
          checked={isPublished}
          id="check"
          onClick={() => toggle()}
        />
        <LikeButton count={count} />
      </div>
    )
  }
}

export default Article
