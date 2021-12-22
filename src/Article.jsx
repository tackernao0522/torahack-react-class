import React, { Component } from 'react'

class Article extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { title, isPublished, toggle } = this.props
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
      </div>
    )
  }
}

export default Article
