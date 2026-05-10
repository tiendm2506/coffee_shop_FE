import apiService from '@/services/apiService'
import { API_ENDPOINTS } from '@/constants'

export const uploadService = {
  async uploadImage(file) {
    const formData = new FormData()
    formData.append('upload', file)
    const response =
      await apiService.post(
        API_ENDPOINTS.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    return response
  }
}