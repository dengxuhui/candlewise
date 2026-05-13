import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CandleChart from './CandleChart.jsx'
import { CANDLE_DEMO_MAP } from '../data/lessonDemos.js'
import { useProgressStore } from '../store/progressStore.js'

function buildMdComponents(colorTheme) {
  return {
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
            <CandleChart
              candles={demo.candles}
              patternIndex={-1}
              height={160}
              indicators={demo.indicators ?? []}
            />
          </div>
          <p className="text-xs text-slate-500 text-center mt-2">{typeof demo.caption === 'function' ? demo.caption(colorTheme) : demo.caption}</p>
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
}

export default function LessonMarkdown({ content }) {
  const colorTheme = useProgressStore((s) => s.colorTheme)
  const mdComponents = buildMdComponents(colorTheme)
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
