import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '@/store/modalSlice'
import { toast } from 'react-toastify'
import Button from '../common/Button'
import { OERDER_STATUS } from '@/constants'
import { priceHelpers } from '@/helpers'
import SelectField from '../form/SelectField'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import clsx from 'clsx'
import { updateOrder } from '@/store/orderSlice'


const OrderDetailModal = ({ name }) => {
  const options = [
    { label: OERDER_STATUS.NEW, value: OERDER_STATUS.NEW },
    { label: OERDER_STATUS.CANCELED, value: OERDER_STATUS.CANCELED },
    { label: OERDER_STATUS.COMPLETED, value: OERDER_STATUS.COMPLETED }
  ]
  const dispatch = useDispatch()
  const { isOpen, data, name: modalName } = useSelector((state) => state.modal)

  const schema = object({
    order_status: string().required('Please choose order status')
  })

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      order_status: ''
    }
  })

  const onSubmit = async (dataForm) => {
    try {
      await dispatch(updateOrder({
        orderId: data._id,
        order_status: dataForm.order_status
      })).unwrap()
      toast.success('Update order status successfully.')
      dispatch(closeModal())
    } catch (error) {
      toast.error('Update order status failed')
    }

  }

  if (!isOpen || modalName !== name) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
      <div className='bg-white rounded-lg p-6 w-full max-w-200'>

        <h2 className='text-lg font-bold mb-4'>Order detail</h2>
        <table className='w-full text-sm text-left'>
          <thead className='bg-gray-100 text-gray-600 uppercase text-xs'>
            <tr>
              <th className='px-4 py-3'>#</th>
              <th className='px-4 py-3'>Product</th>
              <th className='px-4 py-3'>Quantity</th>
              <th className='px-4 py-3'>Origin price</th>
              <th className='px-4 py-3'>Promotion price</th>
              <th className='px-4 py-3'>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.items.map((product, index) => (
                <tr key={product?.product_id} className='border-b hover:bg-gray-200'>
                  <td className='px-4 py-3'>{index + 1}</td>
                  <td className='px-4 py-3'>{product?.name}</td>
                  <td className='px-4 py-3'>{product?.quantity}</td>
                  <td className='px-4 py-3'>{product?.origin_price} USD</td>
                  <td className='px-4 py-3'>
                    {product?.promotion_price || '--'}
                    <span className={clsx({ 'hidden': !product?.promotion_price })}>USD</span>
                  </td>
                  <td className='px-4 py-3'>{priceHelpers.handleSubPrice(product)} USD</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <div className='mt-4'>
          <h2 className='text-lg font-bold mb-4'>Update order status</h2>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
                <SelectField
                  name='order_status'
                  label='Order status'
                  options={options}
                  required
                />
              </div>
              <Button type='submit' size='sm'>Update</Button>
            </form>
          </FormProvider>
        </div>

        <div className='flex justify-end mt-6'>
          <Button variant='outline' size='sm' className='hover:bg-secondary' onClick={() => dispatch(closeModal())}>Close</Button>
        </div>

      </div>
    </div>
  )
}

export default OrderDetailModal