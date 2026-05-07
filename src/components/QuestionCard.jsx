/**
 * QuestionCard.jsx — 题目卡片
 *
 * Props:
 *   question    {string}  题目文字
 *   caseData    {object}  案例对象（含 symbol, name, sector, source）
 */
export default function QuestionCard({ question, caseData }) {
  return (
    <div className="flex flex-col gap-2">
      {/* 股票信息标签行 */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-xs font-mono px-2 py-0.5 rounded"
          style={{ backgroundColor: '#1e2130', color: '#60a5fa' }}
        >
          {caseData.symbol}
        </span>
        <span className="text-xs text-slate-400">{caseData.name}</span>
        <span className="text-xs text-slate-600">·</span>
        <span className="text-xs text-slate-500">{caseData.sector}</span>
        {caseData.source === 'synthetic' && (
          <span
            className="text-xs px-1.5 py-0.5 rounded font-mono"
            style={{ backgroundColor: '#2a2d3a', color: '#64748b' }}
          >
            模拟数据
          </span>
        )}
      </div>
      {/* 题目文字 */}
      <p className="text-base font-medium text-slate-200 leading-relaxed">
        {question}
      </p>
    </div>
  )
}
