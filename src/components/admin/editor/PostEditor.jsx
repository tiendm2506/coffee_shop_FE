'use client'

import { useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import UploadAdapter from './UploadAdapter'
import { createPost } from '@/store/postSlice'

export default function PostEditor() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('Titel post')
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await dispatch(
        createPost({
          title,
          slug: title
            .toLowerCase()
            .replace(/\s+/g, '-'),
          content,
          thumbnail: '',
          published: true
        })
      ).unwrap()

      toast.success('Post created!')
    } catch (error) {
      console.log(error)

      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 rounded-xl border bg-white p-4">
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello world!</p>"
        config={{
          licenseKey: 'GPL',
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'uploadImage',
            'blockQuote',
            'insertTable',
            '|',
            'undo',
            'redo'
          ]
        }}
        onReady={(editor) => {
          editor.plugins.get(
            'FileRepository'
          ).createUploadAdapter = (loader) => {
            return new UploadAdapter(loader)
          }
        }}
        onChange={(event, editor) => {
          const data = editor.getData()

          setContent(data)
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Create Post'}
      </button>
    </div>
  )
}