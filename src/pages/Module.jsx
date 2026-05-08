import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress.js'
import { MODULE_MAP, CURRICULUM } from '../data/curriculum.js'

// 从 curriculum.js 动态生成 lesson → 路由参数映射
// lesson id 格式：lesson_<模块序号>_<课时序号>，如 lesson_1_1
const LESSON_MODULE_MAP = Object.fromEntries(
  CURRICULUM.flatMap((mod) =>
    mod.lessons.map((lesson) => {
      // lesson_1_1 → lessonId = "1_1"
      const lessonId = lesson.id.replace('lesson_', '')
      return [lesson.id, { moduleId: mod.id, lessonId }]
    })
  )
)

export default function Module() {
  const { moduleId } = useParams()
  const meta = MODULE_MAP[moduleId]
  const { isLessonCompleted, moduleProgress, isUnlocked } = useProgress()

  if (!meta) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-slate-400">
        模块不存在
      </div>
    )
  }

  const prog = moduleProgress[moduleId]
  const isPassed = prog?.passed ?? false
  const completedCount = meta.lessons.filter((l) => isLessonCompleted(l.id)).length
  const unlocked = isUnlocked(moduleId)

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      {/* 面包屑 */}
      <nav className="text-sm text-slate-500 mb-6 sm:mb-8 flex items-center gap-1">
        <Link to="/" className="hover:text-white transition-colors whitespace-nowrap">课程</Link>
        <span className="mx-1">/</span>
        <span className="text-slate-300 truncate">{meta.title}</span>
      </nav>

      {/* 模块标题 */}
      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-3xl sm:text-4xl">{meta.icon}</span>
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">{meta.subtitle}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{meta.title}</h1>
          </div>
        </div>
        {isPassed && (
          <span
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: 'rgba(0,200,150,0.15)', color: '#00c896' }}
          >
            <span>✓</span> 已通过
          </span>
        )}
      </div>
      <p className="text-slate-400 mb-10">{meta.description}</p>

      {/* 课时列表 */}
      {meta.lessons.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest">课时</h2>
            {completedCount > 0 && (
              <span className="text-xs text-slate-500 font-mono">
                {completedCount}/{meta.lessons.length} 已完成
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {meta.lessons.map((lesson, i) => {
              const done = isLessonCompleted(lesson.id)
              const route = LESSON_MODULE_MAP[lesson.id]
              return (
                <Link
                  key={lesson.id}
                  to={route ? `/module/${route.moduleId}/lesson/${route.lessonId}` : '#'}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    done
                      ? 'border-[#00c896]/30 bg-[#00c896]/5'
                      : 'border-[#2a2d3a] hover:border-[#00c896] hover:bg-[#1a1d27]'
                  }`}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold flex-shrink-0 transition-colors"
                    style={{
                      backgroundColor: done ? '#00c896' : '#1e2130',
                      color: done ? '#0f1117' : '#00c896',
                      border: done ? 'none' : '1px solid #00c896',
                    }}
                  >
                    {done ? '✓' : i + 1}
                  </span>
                  <span className={`flex-1 ${done ? 'text-slate-300' : 'text-slate-200'}`}>
                    {lesson.title}
                  </span>
                  {done && (
                    <span className="text-xs text-slate-500">已完成</span>
                  )}
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* 练习入口 */}
      <section>
        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">练习</h2>
        {unlocked ? (
          <Link
            to={`/module/${moduleId}/practice`}
            className="flex items-center gap-4 p-5 rounded-lg border transition-all"
            style={{ borderColor: isPassed ? '#00c896' : '#00c896', backgroundColor: 'rgba(0,200,150,0.05)' }}
          >
            <span className="text-3xl">{isPassed ? '🏆' : '⚡'}</span>
            <div>
              <p className="font-semibold text-white">
                {isPassed ? '重新挑战' : '开始闯关练习'}
              </p>
              <p className="text-sm text-slate-400 mt-0.5">基于真实历史K线的交互式答题</p>
            </div>
            <span className="ml-auto text-slate-400">→</span>
          </Link>
        ) : (
          <div
            className="flex items-center gap-4 p-5 rounded-lg border border-[#2a2d3a] opacity-50 cursor-not-allowed"
            style={{ backgroundColor: '#1a1d27' }}
          >
            <span className="text-3xl">🔒</span>
            <div>
              <p className="font-semibold text-slate-400">练习未解锁</p>
              <p className="text-sm text-slate-500 mt-0.5">请先完成前置模块</p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
