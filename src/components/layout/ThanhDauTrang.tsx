'use client'

import Link from 'next/link'

interface ThanhDauTrangProps {
  sidebarOpen: boolean
  activePage: 'hoc' | 'danh-sach'
  onToggleSidebar: () => void
  loginUrl: string
}

function SidebarToggleIcon({ open }: { open: boolean }) {
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
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      {open ? <path d="m10 8-3 4 3 4" /> : <path d="m14 8 3 4-3 4" />}
    </svg>
  )
}

export default function ThanhDauTrang({
  sidebarOpen,
  activePage,
  onToggleSidebar,
  loginUrl,
}: ThanhDauTrangProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b14]/95 backdrop-blur">
      <div className="flex h-[54px] items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/8 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_16px_rgba(96,165,250,0.28)] backdrop-blur transition hover:bg-white/15 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_0_20px_rgba(96,165,250,0.36)]"
            aria-label={sidebarOpen ? 'Đóng sidebar' : 'Mở sidebar'}
            title={sidebarOpen ? 'Đóng sidebar' : 'Mở sidebar'}
          >
            <SidebarToggleIcon open={sidebarOpen} />
          </button>
          <h1 className="text-[48px] font-semibold tracking-[-0.03em]" style={{ fontSize: 48 / 2 }}>
            {activePage === 'hoc' ? 'Tổng hợp' : 'Danh sách'}
          </h1>
        </div>

        <div className="flex items-center gap-5 text-white/90">
          <Link href={loginUrl} target="_blank" className="text-sm font-semibold hover:text-white">
            Đăng Nhập
          </Link>
        </div>
      </div>
    </header>
  )
}
