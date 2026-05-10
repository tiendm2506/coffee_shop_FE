import { memo, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadAdapter from './UploadAdapter'

function PostEditor({ setEditor }) {
  const editorRef = useRef(null)

  return (
    <div className='space-y-4 rounded-xl border bg-white p-4'>
      <CKEditor
        editor={ClassicEditor}
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
          editorRef.current = editor
          setEditor(editor)
          editor.plugins.get(
            'FileRepository'
          ).createUploadAdapter = (loader) =>
            new UploadAdapter(loader)
        }}
      />
    </div>
  )
}

export default memo(PostEditor)