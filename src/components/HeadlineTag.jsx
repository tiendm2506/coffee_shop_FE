import React from 'react'
import cx from 'classnames'

const HeadlineTag = ({ title, style = {} }) => {
  return (
    <div className='text-center mb-10'>
      <span className={cx(
        'text-title/60 uppercase text-sm font-bold inline-block relative',
        'before:w-8 before:h-px before:bg-light-coffee/60 before:absolute before:-left-12 before:top-2',
        'after:w-8 after:h-px after:bg-light-coffee/60 after:absolute after:-right-12 after:top-2'
      )}
      style={style}
      >
        {title}
      </span>
    </div>
  )
}

export default HeadlineTag