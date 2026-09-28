import Image from 'next/image'

const footerImage = '/assets/footer.webp'

export function CTA() {
  return (
    <section
      id="mulai"
      className="bg-surface-strong relative overflow-hidden px-6 py-20 text-white lg:px-10"
    >
      <Image
        src={footerImage}
        alt="Lembah hijau untuk ajakan mengunduh aplikasi"
        fill
        sizes="100vw"
        className="object-cover object-bottom opacity-55"
      />
      <div className="bg-surface-strong/70 absolute inset-0" />
      <div className="relative mx-auto flex max-w-[1040px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        <div>
          <p className="eyebrow text-brand-hover">SIAP MELANGKAH?</p>
          <h2 className="mt-3 text-3xl font-semibold">Download Finesa Sekarang!</h2>
          <p className="mt-3 max-w-[350px] text-sm text-white/70">
            Jelajahi dunia finansial dengan lebih seru dan bermakna.
          </p>
          <div className="mt-5 flex gap-2 text-[12px] font-medium">
            <span className="rounded-md bg-black px-3 py-2">▶ Google Play</span>
            <span className="rounded-md bg-black px-3 py-2">● App Store</span>
          </div>
        </div>
        <div className="flex size-32 items-center justify-center rounded-xl bg-white p-3 text-center text-xs font-bold text-[--on-brand] shadow-2xl">
          SCAN
          <br />
          QR CODE
        </div>
      </div>
    </section>
  )
}
