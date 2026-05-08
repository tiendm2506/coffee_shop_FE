import clsx from 'clsx'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center rounded-lg font-bold transition-all duration-500 focus:outline-none px-4 border cursor-pointer'
  const variants = {
    primary: 'bg-light-coffee text-white hover:bg-light-coffee-hover',
    secondary: 'bg-secondary border-secondary text-white hover:bg-light-coffee hover:border-light-coffee',
    outline: 'bg-transparent border border-secondary bg-white text-secondary hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }
  const sizes = {
    sm: 'text-sm w-[150px] py-3',
    md: 'text-md w-[200px] py-3.5',
    lg: 'text-xl w-[300px] py-5'
  }

  return (
    <button
      type={type}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        (disabled || loading) && 'bg-gray-300! cursor-not-allowed! text-light-coffee! border-gray-300!',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className='mr-2 h-4 w-4 border-2 border-light-coffee border-t-transparent rounded-full animate-spin' />
      )}
      {children}
    </button>
  )
}

export default Button