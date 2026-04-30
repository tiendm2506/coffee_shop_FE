import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { API_BASE_URL } from '@/constants'
import ImageUploader from '@/components/blog/UploadImage'

const CKEditor = dynamic(
  () => import('ckeditor4-react').then(mod => mod.CKEditor),
  { ssr: false }
)

const BlogAdmin = () => {
  const [content, setContent] = useState('')
  const editorRef = useRef()

  const handleInsertImage = (url) => {
    const editor = editorRef.current.editor
    editor.insertHtml(`<img src="${url}" alt="image" />`)
  }
  return (
    <div className="p-5">
      <ImageUploader onUploadSuccess={handleInsertImage} />

      <CKEditor
        onInstanceReady={(evt) => {
          editorRef.current = evt
        }}
      />
    </div>
  )
}

export default BlogAdmin