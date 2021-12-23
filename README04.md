## 07 importとexportでモジュールを使いこなそう

### 名前付きexport

1. モジュールから複数の関数をexport : クラスはexportできない<br>

1. export function 関数名() {}<br>

2. export const 関数名 = () => {}<br>

+ `例`<br>

`src/index.js`<br>

```
export function Foo() {
  return (<h1>Fooooo</h1>)
}
export const Bar = () => {
  return (<h1>Baaaar</h1>)
}
```

### 名前なし(default)export

+ 1ファイル(1モジュール)1export<br>

+ `ES6で推奨のexport方法`<br>

+ アロー関数は宣言後にexport<br>

+ クラスをexportできる<br>

+ `例`<br>

`src/Foo.js`<br>

```
export default function Foo() {
  return (<h1>Foooo</h1>)
}
```

`src/Bar.js`<br>

```
const Bar = () => {
  return (<h1>Baaaar</h1>)
}
export default Bar
```

`src/Hoge.js`<br>

```
export default class Hoge extends Fuga {
  render() {
    return (<h1>Hoge</h1>)
  }
}
```

### モジュール全体のimport

+ 名前なし(default)exportしたモジュールをimportする<br>

+ モジュール全体のimport<br>

+ `例`<br>

`src/Blog.js`<br>

```
import React from 'react';
import Article from "./Article"
```

`src/Article.js`<br>

```
const Article = (props) => {
  return (<div>Articleです！</div>)
}
export default Article
```

### 関数ごとのimport

+ 名前付きexportされたモジュールをimportする<br>

+ {}内にimportしたい関数名<br>

+ `例`<br>

`src/Hoge.js`<br>

```
import { Foo, Bar } from "./FooBar"
```

`src/FooBar.js`<br>

```
export function Foo() {
  return (<h1>Fooooo</h1>)
}
export const Bar = () => {
  return (<h1>Baaaar</h1>)
}
```

### 別名import

+ 別名(エイリアス)をつけてimportできる<br>

+ モジュール全体なら * as name<br>

+ モジュール一部なら {A as B}<br>

+ `例`<br>

`src/Blog.js`<br>

```
import React from 'react'
import * as AnotherName from './Article'
import { Foo as MyFoo } from './FooBar'
```

`src/Article.js`<br>

```
const Article = (props) => {
  return (<div>Articleです！</div>)
}
export default Article
```

#### 実践

+ `src/components`ディレクトリを作成<br>

+ `src/components/FooBar.jsx`コンポーネントを作成<br>

```
import React from 'react'

export function Foo() {
  return <h2>FOoooo</h2>
}

export const Bar = () => {
  return <h2>Baaaar</h2>
}

export const Open = () => alert('クリックされました')
```

+ `src/components/Foge.jsx`コンポーネントを作成<br>

```
import React, { Component } from 'react'

export default class Foge extends Component {
  render() {
    return (
      <h2>Hogeeeeeee</h2>
    )
  }
}
```

+ `src/Blog.jsx`を編集<br>

```
import React, { Component, Fragment } from 'react'
import Article from './Article'
import Foge from './components/Foge'
import { Bar, Foo, Open } from './components/FooBar'

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
        <Foo />
        <Bar />
        <Foge />
        <button onClick={() => Open()}>Click</button>
      </Fragment>
    )
  }
}

export default Blog
```

#### 別名import実践

`src/Blog.jsx`を編集<br>

```
import React, { Component, Fragment } from 'react'
import Article from './Article'
import Foge from './components/Foge'
import * as FooBar from './components/FooBar'

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
        <FooBar.Foo />
        <FooBar.Bar />
        <Foge />
        <button onClick={() => FooBar.Open()}>Click</button>
      </Fragment>
    )
  }
}

export default Blog
```

## 08 React Hoolsでstateを使う(関数コンポーネントでもステートを扱う)

### フック(hook)とは

+ クラスの機能（stateやライフサイクル）をFunctional Componentでも使える<br>

+ React 16.8から導入(2020/2に正式リリース)<br>

+ 100%後方互換=>小さく導入できる<br>

### useState()を使おう

+ ステートフックと呼ばれる<br>

+ クラスコンポーネントでいう this.stateとthis.setState()を代替<br>

+ 複数のstateを扱うときはstate毎に宣言<br>

### useState()の使い方

1. useState関数をインポート<br>

```
import React, {useState} from 'react';
```

2. 宣言する<br>

```
//      state変数名   state変更関数名      state初期値
const [isPblished, togglePublished] = useState(false);
```

3. JSX内で使う<br>

```
<input /** 中略 */ onClick={() => togglePublished(!isPublished)} />
```

### useState実践

+ `src/Blog.jsx`を編集<br>

```
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
```

+ `src/Article.jsx`を編集<br>

```
import React, { memo, useState } from 'react'

const Article = memo((props) => {
  const { title } = props
  const [isPublished, togglePublished] = useState(false)

  return (
    <div>
      <h2>{title}</h2>
      <label htmlFor="check">公開状態:</label>
      <input
        type="checkbox"
        checked={isPublished}
        id="check"
        onClick={() => togglePublished(!isPublished)}
      />
      {/* <LikeButton count={count} /> */}
    </div>
  )
})

export default Article
```
