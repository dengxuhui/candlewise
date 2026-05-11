import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProgress } from '../hooks/useProgress.js'
import { CURRICULUM } from '../data/curriculum.js'
import LessonMarkdown from '../components/LessonMarkdown.jsx'

// 课时路由 lessonId → 文件名 / 数据 mapping（与 curriculum.js 模块 ID 一一对应）
const LESSON_DATA = {
  basics: [
    { lessonId: '1_1', id: 'lesson_1_1', title: 'K线的起源与构成' },
    { lessonId: '1_2', id: 'lesson_1_2', title: '读懂一根K线（实体与影线）' },
    { lessonId: '1_3', id: 'lesson_1_3', title: '影线的语言（多空博弈）' },
  ],
  single_reversal: [
    { lessonId: '2_1', id: 'lesson_2_1', title: '锤子线与吊颈线（位置决定信号）' },
    { lessonId: '2_2', id: 'lesson_2_2', title: '流星线与倒锤子线' },
    { lessonId: '2_3', id: 'lesson_2_3', title: '十字星家族' },
  ],
  double_reversal: [
    { lessonId: '3_1', id: 'lesson_3_1', title: '吞没形态' },
    { lessonId: '3_2', id: 'lesson_3_2', title: '乌云盖顶与刺透形态' },
    { lessonId: '3_3', id: 'lesson_3_3', title: '孕线与十字孕线' },
  ],
  triple_pattern: [
    { lessonId: '4_1', id: 'lesson_4_1', title: '启明星与黄昏之星' },
    { lessonId: '4_2', id: 'lesson_4_2', title: '三白兵与三乌鸦' },
    { lessonId: '4_3', id: 'lesson_4_3', title: '上升三法与下降三法' },
  ],
  trend: [
    { lessonId: '5_1', id: 'lesson_5_1', title: '趋势、支撑与阻力' },
    { lessonId: '5_2', id: 'lesson_5_2', title: '角色转换与成交量确认' },
    { lessonId: '5_3', id: 'lesson_5_3', title: '均线系统 MA5 / MA20' },
  ],
  volume: [
    { lessonId: '7_1', id: 'lesson_7_1', title: '成交量的基础语言' },
    { lessonId: '7_2', id: 'lesson_7_2', title: '量价配合与背离' },
    { lessonId: '7_3', id: 'lesson_7_3', title: '突破的量能验证' },
  ],
  oscillator: [
    { lessonId: '8_1', id: 'lesson_8_1', title: 'RSI 原理与超买超卖' },
    { lessonId: '8_2', id: 'lesson_8_2', title: 'KDJ 与随机振荡' },
    { lessonId: '8_3', id: 'lesson_8_3', title: '振荡背离信号' },
  ],
  momentum: [
    { lessonId: '9_1', id: 'lesson_9_1', title: 'MACD 构成与金叉死叉' },
    { lessonId: '9_2', id: 'lesson_9_2', title: 'MACD 柱状图与动能变化' },
    { lessonId: '9_3', id: 'lesson_9_3', title: 'MACD 背离实战' },
  ],
  synthesis: [
    { lessonId: '6_1', id: 'lesson_6_1', title: '假信号与共振' },
    { lessonId: '6_2', id: 'lesson_6_2', title: '三重确认法' },
    { lessonId: '6_3', id: 'lesson_6_3', title: '实战分析框架' },
  ],
}

// 通过 fetch 加载静态 Markdown 文件（public/lessons/），规避 Vite chunk 分包在 GitHub Pages 的 MIME type 问题
function fetchLesson(id) {
  return fetch(`${import.meta.env.BASE_URL}lessons/${id}.md`).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.text()
  })
}

export default function Lesson() {
  const { moduleId, lessonId } = useParams()
  const { isLessonCompleted, completeLesson } = useProgress()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const lessons = LESSON_DATA[moduleId] || []
  const currentLesson = lessons.find((l) => l.lessonId === lessonId)
  const currentIndex = lessons.findIndex((l) => l.lessonId === lessonId)
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const moduleMeta = CURRICULUM.find((m) => m.id === moduleId)

  useEffect(() => {
    if (!currentLesson) return
    setLoading(true)
    setContent(null)
    fetchLesson(currentLesson.id)
      .then((text) => {
        setContent(text)
        setLoading(false)
      })
      .catch((err) => {
        console.error('[Lesson] 加载 Markdown 失败:', currentLesson.id, err)
        setLoading(false)
      })
  }, [currentLesson?.id])

  useEffect(() => {
    if (currentLesson && !isLessonCompleted(currentLesson.id)) {
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
      <nav className="text-sm text-slate-500 mb-6 sm:mb-8 flex items-center gap-1 overflow-hidden">
        <Link to="/" className="hover:text-white transition-colors whitespace-nowrap">课程</Link>
        <span className="mx-1">/</span>
        <Link to={`/module/${moduleId}`} className="hover:text-white transition-colors whitespace-nowrap">
          {moduleMeta?.title || '模块'}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-slate-300 truncate">{currentLesson.title}</span>
      </nav>

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
        <aside className="hidden lg:flex flex-col gap-1 w-56 flex-shrink-0">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">课时目录</p>
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

        <main className="flex-1 min-w-0">
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
              <LessonMarkdown content={content} />
            ) : (
              <div className="text-center py-16 text-slate-500">
                <p>内容暂时无法加载</p>
              </div>
            )}
          </div>

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
