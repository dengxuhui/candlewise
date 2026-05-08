import { useState, useEffect, useRef } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useProgressStore } from '../store/progressStore.js'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const menuRef = useRef(null)

  const freeMode = useProgressStore((s) => s.freeMode)
  const toggleFreeMode = useProgressStore((s) => s.toggleFreeMode)
  const colorTheme = useProgressStore((s) => s.colorTheme)
  const toggleColorTheme = useProgressStore((s) => s.toggleColorTheme)
  const resetProgress = useProgressStore((s) => s.resetProgress)

  // 点击菜单外部关闭
  useEffect(() => {
    function handleMouseDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleMouseDown)
    }
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [menuOpen])

  function handleReset() {
    resetProgress()
    setShowConfirm(false)
  }

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

          {/* 菜单区域 */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors text-slate-400 hover:text-white hover:bg-[#2a2d3a]"
              aria-label="菜单"
            >
              {/* 三横线图标 */}
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="0" y1="1" x2="18" y2="1" />
                <line x1="0" y1="7" x2="18" y2="7" />
                <line x1="0" y1="13" x2="18" y2="13" />
              </svg>
            </button>

            {/* 下拉菜单 */}
            {menuOpen && (
              <div
                className="absolute right-0 top-12 w-52 rounded-xl border border-[#2a2d3a] shadow-2xl overflow-hidden"
                style={{ backgroundColor: '#1a1d27' }}
              >
                {/* 自由模式 */}
                <button
                  onClick={toggleFreeMode}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-[#2a2d3a]"
                >
                  <span className="text-slate-300">自由模式</span>
                  {/* toggle 开关 */}
                  <div
                    className="relative w-9 h-5 rounded-full transition-colors duration-300 flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: freeMode ? '#00c896' : '#3a3d4a' }}
                  >
                    <span
                      className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300"
                      style={{ transform: freeMode ? 'translateX(16px)' : 'translateX(0px)' }}
                    />
                  </div>
                </button>

                <div className="border-t border-[#2a2d3a]" />

                {/* 配色方案 */}
                <button
                  onClick={toggleColorTheme}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-[#2a2d3a]"
                >
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-slate-300">配色方案</span>
                    <span className="text-xs text-slate-500">
                      {colorTheme === 'chinese' ? '红涨绿跌（中国）' : '绿涨红跌（国际）'}
                    </span>
                  </div>
                  {/* 红绿色块示意 */}
                  <div className="flex gap-1 flex-shrink-0">
                    <span
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: colorTheme === 'chinese' ? '#ff4d6a' : '#00c896' }}
                    />
                    <span
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: colorTheme === 'chinese' ? '#00c896' : '#ff4d6a' }}
                    />
                  </div>
                </button>

                <div className="border-t border-[#2a2d3a]" />

                {/* GitHub 主页 */}
                <a
                  href="https://github.com/dengxuhui/candlewise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-[#2a2d3a] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 flex-shrink-0">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub 主页</span>
                </a>

                <div className="border-t border-[#2a2d3a]" />

                {/* 清空学习记录 */}
                <button
                  onClick={() => { setMenuOpen(false); setShowConfirm(true) }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-[#2a2d3a] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                  <span>清空学习记录</span>
                </button>
              </div>
            )}
          </div>
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

      {/* 确认弹窗 */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="rounded-xl border border-[#2a2d3a] p-6 w-full max-w-sm flex flex-col gap-5"
            style={{ backgroundColor: '#1a1d27' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">清空学习记录？</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                此操作将清除所有学习进度、答题历史和模块通过状态，<span className="text-red-400">无法恢复</span>。
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-[#2a2d3a] hover:border-slate-500 transition-colors"
                style={{ backgroundColor: '#0f1117' }}
              >
                取消
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: '#c0392b' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e74c3c')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c0392b')}
              >
                确认清空
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
