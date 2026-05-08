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
import { createCategory, updateCategory, getListCategories } from '@/store/categorySlice'
import DatePickerField from '../form/DatePickerField'
import { STATUS, CATEGORY_TYPE } from '@/constants'
import { stringHelpers } from '@/helpers'


const CategoryModal = ({ name }) => {
  const options = [
    { label: CATEGORY_TYPE.PRODUCT, value: CATEGORY_TYPE.PRODUCT },
    { label: CATEGORY_TYPE.POST, value: CATEGORY_TYPE.POST }
  ]
  const dispatch = useDispatch()
  const { isOpen, data, name: modalName, props } = useSelector((state) => state.modal)
  const categoryId = props.id
  const [active, setActive] = useState(true)
  const textAction = isEmpty(categoryId) ? 'Add' : 'Update'
  const defaultValues = {
    name: '',
    slug: '',
    type: '',
    status: STATUS.ACTIVE
  }
  const schema = object({
    name: string()
      .trim()
      .required('Please enter Category name')
      .min(3, 'Length must be min 3 characters')
      .max(100, 'Length must be max 100 characters'),

    type: string().required('Please choose Category Type')
  })

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      slug: '',
      type: '',
      status: STATUS.ACTIVE
    }
  })
  const { reset } = methods

  const onSubmit = async (data) => {
    try {
      if (isEmpty(categoryId)) {
        await dispatch(createCategory({
          ...data,
          status: active ? STATUS.ACTIVE : STATUS.INACTIVE,
          slug: stringHelpers.slugify(data.name)
        })).unwrap()
      } else {
        await dispatch(updateCategory({
          categoryId,
          data: {
            ...data,
            status: active ? STATUS.ACTIVE : STATUS.INACTIVE,
            slug: stringHelpers.slugify(data.name)
          }
        })).unwrap()
      }
      toast.success(`${textAction} Category successfully.`)
      reset()
      dispatch(closeModal())
    } catch (error) {
      toast.error(`${textAction} Category failed`)
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
        status: data.status || STATUS.ACTIVE
      })
      setActive(data?.status === STATUS.ACTIVE ? true : false)
    }
  }, [data])

  if (!isOpen || modalName !== name) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
      <div className='bg-white rounded-lg p-6 w-full max-w-200'>

        <h2 className='text-lg font-bold mb-4'>{textAction} Category</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-3 mb-4'>
              <div className='flex items-center'>
                <span className='text-light-coffee mr-2'>Active</span>
                <SwitchButton checked={active} onChange={setActive} />
              </div>
            </div>
            <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
              <InputField
                name='name'
                label='Name'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
                required
              />
              <SelectField
                name='type'
                label='Category Type'
                options={options}
                required
              />
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

export default CategoryModal