/**
 * CandleChart.jsx — K线图组件
 * 基于 lightweight-charts v4（TradingView OSS）
 *
 * Props:
 *   candles      {Array}  K线数据数组（来自 candlewise_cases.json 的 candles 字段）
 *   patternIndex {number} 形态识别点索引，在该K线上方标注三角标记
 *   height       {number} 图表高度，默认 320
 */

import { useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'

// ── 图表配色常量 ──────────────────────────────────────────────────
const COLORS = {
  background:    '#0f1117',
  text:          '#94a3b8',
  grid:          '#1e2130',
  border:        '#2a2d3a',
  crosshair:     '#4a5568',
  bullish:       '#00c896',   // 上涨绿
  bearish:       '#ff4d6a',   // 下跌红
  ma5:           '#f59e0b',   // MA5 橙色
  ma20:          '#60a5fa',   // MA20 蓝色
  markerColor:   '#f59e0b',   // 形态标注颜色
}

function fmt(v) {
  if (v == null) return '—'
  return Number(v).toFixed(2)
}

export default function CandleChart({ candles = [], patternIndex = -1, height = 320 }) {
  const containerRef = useRef(null)
  const chartRef     = useRef(null)
  const [hud, setHud] = useState(null) // { date, open, high, low, close, bullish }

  useEffect(() => {
    if (!containerRef.current || candles.length === 0) return

    const container = containerRef.current
    const width = container.clientWidth

    // ── 创建图表 ──────────────────────────────────────────────────
    const chart = createChart(container, {
      width,
      height,
      layout: {
        background: { color: COLORS.background },
        textColor:  COLORS.text,
        fontFamily: "'JetBrains Mono', 'Noto Sans SC', monospace",
        fontSize:   11,
      },
      grid: {
        vertLines:  { color: COLORS.grid },
        horzLines:  { color: COLORS.grid },
      },
      crosshair: {
        vertLine: { color: COLORS.crosshair, width: 1, style: 3 },
        horzLine: { color: COLORS.crosshair, width: 1, style: 3 },
      },
      rightPriceScale: {
        borderColor: COLORS.border,
        textColor:   COLORS.text,
      },
      timeScale: {
        borderColor:       COLORS.border,
        timeVisible:       true,
        secondsVisible:    false,
        tickMarkFormatter: (time) => {
          // time 是 'YYYY-MM-DD' 字符串
          const [, month, day] = time.split('-')
          return `${month}/${day}`
        },
      },
      handleScroll:    true,
      handleScale:     true,
    })

    chartRef.current = chart

    // ── K线序列 ───────────────────────────────────────────────────
    const candleSeries = chart.addCandlestickSeries({
      upColor:          COLORS.bullish,
      downColor:        COLORS.bearish,
      borderUpColor:    COLORS.bullish,
      borderDownColor:  COLORS.bearish,
      wickUpColor:      COLORS.bullish,
      wickDownColor:    COLORS.bearish,
    })

    const candleData = candles.map((c) => ({
      time:  c.date,
      open:  c.open,
      high:  c.high,
      low:   c.low,
      close: c.close,
    }))
    candleSeries.setData(candleData)

    // ── MA5 均线 ───────────────────────────────────────────────────
    const ma5Points = candles
      .filter((c) => c.ma5 !== null && c.ma5 !== undefined)
      .map((c) => ({ time: c.date, value: c.ma5 }))

    if (ma5Points.length > 0) {
      const ma5Series = chart.addLineSeries({
        color:          COLORS.ma5,
        lineWidth:      1,
        crosshairMarkerVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
      })
      ma5Series.setData(ma5Points)
    }

    // ── MA20 均线 ──────────────────────────────────────────────────
    const ma20Points = candles
      .filter((c) => c.ma20 !== null && c.ma20 !== undefined)
      .map((c) => ({ time: c.date, value: c.ma20 }))

    if (ma20Points.length > 0) {
      const ma20Series = chart.addLineSeries({
        color:          COLORS.ma20,
        lineWidth:      1,
        crosshairMarkerVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
      })
      ma20Series.setData(ma20Points)
    }

    // ── 形态标注（patternIndex 处） ────────────────────────────────
    if (patternIndex >= 0 && patternIndex < candles.length) {
      const markerCandle = candles[patternIndex]
      candleSeries.setMarkers([
        {
          time:     markerCandle.date,
          position: 'aboveBar',
          color:    COLORS.markerColor,
          shape:    'arrowDown',
          text:     '形态',
          size:     1,
        },
      ])
    }

    // 自适应所有数据到视图
    chart.timeScale().fitContent()

    // ── 十字光标悬停 → OHLC HUD ──────────────────────────────────
    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time || param.seriesData.size === 0) {
        setHud(null)
        return
      }
      // 取 K线序列的数据
      const bar = param.seriesData.get(candleSeries)
      if (!bar) { setHud(null); return }
      setHud({
        date:    param.time,
        open:    bar.open,
        high:    bar.high,
        low:     bar.low,
        close:   bar.close,
        bullish: bar.close >= bar.open,
      })
    })

    // ── ResizeObserver 宽度自适应 ──────────────────────────────────
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width
        if (newWidth > 0) {
          chart.applyOptions({ width: newWidth })
        }
      }
    })
    resizeObserver.observe(container)

    // ── 清理 ──────────────────────────────────────────────────────
    return () => {
      resizeObserver.disconnect()
      chart.remove()
      chartRef.current = null
      setHud(null)
    }
  }, [candles, patternIndex, height])

  return (
    <div className="relative w-full rounded-lg overflow-hidden" style={{ backgroundColor: COLORS.background }}>
      {/* OHLC HUD 数据条 */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center gap-3 px-3 py-1.5 text-xs font-mono pointer-events-none"
        style={{ backgroundColor: 'rgba(15,17,23,0.85)' }}
      >
        {hud ? (
          <>
            <span className="text-slate-500">{hud.date}</span>
            <span className="text-slate-400">O <span className="text-slate-200">{fmt(hud.open)}</span></span>
            <span className="text-slate-400">H <span className="text-slate-200">{fmt(hud.high)}</span></span>
            <span className="text-slate-400">L <span className="text-slate-200">{fmt(hud.low)}</span></span>
            <span className="text-slate-400">C <span style={{ color: hud.bullish ? COLORS.bullish : COLORS.bearish }}>{fmt(hud.close)}</span></span>
          </>
        ) : (
          <span className="text-slate-600">移动光标查看 OHLC 数据</span>
        )}
      </div>
      {/* 图表容器 */}
      <div
        ref={containerRef}
        style={{ height, paddingTop: '28px' }}
      />
    </div>
  )
}
