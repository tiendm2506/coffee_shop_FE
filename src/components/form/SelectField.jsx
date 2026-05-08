import { Controller, useFormContext } from 'react-hook-form'
import Select from './Select'

const SelectField = ({
  name,
  label,
  options = [],
  placeholder = 'Select...',
  required = false,
  returnObject = false,
  mapValue
}) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()
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
        render={({ field }) => {
          const currentValue = returnObject ? field.value?.id : field.value
          return (
            <Select
              options={options}
              value={currentValue}
              placeholder={placeholder}
              onChange={(val) => {
                if (returnObject) {
                  const selected = options.find(opt => opt.value === val)
                  if (!selected) return
                  const mapped = mapValue ? mapValue(selected) : selected
                  field.onChange(mapped)
                } else {
                  field.onChange(val)
                }
              }}
            />
          )
        }}
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