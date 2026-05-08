import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/store/notificationSlice'
import { useAudio } from './useAudio'
import { socket } from '@/socket'

export const useSocket = () => {
  const dispatch = useDispatch()
  const { playSound } = useAudio()

  useEffect(() => {
    const handleConnect = () => {
      socket.emit('join_admin')
    }
    const handleNewOrder = (data) => {
      playSound()
      dispatch(addNotification(data))
    }

    socket.on('connect', handleConnect)
    socket.on('new_order', handleNewOrder)

    if (socket.connected) {
      handleConnect()
    }

    return () => {
      socket.off('connect', handleConnect)
      socket.off('new_order', handleNewOrder)
    }
  }, [dispatch])
}