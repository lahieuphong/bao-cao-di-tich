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
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden">
        <Image
          src={withBasePath('/images/logo/logo.svg')}
          alt="Logo trung tâm bảo tồn"
          fill
          className="scale-[1.28] object-cover object-center"
          priority
        />
      </div>

      <div className="min-w-0 text-[10px] font-semibold uppercase leading-[1.1] tracking-[0.01em] text-white">
        <p className="whitespace-normal">TT BẢO TỒN &amp; PHÁT HUY GIÁ TRỊ</p>
        <p className="whitespace-normal">DI TÍCH LỊCH SỬ VĂN HÓA TP HCM</p>
      </div>
    </div>
  )
}
