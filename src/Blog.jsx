import React, { Component, Fragment } from 'react'
import Article from './Article'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPublished: false,
      order: 1,
    }
  }

  // 公開状態を反転させる関数
  togglePublished = () => {
    this.setState({
      isPublished: !this.state.isPublished,
    })
  }
  render() {
    return (
      <Fragment>
        <Article
          title={'Reactの使い方'}
          isPublished={this.state.isPublished}
          toggle={() => this.togglePublished()}
        />
      </Fragment>
    )
  }
}

export default Blog
