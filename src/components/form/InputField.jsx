import React from 'react'
import { useFormContext } from 'react-hook-form'
import cx from 'classnames'

const InputField = ({ type = 'text', label, labelClasses, inputClasses, name, defaultValue, ...props }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const error = errors[name]

  return (
    <div className='mb-4'>
      {label &&
        <label
          className={cx({
            'text-sm mb-1': true,
            [labelClasses]: !! labelClasses
          })}>
          {label}
        </label>
      }
      <div className='relative'>
        <input
          type={type}
          {...register(name)}
          {...props}
          className={cx({
            'w-full border border-light-coffee p-3 rounded-sm outline-none focus:outline-none': true,
            [inputClasses]: !!inputClasses,
            'border-red-500': error
          })}
          value={defaultValue}
        />
        {error && <p className='text-red-500 absolute right-0 -top-6 text-sm'>{error.message}</p>}
      </div>
    </div>
  )
}

export default InputField