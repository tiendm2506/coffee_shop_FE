import { uploadService } from '@/services/uploadService'

export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader
  }

  async upload() {
    try {
      const file = await this.loader.file
      const data = await uploadService.uploadImage( file )
      return { default:data.url }
    } catch (error) {
      throw error
    }
  }

  abort() {}
}