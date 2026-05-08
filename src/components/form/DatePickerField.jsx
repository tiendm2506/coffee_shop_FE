import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DatePickerField = ({ name, label, required = false }) => {
  const { control, formState: { errors } } = useFormContext()
  const error = errors?.[name]?.message

  return (
    <div className='flex flex-col mb-4 relative'>
      {label && (
        <label className='mb-1 text-sm font-medium text-light-coffee'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={field.onChange}
            className={`p-3 border rounded-lg w-full
              ${error ? 'border-red-500' : 'border-light-coffee'}
            `}
            dateFormat='dd/MM/yyyy'
          />
        )}
      />

      {error && (
        <span className='text-red-500 absolute right-0 top-0 text-sm'>
          {error}
        </span>
      )}
    </div>
  )
}

export default DatePickerField