import { io } from 'socket.io-client'
import { SERVER_BACKEND } from '@/constants'

export const socket = io(SERVER_BACKEND, {
  transports: ['websocket']
})