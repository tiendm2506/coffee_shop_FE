import React, { useEffect, useRef } from 'react'
import { IoMdClose } from 'react-icons/io'
import cx from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

import { priceHelpers } from '@/helpers'
import { ROUTES } from '@/constants'
import { closeCart } from '@/store/cartSlice'
import CartItem from './CartItem'

const Cart = () => {
  const dispatch = useDispatch()
  const cartRef = useRef(null)
  const isOpen = useSelector((state) => state.cart.isOpen)
  const carts = useSelector((state) => state.cart.items)

  const handleCloseCart = () => {
    dispatch(closeCart())
  }

  const handleClickOutsideCart = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      dispatch(closeCart())
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideCart)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCart)
    }
  }, [])

  return (
    <div
      className={cx(
        'fixed top-0 z-50 w-full sm:w-140 h-screen bg-secondary text-white flex flex-col justify-between transition-all duration-300',
        isOpen ? 'right-0' : '-right-full'
      )}
      ref={cartRef}
    >
      <div>
        <div className='flex justify-between items-center py-8 border-b-white/70 border-b px-4'>
          <span className='inline-block uppercase opacity-70'>Your cart</span>
          <IoMdClose size={18} className='cursor-pointer opacity-70 hover:opacity-100' onClick={handleCloseCart} />
        </div>

        <div className='py-5 px-4'>
          {
            carts.length > 0 ?
              carts.map((cart, index) => <CartItem product={cart} key={index} />)
              : <p>Empty cart</p>
          }
        </div>
      </div>

      <div className='px-4 py-8 border-t-white/70 border-t'>
        <div className='flex justify-between items-center mb-5 text-xl'>
          <span>Total</span>
          <span>{priceHelpers.handleTotalPrice(carts)} USD</span>
        </div>
        <Link
          href={ROUTES.CHECKOUT_PAGE}
          className='ct-button uppercase w-full bg-white text-light-coffee py-3 hover:bg-light-coffee hover:text-white inline-block'
        >
          Continue to checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart