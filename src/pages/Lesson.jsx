import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProgress } from '../hooks/useProgress.js'
import { CURRICULUM } from '../data/curriculum.js'
import LessonMarkdown from '../components/LessonMarkdown.jsx'

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
  synthesis: [
    { lessonId: '4_1', id: 'lesson_4_1', title: '为什么单一信号不可靠（假信号与共振）' },
    { lessonId: '4_2', id: 'lesson_4_2', title: '三重确认法：形态 + 均线 + 成交量' },
    { lessonId: '4_3', id: 'lesson_4_3', title: '实战分析框架：从宏到微四步法' },
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
  lesson_4_1: () => import('../data/lessons/lesson_4_1.md?raw'),
  lesson_4_2: () => import('../data/lessons/lesson_4_2.md?raw'),
  lesson_4_3: () => import('../data/lessons/lesson_4_3.md?raw'),
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
    const loader = LESSON_FILES[currentLesson.id]
    if (!loader) {
      setLoading(false)
      return
    }
    loader()
      .then((mod) => {
        setContent(mod.default)
        setLoading(false)
      })
      .catch(() => setLoading(false))
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
