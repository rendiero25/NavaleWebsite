'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap-client'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  distance?: number
  duration?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.8,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const from: gsap.TweenVars = { opacity: 0 }
    if (direction === 'up') from.y = distance
    if (direction === 'left') from.x = -distance
    if (direction === 'right') from.x = distance

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        from,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [delay, direction, distance, duration, once])

  return (
    <div ref={ref} className={`${className}`} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

// Stagger children reveal
interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
}

export function StaggerReveal({ children, className = '', stagger = 0.12, delay = 0 }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.children

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [stagger, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
