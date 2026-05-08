import { useRef, useState } from 'react'
import axios from 'axios'

const ImageUploader = ({ onUploadSuccess }) => {
  const inputRef = useRef()
  const [preview, setPreview] = useState(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSelectFile = () => {
    inputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // preview
    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)

    // upload
    const formData = new FormData()
    formData.append('upload', file)

    try {
      setLoading(true)

      const res = await axios.post(
        'http://localhost:3069/api/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total)
            setProgress(percent)
          }
        }
      )

      const imageUrl = res.data.url

      onUploadSuccess(imageUrl)

      setProgress(0)
      setPreview(null)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mb-4'>
      <button
        type='button'
        onClick={handleSelectFile}
        className='px-4 py-2 bg-blue-500 text-white rounded'
      >
        Upload Image
      </button>

      <input
        type='file'
        hidden
        ref={inputRef}
        onChange={handleFileChange}
      />

      {preview && (
        <div className='mt-3'>
          <img src={preview} className='w-40 rounded' />
        </div>
      )}

      {loading && (
        <div className='mt-2'>
          <div className='w-full bg-gray-200 h-2 rounded'>
            <div
              className='bg-green-500 h-2 rounded'
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{progress}%</span>
        </div>
      )}
    </div>
  )
}

export default ImageUploader