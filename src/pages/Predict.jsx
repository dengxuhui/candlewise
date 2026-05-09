import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCases } from '../hooks/useCases.js'
import { useProgressStore } from '../store/progressStore.js'
import CandleChart from '../components/CandleChart.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

const TOTAL = 10

const INDICATOR_CONFIG = {
  basics: [],
  single_reversal: [],
  double_reversal: [],
  triple_pattern: [],
  trend: [],
  volume: ['volume'],
  oscillator: ['volume', 'rsi'],
  momentum: ['volume', 'macd'],
  synthesis: ['volume', 'rsi', 'macd'],
}

const DIFFICULTY_OPTIONS = [
  { label: '全部', value: null, desc: '混合三种难度，300 题随机' },
  { label: '初级', value: 1, desc: '单K线基础形态，难度 ★' },
  { label: '中级', value: 2, desc: '双/三K线组合，难度 ★★' },
  { label: '高级', value: 3, desc: '趋势与指标综合，难度 ★★★' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Predict() {
  const { cases, loading: casesLoading } = useCases()
  const predictBestScore = useProgressStore((s) => s.predictBestScore)
  const recordPredictSession = useProgressStore((s) => s.recordPredictSession)

  // Snapshot the best score at session start to detect new records
  const previousBestRef = useRef(predictBestScore)

  const [phase, setPhase] = useState('setup') // setup | playing | revealing | result
  const [difficulty, setDifficulty] = useState(null) // null | 1 | 2 | 3
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [userAnswer, setUserAnswer] = useState(null)
  const [results, setResults] = useState([])
  const [chartHeight, setChartHeight] = useState(() => {
    const w = window.innerWidth
    return w < 480 ? 210 : w < 768 ? 260 : 300
  })

  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth
      setChartHeight(w < 480 ? 210 : w < 768 ? 260 : 300)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  function start() {
    if (!cases) return
    previousBestRef.current = predictBestScore
    const pool = difficulty ? cases.filter((c) => c.difficulty === difficulty) : cases
    setQuestions(shuffle(pool).slice(0, TOTAL))
    setIdx(0)
    setResults([])
    setUserAnswer(null)
    setPhase('playing')
  }

  function answer(choice) {
    const caseData = questions[idx]
    const correct = choice === caseData.subsequent_trend
    setUserAnswer(choice)
    setResults((prev) => [
      ...prev,
      { caseId: caseData.id, patternName: caseData.pattern_name_zh, correct },
    ])
    setPhase('revealing')
  }

  function next() {
    if (idx + 1 >= TOTAL) {
      // results state is already fully updated by answer() in the previous event
      recordPredictSession(
        results.map((r) => ({ caseId: r.caseId, correct: r.correct, timestamp: Date.now() }))
      )
      setPhase('result')
    } else {
      setIdx((i) => i + 1)
      setUserAnswer(null)
      setPhase('playing')
    }
  }

  function retry() {
    setPhase('setup')
    setQuestions([])
    setIdx(0)
    setResults([])
    setUserAnswer(null)
  }

  const caseData = questions[idx]

  // ── SETUP ──────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-300 mb-8 transition-colors"
        >
          ← 返回首页
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">预测挑战</h1>
          <p className="text-slate-400">给出K线，隐藏后续走势，判断涨跌方向</p>
          {predictBestScore > 0 && (
            <p className="text-sm text-slate-500 mt-2 font-mono">
              历史最高：{predictBestScore} / {TOTAL}
            </p>
          )}
        </div>

        {/* Difficulty selector */}
        <div className="mb-8">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">选择难度</p>
          <div className="grid grid-cols-2 gap-3">
            {DIFFICULTY_OPTIONS.map((opt) => {
              const selected = difficulty === opt.value
              return (
                <button
                  key={String(opt.value)}
                  onClick={() => setDifficulty(opt.value)}
                  className="rounded-lg border p-4 text-left transition-all"
                  style={{
                    backgroundColor: selected ? 'rgba(0,200,150,0.1)' : '#1a1d27',
                    borderColor: selected ? '#00c896' : '#2a2d3a',
                  }}
                >
                  <p className="font-semibold text-white text-sm">{opt.label}</p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: selected ? '#00c896' : '#64748b' }}
                  >
                    {opt.desc}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Session info */}
        <div
          className="rounded-lg p-4 mb-8 text-sm text-slate-400 font-mono"
          style={{ backgroundColor: '#1a1d27', border: '1px solid #2a2d3a' }}
        >
          每轮 {TOTAL} 题 · 答题后揭示真实走势 · 不影响学习进度
        </div>

        <button
          onClick={start}
          disabled={casesLoading}
          className="w-full py-3 rounded-lg font-semibold text-black transition-colors disabled:opacity-50"
          style={{ backgroundColor: '#00c896' }}
          onMouseEnter={(e) => !casesLoading && (e.currentTarget.style.backgroundColor = '#00a87e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00c896')}
        >
          {casesLoading ? '加载数据中…' : '开始挑战 →'}
        </button>
      </div>
    )
  }

  // ── RESULT ─────────────────────────────────────────────────────────
  if (phase === 'result') {
    const score = results.filter((r) => r.correct).length
    const isNewBest = score > previousBestRef.current

    const remark =
      score >= 8 ? '判断力出众！' :
      score >= 6 ? '表现不错！' :
      score >= 4 ? '继续练习！' :
      '还需多加练习'

    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-300 mb-8 transition-colors"
        >
          ← 返回首页
        </Link>

        {/* Score */}
        <div className="text-center mb-8">
          <p className="text-6xl font-bold font-mono mb-2" style={{ color: '#00c896' }}>
            {score}
            <span className="text-3xl text-slate-500">/{TOTAL}</span>
          </p>
          <p className="text-slate-400">{remark}</p>
          {isNewBest ? (
            <p className="text-sm font-mono mt-2" style={{ color: '#00c896' }}>
              🏆 新纪录！
            </p>
          ) : (
            <p className="text-xs text-slate-600 font-mono mt-2">
              历史最高：{predictBestScore} / {TOTAL}
            </p>
          )}
        </div>

        {/* Per-question breakdown */}
        <div className="mb-8 space-y-2">
          {results.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm"
              style={{ backgroundColor: '#1a1d27', border: '1px solid #2a2d3a' }}
            >
              <span className="text-slate-500 font-mono w-8">Q{i + 1}</span>
              <span className="flex-1 text-slate-300 truncate px-3">{r.patternName}</span>
              <span style={{ color: r.correct ? '#00c896' : '#ff4d6a' }}>
                {r.correct ? '✓ 正确' : '✗ 错误'}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={retry}
            className="flex-1 py-3 rounded-lg font-semibold text-black transition-colors"
            style={{ backgroundColor: '#00c896' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00a87e')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00c896')}
          >
            再来一轮
          </button>
          <Link
            to="/"
            className="flex-1 py-3 rounded-lg font-semibold text-center text-slate-300 border border-[#2a2d3a] hover:border-slate-500 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  // ── PLAYING | REVEALING ────────────────────────────────────────────
  if (!caseData) return null

  const visibleCandles =
    phase === 'playing'
      ? caseData.candles.slice(0, caseData.pattern_index + 1)
      : caseData.candles

  const indicators = phase === 'revealing' ? (INDICATOR_CONFIG[caseData.module] ?? []) : []
  const isCorrect = userAnswer === caseData.subsequent_trend

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link to="/" className="text-slate-500 hover:text-slate-300 transition-colors text-sm flex-shrink-0">
          ←
        </Link>
        <div className="flex-1">
          <ProgressBar current={idx + 1} total={TOTAL} />
        </div>
      </div>

      {/* Phase label */}
      <div className="mb-3 h-5">
        {phase === 'playing' && (
          <p className="text-xs font-mono text-slate-500">
            根据以上K线形态，预测后续走势
          </p>
        )}
        {phase === 'revealing' && (
          <p className="text-xs font-mono" style={{ color: caseData.subsequent_trend === 'up' ? '#00c896' : '#ff4d6a' }}>
            实际走势：{caseData.subsequent_trend === 'up' ? '上涨 ↑' : '下跌 ↓'}
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #2a2d3a' }}>
        <CandleChart
          candles={visibleCandles}
          patternIndex={caseData.pattern_index}
          height={chartHeight}
          indicators={indicators}
        />
      </div>

      {/* Feedback panel (revealing) */}
      {phase === 'revealing' && (
        <div
          className="rounded-lg px-4 py-3 mb-4 flex items-center justify-between"
          style={{
            backgroundColor: isCorrect ? 'rgba(0,200,150,0.1)' : 'rgba(255,77,106,0.1)',
            border: `1px solid ${isCorrect ? 'rgba(0,200,150,0.3)' : 'rgba(255,77,106,0.3)'}`,
          }}
        >
          <div>
            <p className="font-semibold text-sm" style={{ color: isCorrect ? '#00c896' : '#ff4d6a' }}>
              {isCorrect ? '✓ 判断正确！' : '✗ 判断错误'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              形态：{caseData.pattern_name_zh} · 后续走势：{caseData.subsequent_trend === 'up' ? '上涨' : '下跌'}
            </p>
          </div>
          <span className="text-xl ml-4">{isCorrect ? '🎯' : '📉'}</span>
        </div>
      )}

      {/* Answer buttons (playing) */}
      {phase === 'playing' && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'up', label: '上涨 ↑', color: '#00c896' },
            { value: 'down', label: '下跌 ↓', color: '#ff4d6a' },
          ].map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => answer(value)}
              className="py-4 rounded-xl font-semibold text-lg border transition-all hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: `${color}18`,
                borderColor: `${color}55`,
                color,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Next button (revealing) */}
      {phase === 'revealing' && (
        <button
          onClick={next}
          className="w-full py-3 rounded-lg font-semibold text-black transition-colors"
          style={{ backgroundColor: '#00c896' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00a87e')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00c896')}
        >
          {idx + 1 >= TOTAL ? '查看结果 →' : '下一题 →'}
        </button>
      )}
    </div>
  )
}
