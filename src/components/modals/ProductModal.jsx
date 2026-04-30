import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '@/store/modalSlice'
import InputField from '../form/InputField'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, boolean } from 'yup'
import SwitchButton from '../admin/SwitchButton'
import { useEffect, useState } from 'react'
import { stringHelpers } from '@/helpers'
import { createProduct } from '@/store/productSlice'

const ProductModal = ({ name }) => {
  const [highlight, setHighlight] = useState(false)
  const [active, setActive] = useState(true)
  const schema = object({
    on_sale: boolean(),
    name: string().required('Please enter product name'),
    image: string().required('Please enter product image'),
    description: string().required('Please enter product description'),
    detail: string().required('Please enter product detail'),
    origin_price: string().required('Please enter origin price'),
    promotion_price: string().when('on_sale', {
      is: (val) => val == true,
      then: (schema) =>
        schema.required('Please enter promotion price'),
      otherwise: (schema) => schema.notRequired()
    }),
    category: string().required('Please enter category'),
    amount_in_stock: string().required('Please enter amount in stock')
  })
  const { isOpen, data, name: modalName } = useSelector((state) => state.modal)
  const dispatch = useDispatch()


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
      highlight: highlight,
      status: 'Active'
    }
  })
  const { watch, setValue } = methods

  const onSale = watch('on_sale')


  const onSubmit = (data) => {
    dispatch(createProduct({
      name: data.name,
      image: data.image,
      description: data.description,
      detail: data.detail,
      origin_price: data.origin_price,
      promotion_price: data.promotion_price,
      category: data.category,
      amount_in_stock: data.amount_in_stock,
      slug: stringHelpers.slugify(data.name),
      category_slug: stringHelpers.slugify(data.category),
      on_sale: data.on_sale,
      highlight: data.highlight,
      status: 'Active'
    }))

  }

  useEffect(() => {
    if (!isOpen) return
    if (!onSale) {
      setValue('promotion_price', '')
    }
  }, [onSale, isOpen])

  if (!isOpen || modalName !== name) return null


  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
      <div className='bg-white rounded-lg p-6 w-full max-w-200'>

        <h2 className='text-lg font-bold mb-4'>Add product</h2>

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
              />
              {/* on_sale  */}

              <InputField
                name='promotion_price'
                label='Promotion price'
                labelClasses='text-light-coffee text-left block'
                inputClasses={`text-secondary ${onSale ? '': 'bg-gray-200'}`}
                disabled={!onSale}
              />
              <InputField
                name='category'
                label='Category'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
              />
              {/* highlight  */}
              {/* status  */}
              <InputField
                name='amount_in_stock'
                label='Amount in stock'
                labelClasses='text-light-coffee text-left block'
                inputClasses='text-secondary'
              />
            </div>

            <button type='submit' className='ct-button bg-light-coffee text-white w-50 py-3.25 hover:text-white hover:bg-light-coffee-hover'>Add</button>
          </form>
        </FormProvider>

        <div className='flex justify-end mt-6'>
          <button
            className='px-4 py-2 border rounded cursor-pointer transition-all duration-500 hover:bg-secondary hover:text-white'
            onClick={() => dispatch(closeModal())}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductModal