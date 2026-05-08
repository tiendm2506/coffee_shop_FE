import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '@/store/modalSlice'
import InputField from '../form/InputField'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, number, boolean } from 'yup'
import SwitchButton from '../admin/SwitchButton'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'
import SelectField from '../form/SelectField'
import Button from '../common/Button'
import { createPromotion, updatePromotion } from '@/store/promotionSlice'
import DatePickerField from '../form/DatePickerField'
import { STATUS } from '@/constants'


const PromotionModal = ({ name }) => {
  const options = [
    { label: 'PERCENT', value: 'PERCENT' },
    { label: 'CASH', value: 'CASH' }
  ]
  const dispatch = useDispatch()
  const { isOpen, data, name: modalName, props } = useSelector((state) => state.modal)
  const promotionId = props.id
  const [active, setActive] = useState(true)
  const textAction = isEmpty(promotionId) ? 'Add' : 'Update'
  const defaultValues = {
    name: '',
    type: '',
    value: '',
    status: STATUS.ACTIVE,
    expired_date: ''
  }
  const schema = object({
    name: string()
      .trim()
      .required('Please enter promotion name')
      .min(3, 'Length must be min 3 characters')
      .max(100, 'Length must be max 100 characters'),

    type: string().required('Please choose type promotion'),
    code: string().required('Please enter promotion code'),
    value: string().required('Please enter value promotion'),
    status: string().required('Please enter status promotion'),
    expired_date: string().required('Please enter expired date promotion')
  })

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      type: '',
      code: '',
      value: '',
      status: STATUS.ACTIVE,
      expired_date: ''
    }
  })
  const { reset } = methods

  const onSubmit = async (data) => {
    try {
      if (isEmpty(promotionId)) {
        await dispatch(createPromotion({
          ...data,
          status: active ? STATUS.ACTIVE : STATUS.INACTIVE
        })).unwrap()
      } else {
        await dispatch(updatePromotion({
          promotionId,
          data: {
            ...data,
            status: active ? STATUS.ACTIVE : STATUS.INACTIVE
          }
        })).unwrap()
      }
      toast.success(`${textAction} promotion successfully.`)
      reset()
      dispatch(closeModal())
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return reset(defaultValues)
    }
  }, [isOpen])


  useEffect(() => {
    if (isOpen && data) {
      reset({
        name: data.name || '',
        type: data.type || '',
        code: data.code || '',
        value: data.value || '',
        status: data.status || STATUS.ACTIVE,
        expired_date: data.expired_date || ''
      })
      setActive(data?.status === STATUS.ACTIVE ? true : false)
    }
  }, [data])

  if (!isOpen || modalName !== name) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
      <div className='bg-white rounded-lg p-6 w-full max-w-200'>

        <h2 className='text-lg font-bold mb-4'>{textAction} promotion</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-3 mb-4'>
              <div className='flex items-center'>
                <span className='text-light-coffee mr-2'>Active</span>
                <SwitchButton checked={active} onChange={setActive} />
              </div>
            </div>
            <div className='h-100 lg:h-auto overflow-auto lg:grid lg:grid-cols-2 lg:gap-4'>
              <InputField
                name='name'
                label='Name'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
                required
              />
              <SelectField
                name='type'
                label='Promotion Type'
                options={options}
                required
              />
              <InputField
                name='code'
                label='Promotion code'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
                required
              />
              <InputField
                name='value'
                label='Value'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
                required
              />
              <DatePickerField name='expired_date' label='Expired Date' required />
            </div>
            <Button type='submit' size='sm'>{textAction}</Button>
          </form>
        </FormProvider>

        <div className='flex justify-end mt-6'>
          <Button variant='outline' size='sm' className='hover:bg-secondary' onClick={() => dispatch(closeModal())}>Close</Button>
        </div>

      </div>
    </div>
  )
}

export default PromotionModal