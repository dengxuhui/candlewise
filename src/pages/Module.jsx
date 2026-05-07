import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress.js'

const MODULE_META = {
  single_candle: {
    title: 'K线基础',
    subtitle: '单根形态',
    icon: '🕯',
    description: '学习锤子线、流星线、十字星等单根K线形态，理解多空博弈逻辑',
    lessons: [
      { id: 'lesson_1_1', title: '什么是K线（阴阳线、实体、影线）' },
      { id: 'lesson_1_2', title: '单根K线的四个价格（开高低收）' },
      { id: 'lesson_1_3', title: '影线的含义（多空博弈）' },
    ],
  },
  pattern: {
    title: '组合形态',
    subtitle: '多根信号',
    icon: '📊',
    description: '识别启明星、黄昏之星、吞没形态等强力的反转与持续信号',
    lessons: [
      { id: 'lesson_2_1', title: '启明星与黄昏之星' },
      { id: 'lesson_2_2', title: '吞没形态（阳线吞没 / 阴线吞没）' },
      { id: 'lesson_2_3', title: '三只白兵与三只乌鸦' },
    ],
  },
  trend: {
    title: '趋势与关键位',
    subtitle: '支撑阻力 · 均线',
    icon: '📈',
    description: '掌握支撑阻力位识别、角色转换原则，以及 MA5/MA20 金叉死叉',
    lessons: [
      { id: 'lesson_3_1', title: '支撑位与阻力位的形成' },
      { id: 'lesson_3_2', title: '角色转换原则（阻力变支撑）' },
      { id: 'lesson_3_3', title: '均线：MA5 / MA20 金叉死叉' },
    ],
  },
  synthesis: {
    title: '综合判断',
    subtitle: '多指标共振',
    icon: '🎯',
    description: '综合运用所学知识，进行多指标共振分析与走势预测',
    lessons: [],
  },
}

// 从 lesson id 中提取路由参数 (lesson_1_1 → moduleId=single_candle, lessonId=1_1)
const LESSON_MODULE_MAP = {
  lesson_1_1: { moduleId: 'single_candle', lessonId: '1_1' },
  lesson_1_2: { moduleId: 'single_candle', lessonId: '1_2' },
  lesson_1_3: { moduleId: 'single_candle', lessonId: '1_3' },
  lesson_2_1: { moduleId: 'pattern', lessonId: '2_1' },
  lesson_2_2: { moduleId: 'pattern', lessonId: '2_2' },
  lesson_2_3: { moduleId: 'pattern', lessonId: '2_3' },
  lesson_3_1: { moduleId: 'trend', lessonId: '3_1' },
  lesson_3_2: { moduleId: 'trend', lessonId: '3_2' },
  lesson_3_3: { moduleId: 'trend', lessonId: '3_3' },
}

export default function Module() {
  const { moduleId } = useParams()
  const meta = MODULE_META[moduleId]
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
