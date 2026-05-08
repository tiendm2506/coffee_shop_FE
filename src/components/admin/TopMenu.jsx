import React from 'react'
import { IoReorderThree } from 'react-icons/io5'
import { FaBell } from 'react-icons/fa'
import { RxAvatar } from 'react-icons/rx'
import { CiSearch } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { resetNotification } from '@/store/notificationSlice'

const TopMenu = () => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.notification.count)
  return (
    <div className='flex justify-between items-center px-4 py-3 bg-secondary text-white border-b border-b-white'>
      <IoReorderThree className='cursor-pointer' size={22} />
      <div className='flex items-center'>
        <div className='border border-white rounded-md flex items-center pr-3'>
          <input className='outline-0 focus:outline-0 px-4 py-1' placeholder='Search...' />
          <button className='cursor-pointer'><CiSearch size={20} /></button>
        </div>
        <div className='relative mx-10 cursor-pointer' onClick={() => dispatch(resetNotification())}>
          <FaBell size={24} />
          <span className='absolute -top-1 right-0 w-4 h-4 inline-flex items-center justify-center bg-light-coffee-hover text-white text-sm rounded-full'>{count}</span>
        </div>
        <div className='flex items-center'><RxAvatar size={35} /> <span className='font-bold ml-2'>Admin</span></div>
      </div>
    </div>
  )
}

export default TopMenu