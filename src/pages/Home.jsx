import { Link } from 'react-router-dom'
import { CURRICULUM, getModuleIndex } from '../data/curriculum.js'
import { useProgress } from '../hooks/useProgress.js'
import { useProgressStore } from '../store/progressStore.js'

function DifficultyDots({ level }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: i <= level ? '#00c896' : '#2a2d3a' }}
        />
      ))}
    </div>
  )
}

function ProgressBar({ percent, dim }) {
  return (
    <div className="w-full h-1 rounded-full bg-[#2a2d3a] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${percent}%`, backgroundColor: dim ? 'rgba(0,200,150,0.4)' : '#00c896' }}
      />
    </div>
  )
}

function ModuleCard({ module, index, isUnlocked, progressPercent, freeMode }) {
  const isLocked = !isUnlocked
  // 自由模式下，原本锁定的模块可以访问，但有视觉区分
  const freeAccess = freeMode && isLocked

  const cardContent = (
    <div
      className={`rounded-xl border p-6 flex flex-col gap-4 transition-all duration-200 ${
        isLocked && !freeMode
          ? 'opacity-50 cursor-not-allowed border-[#2a2d3a]'
          : freeAccess
          ? 'border-[#2a2d3a] hover:border-[#00c896]/50 hover:bg-[#1a1d27] cursor-pointer opacity-75'
          : 'border-[#2a2d3a] hover:border-[#00c896] hover:bg-[#1a1d27] cursor-pointer'
      }`}
      style={{ backgroundColor: '#1a1d27' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{module.icon}</span>
          <div>
            <p className="text-xs text-slate-500 font-mono">Module {index + 1}</p>
            <h3 className="font-semibold text-white text-lg leading-tight">{module.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{module.subtitle}</p>
          </div>
        </div>
        {/* 右上角状态标识 */}
        {isLocked && !freeMode && <span className="text-slate-600 text-xl">🔒</span>}
        {freeAccess && (
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full border flex-shrink-0"
            style={{ color: '#00c896', borderColor: 'rgba(0,200,150,0.4)', backgroundColor: 'rgba(0,200,150,0.08)' }}
          >
            自由访问
          </span>
        )}
        {!isLocked && progressPercent === 100 && (
          <span className="text-[#00c896] text-xl">✓</span>
        )}
      </div>

      <p className="text-sm text-slate-400 leading-relaxed">{module.description}</p>

      {/* 进度条（已解锁或自由访问时显示） */}
      {(!isLocked || freeAccess) && (
        <ProgressBar percent={progressPercent} dim={freeAccess} />
      )}

      <div className="flex items-center justify-between pt-1">
        <DifficultyDots level={module.difficulty} />
        {(!isLocked || freeAccess) && (
          <span className="text-xs text-slate-500 font-mono">
            {progressPercent > 0 ? `${progressPercent}%` : (
              module.lessons.length > 0
                ? `${module.lessons.length} 节课 + 练习`
                : '综合练习'
            )}
          </span>
        )}
        {isLocked && !freeMode && (
          <span className="text-xs text-slate-600">
            完成前置模块后解锁
          </span>
        )}
      </div>
    </div>
  )

  // 不可点击：锁定且非自由模式
  if (isLocked && !freeMode) return cardContent

  return (
    <Link to={`/module/${module.id}`} className="block">
      {cardContent}
    </Link>
  )
}

export default function Home() {
  const { isUnlocked, getProgressPercent, moduleProgress } = useProgress()
  const freeMode = useProgressStore((s) => s.freeMode)
  const predictBestScore = useProgressStore((s) => s.predictBestScore)

  // 统计整体进度
  const totalModules = CURRICULUM.length
  const passedModules = CURRICULUM.filter((m) => moduleProgress[m.id]?.passed).length
  // 找到第一个未完成的已解锁模块，作为"继续学习"的跳转目标
  const nextModule = CURRICULUM.find((m) => isUnlocked(m.id) && !moduleProgress[m.id]?.passed)
  const allDone = passedModules === totalModules

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
      {/* Hero 区域 */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 select-none cursor-default">
          用真实K线案例，<br />
          <span style={{ color: '#00c896' }}>系统学习技术分析</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
          Candlewise 通过交互式闯关，帮助你从零掌握股票K线形态识别与趋势判断
        </p>

        {/* 整体进度统计（有进度时显示） */}
        {passedModules > 0 && (
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-6 text-sm"
            style={{ backgroundColor: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)' }}>
            <span style={{ color: '#00c896' }}>●</span>
            <span className="text-slate-300">
              已完成 <span style={{ color: '#00c896' }} className="font-semibold font-mono">{passedModules}</span>
              <span className="text-slate-500">/{totalModules}</span> 个模块
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={allDone ? '/module/synthesis' : (nextModule ? `/module/${nextModule.id}` : '/module/single_candle')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-black transition-colors"
            style={{ backgroundColor: '#00c896' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00a87e')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00c896')}
          >
            {passedModules > 0 ? (allDone ? '查看全部课程' : '继续学习') : '开始学习'}
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* 课程模块网格 */}
      <div>
        <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6">
          课程模块
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRICULUM.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              index={getModuleIndex(mod.id)}
              isUnlocked={isUnlocked(mod.id)}
              progressPercent={getProgressPercent(mod.id)}
              freeMode={freeMode}
            />
          ))}
        </div>
      </div>

      {/* 挑战板块 */}
      <div className="mt-10">
        <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6">
          挑战板块
        </h2>
        <Link to="/predict" className="block">
          <div
            className="rounded-xl border p-6 flex flex-col gap-4 transition-all duration-200 border-[#2a2d3a] hover:border-[#00c896] cursor-pointer"
            style={{ backgroundColor: '#1a1d27' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e2130')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1d27')}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <p className="text-xs text-slate-500 font-mono">Challenge</p>
                  <h3 className="font-semibold text-white text-lg leading-tight">预测挑战</h3>
                  <p className="text-xs text-slate-400 mt-0.5">综合判断 · 预测K线后续走势</p>
                </div>
              </div>
              {predictBestScore > 0 && (
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full border flex-shrink-0"
                  style={{
                    color: '#00c896',
                    borderColor: 'rgba(0,200,150,0.4)',
                    backgroundColor: 'rgba(0,200,150,0.08)',
                  }}
                >
                  最高 {predictBestScore}/10
                </span>
              )}
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              给出K线形态，隐藏后续走势，检验你对涨跌方向的判断力。300 题 · 全模块覆盖 · 难度可选。
            </p>

            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#00c896' }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {predictBestScore > 0 ? `历史最高 ${predictBestScore}/10` : '暂无记录，开始挑战'}
              </span>
            </div>
          </div>
        </Link>
      </div>

    </div>
  )
}
