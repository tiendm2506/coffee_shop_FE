import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import InputField from '@/components/form/InputField'
import Button from '@/components/common/Button'
import { AdminLayout } from '@/components/layout'
import SwitchButton from '@/components/admin/SwitchButton'
import SelectField from '@/components/form/SelectField'
import { createLoadingSelector } from '@/store/loaderSlice'
import { createPost, CREATE_POST, updatePost, UPDATE_POST, getPostDetailById, selectPostDetail, clearPostDetail } from '@/store/postSlice'
import { getListCategories, selectListCategories } from '@/store/categorySlice'
import { stringHelpers } from '@/helpers'
import { ADMIN_ROUTES, CATEGORY_TYPE } from '@/constants'

const PostEditor = dynamic(
  () => import('@/components/admin/editor/PostEditor'),
  { ssr: false }
)

const CreatePostPage = () => {
  const router = useRouter()
  const { id } = router.query
  const isEdit = !!id
  const textAction = isEdit ? 'Update' : 'Create'
  const postDetail = useSelector(selectPostDetail)
  console.log('postDetail: ', postDetail)

  const dispatch = useDispatch()
  const loadingSelector = createLoadingSelector([CREATE_POST, UPDATE_POST])
  const isLoading = useSelector((state) => loadingSelector(state.loader))
  const [highlight, setHighlight] = useState(false)
  const [published, setPublished] = useState(true)
  const categoriesFetch = useSelector(selectListCategories)
  const [categories, setCategories] = useState([])
  const [editor, setEditor] = useState(null)

  const schema = object({
    title: string().required('Please enter your title'),
    description: string().required('Please enter your description'),
    thumbnail: string().required('Please enter your thumbnail URL'),
    category: object({
      id: string().required(),
      name: string().required(),
      slug: string().required()
    })
      .nullable()
      .required('Please choose category')
      .test(
        'is-selected',
        'Please choose category',
        (value) => value && value.id
      )
  })

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      thumbnail: '',
      category: {
        id: '',
        name: '',
        slug: ''
      }
    }
  })

  const { reset } = methods

  const onSubmit = async(data) => {
    try {
      const dataPost = {
        title: data.title,
        description: data.description,
        slug: stringHelpers.slugify(data.title),
        content: editor?.getData() || '',
        thumbnail: data.thumbnail,
        category: data.category,
        published,
        highlight
      }
      if (isEdit) {
        await dispatch(updatePost({
          postId: postDetail._id,
          ...dataPost
        })).unwrap()

        toast.success('Post updated!')
        router.replace(ADMIN_ROUTES.LIST_POST_PAGE)
      } else {
        await dispatch(createPost(dataPost)).unwrap()
        toast.success('Post created!')
        reset()
        editor?.setData('')
        setPublished(true)
        setHighlight(false)
      }
    } catch (error) {
      toast.error(error?.message)
    }
  }

  useEffect(() => {
    const options = (categoriesFetch || []).map(item => ({
      label: item.name,
      value: item._id,
      name: item._name
    }))
    setCategories(options)
  }, [categoriesFetch])

  useEffect(() => {
    dispatch(getListCategories({ type: CATEGORY_TYPE.POST }))
  }, [])

  useEffect(() => {
    if (!id) {
      dispatch(clearPostDetail())
      reset()
      editor?.setData('')
      setHighlight(false)
      setPublished(true)
      return
    }

    dispatch(getPostDetailById({ id }))
      .unwrap()
      .catch(() => {
        router.replace('/404')
      })

    return () => {
      dispatch(clearPostDetail())
    }
  }, [id, dispatch, router, reset, editor])

  useEffect(() => {
    if (!editor) return

    // CREATE MODE
    if (!isEdit) {
      reset({
        title: '',
        description: '',
        thumbnail: '',
        category: { id: '', name: '', slug: '' }
      })
      setHighlight(false)
      setPublished(true)
      editor.setData('')
      return
    }

    // EDIT MODE
    if (postDetail?._id === id) {
      reset({
        title: postDetail.title || '',
        description: postDetail.description || '',
        thumbnail: postDetail.thumbnail || '',
        category: postDetail.category || { id: '', name: '', slug: '' }
      })
      setHighlight(!!postDetail.highlight)
      setPublished(!!postDetail.published)
      editor.setData(postDetail.content || '')
    }
  }, [isEdit, postDetail, id, editor, reset])

  return (
    <>
      <Head>
        <title>Admin - {textAction} Post</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <AdminLayout>
        <section>
          <h1 className='mb-6 text-3xl font-bold'>{textAction} Post</h1>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 mb-4'>
                <div className='flex items-center'>
                  <span className='text-light-coffee mr-2'>Highlight</span>
                  <SwitchButton checked={highlight} onChange={() => setHighlight(!highlight)} />
                </div>
                <div className='flex items-center'>
                  <span className='text-light-coffee mr-2'>Published</span>
                  <SwitchButton checked={published} onChange={() => setPublished(!published)} />
                </div>
              </div>

              <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
                <InputField
                  name='title'
                  label='Title'
                  labelClasses='text-left block'
                  inputClasses='bg-white'
                  required
                />
                <InputField
                  name='description'
                  label='Description'
                  labelClasses='text-left block'
                  inputClasses='bg-white'
                  required
                />
              </div>

              <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
                <InputField
                  name='thumbnail'
                  label='Thumbnail URL'
                  labelClasses='text-left block'
                  inputClasses='bg-white'
                  required
                />
                <SelectField
                  name='category'
                  label='Category'
                  placeholder='Select category...'
                  options={categoriesFetch.map(item => ({
                    label: item.name,
                    value: item._id,
                    slug: item.slug
                  }))}
                  returnObject
                  mapValue={(opt) => ({
                    id: opt.value,
                    name: opt.label,
                    slug: opt.slug
                  })}
                  required
                />
              </div>

              <div>
                <p>Content</p>
                <PostEditor setEditor={setEditor} />
              </div>

              <Button loading={isLoading} type='submit' size='sm' variant='secondary' className='hover:bg-light-coffee hover:text-white uppercase mt-4'>{isLoading ? 'Saving...' : isEdit ? 'Update Post' : 'Save Post'}</Button>
            </form>
          </FormProvider>
        </section>
      </AdminLayout>
    </>
  )
}

export default CreatePostPage