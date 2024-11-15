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
      <LikeButton />
    </div>
  )
})

export default Article
