'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Dialog } from '@base-ui/react/dialog'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/lib/content'

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 text-white lg:px-10">
      <Link
        href="#beranda"
        className="flex items-center gap-2 text-[22px] font-semibold tracking-tight"
      >
        <Image
          src="/assets/logo-finesa-green.webp"
          alt=""
          width={30}
          height={30}
          loading="eager"
          className="size-[30px] rounded-[8px]"
        />{' '}
        Finesa
      </Link>
      <nav
        className="hidden items-center gap-8 text-[11px] font-medium md:flex"
        aria-label="Navigasi utama"
      >
        {navItems.map((item, i) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className={
              i === 0
                ? 'border-brand-hover text-brand-hover border-b pb-2'
                : 'hover:text-brand-hover opacity-85 transition'
            }
          >
            {item}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4 text-[11px] font-semibold">
        <span className="bg-brand/20 text-brand-hover hidden rounded-full px-4 py-2 md:inline-block">
          Segera Hadir
        </span>
        <Link
          href="#mulai"
          className="bg-brand-hover text-on-brand shadow-brand/20 btn-press rounded-full px-5 py-3 shadow-lg"
        >
          Mulai Sekarang
        </Link>
        <Dialog.Root>
          <Dialog.Trigger
            aria-label="Buka menu navigasi"
            className="btn-press text-white md:hidden"
          >
            <Menu className="size-6" />
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
                {navItems.map((item, i) => (
                  <Dialog.Close
                    key={item}
                    render={<Link href={`#${item.toLowerCase()}`} />}
                    nativeButton={false}
                    className={
                      i === 0
                        ? 'bg-brand/10 text-text rounded-xl px-4 py-3 text-sm font-semibold'
                        : 'text-text hover:bg-brand/10 rounded-xl px-4 py-3 text-sm font-medium'
                    }
                  >
                    {item}
                  </Dialog.Close>
                ))}
              </nav>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
