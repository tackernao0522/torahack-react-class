## 06 ライフサイクルの流れを理解する 副作用のある処理を書く<br>

### ライフサイクルとは

+ コンポーネントの「時間の流れ」<br>

+ 生まれて、成長して、死ぬまでの循環<br>

+ それぞれの段階で必要な処理を記述<br>

### 3種類のライフサイクル

+ `Update` -> `Unmount` -> `Mount` -> `Update`<br>

+ `Mounting(Mount)` コンポーネントが配置される（生まれる）期間<br>

+ `Updating` コンポーネントが変更される（成長する）期間<br>

+ `Unmounting` コンポーネントが破棄される（死ぬ）期間<br>

### なぜライフサイクルを使う?

+ `関数のそとに影響を与える関数`を記述するため (DOM変更、API通信、ログ出力、setState()...etc)<br>

+ 副作用=適切な場所に配置すべき処理<br>

#### 主要なメソッド名

+ `Mounting` => `constructor()` => `render()` => `comonentDidMount()`<br>

+ `Updating` => `render()` => `componentDidUpdate()`<br>

+ `Unmounting` => `componentWillUnmount()`<br>


#### 主要メソッド(Mount)

+ `Mounting` => `constructor()` => `render()` => `componentDidMount()`<br>

+ `constructor()` : 初期化 (stateなど)<br>

+ `render()` : VDOMを描画 (JSXをリターン)<br>

+ `componentDidMount()` : render()後に１度だけ呼ばれる。リスナーの設定やAPI通信に使われる。<br>

#### 主要メソッド(Update)

+ `render()` : VDOMを再描画<br>

+ `componentDidUpdate()` : 再render()後に呼ばれる。スクロールイベントや条件付きイベント(チャットコメント部分など)<br>

#### 主要メソッド(Unmount)

+ `componentWillUnmount` : コンポーネントが破棄される直前、リソースを解放するため、リスナー解除など<br>

+ `実践`<br>

+ `src/Blog.jsx`を編集<br>

```
import React, { Component, Fragment } from 'react'
import Article from './Article'
import LikeButton from './LikeButton'

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPublished: false,
      count: 0,
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
          count={this.state.count}
        />
      </Fragment>
    )
  }
}

export default Blog
```

+ `src/LikeButton.jsx`コンポーネントを作成<br>

```
import React, { Component } from 'react'

class LikeButton extends Component {
  render() {
    const { count } = this.props
    return <button>いいね数: {count}</button>
  }
}

export default LikeButton
```

+ `src/Article.jsx`<br>

```
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
```

+ `src/LikeButton.jsx`

```
import React, { Component } from 'react'

class LikeButton extends Component {
  render() {
    const { count } = this.props
    return <button id={"counter"}>いいね数: {count}</button>
  }
}

export default LikeButton
```

+ `src/Blog.jsx`<br>

```
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

  // 公開状態を反転させる関数
  togglePublished = () => {
    this.setState({
      isPublished: !this.state.isPublished,
    })
  }

  countUp = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    const {isPublished, count} = this.state
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
```

### componentDidUpdate() 実践

`src/Blog.jsx`<br>

```
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
    if (this.state.count >= 10) {
      this.setState({ count: 0 })
    }
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
```

### componenWillUnmount() 実践

`src/Blog.jsx`<br>

```
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
```