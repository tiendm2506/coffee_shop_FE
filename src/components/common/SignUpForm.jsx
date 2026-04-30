import React from 'react'
import HeadlineTag from '../HeadlineTag'
import { FormProvider, useForm } from 'react-hook-form'
import InputField from '../form/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'


const SignUpForm = () => {
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

  const onSubmit = (data) => console.log(data)

  return (
    <section className='px-4 bg-secondary py-25 text-center'>
      <HeadlineTag title='Sign up and get free coffee bags' style={{ color: 'white', opacity: '0.7' }} />
      <h2 className='text-white text-4xl mt-4 mb-8'>Coffee Updates</h2>
      <div className='ct-container mx-auto'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='lg:grid lg:grid-cols-3 lg:gap-4'>
              <InputField
                name="name"
                label="Name"
                labelClasses='text-white text-left block'
                inputClasses='text-white'
              />
              <InputField
                name="email"
                label="Email"
                labelClasses='text-white text-left block'
                inputClasses='text-white'
              />
              <InputField
                type='number'
                name="phone"
                label="Phone number"
                labelClasses='text-white text-left block'
                inputClasses='text-white'
              />
            </div>
            <button type='submit' className='ct-button bg-white text-light-coffee w-50 py-3.25 hover:text-white hover:bg-light-coffee'>SUBSCRIBE</button>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}

export default SignUpForm