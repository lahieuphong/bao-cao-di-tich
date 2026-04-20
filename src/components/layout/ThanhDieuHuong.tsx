import ThuongHieu from '@/src/components/branding/ThuongHieu'
import Image from 'next/image'
import Link from 'next/link'

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

function HomeIcon() {
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
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.8V21h14V9.8" />
      <path d="M9 21v-6h6v6" />
    </svg>
  )
}

function OverviewIcon() {
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
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 16V11" />
      <path d="M12 16V8" />
      <path d="M16 16v-5" />
    </svg>
  )
}

function ListIcon() {
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
      <path d="M9 6h12" />
      <path d="M9 12h12" />
      <path d="M9 18h12" />
      <circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ThuongHieuRutGon() {
  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden">
      <Image
        src={withBasePath('/images/logo/logo.svg')}
        alt="motionsites logo"
        fill
        className="scale-[1.28] object-cover object-center"
        priority
      />
    </div>
  )
}

const sidebarItems = [
  { key: 'trang-chu', label: 'Trang Chủ', icon: HomeIcon },
  { key: 'tong-hop', label: 'Tổng hợp', icon: OverviewIcon },
  { key: 'danh-sach', label: 'Danh sách', icon: ListIcon },
]

interface SidebarNavProps {
  isOpen: boolean
  activeItem: 'tong-hop' | 'danh-sach'
  onSelectItem: (key: 'trang-chu' | 'tong-hop' | 'danh-sach') => void
}

export default function SidebarNav({
  isOpen,
  activeItem,
  onSelectItem,
}: SidebarNavProps) {
  return (
    <aside
      className={`sticky top-0 hidden h-screen shrink-0 border-r border-white/10 bg-[#070b14] text-white transition-all duration-300 lg:flex lg:flex-col ${
        isOpen ? 'lg:w-[252px] xl:w-[268px]' : 'lg:w-[50px] xl:w-[54px]'
      }`}
    >
      <div
        className={`flex h-[54px] items-center border-b border-white/10 ${
          isOpen ? 'px-4 justify-start xl:px-5' : 'px-2 justify-center'
        }`}
      >
        {isOpen ? <ThuongHieu /> : <ThuongHieuRutGon />}
      </div>

      <div className={`flex min-h-0 flex-1 flex-col ${isOpen ? 'px-4 py-4 xl:px-5' : 'px-2 py-4'}`}>
        <div className="min-h-0 flex-1 overflow-y-auto">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive =
              (item.key === 'tong-hop' && activeItem === 'tong-hop') ||
              (item.key === 'danh-sach' && activeItem === 'danh-sach')

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelectItem(item.key as 'trang-chu' | 'tong-hop' | 'danh-sach')}
                className={`flex w-full items-center font-semibold transition ${
                  isOpen
                    ? `${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/82 hover:bg-white/8 hover:text-white'
                      } h-[38px] rounded-lg gap-3 px-3 text-left text-[15px]`
                    : `${
                        isActive
                          ? 'bg-white/12 text-white'
                          : 'bg-white/5 text-white/82 hover:bg-white/10 hover:text-white'
                      } h-[38px] justify-center rounded-lg px-0 text-[15px]`
                }`}
                title={item.label}
              >
                <span className="text-white/90">
                  <Icon />
                </span>
                {isOpen ? <span>{item.label}</span> : null}
              </button>
            )
          })}
        </nav>

        </div>
      </div>

      <div className={`border-t border-white/10 ${isOpen ? 'px-4 py-2 xl:px-5' : 'px-2 py-2'}`}>
        <Link
          href="https://github.com/lahieuphong"
          target="_blank"
          rel="noreferrer"
          className={`group inline-flex h-[38px] items-center rounded-lg bg-white/5 text-white/88 transition hover:bg-white/10 hover:text-white ${
            isOpen ? 'w-full gap-2 px-3' : 'w-full justify-center'
          }`}
          title="GitHub lahieuphong"
        >
          <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white p-0.5">
            <Image
              src={withBasePath('/images/logo/github.svg')}
              alt="GitHub"
              fill
              className="object-contain"
            />
          </span>
          {isOpen ? <span className="text-sm font-semibold">lahieuphong</span> : null}
        </Link>
      </div>
    </aside>
  )
}
