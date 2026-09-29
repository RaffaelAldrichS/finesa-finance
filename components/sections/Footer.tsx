import Image from 'next/image'
import Link from 'next/link'
import { navItems } from '@/lib/content'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface-strong px-6 py-7 text-white/75 lg:px-10">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-5 sm:flex-row">
        <Link href="#beranda" className="flex items-center gap-2 text-lg font-semibold text-white">
          <Image
            src="/assets/logo-finesa-green.webp"
            alt=""
            width={24}
            height={24}
            className="size-[24px] rounded-[6px]"
          />{' '}
          Finesa
        </Link>
        <nav className="flex gap-5 text-[12px]" aria-label="Navigasi footer">
          {navItems.map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex gap-3 text-[12px] font-bold text-white/70" aria-label="Media sosial">
          <span aria-label="Instagram">IG</span>
          <span aria-label="Youtube">YT</span>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-[1160px] justify-between border-t border-white/10 pt-5 text-[12px] text-white/70">
        <span>© {currentYear} Finesa. Semua hak dilindungi.</span>
        <span className="hidden sm:block">Belajar • Berkembang • Bebas Finansial</span>
      </div>
    </footer>
  )
}
