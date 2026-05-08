export const priceHelpers = {
  handleSubPrice: (item) => {
    const price = item?.on_sale
      ? Number(item?.promotion_price)
      : Number(item?.origin_price)
    return Math.round(price * item?.quantity * 100) / 100
  },

  handleTotalPrice: (items = []) => {
    const total = items.reduce((total, item) => {
      const sub = priceHelpers.handleSubPrice(item)
      return total + sub
    }, 0)
    return Math.round(total * 100) / 100
  }
}