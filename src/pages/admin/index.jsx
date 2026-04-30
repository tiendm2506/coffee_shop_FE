//https://www.chartjs.org/docs/latest/getting-started/

import React from 'react'
import { AdminLayout } from '@/components/layout'
import { FaArrowUpLong, FaArrowDownLong } from 'react-icons/fa6'
import LineChart from '@/components/admin/chart/LineChart'
import Link from 'next/link'
import Image from 'next/image'

const DashboardPage = () => {
  return (
    <AdminLayout>
      <section>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <h4 className='text-primary mb-4'>Overview of store operations</h4>
        <div className='grid grid-cols-4 gap-x-4'>
          <div className='bg-white text-secondary p-4 rounded-lg'>
            <h6 className='font-bold'>Total revenue</h6>
            <div className='font-bold text-2xl my-2'>128.254.000 Đ</div>
            <div className='text-primary flex items-center text-md'><span className='text-green-500 flex items-center mr-2 font-bold'><FaArrowUpLong />12.5%</span> previous month</div>
          </div>
          <div className='bg-white text-secondary p-4 rounded-lg'>
            <h6 className='font-bold'>Total orders</h6>
            <div className='font-bold text-2xl my-2'>635</div>
            <div className='text-primary flex items-center text-md'><span className='text-green-500 flex items-center mr-2 font-bold'><FaArrowUpLong />8.5%</span> previous month</div>
          </div>
          <div className='bg-white text-secondary p-4 rounded-lg'>
            <h6 className='font-bold'>Total new clients</h6>
            <div className='font-bold text-2xl my-2'>128</div>
            <div className='text-primary flex items-center text-md'><span className='text-green-500 flex items-center mr-2 font-bold'><FaArrowUpLong />5%</span> previous month</div>
          </div>
          <div className='bg-white text-secondary p-4 rounded-lg'>
            <h6 className='font-bold'>Total products</h6>
            <div className='font-bold text-2xl my-2'>540</div>
            <div className='text-primary flex items-center text-md'><span className='text-green-500 flex items-center mr-2 font-bold'><FaArrowUpLong />12%</span> previous month</div>
          </div>
        </div>
      </section>

      <section className='grid grid-cols-[3fr_2fr] gap-4 mt-10'>
        <div className='bg-white p-4 rounded-lg'><LineChart /></div>
        <div className='bg-white px-4 rounded-lg'>
          <div className='flex justify-between items-center border-b border-primary/50 py-4'>
            <h3 className='text-secondary text-lg font-bold'>Newest orders</h3>
            <Link href='#' className='text-blue-500'>View all</Link>
          </div>
          <ul className='py-2'>
            {
              Array.from({ length: 5 }).map((_, index) => (
                <li className='grid grid-cols-[2fr_2fr_1fr] py-2' key={index}>
                  <span className='font-bold text-secondary'>#ORD1005</span>
                  <span>20/5/2026</span>
                  <span className='text-right font-bold text-secondary'>250 USD</span>
                </li>
              ))
            }
          </ul>
        </div>
      </section>

      <section className='grid grid-cols-[3fr_2fr] gap-4 mt-4'>
        <div className='bg-white px-4 rounded-lg'>
          <div className='flex justify-between items-center border-b border-primary/50 py-4'>
            <h3 className='text-secondary text-lg font-bold'>Best selling</h3>
            <Link href='#' className='text-blue-500'>View all</Link>
          </div>
          <ul className='py-2'>
            {
              Array.from({ length: 3 }).map((_, index) => (
                <li className='grid grid-cols-[4fr_1fr] py-2' key={index}>
                  <div className='flex items-center'>
                    <Image src='https://cdn.prod.website-files.com/5be96251aaba7a84f6ecdf81/5be96251aaba7a1db2ece009_natanja-grun-600152-unsplash.jpg' width={60} height={60} className='rounded-full' alt='product' />
                    <span className='font-bold text-secondary ml-4'>Espresso Cup by Mugs</span>
                  </div>
                  <span className='font-bold text-secondary flex items-center justify-end'>50 items</span>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='bg-white px-4 rounded-lg'>
          <div className='flex justify-between items-center border-b border-primary/50 py-4'>
            <h3 className='text-secondary text-lg font-bold'>Newest post</h3>
            <Link href='#' className='text-blue-500'>View all</Link>
          </div>
          <ul className='py-2'>
            {
              Array.from({ length: 3 }).map((_, index) => (
                <li className='grid grid-cols-[4fr_1fr] py-2' key={index}>
                  <span className='font-bold text-secondary'>How long does a cup of coffee keep you awake?</span>
                  <span className='text-right'>25/4/2020</span>
                </li>
              ))
            }
          </ul>
        </div>
      </section>
    </AdminLayout>
  )
}

export default DashboardPage