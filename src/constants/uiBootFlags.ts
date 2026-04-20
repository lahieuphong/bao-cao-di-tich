// Flag mặc định khi vừa load trang `/`.
export const UI_BOOT_FLAGS = {
  // Header: trạng thái nút sidebar.
  sidebarClosed: true,
  sidebarOpen: false,

  // Header: trạng thái đăng nhập.
  loggedIn: true,
  loggedOut: false,

  // Thanh xanh: phạm vi dữ liệu.
  scopeAll: true,
  scopeGrouped: false,

  // Thanh xanh: chế độ hiển thị.
  viewGrid: false,
  viewList: true,

  // Sidebar: item active mặc định.
  pageHome: false,
  pageTongHop: true,
  pageDanhSach: false,
} as const

