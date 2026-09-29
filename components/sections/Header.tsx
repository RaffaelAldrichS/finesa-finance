'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog } from '@base-ui/react/dialog'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/lib/content'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('Beranda')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const matchedItem = navItems.find((item) => item.toLowerCase().replace(' ', '-') === id)
            if (matchedItem) {
              setActiveSection(matchedItem)
            }
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 },
    )

    navItems.forEach((item) => {
      const el = document.getElementById(item.toLowerCase().replace(' ', '-'))
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center transition-all duration-300`}
    >
      <div
        className={`pointer-events-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
          isScrolled
            ? 'w-[90%] max-w-4xl border border-[#A7D7B5]/30 bg-[#0E3D32]/85 shadow-lg backdrop-blur-md'
            : 'w-[90%] max-w-4xl border border-white/10 bg-[#0E3D32]/60 backdrop-blur-sm'
        }`}
      >
        <Link
          href="#beranda"
          className="flex items-center gap-2 text-[18px] font-semibold tracking-tight text-white"
        >
          <Image
            src="/assets/logo-finesa-green.webp"
            alt="Finesa Logo"
            width={24}
            height={24}
            loading="eager"
            className="size-[24px] rounded-md"
          />{' '}
          Finesa
        </Link>
        <nav className="hidden items-center gap-2 md:flex" aria-label="Navigasi utama">
          {navItems.map((item) => {
            const isActive = activeSection === item
            return (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`relative rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#A7D7B5]/20 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-[#A7D7B5]/20 bg-[#A7D7B5]/10 px-3 py-1.5 text-xs font-semibold text-[#A7D7B5] sm:inline-block">
            Segera Hadir
          </span>
          <Dialog.Root>
            <Dialog.Trigger
              aria-label="Buka menu navigasi"
              className="btn-press p-1 text-white md:hidden"
            >
              <Menu className="size-5" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="nav-sheet-backdrop bg-surface-overlay fixed inset-0 z-40" />
              <Dialog.Popup className="nav-sheet bg-surface text-text fixed inset-x-0 top-0 z-50 px-6 py-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-semibold">Menu</Dialog.Title>
                  <Dialog.Close aria-label="Tutup menu" className="btn-press p-2">
                    <X className="size-6" />
                  </Dialog.Close>
                </div>
                <nav aria-label="Navigasi seluler" className="mt-4 flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item
                    return (
                      <Dialog.Close
                        key={item}
                        render={<Link href={`#${item.toLowerCase().replace(' ', '-')}`} />}
                        nativeButton={false}
                        className={
                          isActive
                            ? 'bg-brand/10 text-brand rounded-xl px-4 py-3 text-sm font-semibold'
                            : 'text-text hover:bg-brand/10 rounded-xl px-4 py-3 text-sm font-medium'
                        }
                      >
                        {item}
                      </Dialog.Close>
                    )
                  })}
                </nav>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}
