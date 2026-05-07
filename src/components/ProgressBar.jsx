/**
 * ProgressBar.jsx — 练习进度条
 *
 * Props:
 *   current {number}  当前题目序号（1-based）
 *   total   {number}  总题目数
 */
export default function ProgressBar({ current, total }) {
  const percent = total > 0 ? Math.round(((current - 1) / total) * 100) : 0

  return (
    <div className="flex items-center gap-3">
      {/* 进度文字 */}
      <span className="text-xs font-mono text-slate-500 flex-shrink-0">
        {current} / {total}
      </span>
      {/* 进度条轨道 */}
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#2a2d3a' }}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%`, backgroundColor: '#00c896' }}
        />
      </div>
    </div>
  )
}
