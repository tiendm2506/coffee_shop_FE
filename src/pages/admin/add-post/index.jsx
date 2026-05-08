import React from 'react'
import dynamic from 'next/dynamic'

const PostEditor = dynamic(
  () => import('@/components/admin/editor/PostEditor'),
  { ssr: false }
)

const AddPost = () => {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Create Post
      </h1>

      <PostEditor />
    </div>
  )
}

export default AddPost