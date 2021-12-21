## create-react-app

+ `$ npm run build`を実行してみる<br>

+ `$npm start`を実行してみる<br>

+ `src/App.js`を編集してみる<br>

```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React on Torazemi
        </a>
      </header>
    </div>
  );
}

export default App;
```

# 04. コンポーネントの基本 データの受け渡しと再利用

+ コンポーネントとは<br>

+ UIは2つに分類される<br>

+ 1. 見た目(View)<br>

+ 2. 機能(Controller)<br>

コンポーネント = 見た目 + 機能<br>

### Functional Componentの特徴

+ ES6のアロー関数で記述<br>

+ stateを持たない(stateless)<br>

+ propsを引数に受け取る<br>

+ jsxをreturnする<br>

`src/Article.jsx`<br>
```
import React from 'react';

const Article = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
    </div>
  )
}
```

### Class Componentの特徴

+ React.Componentを継承<br>

+ ライフサイクルやstateを持つ<br>

+ propsにはthisが必要<br>

+ renderメソッド内でjsxをreturnする<br>

`src/Article.jsx`<br>

```
import React from 'react';

class Article extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
      </div>
    )
  }
}
```

+ `src/Blog.jsx`コンポーネントを作成(クラスコンポーネント)<br>

```
import React, { Component, Fragment } from 'react'
import Article from './Article'

class Blog extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Fragment>
        <Article />
        <Article />
      </Fragment>
    )
  }
}

export default Blog
```

+ `src/index.js`を編集<br>

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Blog from './Blog';

ReactDOM.render(
  <React.StrictMode>
    <Blog />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

+ `src/Article.jsx`コンポーネントを作成(関数コンポーネント)<br>

```
const Article = (props) => {
  return (
    <div>
      <h2>Reactコンポーネントの使い方</h2>
    </div>
  )
}

export default Article
```

+ importしているコンポーネントが親？ exportしているコンポーネントは子?<br>

### propsでデータを受け渡す

+ 親コンポーネント<br>

```
import React from 'react'
import Article from "./Article'

const Blog = () => {
  return (
    <div>
      <Article title={"React"} />
    </div>
  )
}

export default Blog
```

+ `子コンポーネント`<br>

```
import React from 'react'

const Article = (props) => {
  return (
    <div>
      return (
        <div>
          <h2>{props.title}</h2>
        </div>
      )
    </div>
  )
}

export default Article
```

+ `src/Blog.jsx`を編集<br>

```
import React, { Component, Fragment } from 'react'
import Article from './Article'

class Blog extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Fragment>
        <Article title={"React"} /> // 子コンポーネントのpropsに"React"を渡している
      </Fragment>
    )
  }
}

export default Blog
```

+ `src/Article.jsx`を編集<br>

```
import React from 'react'

const Article = (props) => {
  const { title } = props
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}

export default Article
```

### 受け渡せるデータ型

+ {}内に記述<br>

+ 文字列、数値、真偽値、配列、オブジェクト、変数など何でも渡せる<br>

+ 文字列は{}なしでもOK

```
import React, { Component, Fragment } from 'react'
import Article from './Article'

class Blog extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const authorName = "Torahack";
    return (
      <Fragment>
        <Article title={"React"}
          order={3}
          isPublished={true}
          author={authorName}
      />
      </Fragment>
    )
  }
}

export default Blog
```

+ `src/Blog.jsx`を編集<br>

```
import React, { Component, Fragment } from 'react'
import Article from './Article'

class Blog extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const authorName = 'Torahack'
    return (
      <Fragment>
        <Article
          title={'Reactの使い方'}
          order={3}
          isPublished={true}
          author={authorName}
        />
      </Fragment>
    )
  }
}

export default Blog
```

+ `src/Article.jsx`を編集<br>

```
import React from 'react'

const Article = (props) => {
  const { title, order, isPublished, author } = props
  // let publishState = ''
  // if (isPublished) {
  //   publishState = '公開'
  // } else {
  //   publishState = '非公開'
  // }

  return (
    <div>
      <h2>{title}</h2>
      <p>順番は{order}です。</p>
      <p>著者は{author}です。</p>
      <p>{isPublished ? '公開' : '非公開'}</p>
      {/* <p>{publishState}</p> */}
    </div>
  )
}

export default Article
```

### コンポーネントの再利用

```
import React from 'react'
import Article from "./Article"

const Blog = () => {
  return (
    <div>
      <Article title="Reactの基本知識" />
      <Article title="JSXとは？" />
      <Article title="環境構築" />
    </div>
  )
}
```

+ `src/Blog.jsx`を編集<br>

```
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
```

+ src/Article.jsx`を編集<br>

```
import React from 'react'

const Article = (props) => {
  const { title, order } = props

  return (
    <div>
      <h2>{title}</h2>
      <p>順番は{order}です。</p>
    </div>
  )
}

export default Article
```