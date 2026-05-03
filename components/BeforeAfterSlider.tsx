'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  title?: string
  alt?: string
}

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Sebelum',
  afterLabel = 'Sesudah',
  title,
  alt = 'Before After',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(Math.max(x, 3), 97))
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    updatePosition(e.clientX)
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return
      updatePosition(e.clientX)
    },
    [updatePosition]
  )

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault()
      updatePosition(e.touches[0].clientX)
    },
    [updatePosition]
  )

  useEffect(() => {
    const container = containerRef.current
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    container?.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container?.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove])

  return (
    <div className="overflow-hidden">
      {title && (
        <div className="mb-3 font-display font-semibold text-navy-900 text-sm">{title}</div>
      )}
      <div
        ref={containerRef}
        className="ba-slider relative overflow-hidden aspect-video bg-neutral-200 cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      >
        {/* Before (bottom layer) */}
        <div className="absolute inset-0">
          <Image src={before} alt={`Before — ${alt}`} fill className="object-cover" />
          <div className="absolute bottom-3 left-3 bg-navy-900/80 text-white text-xs font-mono px-2 py-1 uppercase tracking-widest">
            {beforeLabel}
          </div>
        </div>

        {/* After (clipped top layer) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={after} alt={`After — ${alt}`} fill className="object-cover" />
          <div className="absolute bottom-3 right-3 bg-blue-brand/90 text-white text-xs font-mono px-2 py-1 uppercase tracking-widest">
            {afterLabel}
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none"
          style={{ left: `${position}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-navy-900" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
            </svg>
          </div>
        </div>
      </div>
      <p className="text-center text-neutral-500 text-xs mt-2 font-mono">
        ← Geser untuk melihat perbandingan →
      </p>
    </div>
  )
}
