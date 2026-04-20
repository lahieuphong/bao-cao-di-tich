'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import ModalDangNhap from '@/src/components/layout/ModalDangNhap'
import type { DangNhapItem } from '@/src/data/dangNhap'

interface ThanhDauTrangProps {
  sidebarOpen: boolean
  activePage: 'tong-hop' | 'danh-sach'
  onToggleSidebar: () => void
  dangNhapItems: DangNhapItem[]
  isLoggedIn: boolean
  currentUser: { id: string; username: string; avatar: string } | null
  onLoginSuccess: (user: { id: string; username: string; avatar: string }) => void
  onLogout: () => void
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

function SettingsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="11" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LoginIcon() {
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
      <path d="M15 3h3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-3" />
      <path d="M10 17 15 12 10 7" />
      <path d="M15 12H3" />
    </svg>
  )
}

function LogoutIcon() {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17 21 12 16 7" />
      <path d="M21 12H9" />
    </svg>
  )
}

export default function ThanhDauTrang({
  sidebarOpen,
  activePage,
  onToggleSidebar,
  dangNhapItems,
  isLoggedIn,
  currentUser,
  onLoginSuccess,
  onLogout,
}: ThanhDauTrangProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    if (!toast) {
      return
    }
    const timer = setTimeout(() => {
      setToast(null)
    }, 5000)
    return () => clearTimeout(timer)
  }, [toast])

  return (
    <>
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
              {activePage === 'tong-hop' ? 'Tổng hợp' : 'Danh sách'}
            </h1>
          </div>

          <div className="relative flex items-center gap-5 text-white/90">
            <button
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              className={`inline-flex items-center justify-center gap-2 p-0 text-white/88 transition duration-200 hover:text-white ${
                !isLoggedIn && settingsOpen ? 'rotate-90 transform' : 'rotate-0 transform'
              }`}
              aria-label={isLoggedIn ? 'Mở tài khoản' : 'Mở đăng nhập'}
              aria-expanded={settingsOpen}
              aria-haspopup="menu"
            >
              {isLoggedIn ? (
                <>
                  <span className="relative inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src={withBasePath(currentUser?.avatar ?? '/images/hinh-dai-dien/01-mac-dinh.jpg')}
                      alt={currentUser?.username ?? 'avatar'}
                      fill
                      className="object-cover"
                    />
                  </span>
                  <span className="text-sm font-semibold text-white/95">{currentUser?.username ?? 'Tài khoản'}</span>
                </>
              ) : (
                <SettingsIcon />
              )}
            </button>

            {settingsOpen ? (
              <div className="absolute right-0 top-full z-40 mt-2 min-w-[132px] origin-top-right rounded-lg border border-white/10 bg-[#0e1422] p-1 shadow-[0_16px_34px_rgba(0,0,0,0.45)]">
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-white"
                    onClick={() => {
                      setSettingsOpen(false)
                      onLogout()
                      setToast({ type: 'success', message: 'Đăng xuất thành công.' })
                    }}
                  >
                    <LogoutIcon />
                    Đăng xuất
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-white"
                    onClick={() => {
                      setSettingsOpen(false)
                      setLoginModalOpen(true)
                    }}
                  >
                    <LoginIcon />
                    Đăng Nhập
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <ModalDangNhap
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        dangNhapItems={dangNhapItems}
        onLoginSuccess={onLoginSuccess}
        onNotify={(payload) => setToast(payload)}
      />

      {toast ? (
        <div className="fixed left-1/2 top-16 z-[60] -translate-x-1/2 px-4">
          <div
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold shadow-[0_16px_34px_rgba(0,0,0,0.45)] ${
              toast.type === 'success'
                ? toast.message === 'Đăng xuất thành công.'
                  ? 'border-[#f59e0b]/60 bg-[#f59e0b] text-white'
                  : 'border-emerald-300/50 bg-emerald-600 text-white'
                : 'border-rose-300/50 bg-rose-600 text-white'
            }`}
          >
            {toast.type === 'success' ? (
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
                <circle cx="12" cy="12" r="9" />
                <path d="m8.5 12.5 2.2 2.2 4.8-4.8" />
              </svg>
            ) : (
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
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5" />
                <path d="M12 16h.01" />
              </svg>
            )}
            {toast.message}
          </div>
        </div>
      ) : null}
    </>
  )
}
