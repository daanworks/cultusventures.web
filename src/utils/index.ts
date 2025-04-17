export const formatPrice = (price: number): string => {
  if (isNaN(price) || price === null || price === undefined) {
    throw new Error('Invalid price value')
  }
  if (price < 0) {
    throw new Error('Price must be a positive number')
  }
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
