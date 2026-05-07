import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useProgress } from '../hooks/useProgress.js'
import { CURRICULUM } from '../data/curriculum.js'

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
  code: ({ inline, children }) =>
    inline ? (
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
    ),
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
