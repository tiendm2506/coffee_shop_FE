import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import FadeUpAnimation from '@/components/common/FadeUpAnimation'
import Button from '../common/Button'

const Post = ({ title, thumb, description, date, url ='#' }) => {
  return (
    <FadeUpAnimation>
      <div className='bg-light-coffee/10 rounded-2xl overflow-hidden h-full'>
        <div className={clsx(
          'relative hover:after:opacity-100 cursor-pointer overflow-hidden group',
          'after:w-full after:h-full after:z-20 after:bg-black/20 after:left-0 after:top-0 after:absolute after:opacity-0 after:transition-all after:duration-300'
        )}>
          <img src={thumb} className='group-hover:scale-110 transition-all duration-300 w-full h-75 object-cover object-center' alt={title} />
          <Link href={url} className='ct-button absolute left-4 right-4 bottom-4 xl:bottom-0 z-30 opacity-100 xl:opacity-0 group-hover:bottom-4 group-hover:opacity-100 uppercase'>
            <Button variant='outline' className='w-full hover:bg-light-coffee hover:border-light-coffee hover:text-white'>Read the full story</Button>
          </Link>
        </div>
        <Link className='mt-6 px-4 py-2 text-xl inline-block text-secondary hover:text-light-coffee transition-all duration-300' href={url}>{title}</Link>
        <div className='px-4 mb-2'>{description}</div>
        <div className='px-4 pb-4'>{date}</div>
      </div>
    </FadeUpAnimation>
  )
}

export default Post