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

## 09 React Hools 関数コンポーネントでもライフサイクルを扱う

#### useEffect()のメリット

+ ライフサイクリメソッドを代替できる<br>

* Functional Componentsでライフサイクルを使える<br>

+ コードをまとめられる ◯ 機能ベース (何をやっているのか) × 時の流れベース (ライフサイクルのメソッド毎)<br>

#### useEffect()の仕組み

+ レンダー毎にuseEffect()内の処理が走る<br>

+ 代替できるメソッドは以下

1. `componentDidMount()`<br>

2. `componentDidUpdate()`<br>

3. `componentWillUnmount()`<br>

#### パターン①レンダー毎

```
useEffect(() => {
  console.log('Render!')
  return () => {
    console.log('Unmounting!')
  }
})
```

+ 基本の形<br>

+ useEffect()内にCallback関数を書く<br>

+ Callbackはレンダー毎に呼ばれる<br>

+ returnするCallback関数はアンマウント時に呼ばれる。(クリーンアップ関数)<br>

#### パターン②マウント時のみ

```
useEffect(() => {
  console.log('Render!')
}, [])
```

+ 第二引数の配列内の値を`前回レンダーと今回レンダーで比較`->変更があればCallback関数を実行<br>

+ 第二引数に空の配列を渡すと最初の1回（マウント時）のみ実行される<br>

#### パターン③マウント&アンマウント

```
useEffect(() => {
  console.log('Render!')
  return () => {
    console.log('Unmounting!)
  }
}, [])
```

+ ①と②の複合形<br>

+ 通常のCallbackはマウント時のみ<br>

+ アンマウント時はreturn内のクリーンアップ関数が実行される<br>

#### パターン④特定のレンダー時

```
const [limit, release] = useState(true);

useEffect(() => {
  console.log('Render!')
}, [limit])
```

+ マウント時に実行される<br>

+ limitの値が変わった時に実行される<br>

+ 上記の例で言えば、limitの値が`true -> false`になった時<br>

#### useEffect実践

+ `src/Article.jsx`を編集<br>

```
import React, { memo, useState } from 'react'
import LikeButton from './LikeButton'

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
      <LikeButton /> // 編集
    </div>
  )
})

export default Article
```

`パターン①`<br>

+ `src/LikeButton.jsx`を編集<br>

```
import React, { useState, useEffect, memo } from 'react'

const LikeButton = memo(() => {
  const [count, counter] = useState(0)

  const countUp = () => {
    counter(count + 1)
  }

  useEffect(() => {
    document.getElementById('counter').addEventListener('click', countUp)
    return () => {
      document.getElementById('counter').removeEventListener('click', countUp)
    }
  })

  return <button id={'counter'}>いいね数: {count}</button>
})

export default LikeButton
```

+ `パターン②`<br>

+ `src/LikeButton.jsx`を編集<br>

```
import React, { useState, useEffect, memo } from 'react'

const LikeButton = memo(() => {
  const [count, counter] = useState(0)
  const [limit, release] = useState(true)

  const countUp = () => {
    counter(count + 1)
  }

  useEffect(() => {
    document.getElementById('counter').addEventListener('click', countUp)
    if (count >= 10) {
      counter(0)
    }
    return () => {
      document.getElementById('counter').removeEventListener('click', countUp)
    }
  }, [limit])

  return (
    <>
      <button id={'counter'}>いいね数: {count}</button>
      <button onClick={() => release(!limit)}>もっといいねしたい</button>
    </>
  )
})

export default LikeButton
```
