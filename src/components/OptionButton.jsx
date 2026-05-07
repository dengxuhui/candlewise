/**
 * OptionButton.jsx — 答题选项按钮
 *
 * Props:
 *   label    {string}   选项标签，如 "A" "B" "C"
 *   text     {string}   选项文字内容
 *   onClick  {Function} 点击回调
 *   state    {string}   'idle' | 'correct' | 'wrong' | 'disabled'
 */

const STATE_STYLES = {
  idle: {
    border:     '#2a2d3a',
    background: 'transparent',
    textColor:  '#cbd5e1',
    labelBg:    '#2a2d3a',
    labelColor: '#94a3b8',
    cursor:     'cursor-pointer',
    opacity:    '',
  },
  correct: {
    border:     '#00c896',
    background: 'rgba(0,200,150,0.08)',
    textColor:  '#00c896',
    labelBg:    '#00c896',
    labelColor: '#0f1117',
    cursor:     'cursor-default',
    opacity:    '',
  },
  wrong: {
    border:     '#ff4d6a',
    background: 'rgba(255,77,106,0.08)',
    textColor:  '#ff4d6a',
    labelBg:    '#ff4d6a',
    labelColor: '#0f1117',
    cursor:     'cursor-default',
    opacity:    '',
  },
  disabled: {
    border:     '#2a2d3a',
    background: 'transparent',
    textColor:  '#475569',
    labelBg:    '#1e2130',
    labelColor: '#475569',
    cursor:     'cursor-default',
    opacity:    'opacity-50',
  },
}

export default function OptionButton({ label, text, onClick, state = 'idle' }) {
  const s = STATE_STYLES[state] ?? STATE_STYLES.idle
  const isClickable = state === 'idle'

  return (
    <button
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left
        transition-all duration-150 ${s.cursor} ${s.opacity}
        ${isClickable ? 'hover:border-slate-500 hover:bg-[#1a1d27] active:scale-[0.99]' : ''}`}
      style={{
        borderColor:     s.border,
        backgroundColor: s.background,
      }}
    >
      {/* 选项标签圆圈 */}
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 transition-colors duration-150"
        style={{ backgroundColor: s.labelBg, color: s.labelColor }}
      >
        {label}
      </span>
      {/* 选项文字 */}
      <span className="text-sm font-medium transition-colors duration-150" style={{ color: s.textColor }}>
        {text}
      </span>
      {/* 正确/错误图标 */}
      {state === 'correct' && (
        <span className="ml-auto text-[#00c896] text-base flex-shrink-0">✓</span>
      )}
      {state === 'wrong' && (
        <span className="ml-auto text-[#ff4d6a] text-base flex-shrink-0">✗</span>
      )}
    </button>
  )
}
