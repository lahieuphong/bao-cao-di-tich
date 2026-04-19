'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import ThanhDauTrang from '@/src/components/layout/ThanhDauTrang'
import SidebarNav from '@/src/components/layout/ThanhDieuHuong'
import DanhSachSection from '@/src/components/list/DanhSachDiTichSection'
import TrangThaiDiTichSection from '@/src/components/list/TrangThaiDiTichSection'
import type { HeritageItem, HeritageRank } from '@/src/types/diTich'
import type { DanhSachItem } from '@/src/data/danhSachDiTich'
import type { DangNhapItem } from '@/src/data/dangNhap'

const heritageSections: Array<{ title: string; rank: HeritageRank }> = [
  { title: 'Di tích quốc gia đặc biệt', rank: 'Di tích quốc gia đặc biệt' },
  { title: 'Di tích quốc gia', rank: 'Di tích quốc gia' },
  { title: 'Di tích thành phố', rank: 'Di tích thành phố' },
]
const HERITAGE_TARGET_TOTAL = 126

type ViewMode = 'grid' | 'list'
type ScopeMode = 'all' | 'grouped'

function GridIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[14px] w-[14px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[14px] w-[14px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M9 6h12" />
      <path d="M9 12h12" />
      <path d="M9 18h12" />
      <circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function MissingDetailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6h11" />
      <path d="M9 12h11" />
      <path d="M9 18h11" />
      <circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function SectionTitleIcon({
  variant,
}: {
  variant: 'all' | 'special' | 'national' | 'city'
}) {
  const iconClassName = 'h-[0.9em] w-[0.9em] align-middle'

  if (variant === 'all') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClassName} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3 1.8 3.7L18 8.5l-3 2.9.7 4.1L12 13.6 8.3 15.5 9 11.4 6 8.5l4.2-1.8L12 3Z" />
        <path d="M5 18h14" />
      </svg>
    )
  }

  if (variant === 'special') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClassName} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="m9.5 11.5-1.5 8 4-2 4 2-1.5-8" />
      </svg>
    )
  }

  if (variant === 'national') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClassName} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M4 7h16" />
        <path d="M6 7v14" />
        <path d="M10 7v14" />
        <path d="M14 7v14" />
        <path d="M18 7v14" />
        <path d="m2 7 10-4 10 4" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClassName} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21V9l4-3 5 3 5-4 4 3v13" />
      <path d="M8 21v-5h3v5" />
      <path d="M14 21v-4h3v4" />
    </svg>
  )
}

interface HeritagesPageClientProps {
  heritages: HeritageItem[]
  danhSachItems: DanhSachItem[]
  dangNhapItems: DangNhapItem[]
}

function getHeritageUrl(slug: string): string {
  return `/di-tich/${slug}`
}

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

function getMissingIds(items: HeritageItem[], total: number): number[] {
  const seen = new Set<number>()
  for (const item of items) {
    const value = Number(item.id)
    if (Number.isInteger(value) && value >= 1 && value <= total) {
      seen.add(value)
    }
  }

  const missing: number[] = []
  for (let i = 1; i <= total; i += 1) {
    if (!seen.has(i)) {
      missing.push(i)
    }
  }
  return missing
}

function buildMissingIdRanges(missingIds: number[], total: number): string {
  if (missingIds.length === 0) {
    return `Đã đủ toàn bộ mã 1-${total}.`
  }

  const ranges: string[] = []
  let start = missingIds[0]
  let prev = missingIds[0]

  for (let i = 1; i < missingIds.length; i += 1) {
    const current = missingIds[i]
    if (current === prev + 1) {
      prev = current
      continue
    }
    ranges.push(start === prev ? String(start) : `${start}-${prev}`)
    start = current
    prev = current
  }
  ranges.push(start === prev ? String(start) : `${start}-${prev}`)

  return `Chưa có dữ liệu (STT): ${ranges.join(', ')}`
}

export default function HeritagesPageClient({
  heritages,
  danhSachItems,
  dangNhapItems,
}: HeritagesPageClientProps) {
  const heroImage = '/images/anh-bia/di-tich-anh-bia.jpg'
  const latest = heritages[0]
  const publishCount = heritages.length
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [scopeMode, setScopeMode] = useState<ScopeMode>('all')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePage, setActivePage] = useState<'tong-hop' | 'danh-sach' | 'trang-thai'>('tong-hop')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string; avatar: string } | null>(null)
  const [statusByHeritageId, setStatusByHeritageId] = useState<Record<string, boolean>>({})
  const [showMissingModal, setShowMissingModal] = useState(false)
  const [gridColumns, setGridColumns] = useState(4)
  const [expandedGridSections, setExpandedGridSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1280) {
        setGridColumns(4)
        return
      }
      if (window.innerWidth >= 640) {
        setGridColumns(2)
        return
      }
      setGridColumns(1)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const missingIds = useMemo(
    () => getMissingIds(heritages, HERITAGE_TARGET_TOTAL),
    [heritages],
  )
  const missingRangesText = useMemo(
    () => buildMissingIdRanges(missingIds, HERITAGE_TARGET_TOTAL),
    [missingIds],
  )
  const missingIdRows = useMemo(() => {
    const groups = new Map<number, number[]>()
    for (const id of missingIds) {
      const bucket = id < 10 ? 0 : Math.floor(id / 10)
      const current = groups.get(bucket) ?? []
      current.push(id)
      groups.set(bucket, current)
    }

    const rows: number[][] = []
    for (const bucket of Array.from(groups.keys()).sort((a, b) => a - b)) {
      const row = groups.get(bucket)
      if (row && row.length > 0) {
        rows.push(row)
      }
    }
    return rows
  }, [missingIds])

  const groupedSections = heritageSections.map((section) => ({
    ...section,
    items: heritages.filter((item) => item.rank === section.rank),
  }))

  const handleLoginSuccess = (user: { id: string; username: string; avatar: string }) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
    setStatusByHeritageId({})
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  const handleToggleStatus = (id: string) => {
    setStatusByHeritageId((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }))
  }

  const isVisibleInOverview = (id: string) => {
    return statusByHeritageId[id] !== false
  }

  const handleScopeModeChange = (mode: ScopeMode) => {
    const currentY = window.scrollY
    setScopeMode(mode)

    requestAnimationFrame(() => {
      window.scrollTo({ top: currentY, behavior: 'auto' })
    })
  }

  const isDanhSachPage = activePage === 'danh-sach'

  return (
    <main
      className={`bg-[#060b16] text-white ${
        isDanhSachPage ? 'min-h-screen lg:h-screen lg:overflow-hidden' : 'min-h-screen'
      }`}
    >
      <div className={`flex min-h-screen ${isDanhSachPage ? 'lg:h-full lg:overflow-hidden' : ''}`}>
        <SidebarNav
          isOpen={sidebarOpen}
          activeItem={activePage}
          onSelectItem={(key) => {
            if (key === 'danh-sach') {
              setActivePage('danh-sach')
              return
            }
            if (key === 'trang-thai') {
              setActivePage('trang-thai')
              return
            }

            if (key === 'tong-hop' || key === 'trang-chu') {
              setActivePage('tong-hop')
            }
          }}
        />

        <div className={`flex min-w-0 flex-1 flex-col ${isDanhSachPage ? 'lg:overflow-hidden' : ''}`}>
          <ThanhDauTrang
            sidebarOpen={sidebarOpen}
            activePage={activePage}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            dangNhapItems={dangNhapItems}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />

          <section className={isDanhSachPage ? 'pb-7 lg:flex-1 lg:min-h-0 lg:overflow-hidden lg:pb-0' : 'pb-7'}>
            {activePage === 'tong-hop' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="relative overflow-hidden"
              >
                <div className="relative min-h-[200px] md:min-h-[260px] lg:min-h-[305px]">
                  <Image
                    src={withBasePath(heroImage)}
                    alt="Tạo trên motionsites"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/52 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060b16] via-[#060b16]/95 to-transparent md:h-20 lg:h-24" />

                  <div className="relative z-10 max-w-[760px] p-4 sm:p-6 md:p-10">
                    <p className="text-[74px] font-semibold leading-none tracking-[-0.03em]" style={{ fontSize: 74 / 2 }}>
                      Tạo Trên Roblox
                    </p>
                    <p className="mt-3 text-[62px] leading-tight text-white/92" style={{ fontSize: 62 / 2 }}>
                      Học qua tài liệu và tài nguyên cho tất cả các nhà sáng tạo.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      {latest ? (
                        <Link
                          href={getHeritageUrl(latest.slug)}
                          className="inline-flex h-14 items-center rounded-xl border border-white/30 bg-white/10 px-7 text-lg font-semibold text-white transition hover:bg-white/20"
                        >
                          Xem di tích mới nhất
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {activePage === 'tong-hop' ? (
              <section className="mt-0 space-y-10 px-5 md:px-8">
              <div className="-mx-5 flex flex-wrap items-center justify-between gap-4 rounded-none border-y border-[#6f8fff]/35 bg-[#2563eb]/16 px-5 py-2 shadow-[0_0_0_1px_rgba(83,124,255,0.16),0_0_20px_rgba(37,99,235,0.22)] md:-mx-8 md:px-8">
                <div className="inline-flex h-10 items-center rounded-lg border border-[#6f8fff]/35 bg-[#0f1729] p-0.5 shadow-[0_0_0_1px_rgba(83,124,255,0.14),0_0_18px_rgba(59,130,246,0.25),0_10px_30px_rgba(10,24,58,0.35)]">
                  <button
                    type="button"
                    onClick={() => handleScopeModeChange('all')}
                    className={`inline-flex h-8 items-center rounded-md px-3 text-[13px] font-semibold transition ${
                      scopeMode === 'all'
                        ? 'bg-[#DEE7FF] text-[#2f5cff] shadow-[0_0_0_1px_rgba(53,99,255,0.2),0_6px_16px_rgba(53,99,255,0.28)]'
                        : 'text-white/78 hover:bg-white/12 hover:text-white'
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScopeModeChange('grouped')}
                    className={`inline-flex h-8 items-center rounded-md px-3 text-[13px] font-semibold transition ${
                      scopeMode === 'grouped'
                        ? 'bg-[#DEE7FF] text-[#2f5cff] shadow-[0_0_0_1px_rgba(53,99,255,0.2),0_6px_16px_rgba(53,99,255,0.28)]'
                        : 'text-white/78 hover:bg-white/12 hover:text-white'
                    }`}
                  >
                    Chia theo cấp
                  </button>
                </div>

                <div className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#6f8fff]/25 bg-[#0f1729] p-0.5 shadow-[0_0_0_1px_rgba(83,124,255,0.08),0_10px_30px_rgba(10,24,58,0.35)]">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition ${
                      viewMode === 'grid'
                        ? 'bg-[#DEE7FF] text-[#2f5cff] shadow-[0_0_0_1px_rgba(53,99,255,0.2),0_6px_16px_rgba(53,99,255,0.28)]'
                        : 'text-white/70 hover:bg-white/12 hover:text-white'
                    }`}
                    aria-label="Hiển thị dạng ảnh"
                  >
                    <GridIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition ${
                      viewMode === 'list'
                        ? 'bg-[#DEE7FF] text-[#2f5cff] shadow-[0_0_0_1px_rgba(53,99,255,0.2),0_6px_16px_rgba(53,99,255,0.28)]'
                        : 'text-white/70 hover:bg-white/12 hover:text-white'
                    }`}
                    aria-label="Hiển thị dạng danh sách"
                  >
                    <ListIcon />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-white/10 bg-[#0e1422] px-4 py-2.5">
                  <p className="text-[15px] font-bold tracking-normal text-white/65">Tổng đã push</p>
                  <p className="mt-1.5 text-[36px] font-semibold leading-none text-white" style={{ fontSize: 36 / 2 }}>
                    {publishCount}
                  </p>
                </div>
                {groupedSections.map((section) => (
                  <div key={`stat-${section.title}`} className="rounded-xl border border-white/10 bg-[#0e1422] px-4 py-2.5">
                    <p className="text-[15px] font-bold tracking-normal text-white/65">{section.title}</p>
                    <p className="mt-1.5 text-[36px] font-semibold leading-none text-white" style={{ fontSize: 36 / 2 }}>
                      {section.items.length}
                    </p>
                  </div>
                ))}
              </div>

              {(scopeMode === 'all'
                ? [{ title: 'Tất cả di tích đã push', rank: null, items: heritages }]
                : groupedSections
              ).map((sectionTitle, sectionIdx) => (
                <div key={sectionTitle.title}>
                  <h2 className="flex items-center gap-2.5 text-[64px] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ fontSize: 64 / 2 }}>
                    <span className="inline-flex shrink-0 items-center justify-center text-white/78">
                      <SectionTitleIcon
                        variant={
                          sectionTitle.rank === null
                            ? 'all'
                            : sectionTitle.rank === 'Di tích quốc gia đặc biệt'
                              ? 'special'
                              : sectionTitle.rank === 'Di tích quốc gia'
                                ? 'national'
                                : 'city'
                        }
                      />
                    </span>
                    <span>
                      {sectionTitle.title}
                      {sectionTitle.rank === null ? ` (${sectionTitle.items.length}/${HERITAGE_TARGET_TOTAL})` : ''}
                    </span>
                  </h2>
                  {sectionTitle.rank === null ? (
                    <div className="sticky top-[54px] z-20 -mx-5 mt-5 flex h-[54px] items-center justify-between gap-3 border-y border-red-400/30 bg-red-500/25 px-5 text-sm text-red-50 backdrop-blur md:-mx-8 md:px-8">
                      <p className="truncate font-semibold">{missingRangesText}</p>
                      <button
                        type="button"
                        onClick={() => setShowMissingModal(true)}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-red-100/40 bg-red-200/20 text-red-50 transition hover:bg-red-200/30"
                        aria-label="Xem chi tiết STT thiếu"
                        title="Xem chi tiết STT thiếu"
                      >
                        <MissingDetailIcon />
                      </button>
                    </div>
                  ) : null}

                  {viewMode === 'grid' ? (
                    (() => {
                      const collapsedCount = gridColumns * 2
                      const sectionKey = `${scopeMode}-${sectionTitle.rank ?? 'all'}-${sectionTitle.title}`
                      const isExpanded = expandedGridSections[sectionKey] ?? false
                      const hasMore = sectionTitle.items.length > collapsedCount
                      const itemsToRender = isExpanded
                        ? sectionTitle.items
                        : sectionTitle.items.slice(0, collapsedCount)

                      return (
                        <div className="relative mt-5">
                          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {itemsToRender.map((item, idx) => (
                              <motion.article
                                key={`${sectionTitle.title}-${item.id}`}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.45, delay: idx * 0.05 + sectionIdx * 0.03 }}
                                className="overflow-hidden rounded-xl border border-white/10 bg-[#0e1422]"
                              >
                                <div className="relative h-[190px]">
                                  <Image
                                    src={withBasePath(item.cover)}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1280px) 50vw, 25vw"
                                  />
                                </div>
                                <div className="p-4">
                                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">{item.rank}</p>
                                  <h3 className="mt-2 text-xl font-semibold leading-snug">
                                    {item.id}. {item.name}
                                  </h3>
                                  <p className="mt-2 text-sm text-white/70">
                                    Cập nhật gần nhất: {item.updatedAt}
                                  </p>
                                </div>
                              </motion.article>
                            ))}

                            {sectionTitle.items.length === 0 ? (
                              <div className="col-span-full rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-8 text-center text-white/60">
                                Chưa có dữ liệu cho nhóm này.
                              </div>
                            ) : null}
                          </div>

                          {hasMore && !isExpanded ? (
                            <>
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060b16] via-[#060b16]/85 to-transparent" />
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedGridSections((prev) => ({
                                    ...prev,
                                    [sectionKey]: true,
                                  }))
                                }
                                className="relative z-10 mt-2 block w-full py-2 text-center text-[20px] font-semibold text-white/95 transition hover:text-white"
                                style={{ textShadow: '0 0 10px rgba(165,180,252,0.55), 0 0 22px rgba(59,130,246,0.35)' }}
                              >
                                Xem thêm...
                              </button>
                            </>
                          ) : null}
                        </div>
                      )
                    })()
                  ) : (
                    <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#0e1422]">
                      <div
                        className={`grid gap-4 border-b border-white/10 px-5 py-3 text-sm font-bold tracking-normal text-white/70 ${
                          scopeMode === 'all'
                            ? 'grid-cols-[0.7fr_1.7fr_1.3fr_1.3fr_1.2fr_2.2fr_auto]'
                            : 'grid-cols-[0.7fr_2fr_1.3fr_1.2fr_2.6fr_auto]'
                        }`}
                      >
                        <p>STT</p>
                        <p>Tên di tích</p>
                        <p>Địa chỉ</p>
                        {scopeMode === 'all' ? <p>Cấp</p> : null}
                        <p>Cập nhật</p>
                        <p>Ghi chú</p>
                        <p className="text-right">Link</p>
                      </div>

                      {sectionTitle.items
                        .filter((item) => isVisibleInOverview(String(item.id)))
                        .map((item) => (
                          <div
                            key={`${sectionTitle.title}-list-${item.id}`}
                            className={`grid gap-4 border-b border-white/10 px-5 py-4 text-sm text-white/85 last:border-b-0 ${
                              scopeMode === 'all'
                                ? 'grid-cols-[0.7fr_1.7fr_1.3fr_1.3fr_1.2fr_2.2fr_auto]'
                                : 'grid-cols-[0.7fr_2fr_1.3fr_1.2fr_2.6fr_auto]'
                            }`}
                          >
                            <p className="font-semibold text-white">{item.id}</p>
                            <p className="font-semibold text-white">{item.name}</p>
                            <p>{item.address}</p>
                            {scopeMode === 'all' ? <p>{item.rank}</p> : null}
                            <p>{item.updatedAt}</p>
                            <p className="text-white/65">{item.note}</p>
                            <div className="text-right">
                              <Link
                                href={getHeritageUrl(item.slug)}
                                className="inline-flex rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                              >
                                Xem
                              </Link>
                            </div>
                          </div>
                        ))}

                      {sectionTitle.items.filter((item) => isVisibleInOverview(String(item.id))).length === 0 ? (
                        <div className="px-5 py-8 text-center text-white/60">
                          Chưa có dữ liệu cho nhóm này.
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              ))}

              </section>
            ) : (
              activePage === 'danh-sach' ? (
                <DanhSachSection items={danhSachItems} />
              ) : (
                <TrangThaiDiTichSection
                  items={heritages}
                  statusByHeritageId={statusByHeritageId}
                  onToggleStatus={handleToggleStatus}
                />
              )
            )}
          </section>
        </div>
      </div>

      {showMissingModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          onClick={() => setShowMissingModal(false)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl border border-red-300/30 bg-red-950/70 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-red-300/25 px-5 py-4">
              <div>
                <p className="text-base font-semibold tracking-normal text-red-50/95">Chi tiết STT thiếu</p>
              </div>
              <button
                type="button"
                onClick={() => setShowMissingModal(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-100/35 bg-red-200/20 text-red-50 transition hover:bg-red-200/30"
                aria-label="Đóng chi tiết STT thiếu"
                title="Đóng"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-5 py-4">
              {missingIdRows.length === 0 ? (
                <p className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-100">
                  Không còn STT thiếu.
                </p>
              ) : (
                <div className="space-y-2">
                  {missingIdRows.map((row, rowIdx) => (
                    <p
                      key={`missing-row-${rowIdx}`}
                      className="rounded-lg border border-red-100/70 bg-white/10 px-3 py-2 text-sm text-red-50/95"
                    >
                      {row.join(', ')}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
