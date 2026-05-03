import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '@/store/modalSlice'
import InputField from '../form/InputField'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, number, boolean } from 'yup'
import SwitchButton from '../admin/SwitchButton'
import { useEffect, useState } from 'react'
import { stringHelpers } from '@/helpers'
import { createProduct, updateProduct } from '@/store/productSlice'
import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'
import Button from '../common/Button'

const ProductModal = ({ name }) => {
  const dispatch = useDispatch()
  const { isOpen, data, name: modalName, props } = useSelector((state) => state.modal)
  const productId = props.id
  const [highlight, setHighlight] = useState(false)
  const [active, setActive] = useState(true)
  const textAction = isEmpty(productId) ? 'Add' : 'Update'
  const defaultValues = {
    name: '',
    image: '',
    description: '',
    detail: '',
    origin_price: '',
    promotion_price: '',
    category: '',
    amount_in_stock: '',
    slug: '',
    category_slug: '',
    highlight: false,
    on_sale: false,
    status: 'Active'
  }

  const schema = object({
    on_sale: boolean(),
    name: string()
      .trim()
      .required('Please enter product name')
      .min(3, 'Length must be min 3 characters')
      .max(100, 'Length must be max 100 characters')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Name must not contain special characters'),

    image: string().trim().required('Please enter product image'),
    description: string().trim().required('Please enter product description'),
    detail: string().trim().required('Please enter product detail'),
    origin_price: number().typeError('Origin price must be a number').required('Please enter origin price').min(0, 'Origin price must be >= 0'),
    promotion_price: number()
      .transform((value, originalValue) =>
        originalValue === '' ? null : Number(originalValue)
      )
      .nullable()
      .when('on_sale', {
        is: true,
        then: (schema) =>
          schema
            .required('Please enter promotion price')
            .typeError('Promotion price must be a number')
            .min(0, 'Promotion price must be >= 0'),
        otherwise: (schema) =>
          schema.nullable().notRequired()
    }),

    category: string().trim().required('Please enter category'),
    amount_in_stock: number()
      .typeError('Amount in stock must be a number')
      .required('Please enter Amount in stock')
      .min(0, 'Amount in stock must be >= 0'),
  })

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      image: '',
      description: '',
      detail: '',
      origin_price: '',
      promotion_price: '',
      category: '',
      amount_in_stock: '',
      slug: '',
      category_slug: '',
      on_sale: false,
    }
  })
  const { watch, setValue, reset } = methods
  const onSale = watch('on_sale')

  const onSubmit = async (data) => {
    try {
      if(isEmpty(productId)){
        await dispatch(createProduct({
          ...data,
          slug: stringHelpers.slugify(data.name),
          category_slug: stringHelpers.slugify(data.category),
          highlight,
          status: active ? 'Active' : 'Inactive'
        })).unwrap()
      } else{
        await dispatch(updateProduct({
          productId,
          data: {
            ...data,
            slug: stringHelpers.slugify(data.name),
            category_slug: stringHelpers.slugify(data.category),
            highlight,
            status: active ? 'Active' : 'Inactive'
          }
        })).unwrap()
      }
      toast.success(`${textAction} product successfully.`)
      reset()
      dispatch(closeModal())
    } catch (error) {
        toast.error(`${textAction} product failed`)
      }
  }

  useEffect(() => {
    if (!onSale) {
      setValue('promotion_price', '')
    }
  }, [onSale])

  useEffect(() => {
    if (!isOpen) {
      return reset(defaultValues)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && data) {
      reset({
        name: data.name || '',
        image: data.image || '',
        description: data.description || '',
        detail: data.detail || '',
        origin_price: data.origin_price || '',
        promotion_price: data.promotion_price || '',
        category: data.category || '',
        amount_in_stock: data.amount_in_stock || '',
        slug: data.slug || '',
        category_slug: data.category_slug || '',
        on_sale: data.on_sale || false,
      })
    }
  }, [data])

  if (!isOpen || modalName !== name) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
      <div className='bg-white rounded-lg p-6 w-full max-w-200'>

        <h2 className='text-lg font-bold mb-4'>{textAction} product</h2>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-3 mb-4'>
              <div className='flex items-center'>
                <span className='text-light-coffee mr-2'>On sale</span>
                <SwitchButton checked={onSale} onChange={(val) => setValue('on_sale', val)} />
              </div>
              <div className='flex items-center'>
                <span className='text-light-coffee mr-2'>Highlight</span>
                <SwitchButton checked={highlight} onChange={setHighlight} />
              </div>
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
              />
              <InputField
                name='image'
                label='Image URL'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
              />
              <InputField
                name='description'
                label='Description'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
              />
              <InputField
                name='detail'
                label='Detail'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
              />
              <InputField
                name='origin_price'
                label='Origin price'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
                type='number'
              />
              <InputField
                name='promotion_price'
                label='Promotion price'
                labelClasses='text-light-coffee text-left block'
                inputClasses={`text-secondary ${onSale ? '': 'bg-gray-200'}`}
                disabled={!onSale}
                type='number'
              />
              <InputField
                name='category'
                label='Category'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
              />
              <InputField
                name='amount_in_stock'
                label='Amount in stock'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
                type='number'
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

export default ProductModal