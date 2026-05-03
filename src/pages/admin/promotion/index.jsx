import { AdminLayout } from "@/components/layout"
import SelectField from "@/components/form/SelectField"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { useDispatch, UseDispatch, useSelector } from "react-redux"
import { openModal } from "@/store/modalSlice"
import PromotionModal from "@/components/modals/PromotionModal"
import clsx from "clsx"
import { CiEdit } from 'react-icons/ci'
import { FaTrash } from 'react-icons/fa6'
import Pagination from "@/components/common/Pagination"
import Button from "@/components/common/Button"

const Promotion = () => {
  const dispatch = useDispatch()
  const ACTIVE_STATUS = 'Active'
  const LIMIT = 20
  const { isOpen, data, name: modalName, props } = useSelector((state) => state.modal)

  const handleEditProduct = (product) => {
    dispatch(
      openModal({
        name: 'PRODUCT_MODAL',
        data: product,
        props: {
          id: product._id
        }
      })
    )
  }

  const handleDelete = (product) => {
    dispatch(
      openModal({
        type: 'CONFIRM',
        name: 'DELETE_PRODUCT_MODAL',
        data: product,
        props: {
          title: 'Delete product',
          content: () => (
            <>
              You want to delete product <b>{product.name}</b> ?
            </>
          ),
          confirmText: 'Delete',
          onConfirm: async (product) => {
            try {
              await dispatch(
                deleteProductById({ productId: product?._id })
              ).unwrap()
              toast.success('Delete product successfully')
            } catch (error) {
              toast.error('Delete failed')
            }
          }
        }
      })
    )
  }

  const handleAddProduct = () => {
    dispatch(
      openModal({
        name: 'PROMOTION_MODAL',
      })
    )
  }
  
  
  return (
    <AdminLayout>
      <section>
        <h1 className='text-3xl font-bold mb-5'>List promotion</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Expired date</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({length: 5}).map((_, index) => (
                <tr key={index} className="border-b hover:bg-gray-200">
                  <td className="px-4 py-3 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    Chương trình 20/11
                  </td>
                  <td className="px-4 py-3">
                    PERCENT
                  </td>
                  <td className="px-4 py-3">
                    20
                  </td>
                  <td className="px-4 py-3">
                    <span className={clsx(
                      'px-2 py-1 text-xs rounded-full',
                      'Active' === ACTIVE_STATUS ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    )}>
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    20/7/2026
                  </td>
                  <td className="px-4 py-3">
                    <div className='flex items-center'>
                      <CiEdit size={22} className='mr-4 cursor-pointer transition-all hover:scale-[1.2]' onClick={()=>handleEditProduct(product)} />
                      <FaTrash size={20} className='cursor-pointer transition-all hover:scale-[1.2]' onClick={() => handleDelete(product)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
        <div className='text-right'><Button size='sm' className='mt-10' onClick={handleAddProduct}>Add Promotion</Button></div>
      </section>
      <PromotionModal name='PROMOTION_MODAL' />
    </AdminLayout>
  )
}

export default Promotion