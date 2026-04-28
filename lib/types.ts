export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  created_at: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compare_at_price: number | null
  category_id: string | null
  category?: Category
  images: string[]
  sku: string | null
  stock_quantity: number
  low_stock_threshold: number
  is_active: boolean
  weight_grams: number | null
  origin: string
  created_at: string
  updated_at: string
}

export type CartItem = {
  product: Product
  quantity: number
}

export type Customer = {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  created_at: string
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export type Order = {
  id: string
  customer_id: string
  customer?: Customer
  status: OrderStatus
  total_amount: number
  currency: string
  shipping_address: ShippingAddress | null
  stripe_payment_id: string | null
  notes: string | null
  items?: OrderItem[]
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  product?: Product
  quantity: number
  unit_price: number
  created_at: string
}

export type ShippingAddress = {
  full_name: string
  line1: string
  line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone?: string
}

export type CurrencyCode = 'USD' | 'OMR' | 'GBP' | 'EUR' | 'INR' | 'AED'

export type ApiResponse<T> = {
  data: T | null
  error: string | null
}