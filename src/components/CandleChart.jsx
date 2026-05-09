/**
 * CandleChart.jsx — K线图组件
 * 基于 lightweight-charts（TradingView OSS）
 *
 * Props:
 *   candles      {Array}    K线数据数组（来自 candlewise_cases.json 的 candles 字段）
 *   patternIndex {number}   形态识别点索引，在该K线上方标注三角标记
 *   height       {number}   主图高度，默认 320
 *   indicators   {string[]} 副图指标：'volume' | 'rsi' | 'macd'
 */

import { useEffect, useMemo, useRef, useState } from 'react'
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
  rsiLine:       '#e2e8f0',
  rsiRef:        '#4a5568',
  macdDiff:      '#f59e0b',
  macdDea:       '#60a5fa',
}

const VALID_INDICATORS = ['volume', 'rsi', 'macd']

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

function hexToRgba(hex, alpha = 1) {
  const v = hex.replace('#', '')
  const n = Number.parseInt(v, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getSubPaneHeight(width) {
  if (width < 480) return 60
  if (width < 768) return 70
  return 80
}

function toTimeKey(time) {
  if (time == null) return null
  if (typeof time === 'string') return time
  if (typeof time === 'number') return String(time)
  if (typeof time === 'object' && 'year' in time && 'month' in time && 'day' in time) {
    const month = String(time.month).padStart(2, '0')
    const day = String(time.day).padStart(2, '0')
    return `${time.year}-${month}-${day}`
  }
  return String(time)
}

function buildVolumeData(candles, bullish, bearish) {
  return candles
    .filter((c) => c.volume !== null && c.volume !== undefined)
    .map((c) => ({
      time: c.date,
      value: c.volume,
      color: c.close >= c.open ? hexToRgba(bullish, 0.7) : hexToRgba(bearish, 0.7),
    }))
}

function buildMacdHistData(candles, bullish, bearish) {
  return candles
    .filter((c) => c.macd_hist !== null && c.macd_hist !== undefined)
    .map((c) => ({
      time: c.date,
      value: c.macd_hist,
      color: c.macd_hist >= 0 ? hexToRgba(bullish, 0.75) : hexToRgba(bearish, 0.75),
    }))
}

export default function CandleChart({
  candles = [],
  patternIndex = -1,
  height = 320,
  indicators = [],
}) {
  const rootRef = useRef(null)
  const mainContainerRef = useRef(null)
  const volumeContainerRef = useRef(null)
  const rsiContainerRef = useRef(null)
  const macdContainerRef = useRef(null)

  const chartsRef = useRef({
    main: null,
    volume: null,
    rsi: null,
    macd: null,
  })
  const seriesRef = useRef({
    candles: null,
    ma5: null,
    ma20: null,
    volume: null,
    rsi: null,
    rsi30: null,
    rsi70: null,
    macdHist: null,
    macdDiff: null,
    macdDea: null,
  })
  const candleByTimeRef = useRef(new Map())
  const syncLockRef = useRef(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const [hud, setHud] = useState(null) // { date, open, high, low, close, volume, rsi, macdDiff, macdDea, macdHist, bullish }

  const colorTheme = useProgressStore((s) => s.colorTheme)
  const normalizedIndicators = useMemo(() => {
    const uniq = new Set(indicators)
    return VALID_INDICATORS.filter((i) => uniq.has(i))
  }, [indicators])
  const hasVolume = normalizedIndicators.includes('volume')
  const hasRsi = normalizedIndicators.includes('rsi')
  const hasMacd = normalizedIndicators.includes('macd')

  const paneOrder = useMemo(() => {
    const panes = ['main']
    if (hasVolume) panes.push('volume')
    if (hasRsi) panes.push('rsi')
    if (hasMacd) panes.push('macd')
    return panes
  }, [hasVolume, hasRsi, hasMacd])

  const subPaneHeight = getSubPaneHeight(containerWidth || window.innerWidth)

  useEffect(() => {
    if (!rootRef.current) return

    const root = rootRef.current
    setContainerWidth(root.clientWidth)

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nextWidth = entry.contentRect.width
        if (nextWidth > 0) {
          setContainerWidth(nextWidth)
        }
      }
    })

    observer.observe(root)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!containerWidth) return

    // 先清理旧图（indicators 变更时）
    Object.values(chartsRef.current).forEach((chart) => {
      if (chart) chart.remove()
    })
    chartsRef.current = { main: null, volume: null, rsi: null, macd: null }
    seriesRef.current = {
      candles: null,
      ma5: null,
      ma20: null,
      volume: null,
      rsi: null,
      rsi30: null,
      rsi70: null,
      macdHist: null,
      macdDiff: null,
      macdDea: null,
    }

    const lastPaneKey = paneOrder[paneOrder.length - 1]

    const createPaneChart = (container, paneHeight, showTimeScale) => createChart(container, {
      width: containerWidth,
      height: paneHeight,
      layout: {
        background: { color: BASE_COLORS.background },
        textColor: BASE_COLORS.text,
        fontFamily: "'JetBrains Mono', 'Noto Sans SC', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: BASE_COLORS.grid },
        horzLines: { color: BASE_COLORS.grid },
      },
      crosshair: {
        vertLine: { color: BASE_COLORS.crosshair, width: 1, style: 3 },
        horzLine: { color: BASE_COLORS.crosshair, width: 1, style: 3 },
      },
      rightPriceScale: {
        borderColor: BASE_COLORS.border,
        textColor: BASE_COLORS.text,
      },
      timeScale: {
        visible: showTimeScale,
        borderColor: BASE_COLORS.border,
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time) => {
          if (typeof time !== 'string') return String(time)
          const chunks = time.split('-')
          if (chunks.length < 3) return time
          return `${chunks[1]}/${chunks[2]}`
        },
      },
      handleScroll: true,
      handleScale: true,
    })

    const { bullish, bearish } = getCandleColors(colorTheme)

    if (mainContainerRef.current) {
      const mainChart = createPaneChart(mainContainerRef.current, height, lastPaneKey === 'main')
      chartsRef.current.main = mainChart

      seriesRef.current.candles = mainChart.addCandlestickSeries({
        upColor: bullish,
        downColor: bearish,
        borderUpColor: bullish,
        borderDownColor: bearish,
        wickUpColor: bullish,
        wickDownColor: bearish,
      })
      seriesRef.current.ma5 = mainChart.addLineSeries({
        color: BASE_COLORS.ma5,
        lineWidth: 1,
        crosshairMarkerVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
      })
      seriesRef.current.ma20 = mainChart.addLineSeries({
        color: BASE_COLORS.ma20,
        lineWidth: 1,
        crosshairMarkerVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
      })
    }

    if (hasVolume && volumeContainerRef.current) {
      const volumeChart = createPaneChart(volumeContainerRef.current, subPaneHeight, lastPaneKey === 'volume')
      chartsRef.current.volume = volumeChart

      seriesRef.current.volume = volumeChart.addHistogramSeries({
        base: 0,
        color: hexToRgba(bullish, 0.7),
        priceFormat: { type: 'volume' },
        lastValueVisible: false,
        priceLineVisible: false,
      })
    }

    if (hasRsi && rsiContainerRef.current) {
      const rsiChart = createPaneChart(rsiContainerRef.current, subPaneHeight, lastPaneKey === 'rsi')
      chartsRef.current.rsi = rsiChart

      seriesRef.current.rsi = rsiChart.addLineSeries({
        color: BASE_COLORS.rsiLine,
        lineWidth: 2,
        lastValueVisible: false,
        priceLineVisible: false,
      })
      seriesRef.current.rsi30 = rsiChart.addLineSeries({
        color: BASE_COLORS.rsiRef,
        lineWidth: 1,
        lineStyle: 2,
        crosshairMarkerVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
      })
      seriesRef.current.rsi70 = rsiChart.addLineSeries({
        color: BASE_COLORS.rsiRef,
        lineWidth: 1,
        lineStyle: 2,
        crosshairMarkerVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
      })

      rsiChart.priceScale('right').applyOptions({ autoScale: false })
    }

    if (hasMacd && macdContainerRef.current) {
      const macdChart = createPaneChart(macdContainerRef.current, subPaneHeight, lastPaneKey === 'macd')
      chartsRef.current.macd = macdChart

      seriesRef.current.macdHist = macdChart.addHistogramSeries({
        base: 0,
        color: hexToRgba(bullish, 0.75),
        lastValueVisible: false,
        priceLineVisible: false,
      })
      seriesRef.current.macdDiff = macdChart.addLineSeries({
        color: BASE_COLORS.macdDiff,
        lineWidth: 2,
        lastValueVisible: false,
        priceLineVisible: false,
      })
      seriesRef.current.macdDea = macdChart.addLineSeries({
        color: BASE_COLORS.macdDea,
        lineWidth: 2,
        lastValueVisible: false,
        priceLineVisible: false,
      })
    }

    const chartEntries = Object.entries(chartsRef.current).filter(([, chart]) => Boolean(chart))

    const clearCrosshairOnAll = () => {
      chartEntries.forEach(([, chart]) => chart.clearCrosshairPosition())
    }

    const syncCrosshair = (sourceKey, timeKey, timeValue) => {
      const candle = candleByTimeRef.current.get(timeKey)
      if (!candle) {
        clearCrosshairOnAll()
        return
      }

      chartEntries.forEach(([key, chart]) => {
        if (key === sourceKey) return

        let targetSeries = null
        let price = null

        if (key === 'main') {
          targetSeries = seriesRef.current.candles
          price = candle.close
        }
        if (key === 'volume') {
          targetSeries = seriesRef.current.volume
          price = candle.volume
        }
        if (key === 'rsi') {
          targetSeries = seriesRef.current.rsi
          price = candle.rsi
        }
        if (key === 'macd') {
          targetSeries = seriesRef.current.macdDiff
          price = candle.macd_diff
        }

        if (!targetSeries || price == null) {
          chart.clearCrosshairPosition()
          return
        }
        chart.setCrosshairPosition(price, timeValue, targetSeries)
      })
    }

    const syncVisibleRange = (sourceKey, range) => {
      if (!range) return
      chartEntries.forEach(([key, chart]) => {
        if (key !== sourceKey) {
          chart.timeScale().setVisibleLogicalRange(range)
        }
      })
    }

    const crosshairHandlers = []
    const rangeHandlers = []

    chartEntries.forEach(([sourceKey, chart]) => {
      const crosshairHandler = (param) => {
        if (syncLockRef.current) return

        const timeValue = param?.time
        const timeKey = toTimeKey(timeValue)

        if (!timeValue || !timeKey || !param?.seriesData || param.seriesData.size === 0) {
          setHud(null)
          syncLockRef.current = true
          clearCrosshairOnAll()
          syncLockRef.current = false
          return
        }

        const candle = candleByTimeRef.current.get(timeKey)
        if (!candle) {
          setHud(null)
          return
        }

        setHud({
          date: candle.date,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
          volume: candle.volume,
          rsi: candle.rsi,
          macdDiff: candle.macd_diff,
          macdDea: candle.macd_dea,
          macdHist: candle.macd_hist,
          bullish: candle.close >= candle.open,
        })

        syncLockRef.current = true
        syncCrosshair(sourceKey, timeKey, timeValue)
        syncLockRef.current = false
      }

      const rangeHandler = (range) => {
        if (syncLockRef.current || !range) return
        syncLockRef.current = true
        syncVisibleRange(sourceKey, range)
        syncLockRef.current = false
      }

      chart.subscribeCrosshairMove(crosshairHandler)
      chart.timeScale().subscribeVisibleLogicalRangeChange(rangeHandler)
      crosshairHandlers.push([chart, crosshairHandler])
      rangeHandlers.push([chart, rangeHandler])
    })

    return () => {
      crosshairHandlers.forEach(([chart, handler]) => chart.unsubscribeCrosshairMove(handler))
      rangeHandlers.forEach(([chart, handler]) => chart.timeScale().unsubscribeVisibleLogicalRangeChange(handler))
      chartEntries.forEach(([, chart]) => chart.remove())

      chartsRef.current = { main: null, volume: null, rsi: null, macd: null }
      seriesRef.current = {
        candles: null,
        ma5: null,
        ma20: null,
        volume: null,
        rsi: null,
        rsi30: null,
        rsi70: null,
        macdHist: null,
        macdDiff: null,
        macdDea: null,
      }
    }
  }, [colorTheme, containerWidth, paneOrder, hasVolume, hasRsi, hasMacd])

  useEffect(() => {
    const mainChart = chartsRef.current.main
    const volumeChart = chartsRef.current.volume
    const rsiChart = chartsRef.current.rsi
    const macdChart = chartsRef.current.macd

    if (!mainChart || !seriesRef.current.candles || !seriesRef.current.ma5 || !seriesRef.current.ma20) return

    candleByTimeRef.current = new Map(candles.map((c) => [c.date, c]))

    const { bullish, bearish } = getCandleColors(colorTheme)

    const candleData = candles.map((c) => ({
      time: c.date,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }))

    seriesRef.current.candles.applyOptions({
      upColor: bullish,
      downColor: bearish,
      borderUpColor: bullish,
      borderDownColor: bearish,
      wickUpColor: bullish,
      wickDownColor: bearish,
    })
    seriesRef.current.candles.setData(candleData)

    const ma5Points = candles
      .filter((c) => c.ma5 !== null && c.ma5 !== undefined)
      .map((c) => ({ time: c.date, value: c.ma5 }))
    seriesRef.current.ma5.setData(ma5Points)

    const ma20Points = candles
      .filter((c) => c.ma20 !== null && c.ma20 !== undefined)
      .map((c) => ({ time: c.date, value: c.ma20 }))
    seriesRef.current.ma20.setData(ma20Points)

    if (patternIndex >= 0 && patternIndex < candles.length) {
      const markerCandle = candles[patternIndex]
      seriesRef.current.candles.setMarkers([
        {
          time: markerCandle.date,
          position: 'aboveBar',
          color: BASE_COLORS.markerColor,
          shape: 'arrowDown',
          text: '形态',
          size: 1,
        },
      ])
    } else {
      seriesRef.current.candles.setMarkers([])
    }

    if (hasVolume && volumeChart && seriesRef.current.volume) {
      seriesRef.current.volume.setData(buildVolumeData(candles, bullish, bearish))
    }

    if (hasRsi && rsiChart && seriesRef.current.rsi && seriesRef.current.rsi30 && seriesRef.current.rsi70) {
      const rsiData = candles
        .filter((c) => c.rsi !== null && c.rsi !== undefined)
        .map((c) => ({ time: c.date, value: c.rsi }))

      const rsi30 = candles.map((c) => ({ time: c.date, value: 30 }))
      const rsi70 = candles.map((c) => ({ time: c.date, value: 70 }))

      seriesRef.current.rsi.setData(rsiData)
      seriesRef.current.rsi30.setData(rsi30)
      seriesRef.current.rsi70.setData(rsi70)
      rsiChart.priceScale('right').applyOptions({
        autoScale: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      })
      rsiChart.timeScale().fitContent()
    }

    if (hasMacd && macdChart && seriesRef.current.macdHist && seriesRef.current.macdDiff && seriesRef.current.macdDea) {
      const macdDiff = candles
        .filter((c) => c.macd_diff !== null && c.macd_diff !== undefined)
        .map((c) => ({ time: c.date, value: c.macd_diff }))
      const macdDea = candles
        .filter((c) => c.macd_dea !== null && c.macd_dea !== undefined)
        .map((c) => ({ time: c.date, value: c.macd_dea }))

      seriesRef.current.macdHist.setData(buildMacdHistData(candles, bullish, bearish))
      seriesRef.current.macdDiff.setData(macdDiff)
      seriesRef.current.macdDea.setData(macdDea)
      macdChart.timeScale().fitContent()
    }

    mainChart.timeScale().fitContent()
    const logicalRange = mainChart.timeScale().getVisibleLogicalRange()
    if (logicalRange) {
      if (volumeChart) volumeChart.timeScale().setVisibleLogicalRange(logicalRange)
      if (rsiChart) rsiChart.timeScale().setVisibleLogicalRange(logicalRange)
      if (macdChart) macdChart.timeScale().setVisibleLogicalRange(logicalRange)
    }

    setHud(null)
  }, [candles, patternIndex, colorTheme, hasVolume, hasRsi, hasMacd, containerWidth])

  useEffect(() => {
    if (!containerWidth) return

    if (chartsRef.current.main) {
      chartsRef.current.main.applyOptions({ width: containerWidth, height })
    }
    if (chartsRef.current.volume) {
      chartsRef.current.volume.applyOptions({ width: containerWidth, height: subPaneHeight })
    }
    if (chartsRef.current.rsi) {
      chartsRef.current.rsi.applyOptions({ width: containerWidth, height: subPaneHeight })
    }
    if (chartsRef.current.macd) {
      chartsRef.current.macd.applyOptions({ width: containerWidth, height: subPaneHeight })
    }
  }, [containerWidth, height, subPaneHeight])

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

            {hasVolume && (
              <span className="text-slate-400">V <span className="text-slate-200">{hud.volume == null ? '—' : Number(hud.volume).toLocaleString()}</span></span>
            )}
            {hasRsi && (
              <span className="text-slate-400">RSI <span className="text-slate-200">{fmt(hud.rsi)}</span></span>
            )}
            {hasMacd && (
              <>
                <span className="text-slate-400">DIFF <span className="text-slate-200">{fmt(hud.macdDiff)}</span></span>
                <span className="text-slate-400">DEA <span className="text-slate-200">{fmt(hud.macdDea)}</span></span>
                <span className="text-slate-400">MACD <span className="text-slate-200">{fmt(hud.macdHist)}</span></span>
              </>
            )}
          </>
        ) : (
          <span className="text-slate-600">移动光标查看 OHLC 数据</span>
        )}
      </div>

      {/* 图表容器（主图 + 副图） */}
      <div
        ref={rootRef}
        style={{ paddingTop: '28px' }}
      >
        <div ref={mainContainerRef} style={{ height }} />

        {hasVolume && (
          <div style={{ borderTop: `1px solid ${BASE_COLORS.border}` }}>
            <div ref={volumeContainerRef} style={{ height: subPaneHeight }} />
          </div>
        )}

        {hasRsi && (
          <div style={{ borderTop: `1px solid ${BASE_COLORS.border}` }}>
            <div ref={rsiContainerRef} style={{ height: subPaneHeight }} />
          </div>
        )}

        {hasMacd && (
          <div style={{ borderTop: `1px solid ${BASE_COLORS.border}` }}>
            <div ref={macdContainerRef} style={{ height: subPaneHeight }} />
          </div>
        )}
      </div>
    </div>
  )
}
