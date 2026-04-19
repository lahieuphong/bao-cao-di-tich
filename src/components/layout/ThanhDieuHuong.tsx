import BrandMark from '@/src/components/branding/BrandMark'

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

function LearnIcon() {
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
      <path d="M3 6.5 12 3l9 3.5-9 3.5-9-3.5Z" />
      <path d="M7 9.6V14c0 1.8 2.2 3.2 5 3.2s5-1.4 5-3.2V9.6" />
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

function ForumIcon() {
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
      <path d="M4 5h16v11H8l-4 4V5Z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </svg>
  )
}

function LockIcon() {
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
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  )
}

function LinkOutIcon() {
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
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </svg>
  )
}

function ToolIcon() {
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
      <path d="M14.7 6.3a4 4 0 1 0 3 3l-7.8 7.8a2 2 0 1 0 2.8 2.8l7.8-7.8a4 4 0 0 0 3-3 4 4 0 0 1-5.8-2.8Z" />
    </svg>
  )
}

function CompactBrandMark() {
  return (
    <div className="relative h-9 w-10 shrink-0">
      <span className="absolute left-0 top-1 h-7 w-3 rotate-[18deg] rounded-full bg-gradient-to-b from-[#ffb067] via-[#ff69c7] to-[#9f7bff]" />
      <span className="absolute left-3 top-1 h-7 w-3 -rotate-[14deg] rounded-full bg-gradient-to-b from-[#ff69c7] via-[#b574ff] to-[#7a8cff]" />
      <span className="absolute left-6 top-1 h-7 w-3 rotate-[12deg] rounded-full bg-gradient-to-b from-[#7a8cff] via-[#8a7dff] to-[#7ad3ff]" />
    </div>
  )
}

const sidebarItems = [
  { key: 'trang-chu', label: 'Trang Chủ', icon: HomeIcon },
  { key: 'hoc', label: 'Học', icon: LearnIcon },
  { key: 'danh-sach', label: 'Danh sách', icon: ListIcon },
  { key: 'dien-dan', label: 'Diễn Đàn', icon: ForumIcon },
]

interface SidebarNavProps {
  isOpen: boolean
  activeItem: 'hoc' | 'danh-sach'
  onSelectItem: (key: 'trang-chu' | 'hoc' | 'danh-sach' | 'dien-dan') => void
}

export default function SidebarNav({
  isOpen,
  activeItem,
  onSelectItem,
}: SidebarNavProps) {
  return (
    <aside
      className={`hidden shrink-0 border-r border-white/10 bg-[#070b14] text-white transition-all duration-300 lg:flex lg:flex-col ${
        isOpen ? 'w-[290px] p-5' : 'w-[92px] p-3'
      }`}
    >
      <div className={`mb-7 flex items-center ${isOpen ? 'justify-start' : 'justify-center'}`}>
        {isOpen ? <BrandMark /> : <CompactBrandMark />}
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive =
            (item.key === 'hoc' && activeItem === 'hoc') ||
            (item.key === 'danh-sach' && activeItem === 'danh-sach')

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectItem(item.key as 'trang-chu' | 'hoc' | 'danh-sach' | 'dien-dan')}
              className={`flex w-full items-center rounded-xl py-3 text-left text-[33px] font-medium transition ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/82 hover:bg-white/8 hover:text-white'
              } ${isOpen ? 'gap-3 px-4' : 'justify-center px-2'}`}
              style={{ fontSize: 33 / 2 }}
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

      <button
        type="button"
        className={`mt-5 rounded-xl bg-white/12 text-[29px] font-semibold text-white ${
          isOpen
            ? 'px-4 py-3 text-left'
            : 'inline-flex items-center justify-center px-2 py-3'
        }`}
        style={{ fontSize: 29 / 2 }}
        title="Đăng nhập để xem mọi công cụ"
      >
        {isOpen ? 'Đăng nhập để xem mọi công cụ' : <LockIcon />}
      </button>

      <div className={`mt-auto pt-8 text-white/80 ${isOpen ? 'space-y-2' : 'space-y-3'}`}>
        <button
          type="button"
          className={`transition hover:text-white ${
            isOpen
              ? 'block text-left text-base font-medium'
              : 'inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/5 py-2'
          }`}
          title="Roblox.com"
        >
          {isOpen ? 'Roblox.com' : <LinkOutIcon />}
        </button>
        <button
          type="button"
          className={`transition hover:text-white ${
            isOpen
              ? 'block text-left text-base font-medium'
              : 'inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/5 py-2'
          }`}
          title="Studio"
        >
          {isOpen ? 'Studio' : <ToolIcon />}
        </button>
      </div>
    </aside>
  )
}
