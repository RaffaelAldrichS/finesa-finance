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
        alt="Lembah hijau latar belakang ajakan Finesa segera hadir"
        fill
        sizes="100vw"
        className="object-cover object-bottom opacity-55"
      />
      <div className="bg-surface-strong/90 absolute inset-0" />
      <div className="relative mx-auto flex max-w-[1040px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        <div>
          <p className="eyebrow text-brand-hover">SIAP MELANGKAH?</p>
          <h2 className="mt-3 text-3xl font-semibold">Finesa Segera Hadir!</h2>
          <p className="mt-3 max-w-[350px] text-sm text-white/70">
            Jelajahi dunia finansial dengan lebih seru dan bermakna.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs font-medium">
            <span className="text-brand-hover rounded-full bg-black/30 px-4 py-2">
              Segera Hadir
            </span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-on-brand flex size-32 items-center justify-center rounded-xl bg-white p-3 text-center text-xs font-bold shadow-2xl">
            QR
            <br />
            CODE
          </div>
          <p className="mt-2 text-xs text-white/70">Ilustrasi</p>
        </div>
      </div>
    </section>
  )
}
