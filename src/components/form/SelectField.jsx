import { Controller, useFormContext } from 'react-hook-form'
import Select from './Select'

const SelectField = ({
  name,
  label,
  options = [],
  placeholder = 'Select...',
  required = false
}) => {
  const { control, formState: { errors } } = useFormContext()

  const error = errors?.[name]?.message

  return (
    <div className='mb-4 relative'>
      
      {label && (
        <label className='mb-1 text-sm font-medium text-light-coffee'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            options={options}
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        )}
      />

      {error && (
        <span className='text-red-500 text-sm absolute top-0 right-0'>
          {error}
        </span>
      )}
    </div>
  )
}

export default SelectField