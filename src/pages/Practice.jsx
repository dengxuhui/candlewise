/**
 * Practice.jsx — 练习页主页面
 *
 * 完整答题流程：
 *   loading  → 加载题目数据
 *   playing  → 逐题作答（进度条 → K线图 → 题目 → 选项 → 反馈）
 *   result   → 结算页（得分 + 解锁提示 + 操作按钮）
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCases } from '../hooks/useCases.js'
import { useProgress } from '../hooks/useProgress.js'
import { useProgressStore } from '../store/progressStore.js'
import { CURRICULUM, MODULE_MAP } from '../data/curriculum.js'
import { getPatternName, getDistractors } from '../data/patternMeta.js'
import CandleChart from '../components/CandleChart.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import QuestionCard from '../components/QuestionCard.jsx'
import OptionButton from '../components/OptionButton.jsx'
import FeedbackPanel from '../components/FeedbackPanel.jsx'

// ── 题目生成工具函数 ─────────────────────────────────────────────────

/** Fisher-Yates 打乱 */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * 从案例数据生成题目对象
 * @param {object} caseData  单条案例
 * @returns {{ question, options, correctIndex, caseData }}
 */
function buildQuestion(caseData) {
  const correctName = getPatternName(caseData.pattern_id)
  const distractors  = getDistractors(caseData.pattern_id, caseData.module, 2)

  // 打乱三个选项
  const shuffled = shuffle([correctName, ...distractors])
  const correctIndex = shuffled.indexOf(correctName)

  const patternDate = caseData.candles?.[caseData.pattern_index]?.date ?? ''
  const question = patternDate
    ? `请观察 ${patternDate} 附近被标注的K线，它属于哪种形态？`
    : '图中出现了什么K线形态？'

  return {
    question,
    options:      shuffled,
    correctIndex,
    caseData,
  }
}

// ── 子组件：结算页 ──────────────────────────────────────────────────

function ResultScreen({ score, total, moduleId, onRetry, freeMode }) {
  const navigate = useNavigate()
  const passed = score >= Math.ceil(total / 2) // ≥ 3/5 通过
  const moduleMeta = CURRICULUM.find((m) => m.id === moduleId)

  // 找下一个模块
  const moduleIndex  = CURRICULUM.findIndex((m) => m.id === moduleId)
  const nextModule   = CURRICULUM[moduleIndex + 1]

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* 得分环 */}
      <div className="text-center">
        <div
          className="w-28 h-28 rounded-full flex flex-col items-center justify-center mx-auto mb-4 border-4"
          style={{
            borderColor:     passed ? '#00c896' : '#ff4d6a',
            backgroundColor: passed ? 'rgba(0,200,150,0.08)' : 'rgba(255,77,106,0.08)',
          }}
        >
          <span
            className="text-3xl font-bold font-mono"
            style={{ color: passed ? '#00c896' : '#ff4d6a' }}
          >
            {score}/{total}
          </span>
          <span className="text-xs text-slate-500 mt-0.5">正确率</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-1">
          {passed ? '练习通过！' : '继续加油'}
        </h2>
        <p className="text-sm text-slate-400">
          {freeMode
            ? passed
              ? `自由模式 · 成绩已记录`
              : `自由模式 · 成绩已记录，再练一次吧`
            : passed
            ? `${moduleMeta?.title ?? ''}模块已解锁完成`
            : `至少答对 ${Math.ceil(total / 2)} 题即可通过，再试一次吧`}
        </p>
      </div>

      {/* 解锁提示：仅正式模式下通过时展示 */}
      {!freeMode && passed && nextModule && (
        <div
          className="w-full rounded-xl border p-4 flex flex-wrap items-center gap-3"
          style={{ borderColor: 'rgba(0,200,150,0.3)', backgroundColor: 'rgba(0,200,150,0.06)' }}
        >
          <span className="text-3xl">{nextModule.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#00c896] font-mono mb-0.5">下一模块已解锁</p>
            <p className="text-sm font-semibold text-white truncate">{nextModule.title}</p>
            <p className="text-xs text-slate-400">{nextModule.subtitle}</p>
          </div>
          <Link
            to={`/module/${nextModule.id}`}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold text-black flex-shrink-0"
            style={{ backgroundColor: '#00c896' }}
          >
            前往 →
          </Link>
        </div>
      )}

      {/* 自由模式提示横幅 */}
      {freeMode && (
        <div
          className="w-full rounded-xl border p-4 flex items-center gap-3"
          style={{ borderColor: 'rgba(0,200,150,0.2)', backgroundColor: 'rgba(0,200,150,0.04)' }}
        >
          <span className="text-2xl">🔓</span>
          <p className="text-sm text-slate-400">
            自由模式下练习不计入正式进度，但答题记录已保存。
          </p>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-3 w-full">
        <button
          onClick={onRetry}
          className="flex-1 py-2.5 rounded-lg border text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          style={{ borderColor: '#2a2d3a' }}
        >
          再练一次
        </button>
        <Link
          to="/"
          className="flex-1 py-2.5 rounded-lg border text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white text-center"
          style={{ borderColor: '#2a2d3a' }}
        >
          返回课程
        </Link>
      </div>
    </div>
  )
}

// ── 主组件 ──────────────────────────────────────────────────────────

export default function Practice() {
  const { moduleId } = useParams()
  const { loading: casesLoading, error, getRandomCases } = useCases()
  const { recordAnswer, markModulePassed } = useProgress()
  const freeMode = useProgressStore((s) => s.freeMode)

  // 状态机：'loading' | 'playing' | 'result'
  const [phase, setPhase] = useState('loading')

  // 响应式图表高度
  const chartWrapRef = useRef(null)
  const feedbackRef = useRef(null)
  const [chartHeight, setChartHeight] = useState(() => {
    const w = window.innerWidth
    return w < 480 ? 210 : w < 768 ? 260 : 300
  })
  useEffect(() => {
    function update() {
      const w = window.innerWidth
      setChartHeight(w < 480 ? 210 : w < 768 ? 260 : 300)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // 题目列表
  const [questions, setQuestions]         = useState([])
  // 当前题目下标（0-based）
  const [currentIndex, setCurrentIndex]   = useState(0)
  // 用户选择的选项下标，null = 未作答
  const [selectedOption, setSelectedOption] = useState(null)
  // 每题的作答结果 {correct: bool}[]
  const [answers, setAnswers]             = useState([])

  // ── 初始化题目 ────────────────────────────────────────────────────
  const initQuestions = useCallback(() => {
    const raw = getRandomCases(moduleId === 'synthesis' ? null : moduleId, 5)
    if (raw.length === 0) return

    const qs = raw.map(buildQuestion)
    setQuestions(qs)
    setCurrentIndex(0)
    setSelectedOption(null)
    setAnswers([])
    setPhase('playing')
  }, [moduleId, getRandomCases])

  useEffect(() => {
    if (!casesLoading) {
      initQuestions()
    }
    // 只在 casesLoading 从 true 变为 false 时触发一次，initQuestions 已通过
    // useCallback + 稳定的 getRandomCases 保证不会无限重渲染
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [casesLoading])

  // ── 选择选项 ──────────────────────────────────────────────────────
  function handleSelectOption(idx) {
    if (selectedOption !== null) return  // 已作答，忽略
    const q = questions[currentIndex]
    const isCorrect = idx === q.correctIndex

    setSelectedOption(idx)
    setAnswers((prev) => [...prev, { correct: isCorrect }])
    recordAnswer(q.caseData.id, isCorrect)

    // 等待反馈面板展开动画后，自动居中定位
    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 350)
  }

  // ── 下一题 ────────────────────────────────────────────────────────
  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      // 所有题目答完 → 结算
      const correctCount = [...answers, { correct: selectedOption === questions[currentIndex].correctIndex }]
        .filter((a) => a.correct).length
      const passed = correctCount >= Math.ceil(questions.length / 2)
      // 自由模式下不写入 moduleProgress，不影响解锁进度链
      if (!freeMode) {
        markModulePassed(moduleId, passed)
      }
      setPhase('result')
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedOption(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // ── 重试 ──────────────────────────────────────────────────────────
  function handleRetry() {
    initQuestions()
  }

  // ── 渲染：加载中 ──────────────────────────────────────────────────
  if (phase === 'loading' || casesLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div
          className="inline-block w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#00c896', borderTopColor: 'transparent' }}
        />
        <p className="text-slate-500 mt-4 text-sm">正在加载题目…</p>
      </div>
    )
  }

  // ── 渲染：错误 ────────────────────────────────────────────────────
  if (error || questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-400 mb-4">暂无题目数据</p>
        <Link to={`/module/${moduleId}`} className="text-sm text-[#00c896] hover:underline">
          ← 返回模块
        </Link>
      </div>
    )
  }

  const q        = questions[currentIndex]
  const answered = selectedOption !== null
  const isLast   = currentIndex + 1 >= questions.length

  // 计算当前得分（包括本题）
  const currentScore = answered
    ? answers.filter((a) => a.correct).length + (selectedOption === q.correctIndex ? 1 : 0)
    : answers.filter((a) => a.correct).length

  // ── 渲染：结算页 ──────────────────────────────────────────────────
  if (phase === 'result') {
    const finalScore = answers.filter((a) => a.correct).length
    return (
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <nav className="text-sm text-slate-500 mb-6 sm:mb-8 flex items-center gap-1">
          <Link to="/" className="hover:text-white transition-colors whitespace-nowrap">课程</Link>
          <span className="mx-1">/</span>
          <Link to={`/module/${moduleId}`} className="hover:text-white transition-colors whitespace-nowrap">
            {MODULE_MAP[moduleId]?.title ?? '模块'}
          </Link>
          <span className="mx-1">/</span>
          <span className="text-slate-300">练习结果</span>
        </nav>
        <ResultScreen
          score={finalScore}
          total={questions.length}
          moduleId={moduleId}
          onRetry={handleRetry}
          freeMode={freeMode}
        />
      </div>
    )
  }

  // ── 渲染：答题页 ──────────────────────────────────────────────────
  const LABELS = ['A', 'B', 'C']

  function getOptionState(idx) {
    if (selectedOption === null) return 'idle'
    if (idx === q.correctIndex) return 'correct'
    if (idx === selectedOption)  return 'wrong'
    return 'disabled'
  }

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* 面包屑 */}
      <nav className="text-sm text-slate-500 mb-4 sm:mb-6 flex items-center gap-1 overflow-hidden">
        <Link to="/" className="hover:text-white transition-colors whitespace-nowrap">课程</Link>
        <span className="mx-1">/</span>
        <Link to={`/module/${moduleId}`} className="hover:text-white transition-colors whitespace-nowrap">
          {MODULE_MAP[moduleId]?.title ?? '模块'}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-slate-300 truncate">练习</span>
      </nav>

      {/* 进度条 */}
      <div className="mb-4">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>

      {/* K线图 */}
      <div
        ref={chartWrapRef}
        className="mb-4 rounded-xl overflow-hidden border"
        style={{ borderColor: '#2a2d3a' }}
      >
        <CandleChart
          candles={q.caseData.candles}
          patternIndex={q.caseData.pattern_index}
          height={chartHeight}
        />
      </div>

      {/* 题目卡片 */}
      <div className="mb-3">
        <QuestionCard question={q.question} caseData={q.caseData} />
      </div>

      {/* 选项按钮 */}
      <div className="flex flex-col gap-2 mb-2">
        {q.options.map((text, idx) => (
          <OptionButton
            key={idx}
            label={LABELS[idx]}
            text={text}
            onClick={() => handleSelectOption(idx)}
            state={getOptionState(idx)}
          />
        ))}
      </div>

      {/* 反馈面板（预留高度，避免移动端滚动锚点跳变） */}
      <div ref={feedbackRef} style={{ minHeight: 560 }}>
        <FeedbackPanel
          visible={answered}
          isCorrect={answered && selectedOption === q.correctIndex}
          patternId={q.caseData.pattern_id}
          onNext={handleNext}
          isLast={isLast}
        />
      </div>
    </div>
  )
}
