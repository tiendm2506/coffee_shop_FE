import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FaHome } from 'react-icons/fa'
import { IoBagCheck } from 'react-icons/io5'
import { FaRegEdit } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { FaTags } from 'react-icons/fa6'
import { FaFolder } from 'react-icons/fa'
import { GiSwapBag } from 'react-icons/gi'
import { CgLogOut } from 'react-icons/cg'
import { BiCategory } from 'react-icons/bi'
import { ADMIN_ROUTES } from '@/constants'

const Sidebar = () => {
  const router = useRouter()
  const { pathname }= router
  return (
    <div className='bg-secondary w-full h-screen text-white flex flex-col justify-between'>
      <div>
        <div className='flex items-center px-4 py-5'><IoBagCheck size={28} className='mr-2' /> <span className='font-bold text-xl'>My store</span></div>
        <ul>
          <li className='border-b border-b-white/50'><Link className={clsx('flex items-center px-4 py-2', pathname === ADMIN_ROUTES.PRODUCT_ADMIN_PAGE ?'bg-secondary-hover' : '')} href={ADMIN_ROUTES.PRODUCT_ADMIN_PAGE}><GiSwapBag size={20} className='mr-2' /> Product</Link></li>
          <li className='border-b border-b-white/50'><Link className={clsx('flex items-center px-4 py-2', pathname === ADMIN_ROUTES.DASHBOARD ?'bg-secondary-hover' : '')} href={ADMIN_ROUTES.DASHBOARD}><FaHome size={20} className='mr-2' /> Dashboard</Link></li>
          <li className='border-b border-b-white/50'><Link className={clsx('flex items-center px-4 py-2', pathname === ADMIN_ROUTES.LIST_POST_PAGE ?'bg-secondary-hover' : '')} href={ADMIN_ROUTES.LIST_POST_PAGE}><FaRegEdit size={20} className='mr-2' />List Post</Link></li>
          <li className='border-b border-b-white/50'><Link className={clsx('flex items-center px-4 py-2', pathname === ADMIN_ROUTES.CREATE_POST_PAGE ?'bg-secondary-hover' : '')} href={ADMIN_ROUTES.CREATE_POST_PAGE}><FaRegEdit size={20} className='mr-2' /> Create Post</Link></li>
          <li className='border-b border-b-white/50'><Link className={clsx('flex items-center px-4 py-2', pathname === ADMIN_ROUTES.ORDER_ADMIN_PAGE ?'bg-secondary-hover' : '')} href={ADMIN_ROUTES.ORDER_ADMIN_PAGE}><FaFolder size={20} className='mr-2' /> Order</Link></li>
          <li className='border-b border-b-white/50'><Link className={clsx('flex items-center px-4 py-2', pathname === ADMIN_ROUTES.CLIENT_ADMIN_PAGE ?'bg-secondary-hover' : '')} href={ADMIN_ROUTES.CLIENT_ADMIN_PAGE}><HiUsers size={20} className='mr-2' /> Client</Link></li>
          <li className='border-b border-b-white/50'><Link className={clsx('flex items-center px-4 py-2', pathname === ADMIN_ROUTES.PROMOTION_ADMIN_PAGE ?'bg-secondary-hover' : '')} href={ADMIN_ROUTES.PROMOTION_ADMIN_PAGE}><FaTags size={20} className='mr-2' /> Promotion</Link></li>
          <li className='border-b border-b-white/50'><Link className={clsx('flex items-center px-4 py-2', pathname === ADMIN_ROUTES.CATEGORY_ADMIN_PAGE ?'bg-secondary-hover' : '')} href={ADMIN_ROUTES.CATEGORY_ADMIN_PAGE}><BiCategory size={20} className='mr-2' /> Category</Link></li>
        </ul>
      </div>
      <div className='px-4 pb-15'><button className='flex items-center cursor-pointer'><CgLogOut size={20} className='mr-2' /> Logout</button></div>
    </div>
  )
}

export default Sidebar