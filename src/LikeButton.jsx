import React, { Component } from 'react'

class LikeButton extends Component {
  render() {
    const { count } = this.props
    return <button id={"counter"}>いいね数: {count}</button>
  }
}

export default LikeButton
