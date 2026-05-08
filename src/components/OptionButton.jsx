/**
 * OptionButton.jsx — 答题选项按钮
 *
 * Props:
 *   label    {string}   选项标签，如 "A" "B" "C"
 *   text     {string}   选项文字内容
 *   onClick  {Function} 点击回调
 *   state    {string}   'idle' | 'correct' | 'wrong' | 'disabled'
 */

import { useState } from 'react'

const STATE_STYLES = {
  idle: {
    border:     '#2a2d3a',
    background: 'transparent',
    textColor:  '#cbd5e1',
    labelBg:    '#2a2d3a',
    labelColor: '#94a3b8',
  },
  correct: {
    border:     '#00c896',
    background: 'rgba(0,200,150,0.08)',
    textColor:  '#00c896',
    labelBg:    '#00c896',
    labelColor: '#0f1117',
  },
  wrong: {
    border:     '#ff4d6a',
    background: 'rgba(255,77,106,0.08)',
    textColor:  '#ff4d6a',
    labelBg:    '#ff4d6a',
    labelColor: '#0f1117',
  },
  disabled: {
    border:     '#2a2d3a',
    background: 'transparent',
    textColor:  '#475569',
    labelBg:    '#1e2130',
    labelColor: '#475569',
  },
}

const HOVER_STYLE = {
  border:     '#475569',
  background: '#1a1d27',
}

export default function OptionButton({ label, text, onClick, state = 'idle' }) {
  const s = STATE_STYLES[state] ?? STATE_STYLES.idle
  const isIdle = state === 'idle'
  const isDisabled = state === 'disabled'
  const [hovered, setHovered] = useState(false)

  const borderColor = isIdle && hovered ? HOVER_STYLE.border : s.border
  const bgColor     = isIdle && hovered ? HOVER_STYLE.background : s.background

  return (
    <button
      onClick={isIdle ? onClick : undefined}
      disabled={!isIdle}
      onMouseEnter={() => isIdle && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left"
      style={{
        borderColor,
        backgroundColor: bgColor,
        opacity:         isDisabled ? 0.5 : 1,
        cursor:          isIdle ? 'pointer' : 'default',
        transform:       hovered && isIdle ? 'scale(1.002)' : 'scale(1)',
        transition:      'border-color 180ms ease, background-color 180ms ease, opacity 180ms ease, transform 120ms ease',
      }}
    >
      {/* 选项标签圆圈 */}
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
        style={{
          backgroundColor: s.labelBg,
          color:           s.labelColor,
          transition:      'background-color 180ms ease, color 180ms ease',
        }}
      >
        {label}
      </span>
      {/* 选项文字 */}
      <span
        className="text-sm font-medium"
        style={{
          color:      s.textColor,
          transition: 'color 180ms ease',
        }}
      >
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
