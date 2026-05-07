/**
 * FeedbackPanel.jsx — 答题反馈面板
 * 答题后展开，显示正误、形态解析、记忆口诀
 *
 * Props:
 *   isCorrect   {boolean}   本题是否回答正确
 *   patternId   {string}    形态 ID，用于查取解析文字
 *   onNext      {Function}  点击"下一题 / 查看结果"回调
 *   isLast      {boolean}   是否是最后一题
 *   visible     {boolean}   是否显示（控制展开动画）
 */

import { PATTERN_META } from '../data/patternMeta.js'

export default function FeedbackPanel({ isCorrect, patternId, onNext, isLast = false, visible = false }) {
  const meta = PATTERN_META[patternId]

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-out"
      style={{ maxHeight: visible ? '600px' : '0px', opacity: visible ? 1 : 0 }}
    >
      <div
        className="rounded-xl border mt-2 p-5 flex flex-col gap-4"
        style={{
          backgroundColor: isCorrect ? 'rgba(0,200,150,0.06)' : 'rgba(255,77,106,0.06)',
          borderColor:     isCorrect ? 'rgba(0,200,150,0.3)' : 'rgba(255,77,106,0.3)',
        }}
      >
        {/* 顶部：正误标识 + 形态名 */}
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              backgroundColor: isCorrect ? '#00c896' : '#ff4d6a',
              color: '#0f1117',
            }}
          >
            {isCorrect ? '✓' : '✗'}
          </span>
          <div>
            <p className="text-sm font-semibold" style={{ color: isCorrect ? '#00c896' : '#ff4d6a' }}>
              {isCorrect ? '回答正确！' : '回答错误'}
            </p>
            {meta && (
              <p className="text-xs text-slate-400 mt-0.5">
                正确答案：<span className="text-slate-200 font-medium">{meta.name_zh}</span>
              </p>
            )}
          </div>
        </div>

        {/* 解析内容 */}
        {meta && (
          <>
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">形态解析</p>
              <p className="text-sm text-slate-300 leading-relaxed">{meta.explanation}</p>
            </div>

            {/* 记忆口诀 */}
            <div
              className="rounded-lg px-4 py-3 flex items-start gap-2"
              style={{ backgroundColor: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <span className="text-[#f59e0b] text-sm flex-shrink-0 mt-0.5">💡</span>
              <div>
                <p className="text-xs font-mono text-[#f59e0b] mb-0.5">记忆口诀</p>
                <p className="text-sm text-slate-300 italic">{meta.mnemonic}</p>
              </div>
            </div>
          </>
        )}

        {/* 操作按钮 */}
        <div className="flex justify-end pt-1">
          <button
            onClick={onNext}
            className="px-5 py-2 rounded-lg font-semibold text-sm text-black transition-all active:scale-[0.98]"
            style={{ backgroundColor: '#00c896' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00a87e')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00c896')}
          >
            {isLast ? '查看结果 →' : '下一题 →'}
          </button>
        </div>
      </div>
    </div>
  )
}
