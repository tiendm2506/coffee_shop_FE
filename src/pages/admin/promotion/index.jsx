import { AdminLayout } from '@/components/layout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '@/store/modalSlice'
import PromotionModal from '@/components/modals/PromotionModal'
import clsx from 'clsx'
import { CiEdit } from 'react-icons/ci'
import { FaTrash } from 'react-icons/fa6'
import Pagination from '@/components/common/Pagination'
import Button from '@/components/common/Button'
import { getListPromotions, selectListPromotions, deletePromotionById } from '@/store/promotionSlice'
import { toast } from 'react-toastify'
import { datetimeHelpers } from '@/helpers'
import { Tooltip } from 'react-tooltip'
import { PROMOTION_TYPE } from '@/constants'
import { STATUS } from '@/constants'

const Promotion = () => {
  const dispatch = useDispatch()
  const promotionList = useSelector(selectListPromotions)
  const pagination = useSelector(state => state.promotion.pagination)
  const [page, setPage] = useState(1)

  const handleEditPromotion = (promotion) => {
    dispatch(
      openModal({
        name: 'PROMOTION_MODAL',
        data: promotion,
        props: {
          id: promotion._id
        }
      })
    )
  }

  const handleDelete = (promotion) => {
    dispatch(
      openModal({
        type: 'CONFIRM',
        name: 'CONFIRM_MODAL',
        data: promotion,
        props: {
          title: 'Delete promotion',
          content: () => (
            <>
              You want to delete promotion <b>{promotion.name}</b> ?
            </>
          ),
          confirmText: 'Delete',
          onConfirm: async (promotion) => {
            try {
              await dispatch(
                deletePromotionById({ promotionId: promotion?._id })
              ).unwrap()
              toast.success('Delete promotion successfully')
            } catch (error) {
              toast.error('Delete failed')
            }
          }
        }
      })
    )
  }

  const handleAddPromotion = () => {
    dispatch(
      openModal({
        name: 'PROMOTION_MODAL'
      })
    )
  }

  useEffect(() => {
    dispatch(getListPromotions())
  }, [])

  useEffect(() => {
    dispatch(getListPromotions({ page }))
  }, [page])


  return (
    <AdminLayout>
      <section>
        <h1 className='text-3xl font-bold mb-5'>List promotion</h1>
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <table className='w-full text-sm text-left'>
            <thead className='bg-gray-100 text-gray-600 uppercase text-xs'>
              <tr>
                <th className='px-4 py-3'>#</th>
                <th className='px-4 py-3'>Name</th>
                <th className='px-4 py-3'>Type</th>
                <th className='px-4 py-3'>Code</th>
                <th className='px-4 py-3'>Value</th>
                <th className='px-4 py-3'>Status</th>
                <th className='px-4 py-3'>Expired date</th>
                <th className='px-4 py-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                promotionList && promotionList.map((promotion, index) => (
                  <tr key={index} className='border-b hover:bg-gray-200'>
                    <td className='px-4 py-3 font-medium'>
                      {index + 1}
                    </td>
                    <td className='px-4 py-3 font-medium'>{promotion?.name}</td>
                    <td className='px-4 py-3'>{promotion?.type}</td>
                    <td className='px-4 py-3'>{promotion?.code}</td>
                    <td className='px-4 py-3'><span className='inline-block px-2' data-tooltip-id='tooltip' data-tooltip-content={`${promotion?.value} ${promotion?.type === PROMOTION_TYPE.PERCENT ? '%' : 'USD'}`}>{promotion?.value}</span></td>
                    <td className='px-4 py-3'>
                      <span className={clsx(
                        'px-2 py-1 text-xs rounded-full',
                        promotion?.status === STATUS.ACTIVE ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      )}>
                        {promotion?.status}
                      </span>
                    </td>
                    <td className='px-4 py-3'>{datetimeHelpers.formatDate(promotion?.expired_date, 'en')}</td>
                    <td className='px-4 py-3'>
                      <div className='flex items-center'>
                        <CiEdit size={22} className='mr-4 cursor-pointer transition-all hover:scale-[1.2]' onClick={() => handleEditPromotion(promotion)} />
                        <FaTrash size={20} className='cursor-pointer transition-all hover:scale-[1.2]' onClick={() => handleDelete(promotion)} />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />

        <div className='text-right'><Button size='sm' className='mt-10' onClick={handleAddPromotion}>Add Promotion</Button></div>
      </section>
      <PromotionModal name='PROMOTION_MODAL' />
      <Tooltip id='tooltip' />
    </AdminLayout>
  )
}

export default Promotion