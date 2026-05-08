export const datetimeHelpers = {
  formatDate: (date, type = 'vn') => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    if (type === 'vn') {
      return `${day}/${month}/${year}`
    }
    if (type === 'en') {
      const m = d.toLocaleString('en-US', { month: 'short' })
      return `${m}-${day}-${year}`
    }
  }
}