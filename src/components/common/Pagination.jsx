import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import cx from 'classnames'

import { getListProducts } from '@/store/productSlice'

const Pagination = ({ category }) => {
  const dispatch = useDispatch()
  const pagination = useSelector((state) => state.product.pagination)
  const { totalPages, limit } = pagination
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (category === 'all') {
      dispatch(getListProducts({ page, limit }))
    } else {
      dispatch(getListProducts({ page, limit, category_slug: category }))
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [category])

  return (
    totalPages > 1 && (
      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className={cx(
            'text-white px-2 rounded-sm font-light',
            page === 1 ? 'cursor-not-allowed bg-primary/50' : 'cursor-pointer bg-secondary'
          )}
        >
        Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={cx({
              'font-bold cursor-pointer': true,
              'bg-light-coffee text-white w-5 h-5 text-sm rounded-sm': page === i + 1
            })}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className={cx(
            ' text-white px-2 rounded-sm font-light',
            page === totalPages ? 'cursor-not-allowed bg-primary/50' : 'cursor-pointer bg-secondary'
          )}
        >
        Next
        </button>
      </div>
    )
  )
}

export default Pagination