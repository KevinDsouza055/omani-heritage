'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { useSnackbar } from '@/components/ui/Snackbar'
import { slugify } from '@/lib/utils'
import { Category, Product } from '@/lib/types'

type Props = {
  categories: Category[]
  product?: Product
}

export function ProductForm({ categories, product }: Props) {
  const router = useRouter()
  const { show } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product?.price?.toString() ?? '',
    compare_at_price: product?.compare_at_price?.toString() ?? '',
    sku: product?.sku ?? '',
    stock_quantity: product?.stock_quantity?.toString() ?? '0',
    low_stock_threshold: product?.low_stock_threshold?.toString() ?? '5',
    category_id: product?.category_id ?? '',
    weight_grams: product?.weight_grams?.toString() ?? '',
    is_active: product?.is_active ?? true,
    origin: product?.origin ?? 'Oman',
  })

  function set(key: string, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    const payload = {
      name: form.name,
      slug: slugify(form.name),
      description: form.description || null,
      price: parseFloat(form.price),
      compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
      sku: form.sku || null,
      stock_quantity: parseInt(form.stock_quantity),
      low_stock_threshold: parseInt(form.low_stock_threshold),
      category_id: form.category_id || null,
      weight_grams: form.weight_grams ? parseInt(form.weight_grams) : null,
      is_active: form.is_active,
      origin: form.origin,
    }

    let error
    if (product) {
      ({ error } = await supabase.from('products').update(payload).eq('id', product.id))
    } else {
      ({ error } = await supabase.from('products').insert(payload))
    }

    if (error) {
      show(error.message, 'error')
    } else {
      show(product ? 'Product updated!' : 'Product created!', 'success')
      router.push('/admin/products')
      router.refresh()
    }
    setLoading(false)
  }

  async function handleDelete() {
    if (!product) return
    if (!confirm('Delete this product? This cannot be undone.')) return
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('products').delete().eq('id', product.id)
    if (error) {
      show(error.message, 'error')
    } else {
      show('Product deleted', 'info')
      router.push('/admin/products')
      router.refresh()
    }
    setLoading(false)
  }

  const inputClass = "w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/10 transition-all"
  const labelClass = "text-xs font-medium text-stone-700"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Product Name *</label>
        <input required className={inputClass} value={form.name}
          onChange={e => set('name', e.target.value)} placeholder="e.g. Aromatic Rose Soap" />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Description</label>
        <textarea rows={4} className={inputClass} value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Describe the product..." />
      </div>

      {/* Price row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Price (USD) *</label>
          <input required type="number" step="0.01" min="0" className={inputClass}
            value={form.price} onChange={e => set('price', e.target.value)} placeholder="0.00" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Compare-at Price</label>
          <input type="number" step="0.01" min="0" className={inputClass}
            value={form.compare_at_price} onChange={e => set('compare_at_price', e.target.value)}
            placeholder="Original price" />
        </div>
      </div>

      {/* SKU + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>SKU</label>
          <input className={inputClass} value={form.sku}
            onChange={e => set('sku', e.target.value)} placeholder="e.g. AN-1032" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Category</label>
          <select className={inputClass} value={form.category_id}
            onChange={e => set('category_id', e.target.value)}>
            <option value="">No category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Stock Quantity *</label>
          <input required type="number" min="0" className={inputClass}
            value={form.stock_quantity} onChange={e => set('stock_quantity', e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Low Stock Alert At</label>
          <input type="number" min="0" className={inputClass}
            value={form.low_stock_threshold} onChange={e => set('low_stock_threshold', e.target.value)} />
        </div>
      </div>

      {/* Weight + Origin */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Weight (grams)</label>
          <input type="number" min="0" className={inputClass}
            value={form.weight_grams} onChange={e => set('weight_grams', e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Origin</label>
          <input className={inputClass} value={form.origin}
            onChange={e => set('origin', e.target.value)} />
        </div>
      </div>

      {/* Active toggle */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-stone-100 bg-stone-50">
        <div className="flex-1">
          <p className="text-sm font-medium text-stone-800">Active / Visible</p>
          <p className="text-xs text-stone-500 mt-0.5">Customers can see and buy this product</p>
        </div>
        <button
          type="button"
          onClick={() => set('is_active', !form.is_active)}
          className={`relative w-10 h-6 rounded-full transition-colors ${form.is_active ? 'bg-[#8B6914]' : 'bg-stone-300'}`}
        >
          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.is_active ? 'left-5' : 'left-1'}`} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" size="lg" loading={loading}>
          {product ? 'Save Changes' : 'Create Product'}
        </Button>
        <Button type="button" variant="secondary" size="lg"
          onClick={() => router.push('/admin/products')}>
          Cancel
        </Button>
        {product && (
          <Button type="button" variant="danger" size="lg"
            onClick={handleDelete} className="ml-auto">
            Delete
          </Button>
        )}
      </div>
    </form>
  )
}