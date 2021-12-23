import React, { Fragment } from 'react'
import Article from './Article'
import Foge from './components/Foge'
import * as FooBar from './components/FooBar'

const Blog = () => {
  // componentDidMount() {
  //   // ボタンがクリックされたらいいねをカウントアップする
  //   document.getElementById('counter').addEventListener('click', this.countUp)
  // }

  // componentDidUpdate() {
  //   // いいねカウントが10になったら0にする
  //   if (this.state.count >= 10) {
  //     this.setState({ count: 0 })
  //   }
  // }

  // componentWillUnmount() {
  //   document.getElementById('counter').removeEventListener('click', this.countUp)
  // }

  // countUp = () => {
  //   this.setState({
  //     count: this.state.count + 1,
  //   })
  // }
  return (
    <Fragment>
      <Article
        title={'Reactの使い方'}
        // count={count}
      />
      <FooBar.Foo />
      <FooBar.Bar />
      <Foge />
      <button onClick={() => FooBar.Open()}>Click</button>
    </Fragment>
  )
}

export default Blog
