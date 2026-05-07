import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useProgress } from '../hooks/useProgress.js'
import { CURRICULUM } from '../data/curriculum.js'
import CandleChart from '../components/CandleChart.jsx'

// ── 静态示例K线数据集（按 candle-demo 键索引）────────────────────────────

// lesson_1_1: 一根阳线 + 一根阴线
const DEMO_CANDLES = [
  { date: '2024-01-01', open: 100, high: 115, low: 93,  close: 112, ma5: null, ma20: null },
  { date: '2024-01-02', open: 112, high: 118, low: 98,  close: 102, ma5: null, ma20: null },
]

// lesson_1_2
const DEMO_OHlC_STRUCTURE = [
  { date: '2024-01-01', open: 100, high: 120, low: 85, close: 110, ma5: null, ma20: null },
]
const DEMO_OHLC_BULLISH = [
  { date: '2024-01-01', open: 95, high: 118, low: 90, close: 115, ma5: null, ma20: null },
]
const DEMO_OHLC_BEARISH = [
  { date: '2024-01-01', open: 115, high: 120, low: 88, close: 92, ma5: null, ma20: null },
]

// lesson_1_3
const DEMO_UPPER_SHADOW = [
  { date: '2024-01-01', open: 100, high: 128, low: 97, close: 103, ma5: null, ma20: null },
]
const DEMO_LOWER_SHADOW = [
  { date: '2024-01-01', open: 100, high: 105, low: 72, close: 98, ma5: null, ma20: null },
]
const DEMO_HAMMER = [
  { date: '2024-01-01', open: 100, high: 104, low: 72, close: 102, ma5: null, ma20: null },
]
const DEMO_SHOOTING_STAR = [
  { date: '2024-01-01', open: 100, high: 128, low: 97, close: 98, ma5: null, ma20: null },
]
const DEMO_DOJI = [
  { date: '2024-01-01', open: 100, high: 115, low: 85, close: 100, ma5: null, ma20: null },
]

// lesson_2_1
const DEMO_MORNING_STAR = [
  { date: '2024-01-01', open: 110, high: 112, low: 95,  close: 96,  ma5: null, ma20: null },
  { date: '2024-01-02', open: 94,  high: 97,  low: 90,  close: 93,  ma5: null, ma20: null },
  { date: '2024-01-03', open: 94,  high: 115, low: 93,  close: 113, ma5: null, ma20: null },
]
const DEMO_EVENING_STAR = [
  { date: '2024-01-01', open: 92,  high: 115, low: 91,  close: 113, ma5: null, ma20: null },
  { date: '2024-01-02', open: 114, high: 118, low: 112, close: 115, ma5: null, ma20: null },
  { date: '2024-01-03', open: 113, high: 114, low: 93,  close: 94,  ma5: null, ma20: null },
]

// lesson_2_2
const DEMO_BULLISH_ENGULFING = [
  { date: '2024-01-01', open: 108, high: 110, low: 100, close: 102, ma5: null, ma20: null },
  { date: '2024-01-02', open: 99,  high: 115, low: 97,  close: 113, ma5: null, ma20: null },
]
const DEMO_BEARISH_ENGULFING = [
  { date: '2024-01-01', open: 100, high: 112, low: 98,  close: 110, ma5: null, ma20: null },
  { date: '2024-01-02', open: 113, high: 115, low: 97,  close: 99,  ma5: null, ma20: null },
]

// lesson_2_3
const DEMO_THREE_WHITE_SOLDIERS = [
  { date: '2024-01-01', open: 100, high: 108, low: 99,  close: 106, ma5: null, ma20: null },
  { date: '2024-01-02', open: 104, high: 114, low: 103, close: 112, ma5: null, ma20: null },
  { date: '2024-01-03', open: 110, high: 122, low: 109, close: 120, ma5: null, ma20: null },
]
const DEMO_THREE_BLACK_CROWS = [
  { date: '2024-01-01', open: 120, high: 121, low: 111, close: 113, ma5: null, ma20: null },
  { date: '2024-01-02', open: 115, high: 116, low: 105, close: 107, ma5: null, ma20: null },
  { date: '2024-01-03', open: 109, high: 110, low: 99,  close: 101, ma5: null, ma20: null },
]

// lesson_3_1 — support/resistance shown via price + MA lines acting as levels
const DEMO_SUPPORT_LEVEL = [
  { date: '2024-01-01', open: 115, high: 120, low: 100, close: 118, ma5: 100, ma20: 100 },
  { date: '2024-01-02', open: 112, high: 116, low: 100, close: 114, ma5: 100, ma20: 100 },
  { date: '2024-01-03', open: 108, high: 113, low: 100, close: 111, ma5: 100, ma20: 100 },
  { date: '2024-01-04', open: 104, high: 110, low: 100, close: 108, ma5: 100, ma20: 100 },
  { date: '2024-01-05', open: 102, high: 108, low: 100, close: 106, ma5: 100, ma20: 100 },
]
const DEMO_RESISTANCE_LEVEL = [
  { date: '2024-01-01', open: 90,  high: 100, low: 86,  close: 92,  ma5: 100, ma20: 100 },
  { date: '2024-01-02', open: 93,  high: 100, low: 89,  close: 96,  ma5: 100, ma20: 100 },
  { date: '2024-01-03', open: 97,  high: 100, low: 93,  close: 94,  ma5: 100, ma20: 100 },
  { date: '2024-01-04', open: 93,  high: 100, low: 89,  close: 91,  ma5: 100, ma20: 100 },
  { date: '2024-01-05', open: 90,  high: 100, low: 85,  close: 88,  ma5: 100, ma20: 100 },
]
const DEMO_SUPPORT_RESISTANCE_FORMATION = [
  { date: '2024-01-01', open: 90,  high: 105, low: 88,  close: 103, ma5: 88, ma20: 88 },
  { date: '2024-01-02', open: 104, high: 115, low: 102, close: 113, ma5: 88, ma20: 88 },
  { date: '2024-01-03', open: 112, high: 118, low: 100, close: 102, ma5: 88, ma20: 88 },
  { date: '2024-01-04', open: 101, high: 116, low: 99,  close: 114, ma5: 88, ma20: 88 },
  { date: '2024-01-05', open: 113, high: 119, low: 101, close: 103, ma5: 88, ma20: 88 },
  { date: '2024-01-06', open: 102, high: 118, low: 100, close: 116, ma5: 88, ma20: 88 },
]

// lesson_3_2
const DEMO_RESISTANCE_TO_SUPPORT = [
  { date: '2024-01-01', open: 88,  high: 100, low: 85,  close: 92,  ma5: 100, ma20: 100 },
  { date: '2024-01-02', open: 93,  high: 100, low: 90,  close: 97,  ma5: 100, ma20: 100 },
  { date: '2024-01-03', open: 98,  high: 108, low: 97,  close: 106, ma5: 100, ma20: 100 },
  { date: '2024-01-04', open: 105, high: 107, low: 100, close: 101, ma5: 100, ma20: 100 },
  { date: '2024-01-05', open: 101, high: 112, low: 99,  close: 110, ma5: 100, ma20: 100 },
]
const DEMO_SUPPORT_TO_RESISTANCE = [
  { date: '2024-01-01', open: 110, high: 114, low: 100, close: 112, ma5: 100, ma20: 100 },
  { date: '2024-01-02', open: 111, high: 113, low: 100, close: 108, ma5: 100, ma20: 100 },
  { date: '2024-01-03', open: 107, high: 109, low: 92,  close: 94,  ma5: 100, ma20: 100 },
  { date: '2024-01-04', open: 95,  high: 100, low: 91,  close: 97,  ma5: 100, ma20: 100 },
  { date: '2024-01-05', open: 97,  high: 100, low: 86,  close: 88,  ma5: 100, ma20: 100 },
]

// lesson_3_3 — MA lines convey the cross / support / resistance
const DEMO_GOLDEN_CROSS = [
  { date: '2024-01-01', open: 95,  high: 97,  low: 92,  close: 94,  ma5: 93,  ma20: 98  },
  { date: '2024-01-02', open: 94,  high: 97,  low: 93,  close: 96,  ma5: 95,  ma20: 97  },
  { date: '2024-01-03', open: 97,  high: 101, low: 96,  close: 100, ma5: 97,  ma20: 97  },
  { date: '2024-01-04', open: 100, high: 105, low: 99,  close: 104, ma5: 100, ma20: 97  },
  { date: '2024-01-05', open: 104, high: 109, low: 103, close: 108, ma5: 104, ma20: 98  },
]
const DEMO_DEATH_CROSS = [
  { date: '2024-01-01', open: 105, high: 108, low: 103, close: 106, ma5: 107, ma20: 102 },
  { date: '2024-01-02', open: 105, high: 107, low: 102, close: 103, ma5: 105, ma20: 103 },
  { date: '2024-01-03', open: 102, high: 103, low: 98,  close: 99,  ma5: 103, ma20: 103 },
  { date: '2024-01-04', open: 98,  high: 100, low: 94,  close: 95,  ma5: 100, ma20: 103 },
  { date: '2024-01-05', open: 94,  high: 96,  low: 90,  close: 91,  ma5: 97,  ma20: 103 },
]
const DEMO_MA20_SUPPORT = [
  { date: '2024-01-01', open: 112, high: 118, low: 108, close: 116, ma5: 114, ma20: 108 },
  { date: '2024-01-02', open: 115, high: 117, low: 108, close: 110, ma5: 113, ma20: 109 },
  { date: '2024-01-03', open: 109, high: 114, low: 108, close: 113, ma5: 112, ma20: 110 },
  { date: '2024-01-04', open: 113, high: 120, low: 111, close: 119, ma5: 113, ma20: 111 },
  { date: '2024-01-05', open: 119, high: 125, low: 117, close: 124, ma5: 116, ma20: 112 },
]
const DEMO_MA20_RESISTANCE = [
  { date: '2024-01-01', open: 90,  high: 95,  low: 86,  close: 88,  ma5: 92,  ma20: 98  },
  { date: '2024-01-02', open: 88,  high: 93,  low: 85,  close: 91,  ma5: 91,  ma20: 97  },
  { date: '2024-01-03', open: 91,  high: 97,  low: 89,  close: 93,  ma5: 90,  ma20: 97  },
  { date: '2024-01-04', open: 92,  high: 97,  low: 88,  close: 89,  ma5: 90,  ma20: 97  },
  { date: '2024-01-05', open: 88,  high: 93,  low: 83,  close: 85,  ma5: 89,  ma20: 96  },
]

// 每个 candle-demo key 对应的 { candles, caption }
const CANDLE_DEMO_MAP = {
  // original (no suffix)
  '': { candles: DEMO_CANDLES, caption: '上影线 = 最高价 − max(开盘, 收盘) | 下影线 = min(开盘, 收盘) − 最低价' },
  // lesson_1_2
  'ohlc-structure':  { candles: DEMO_OHlC_STRUCTURE,  caption: '一根K线包含四个价格：开（O）高（H）低（L）收（C）' },
  'ohlc-bullish':    { candles: DEMO_OHLC_BULLISH,    caption: '阳线：收盘价 > 开盘价，实体为绿色' },
  'ohlc-bearish':    { candles: DEMO_OHLC_BEARISH,    caption: '阴线：收盘价 < 开盘价，实体为红色' },
  // lesson_1_3
  'upper-shadow':    { candles: DEMO_UPPER_SHADOW,    caption: '上影线：最高价高出收盘/开盘价的部分，代表上方卖压' },
  'lower-shadow':    { candles: DEMO_LOWER_SHADOW,    caption: '下影线：开盘/收盘低于最低价的反弹，代表下方买盘' },
  'hammer':          { candles: DEMO_HAMMER,          caption: '锤子线：长下影线，短实体，出现在下跌末端' },
  'shooting-star':   { candles: DEMO_SHOOTING_STAR,   caption: '流星线：长上影线，短实体，出现在上涨末端' },
  'doji':            { candles: DEMO_DOJI,            caption: '十字星：开盘价 ≈ 收盘价，多空力量均衡' },
  // lesson_2_1
  'morning-star':    { candles: DEMO_MORNING_STAR,    caption: '启明星：阴线 + 小星线 + 阳线，下跌末端反转信号' },
  'evening-star':    { candles: DEMO_EVENING_STAR,    caption: '黄昏之星：阳线 + 小星线 + 阴线，上涨末端反转信号' },
  // lesson_2_2
  'bullish-engulfing': { candles: DEMO_BULLISH_ENGULFING, caption: '阳线吞没：阳线实体完全包住前一根阴线，看涨反转' },
  'bearish-engulfing': { candles: DEMO_BEARISH_ENGULFING, caption: '阴线吞没：阴线实体完全包住前一根阳线，看跌反转' },
  // lesson_2_3
  'three-white-soldiers': { candles: DEMO_THREE_WHITE_SOLDIERS, caption: '三只白兵：连续三根有秩序的阳线，上涨趋势强势信号' },
  'three-black-crows':    { candles: DEMO_THREE_BLACK_CROWS,    caption: '三只乌鸦：连续三根有秩序的阴线，下跌趋势强势信号' },
  // lesson_3_1
  'support-level':                { candles: DEMO_SUPPORT_LEVEL,                caption: '支撑位：价格多次下跌后被托住、反弹的价格区域（MA线示意支撑）' },
  'resistance-level':             { candles: DEMO_RESISTANCE_LEVEL,             caption: '阻力位：价格多次上涨后被压回、回落的价格区域（MA线示意阻力）' },
  'support-resistance-formation': { candles: DEMO_SUPPORT_RESISTANCE_FORMATION, caption: '支撑/阻力的形成：多次触碰同一价位后，该位置成为关键区域' },
  // lesson_3_2
  'resistance-to-support': { candles: DEMO_RESISTANCE_TO_SUPPORT, caption: '阻力变支撑：价格突破阻力位后，原阻力位成为支撑（MA线示意）' },
  'support-to-resistance': { candles: DEMO_SUPPORT_TO_RESISTANCE, caption: '支撑变阻力：价格跌破支撑位后，原支撑位成为阻力（MA线示意）' },
  // lesson_3_3
  'golden-cross':    { candles: DEMO_GOLDEN_CROSS,    caption: '金叉：MA5（绿）从下方穿越MA20（橙），看涨信号' },
  'death-cross':     { candles: DEMO_DEATH_CROSS,     caption: '死叉：MA5（绿）从上方穿越MA20（橙），看跌信号' },
  'ma20-support':    { candles: DEMO_MA20_SUPPORT,    caption: 'MA20 动态支撑：上升趋势中价格触碰MA20后反弹' },
  'ma20-resistance': { candles: DEMO_MA20_RESISTANCE, caption: 'MA20 动态阻力：下降趋势中价格反弹至MA20后再跌' },
}

// 课时路由 lessonId → 文件名 / 数据 mapping
const LESSON_DATA = {
  single_candle: [
    { lessonId: '1_1', id: 'lesson_1_1', title: '什么是K线（阴阳线、实体、影线）' },
    { lessonId: '1_2', id: 'lesson_1_2', title: '单根K线的四个价格（开高低收）' },
    { lessonId: '1_3', id: 'lesson_1_3', title: '影线的含义（多空博弈）' },
  ],
  pattern: [
    { lessonId: '2_1', id: 'lesson_2_1', title: '启明星与黄昏之星' },
    { lessonId: '2_2', id: 'lesson_2_2', title: '吞没形态（阳线吞没 / 阴线吞没）' },
    { lessonId: '2_3', id: 'lesson_2_3', title: '三只白兵与三只乌鸦' },
  ],
  trend: [
    { lessonId: '3_1', id: 'lesson_3_1', title: '支撑位与阻力位的形成' },
    { lessonId: '3_2', id: 'lesson_3_2', title: '角色转换原则（阻力变支撑）' },
    { lessonId: '3_3', id: 'lesson_3_3', title: '均线：MA5 / MA20 金叉死叉' },
  ],
}

// 动态 import 所有 Markdown 文件
const LESSON_FILES = {
  lesson_1_1: () => import('../data/lessons/lesson_1_1.md?raw'),
  lesson_1_2: () => import('../data/lessons/lesson_1_2.md?raw'),
  lesson_1_3: () => import('../data/lessons/lesson_1_3.md?raw'),
  lesson_2_1: () => import('../data/lessons/lesson_2_1.md?raw'),
  lesson_2_2: () => import('../data/lessons/lesson_2_2.md?raw'),
  lesson_2_3: () => import('../data/lessons/lesson_2_3.md?raw'),
  lesson_3_1: () => import('../data/lessons/lesson_3_1.md?raw'),
  lesson_3_2: () => import('../data/lessons/lesson_3_2.md?raw'),
  lesson_3_3: () => import('../data/lessons/lesson_3_3.md?raw'),
}

// Markdown 自定义渲染组件（深色金融终端风格）
const mdComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-[#2a2d3a]">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-semibold text-white mt-8 mb-3" style={{ color: '#00c896' }}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-slate-200 mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-slate-200 italic">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 mb-4 text-slate-300 pl-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-300 pl-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="border-l-2 pl-4 my-4 text-slate-400 italic"
      style={{ borderColor: '#00c896' }}
    >
      {children}
    </blockquote>
  ),
  code: ({ inline, className, children }) => {
    const language = (className || '').replace('language-', '')
    if (!inline && language.startsWith('candle-demo')) {
      const key = language.replace('candle-demo', '').replace(/^:/, '')
      const demo = CANDLE_DEMO_MAP[key] || CANDLE_DEMO_MAP['']
      return (
        <div className="my-6">
          <div
            className="rounded-xl overflow-hidden border mb-3"
            style={{ borderColor: '#2a2d3a' }}
          >
            <CandleChart candles={demo.candles} patternIndex={-1} height={160} />
          </div>
          <p className="text-xs text-slate-500 text-center mt-2">{demo.caption}</p>
        </div>
      )
    }
    return inline ? (
      <code
        className="px-1.5 py-0.5 rounded text-sm font-mono"
        style={{ backgroundColor: '#1e2130', color: '#00c896' }}
      >
        {children}
      </code>
    ) : (
      <pre
        className="p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono text-slate-300 leading-relaxed"
        style={{ backgroundColor: '#0a0d14', border: '1px solid #2a2d3a' }}
      >
        <code>{children}</code>
      </pre>
    )
  },
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-[#2a2d3a]">{children}</tr>
  ),
  th: ({ children }) => (
    <th
      className="px-3 py-2 text-left text-xs font-mono uppercase tracking-wider text-slate-400"
      style={{ backgroundColor: '#1a1d27' }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 text-slate-300">{children}</td>
  ),
  hr: () => <hr className="border-[#2a2d3a] my-6" />,
}

export default function Lesson() {
  const { moduleId, lessonId } = useParams()
  const navigate = useNavigate()
  const { isLessonCompleted, completeLesson } = useProgress()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const lessons = LESSON_DATA[moduleId] || []
  const currentLesson = lessons.find((l) => l.lessonId === lessonId)
  const currentIndex = lessons.findIndex((l) => l.lessonId === lessonId)
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const moduleMeta = CURRICULUM.find((m) => m.id === moduleId)

  // 加载 Markdown 内容
  useEffect(() => {
    if (!currentLesson) return
    setLoading(true)
    const loader = LESSON_FILES[currentLesson.id]
    if (!loader) { setLoading(false); return }
    loader()
      .then((mod) => {
        setContent(mod.default)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [currentLesson?.id])

  // 自动标记课时已完成（进入课时页即算已读）
  useEffect(() => {
    if (currentLesson && !isLessonCompleted(currentLesson.id)) {
      // 延迟 2 秒再标记，避免误触
      const timer = setTimeout(() => {
        completeLesson(currentLesson.id)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentLesson?.id])

  if (!currentLesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-slate-400">
        课时不存在
      </div>
    )
  }

  const isDone = isLessonCompleted(currentLesson.id)

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      {/* 面包屑 */}
      <nav className="text-sm text-slate-500 mb-6 sm:mb-8 flex items-center gap-1 overflow-hidden">
        <Link to="/" className="hover:text-white transition-colors whitespace-nowrap">课程</Link>
        <span className="mx-1">/</span>
        <Link to={`/module/${moduleId}`} className="hover:text-white transition-colors whitespace-nowrap">
          {moduleMeta?.title || '模块'}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-slate-300 truncate">{currentLesson.title}</span>
      </nav>

      {/* 移动端水平课时导航条（< lg 时显示） */}
      <div className="lg:hidden mb-5 overflow-x-auto pb-1 -mx-3 px-3">
        <div className="flex gap-2 min-w-max">
          {lessons.map((lesson, i) => {
            const isActive = lesson.lessonId === lessonId
            const done = isLessonCompleted(lesson.id)
            return (
              <Link
                key={lesson.id}
                to={`/module/${moduleId}/lesson/${lesson.lessonId}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'text-[#0f1117] border-transparent'
                    : done
                    ? 'text-slate-300 border-[#2a2d3a] hover:border-[#00c896]'
                    : 'text-slate-500 border-[#2a2d3a] hover:border-slate-500'
                }`}
                style={isActive ? { backgroundColor: '#00c896' } : {}}
              >
                <span className="font-mono">{done && !isActive ? '✓' : i + 1}</span>
                <span className="max-w-[120px] truncate">{lesson.title}</span>
              </Link>
            )
          })}
          <Link
            to={`/module/${moduleId}/practice`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap text-slate-500 border border-[#2a2d3a] hover:border-slate-500 transition-all"
          >
            ⚡ 练习
          </Link>
        </div>
      </div>

      <div className="flex gap-8">
        {/* 左侧：章节导航（仅 lg+ 显示） */}
        <aside className="hidden lg:flex flex-col gap-1 w-56 flex-shrink-0">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
            课时目录
          </p>
          {lessons.map((lesson, i) => {
            const isActive = lesson.lessonId === lessonId
            const done = isLessonCompleted(lesson.id)
            return (
              <Link
                key={lesson.id}
                to={`/module/${moduleId}/lesson/${lesson.lessonId}`}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'text-white'
                    : done
                    ? 'text-slate-400 hover:text-white hover:bg-[#1a1d27]'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-[#1a1d27]'
                }`}
                style={isActive ? { backgroundColor: 'rgba(0,200,150,0.1)', color: '#00c896' } : {}}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0"
                  style={{
                    backgroundColor: isActive
                      ? '#00c896'
                      : done
                      ? 'rgba(0,200,150,0.2)'
                      : '#2a2d3a',
                    color: isActive ? '#0f1117' : done ? '#00c896' : '#6b7280',
                  }}
                >
                  {done && !isActive ? '✓' : i + 1}
                </span>
                <span className="leading-tight">{lesson.title}</span>
              </Link>
            )
          })}

          {/* 练习入口 */}
          <div className="mt-4 pt-4 border-t border-[#2a2d3a]">
            <Link
              to={`/module/${moduleId}/practice`}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-white hover:bg-[#1a1d27] transition-all"
            >
              <span className="text-base">⚡</span>
              <span>开始练习</span>
            </Link>
          </div>
        </aside>

        {/* 右侧：课时内容 */}
        <main className="flex-1 min-w-0">
          {/* 课时标题栏 */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <span
                className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ backgroundColor: '#1a1d27', color: '#00c896', border: '1px solid rgba(0,200,150,0.3)' }}
              >
                {currentIndex + 1} / {lessons.length}
              </span>
              {isDone && (
                <span
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(0,200,150,0.15)', color: '#00c896' }}
                >
                  ✓ 已读
                </span>
              )}
            </div>
          </div>

          {/* Markdown 内容区 */}
          <div
            className="rounded-xl border border-[#2a2d3a] p-4 sm:p-8 mb-6 sm:mb-8"
            style={{ backgroundColor: '#1a1d27' }}
          >
            {loading ? (
              <div className="text-center py-16 text-slate-500">
                <div className="text-3xl mb-3 animate-pulse">📖</div>
                <p>加载中...</p>
              </div>
            ) : content ? (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500">
                <p>内容暂时无法加载</p>
              </div>
            )}
          </div>

          {/* 底部导航 */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              {prevLesson ? (
                <Link
                  to={`/module/${moduleId}/lesson/${prevLesson.lessonId}`}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-[#2a2d3a] text-slate-400 hover:text-white hover:border-slate-500 transition-colors text-sm"
                >
                  <span>←</span>
                  <span className="hidden sm:inline truncate max-w-[160px]">{prevLesson.title}</span>
                  <span className="sm:hidden">上一节</span>
                </Link>
              ) : (
                <Link
                  to={`/module/${moduleId}`}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-[#2a2d3a] text-slate-400 hover:text-white hover:border-slate-500 transition-colors text-sm"
                >
                  ← 返回模块
                </Link>
              )}
            </div>

            <div className="min-w-0">
              {nextLesson ? (
                <Link
                  to={`/module/${moduleId}/lesson/${nextLesson.lessonId}`}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg font-semibold text-sm text-black transition-colors"
                  style={{ backgroundColor: '#00c896' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00a87e')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00c896')}
                >
                  <span className="hidden sm:inline truncate max-w-[160px]">{nextLesson.title}</span>
                  <span className="sm:hidden">下一节</span>
                  <span>→</span>
                </Link>
              ) : (
                <Link
                  to={`/module/${moduleId}/practice`}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg font-semibold text-sm text-black transition-colors"
                  style={{ backgroundColor: '#00c896' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00a87e')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00c896')}
                >
                  进入练习 ⚡
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
