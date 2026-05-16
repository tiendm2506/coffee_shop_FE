import React from 'react'
import { EmptyLayout } from '@/components/layout'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createLoadingSelector } from '@/store/loaderSlice'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import InputField from '@/components/form/InputField'
import Button from '@/components/common/Button'

const LoginPage = () => {
  const dispatch = useDispatch()
  const loadingSelector = createLoadingSelector(['sdsd'])
  const isLoading = useSelector((state) => loadingSelector(state.loader))

  const schema = object({
    email: string().required('Please enter your email').email('Email is invalid'),
    password: string().required('Please enter your password')
  })

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { reset } = methods

  const onSubmit = async(data) => {
    console.log('data: ', data)
    try {
      //
    } catch (error) {
      toast.error(error?.message)
    }
  }
  return (
    <EmptyLayout>
      <section className='h-screen w-screen flex justify-center items-center'>
        <div className="bg-[url('/images/bg-auth.png')] bg-cover blur-xs absolute left-0 top-0 w-full h-full z-10" />
        <div className='bg-white/80 p-10 rounded-md relative z-20 text-secondary'>
          <h1 className='text-3xl font-bold'>Welcome Back!</h1>
          <h6 className='my-2'>Login to access your dashboard.</h6>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='md:w-80'>
              <div>
                <InputField
                  name='email'
                  label='Email'
                  required
                />
                <InputField
                  name='password'
                  label='Password'
                  type='password'
                  required
                />
              </div>
              <Button type='submit' variant='secondary' className='w-full uppercase'>Log In</Button>
            </form>
          </FormProvider>
        </div>
      </section>
    </EmptyLayout>
  )
}

export default LoginPage