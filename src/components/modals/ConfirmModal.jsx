import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '@/store/modalSlice'

const ConfirmModal=({ name }) => {
  const { isOpen, data, props, name: modalName } = useSelector((state) => state.modal)
  const {
    title = 'Confirm',
    content = 'Are you sure?',
    confirmText = 'OK',
    cancelText = 'Cancel',
    onConfirm
  } = props
  const dispatch = useDispatch()

  if (!isOpen || modalName !== name) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg p-6 w-full lg:w-120">

        <h2 className="text-lg font-bold mb-4">{title}</h2>

        <p>
          {typeof content === 'function'
            ? content(data)
            : content}
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-1 border rounded cursor-pointer"
            onClick={() => dispatch(closeModal())}
          >
            {cancelText}
          </button>

          <button
            className="px-4 py-1 bg-red-500 text-white rounded cursor-pointer"
            onClick={() => {
              onConfirm && onConfirm(data) // callback
              dispatch(closeModal())
            }}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmModal