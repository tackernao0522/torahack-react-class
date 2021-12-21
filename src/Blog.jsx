import React, { Component, Fragment } from 'react'
import Article from './Article'

class Blog extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Fragment>
        <Article title={'Reactの使い方'} order={1} />
        <Article title={'JSXの使い方'} order={2} />
        <Article title={'環境構築をしてみよう'} order={3} />
      </Fragment>
    )
  }
}

export default Blog
