import cx from 'classnames'

const SwitchButton=({
  checked,
  onChange,
  disabled = false,
  loading = false
}) => {
  return (
    <button
      type='button'
      onClick={() => !disabled && !loading && onChange?.(!checked)}
      className={cx(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 cursor-pointer',
        checked ? 'bg-green-500' : 'bg-gray-300',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {/* Thumb */}
      <span
        className={cx(
          'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-all duration-200',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />

      {/* Loading spinner */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
          ...
        </span>
      )}
    </button>
  )
}

export default SwitchButton