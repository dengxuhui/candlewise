import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f1117' }}>
      {/* 导航栏 */}
      <header className="border-b border-[#2a2d3a] sticky top-0 z-50" style={{ backgroundColor: '#0f1117' }}>
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 font-mono font-semibold text-base sm:text-lg tracking-tight"
            style={{ color: '#00c896' }}
          >
            <span className="text-xl sm:text-2xl">🕯</span>
            <span>Candlewise</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6 text-sm text-slate-400">
            <Link
              to="/"
              className={`hover:text-white transition-colors ${isHome ? 'text-white' : ''}`}
            >
              课程
            </Link>
            <a
              href="https://github.com/dengxuhui/candlewise"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="border-t border-[#2a2d3a] py-6 text-center text-sm text-slate-600">
        <p>Candlewise · 开源 K 线学习平台 · MIT License</p>
      </footer>
    </div>
  )
}
