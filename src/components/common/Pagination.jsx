import clsx from 'clsx'

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    totalPages > 1 && (
      <div className='flex justify-center items-center gap-6 mt-10'>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={clsx(
            'text-white px-2 rounded-sm font-light',
            currentPage === 1
              ? 'cursor-not-allowed bg-primary/50'
              : 'cursor-pointer bg-secondary'
          )}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={clsx({
              'font-bold cursor-pointer': true,
              'bg-light-coffee text-white w-5 h-5 text-sm rounded-sm': currentPage === i + 1
            })}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={clsx(
            'text-white px-2 rounded-sm font-light',
            currentPage === totalPages
              ? 'cursor-not-allowed bg-primary/50'
              : 'cursor-pointer bg-secondary'
          )}
        >
          Next
        </button>
      </div>
    )
  )
}

export default Pagination