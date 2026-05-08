/**
 * FreeToggle.jsx — 导航栏自由模式 iOS 风格开关
 *
 * 开启后：所有锁定模块均可访问，练习成绩不影响解锁进度链
 */

import { useProgressStore } from '../store/progressStore.js'

export default function FreeToggle() {
  const freeMode = useProgressStore((s) => s.freeMode)
  const toggleFreeMode = useProgressStore((s) => s.toggleFreeMode)

  return (
    <button
      onClick={toggleFreeMode}
      className="flex items-center gap-2 select-none focus:outline-none group"
      title={freeMode ? '关闭自由模式' : '开启自由模式：可访问所有模块'}
      aria-pressed={freeMode}
    >
      {/* 标签文字 */}
      <span
        className="text-xs font-medium transition-colors duration-200"
        style={{ color: freeMode ? '#00c896' : '#6b7280' }}
      >
        自由模式
      </span>

      {/* 胶囊轨道 */}
      <div
        className="relative w-10 h-5 rounded-full transition-colors duration-300 flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: freeMode ? '#00c896' : '#2a2d3a' }}
      >
        {/* 滑动圆点 */}
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300"
          style={{ transform: freeMode ? 'translateX(20px)' : 'translateX(0px)' }}
        />
      </div>
    </button>
  )
}
