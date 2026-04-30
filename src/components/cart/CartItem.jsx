import React from 'react'
import Image from 'next/image'
import { FaRegTrashCan } from 'react-icons/fa6'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import { updateQuantity, removeProductFromCart } from '@/store/cartSlice'
import { useDispatch } from 'react-redux'

const CartItem = ({ product }) => {
  const dispatch = useDispatch()

  const handleIncrease = () => {
    dispatch(
      updateQuantity({
        _id: product._id,
        quantity: product.quantity + 1
      })
    )
  }

  const handleDecrease = () => {
    if (product.quantity === 1) return
    dispatch(
      updateQuantity({
        _id: product._id,
        quantity: product.quantity - 1
      })
    )
  }

  return (
    <div className='flex justify-between items-center mb-4'>
      <div className='flex items-center'>
        <FaRegTrashCan className='cursor-pointer mr-2' size={18} color='white' onClick={() => dispatch(removeProductFromCart(product._id))} />
        <Image src={product?.image} className='object-center object-cover hidden sm:inline-block mr-2' width={80} height={80} alt='product' loading='eager' />
        <div>
          <span className='text-white block'>{product?.name}</span>
        </div>
      </div>
      <div className='flex items-center'>
        <button className='cursor-pointer h-10' onClick={handleDecrease}><CiCircleMinus size={22} color='white' /></button>
        <div className='border border-white mx-2'>
          <span className='w-10 h-10 flex justify-center items-center border-0.25 border-white font-bold'>{product?.quantity}</span>
        </div>
        <button className='cursor-pointer h-10' onClick={handleIncrease}><CiCirclePlus size={22} color='white' /></button>
      </div>
    </div>
  )
}

export default CartItem