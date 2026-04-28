'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { CartItem, Product } from '@/lib/types'

type CartState = { items: CartItem[]; isOpen: boolean }

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.product.id === action.product.id)
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { ...state, isOpen: true, items: [...state.items, { product: action.product, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.product.id !== action.productId) }
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.product.id !== action.productId) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  totalItems: number
  totalPrice: number
} | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false }, () => {
    if (typeof window === 'undefined') return { items: [], isOpen: false }
    try {
      const saved = localStorage.getItem('ohg-cart')
      return saved ? { items: JSON.parse(saved), isOpen: false } : { items: [], isOpen: false }
    } catch { return { items: [], isOpen: false } }
  })

  useEffect(() => {
    localStorage.setItem('ohg-cart', JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      state,
      addItem: (product) => dispatch({ type: 'ADD_ITEM', product }),
      removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
      updateQty: (productId, quantity) => dispatch({ type: 'UPDATE_QTY', productId, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
      closeCart: () => dispatch({ type: 'CLOSE_CART' }),
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}