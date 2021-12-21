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
