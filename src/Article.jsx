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
