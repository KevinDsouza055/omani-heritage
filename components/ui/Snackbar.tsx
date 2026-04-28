'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type SnackbarType = 'success' | 'error' | 'info'
type Snackbar = { id: string; message: string; type: SnackbarType }

const SnackbarContext = createContext<{
  show: (message: string, type?: SnackbarType) => void
} | null>(null)

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbars, setSnackbars] = useState<Snackbar[]>([])

  const show = useCallback((message: string, type: SnackbarType = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setSnackbars(prev => [...prev, { id, message, type }])
    setTimeout(() => setSnackbars(prev => prev.filter(s => s.id !== id)), 3500)
  }, [])

  const remove = (id: string) => setSnackbars(prev => prev.filter(s => s.id !== id))

  const icons = {
    success: <CheckCircle size={16} />,
    error: <XCircle size={16} />,
    info: <AlertCircle size={16} />,
  }

  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-amber-50 border-amber-200 text-amber-800',
  }

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
        {snackbars.map(s => (
          <div
            key={s.id}
            className={cn(
              'flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium pointer-events-auto',
              'animate-in slide-in-from-bottom-4 fade-in duration-300',
              colors[s.type]
            )}
          >
            {icons[s.type]}
            <span>{s.message}</span>
            <button onClick={() => remove(s.id)} className="ml-1 opacity-60 hover:opacity-100 transition-opacity">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error('useSnackbar must be used inside SnackbarProvider')
  return ctx
}