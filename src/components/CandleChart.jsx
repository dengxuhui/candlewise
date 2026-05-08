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
import { useProgressStore } from '../store/progressStore.js'

// ── 图表配色常量 ──────────────────────────────────────────────────
const BASE_COLORS = {
  background:    '#0f1117',
  text:          '#94a3b8',
  grid:          '#1e2130',
  border:        '#2a2d3a',
  crosshair:     '#4a5568',
  ma5:           '#f59e0b',   // MA5 橙色
  ma20:          '#60a5fa',   // MA20 蓝色
  markerColor:   '#f59e0b',   // 形态标注颜色
}

function getCandleColors(colorTheme) {
  const isChinese = colorTheme === 'chinese'
  return {
    bullish: isChinese ? '#ff4d6a' : '#00c896',   // 涨
    bearish: isChinese ? '#00c896' : '#ff4d6a',   // 跌
  }
}

function fmt(v) {
  if (v == null) return '—'
  return Number(v).toFixed(2)
}

export default function CandleChart({ candles = [], patternIndex = -1, height = 320 }) {
  const containerRef = useRef(null)
  const chartRef = useRef(null)
  const candleSeriesRef = useRef(null)
  const ma5SeriesRef = useRef(null)
  const ma20SeriesRef = useRef(null)
  const [hud, setHud] = useState(null) // { date, open, high, low, close, bullish }

  const colorTheme = useProgressStore((s) => s.colorTheme)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth

    // ── 创建图表 ──────────────────────────────────────────────────
    const chart = createChart(container, {
      width,
      height,
      layout: {
        background: { color: BASE_COLORS.background },
        textColor:  BASE_COLORS.text,
        fontFamily: "'JetBrains Mono', 'Noto Sans SC', monospace",
        fontSize:   11,
      },
      grid: {
        vertLines:  { color: BASE_COLORS.grid },
        horzLines:  { color: BASE_COLORS.grid },
      },
      crosshair: {
        vertLine: { color: BASE_COLORS.crosshair, width: 1, style: 3 },
        horzLine: { color: BASE_COLORS.crosshair, width: 1, style: 3 },
      },
      rightPriceScale: {
        borderColor: BASE_COLORS.border,
        textColor:   BASE_COLORS.text,
      },
      timeScale: {
        borderColor:       BASE_COLORS.border,
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
    const { bullish, bearish } = getCandleColors('chinese') // 初始颜色，后续由 colorTheme effect 更新
    const candleSeries = chart.addCandlestickSeries({
      upColor:          bullish,
      downColor:        bearish,
      borderUpColor:    bullish,
      borderDownColor:  bearish,
      wickUpColor:      bullish,
      wickDownColor:    bearish,
    })
    candleSeriesRef.current = candleSeries

    // ── MA5 均线 ───────────────────────────────────────────────────
    const ma5Series = chart.addLineSeries({
      color:          BASE_COLORS.ma5,
      lineWidth:      1,
      crosshairMarkerVisible: false,
      lastValueVisible: false,
      priceLineVisible: false,
    })
    ma5SeriesRef.current = ma5Series

    // ── MA20 均线 ──────────────────────────────────────────────────
    const ma20Series = chart.addLineSeries({
      color:          BASE_COLORS.ma20,
      lineWidth:      1,
      crosshairMarkerVisible: false,
      lastValueVisible: false,
      priceLineVisible: false,
    })
    ma20SeriesRef.current = ma20Series

    // ── 十字光标悬停 → OHLC HUD ──────────────────────────────────
    const onCrosshairMove = (param) => {
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
    }

    chart.subscribeCrosshairMove(onCrosshairMove)

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
      chart.unsubscribeCrosshairMove(onCrosshairMove)
      chart.remove()
      chartRef.current = null
      candleSeriesRef.current = null
      ma5SeriesRef.current = null
      ma20SeriesRef.current = null
    }
  }, [])

  useEffect(() => {
    const chart = chartRef.current
    const candleSeries = candleSeriesRef.current
    const ma5Series = ma5SeriesRef.current
    const ma20Series = ma20SeriesRef.current
    if (!chart || !candleSeries || !ma5Series || !ma20Series || candles.length === 0) return

    const candleData = candles.map((c) => ({
      time:  c.date,
      open:  c.open,
      high:  c.high,
      low:   c.low,
      close: c.close,
    }))
    candleSeries.setData(candleData)

    const ma5Points = candles
      .filter((c) => c.ma5 !== null && c.ma5 !== undefined)
      .map((c) => ({ time: c.date, value: c.ma5 }))
    ma5Series.setData(ma5Points)

    const ma20Points = candles
      .filter((c) => c.ma20 !== null && c.ma20 !== undefined)
      .map((c) => ({ time: c.date, value: c.ma20 }))
    ma20Series.setData(ma20Points)

    if (patternIndex >= 0 && patternIndex < candles.length) {
      const markerCandle = candles[patternIndex]
      candleSeries.setMarkers([
        {
          time:     markerCandle.date,
          position: 'aboveBar',
          color:    BASE_COLORS.markerColor,
          shape:    'arrowDown',
          text:     '形态',
          size:     1,
        },
      ])
    } else {
      candleSeries.setMarkers([])
    }

    chart.timeScale().fitContent()
    setHud(null)
  }, [candles, patternIndex])

  useEffect(() => {
    if (!chartRef.current) return
    chartRef.current.applyOptions({ height })
  }, [height])

  // ── 配色主题变化时实时更新蜡烛图颜色 ────────────────────────────
  useEffect(() => {
    const candleSeries = candleSeriesRef.current
    if (!candleSeries) return
    const { bullish, bearish } = getCandleColors(colorTheme)
    candleSeries.applyOptions({
      upColor:         bullish,
      downColor:       bearish,
      borderUpColor:   bullish,
      borderDownColor: bearish,
      wickUpColor:     bullish,
      wickDownColor:   bearish,
    })
  }, [colorTheme])

  return (
    <div className="relative w-full rounded-lg overflow-hidden" style={{ backgroundColor: BASE_COLORS.background }}>
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
            <span className="text-slate-400">C <span style={{ color: hud.bullish ? getCandleColors(colorTheme).bullish : getCandleColors(colorTheme).bearish }}>{fmt(hud.close)}</span></span>
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
