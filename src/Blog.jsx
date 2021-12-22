import React, { Component, Fragment } from 'react'
import Article from './Article'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPublished: false,
      count: 0,
    }
  }

  componentDidMount() {
    // ボタンがクリックされたらいいねをカウントアップする
    document.getElementById('counter').addEventListener('click', this.countUp)
  }

  componentDidUpdate() {
    // いいねカウントが10になったら0にする
    if (this.state.count >= 10) {
      this.setState({ count: 0 })
    }
  }

  componentWillUnmount() {
    document.getElementById('counter').removeEventListener('click', this.countUp)
  }

  // 公開状態を反転させる関数
  togglePublished = () => {
    this.setState({
      isPublished: !this.state.isPublished,
    })
  }

  countUp = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }
  render() {
    const { isPublished, count } = this.state
    return (
      <Fragment>
        <Article
          title={'Reactの使い方'}
          isPublished={isPublished}
          toggle={() => this.togglePublished()}
          count={count}
        />
      </Fragment>
    )
  }
}

export default Blog
