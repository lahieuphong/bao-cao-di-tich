import Image from 'next/image'

function withBasePath(src: string): string {
  if (!src.startsWith('/')) {
    return src
  }
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  if (!basePath || src.startsWith(`${basePath}/`) || src === basePath) {
    return src
  }
  return `${basePath}${src}`
}

export default function ThuongHieu() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden">
        <Image
          src={withBasePath('/images/logo/logo.svg')}
          alt="Logo trung tâm bảo tồn"
          fill
          className="scale-[1.28] object-cover object-center"
          priority
        />
      </div>

      <div className="min-w-0 text-[9px] font-semibold uppercase leading-[1.15] tracking-[0.005em] text-white">
        <p className="whitespace-nowrap">TT BẢO TỒN &amp; PHÁT HUY GIÁ TRỊ</p>
        <p className="whitespace-nowrap">DI TÍCH LỊCH SỬ VĂN HÓA TP HCM</p>
      </div>
    </div>
  )
}
