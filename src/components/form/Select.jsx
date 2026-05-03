import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSortDown } from 'react-icons/fa';

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select...'
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const selected = options.find(opt => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className='relative w-full'>

      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className='border border-light-coffee rounded-lg px-3 py-3 bg-white flex justify-between cursor-pointer'
      >
        <span className={value ? '' : 'text-gray-400'}>
          {selected?.label || placeholder}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaSortDown size={20} className='text-light-coffee' />
        </motion.span>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='absolute w-full mt-2 bg-white border border-light-coffee rounded-lg shadow-lg overflow-hidden z-20'
          >
            <div className='max-h-60 overflow-auto'>
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className={`px-3 py-2 cursor-pointer ${
                    value === opt.value
                      ? 'bg-gray-200 font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Select