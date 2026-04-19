'use client'

import Link from 'next/link'
import type { HeritageItem } from '@/src/types/diTich'

interface TrangThaiDiTichSectionProps {
  items: HeritageItem[]
  statusByHeritageId: Record<string, boolean>
  onToggleStatus: (id: string) => void
}

function getHeritageUrl(slug: string): string {
  return `/di-tich/${slug}`
}

export default function TrangThaiDiTichSection({
  items,
  statusByHeritageId,
  onToggleStatus,
}: TrangThaiDiTichSectionProps) {
  return (
    <section className="mb-9 mt-9 space-y-6 px-5 pb-7 md:px-8 lg:my-0 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:space-y-4 lg:pt-6 lg:pb-6">
      <div className="relative z-10">
        <h2 className="text-[52px] font-semibold tracking-[-0.03em]" style={{ fontSize: 52 / 2 }}>
          Bảng trạng thái di tích ({items.length})
        </h2>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0e1422] lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <div className="grid shrink-0 grid-cols-[0.7fr_1.7fr_1.3fr_1.3fr_1.2fr_2.2fr_1.2fr_auto] gap-4 border-b border-white/10 px-5 py-3 text-sm font-bold tracking-normal text-white/70">
          <p>STT</p>
          <p>Tên di tích</p>
          <p>Địa chỉ</p>
          <p>Cấp</p>
          <p>Cập nhật</p>
          <p>Ghi chú</p>
          <p>Trạng thái</p>
          <p className="text-right">Link</p>
        </div>

        <div className="smooth-scroll-panel min-h-0 max-h-[70vh] overflow-y-auto lg:max-h-none lg:flex-1">
          {items.map((item) => {
            const itemKey = String(item.id)
            const statusOn = statusByHeritageId[itemKey] ?? true

            return (
              <div
                key={`trang-thai-list-${item.id}`}
                className="grid grid-cols-[0.7fr_1.7fr_1.3fr_1.3fr_1.2fr_2.2fr_1.2fr_auto] gap-4 border-b border-white/10 px-5 py-4 text-sm text-white/85 last:border-b-0"
              >
                <p className="font-semibold text-white">{item.id}</p>
                <p className="font-semibold text-white">{item.name}</p>
                <p>{item.address}</p>
                <p>{item.rank}</p>
                <p>{item.updatedAt}</p>
                <p className="text-white/65">{item.note}</p>
                <div className="inline-flex items-center gap-2">
                  {!statusOn ? <span className="text-xs text-white/55">Chưa đăng nhập</span> : null}
                  <button
                    type="button"
                    onClick={() => onToggleStatus(itemKey)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full border transition ${
                      statusOn ? 'border-emerald-300/30 bg-emerald-500/35' : 'border-white/20 bg-white/10'
                    }`}
                    aria-label={statusOn ? 'Tắt trạng thái' : 'Bật trạng thái'}
                  >
                    <span
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        statusOn ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="text-right">
                  <Link
                    href={getHeritageUrl(item.slug)}
                    className="inline-flex rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    Xem
                  </Link>
                </div>
              </div>
            )
          })}

          {items.length === 0 ? (
            <div className="px-5 py-8 text-center text-white/60">
              Chưa có dữ liệu.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
