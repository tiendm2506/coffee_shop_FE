export default class UploadAdapter {
  constructor(loader) {
    this.loader = loader
  }

  async upload() {
    try {
      const file = await this.loader.file

      const formData = new FormData()

      // IMPORTANT:
      formData.append('upload', file)

      const res = await fetch('http://localhost:3069/api/upload/image', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Upload failed')
      }

      return {
        default: data.url
      }
    } catch (error) {
      console.error(error)

      throw error
    }
  }

  abort() {}
}