import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { createClient, CREATE_CLIENT } from '@/store/clientSlice'
import { createLoadingSelector } from '@/store/loaderSlice'
import HeadlineTag from '../HeadlineTag'
import InputField from '../form/InputField'
import Button from './Button'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const loadingSelector = createLoadingSelector([CREATE_CLIENT])
  const isLoading = useSelector((state) => loadingSelector(state.loader))

  const schema = object({
    name: string().required('Please enter your name'),
    email: string().required('Please enter your email').email('Email is invalid'),
    phone: string().required('Please enter your phone number').matches(/^[0-9]{10,11}$/, 'Phone number is invalid')
  })

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  })

  const { reset } = methods

  const onSubmit = async(data) => {
    try {
      await dispatch(createClient({ ...data })).unwrap()
      toast.success('Successfully. Please check your email.')
      reset()
    } catch (error) {
      toast.error(error?.message)
    }
  }

  return (
    <section className='px-4 bg-secondary py-25 text-center'>
      <HeadlineTag title='Sign up and get free coffee bags' style={{ color: 'white', opacity: '0.7' }} />
      <h2 className='text-white text-4xl mt-4 mb-8'>Coffee Updates</h2>
      <div className='ct-container mx-auto'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='lg:grid lg:grid-cols-3 lg:gap-4'>
              <InputField
                name='name'
                label='Name'
                labelClasses='text-white text-left block'
                inputClasses='text-white'
                required
              />
              <InputField
                name='email'
                label='Email'
                labelClasses='text-white text-left block'
                inputClasses='text-white'
                required
              />
              <InputField
                type='number'
                name='phone'
                label='Phone number'
                labelClasses='text-white text-left block'
                inputClasses='text-white'
                required
              />
            </div>
            <Button loading={isLoading} type='submit' variant='outline' className='hover:bg-light-coffee hover:text-white uppercase'>{isLoading ? 'Processing...' : 'SUBSCRIBE'}</Button>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}

export default SignUpForm