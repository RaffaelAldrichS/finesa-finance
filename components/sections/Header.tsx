import Image from 'next/image'
import Link from 'next/link'
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
        <span className="bg-brand/20 text-brand-hover rounded-full px-4 py-2">Segera Hadir</span>
        <Link
          href="#mulai"
          className="bg-brand-hover text-on-brand shadow-brand/20 btn-press rounded-full px-5 py-3 shadow-lg"
        >
          Mulai Sekarang
        </Link>
      </div>
    </header>
  )
}
