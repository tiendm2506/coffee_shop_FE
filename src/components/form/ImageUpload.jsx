import { useRef } from 'react'
import {
  IoCloudUploadOutline,
  IoClose
} from 'react-icons/io5'

const ImageUpload = ({
  value = [],
  onChange
}) => {
  const inputRef = useRef()

  const handleChange = (e) => {
    const files = Array.from(e.target.files)

    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    onChange([...value, ...previews])
  }

  const removeImage = (index) => {
    const next = value.filter(
      (_, i) => i !== index
    )

    onChange(next)
  }

  return (
    <div className='space-y-4'>
      <input
        hidden
        ref={inputRef}
        type='file'
        multiple
        accept='image/*'
        onChange={handleChange}
      />

      <button
        type='button'
        onClick={() =>
          inputRef.current.click()
        }
        className='w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-light-coffee transition cursor-pointer'
      >
        <IoCloudUploadOutline
          size={42}
          className='text-light-coffee'
        />

        <div>
          <p className='font-medium text-secondary'>
            Upload Images
          </p>

          <p className='text-sm text-gray-500'>
            PNG, JPG up to 5MB
          </p>
        </div>
      </button>

      {value.length > 0 && (
        <div className='grid grid-cols-3 gap-4'>
          {value.map(
            (img, index) => (
              <div
                key={index}
                className='relative group'
              >
                <img
                  src={img.preview}
                  alt='preview'
                  className='w-full h-32 object-cover rounded-xl shadow'
                />

                <button
                  type='button'
                  onClick={() =>
                    removeImage(index)
                  }
                  className='absolute top-2 right-2 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition'
                >
                  <IoClose size={18} />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default ImageUpload