import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import FadeUpAnimation from '../common/FadeUpAnimation'
import Button from '../common/Button'

const Product = ({ image, name, isOnSale = false, url = '#', originPrice, promotionPrice = null }) => {
  return (
    <FadeUpAnimation>
      <div className='bg-light-coffee/10 rounded-2xl overflow-hidden'>
        <div className={clsx(
          'relative hover:after:opacity-100 cursor-pointer overflow-hidden group',
          'after:w-full after:h-full after:z-20 after:bg-black/20 after:left-0 after:top-0 after:absolute after:opacity-0 after:transition-all after:duration-300'
        )}>
          <img src={image} className='object-cover object-center group-hover:scale-110 transition-all duration-300 w-full' alt={name} />
          <Link href={url} className='ct-button absolute left-4 right-4 bottom-4 xl:bottom-0 z-30 hover:text-white opacity-100 xl:opacity-0 group-hover:bottom-4 group-hover:opacity-100'>
            <Button variant='outline' className='w-full hover:bg-light-coffee hover:text-white hover:border-light-coffee'>EXPLORE MUG</Button>
          </Link>
          {isOnSale && <span className='absolute right-4 top-4 z-30 inline-block text-light-coffee bg-white rounded-sm px-4 py-1.5 text-base font-bold'>On Sale</span>}
        </div>
        <div className='mt-6 py-2 text-xl text-center'>{name}</div>
        <div className='flex items-center justify-center pb-4'>
          {isOnSale && <span className='text-xl text-light-coffee font-bold mr-2'>{promotionPrice} USD</span>}
          <span className={clsx(
            'text-base',
            isOnSale ? 'text-primary/60 line-through' : 'text-primary'
          )}>
            {originPrice} &nbsp;USD
          </span>
        </div>
      </div>
    </FadeUpAnimation>
  )
}

export default Product