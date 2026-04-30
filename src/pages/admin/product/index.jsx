import React, { useEffect } from 'react'
import { AdminLayout } from '@/components/layout'
import { CiEdit } from 'react-icons/ci'
import { FaTrash } from 'react-icons/fa6'
import Pagination from '@/components/common/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getListProducts, selectListProducts } from '@/store/productSlice'
import cx from 'classnames'
import { toast } from 'react-toastify'
import { openModal } from '@/store/modalSlice'
import { deleteProductById } from '@/store/productSlice'
import ProductModal from '@/components/modals/ProductModal'

const ProductAdminPage = () => {
  const ACTIVE_STATUS = 'Active'
  const LIMIT = 20
  const dispatch = useDispatch()
  const listProducts = useSelector(selectListProducts)

  const handleDelete =(product) => {
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

  const handleAddProduct =() => {
    console.log('handleAddProduct click !!!')
    dispatch(
      openModal({
        name: 'PRODUCT_MODAL'
      })
    )
  }

  useEffect(() => {
    dispatch(getListProducts({ limit: LIMIT }))
  }, [dispatch])

  return (
    <AdminLayout>
      <section>
        <h1 className='text-3xl font-bold mb-5'>List products</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">On sale</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">In Stock</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {listProducts.map((product, index) => (
                <tr key={product?._id} className="border-b hover:bg-gray-200">
                  <td className="px-4 py-3 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {product?.name}
                  </td>
                  <td className="px-4 py-3">
                    {product?.category}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cx(product?.on_sale ? 'bg-green-100 text-green-700 font-bold px-2 rounded-lg' : '')}>{product?.on_sale ? 'Sale' : 'No'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cx(
                      'px-2 py-1 text-xs rounded-full',
                      product?.status === ACTIVE_STATUS ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    )}>
                      {product?.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product?.amount_in_stock}
                  </td>
                  <td className="px-4 py-3">
                    <div className='flex items-center'>
                      <CiEdit size={22} className='mr-4 cursor-pointer transition-all hover:scale-[1.2]' />
                      <FaTrash size={20} className='cursor-pointer transition-all hover:scale-[1.2]' onClick={() => handleDelete(product)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
        <div className='text-right'><button className='ct-button bg-light-coffee text-white hover:bg-light-coffee-hover px-5 py-2 mt-10' onClick={handleAddProduct}>Add Product</button></div>
      </section>
      <ProductModal name='PRODUCT_MODAL' />
    </AdminLayout>
  )
}

export default ProductAdminPage