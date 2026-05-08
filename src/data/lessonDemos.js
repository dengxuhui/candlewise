// 静态示例 K 线数据（按 candle-demo key 索引）

// lesson_1_1: 一根阳线 + 一根阴线
const DEMO_CANDLES = [
  { date: '2024-01-01', open: 100, high: 115, low: 93, close: 112, ma5: null, ma20: null },
  { date: '2024-01-02', open: 112, high: 118, low: 98, close: 102, ma5: null, ma20: null },
]

// lesson_1_2
const DEMO_OHlC_STRUCTURE = [
  { date: '2024-01-01', open: 100, high: 120, low: 85, close: 110, ma5: null, ma20: null },
]
const DEMO_OHLC_BULLISH = [
  { date: '2024-01-01', open: 95, high: 118, low: 90, close: 115, ma5: null, ma20: null },
]
const DEMO_OHLC_BEARISH = [
  { date: '2024-01-01', open: 115, high: 120, low: 88, close: 92, ma5: null, ma20: null },
]

// lesson_1_3
const DEMO_UPPER_SHADOW = [
  { date: '2024-01-01', open: 100, high: 128, low: 97, close: 103, ma5: null, ma20: null },
]
const DEMO_LOWER_SHADOW = [
  { date: '2024-01-01', open: 100, high: 105, low: 72, close: 98, ma5: null, ma20: null },
]
const DEMO_HAMMER = [
  { date: '2024-01-01', open: 100, high: 104, low: 72, close: 102, ma5: null, ma20: null },
]
const DEMO_SHOOTING_STAR = [
  { date: '2024-01-01', open: 100, high: 128, low: 97, close: 98, ma5: null, ma20: null },
]
const DEMO_DOJI = [
  { date: '2024-01-01', open: 100, high: 115, low: 85, close: 100, ma5: null, ma20: null },
]

// lesson_2_1
const DEMO_MORNING_STAR = [
  { date: '2024-01-01', open: 110, high: 112, low: 95, close: 96, ma5: null, ma20: null },
  { date: '2024-01-02', open: 94, high: 97, low: 90, close: 93, ma5: null, ma20: null },
  { date: '2024-01-03', open: 94, high: 115, low: 93, close: 113, ma5: null, ma20: null },
]
const DEMO_EVENING_STAR = [
  { date: '2024-01-01', open: 92, high: 115, low: 91, close: 113, ma5: null, ma20: null },
  { date: '2024-01-02', open: 114, high: 118, low: 112, close: 115, ma5: null, ma20: null },
  { date: '2024-01-03', open: 113, high: 114, low: 93, close: 94, ma5: null, ma20: null },
]

// lesson_2_2
const DEMO_BULLISH_ENGULFING = [
  { date: '2024-01-01', open: 108, high: 110, low: 100, close: 102, ma5: null, ma20: null },
  { date: '2024-01-02', open: 99, high: 115, low: 97, close: 113, ma5: null, ma20: null },
]
const DEMO_BEARISH_ENGULFING = [
  { date: '2024-01-01', open: 100, high: 112, low: 98, close: 110, ma5: null, ma20: null },
  { date: '2024-01-02', open: 113, high: 115, low: 97, close: 99, ma5: null, ma20: null },
]

// lesson_2_3
const DEMO_THREE_WHITE_SOLDIERS = [
  { date: '2024-01-01', open: 100, high: 108, low: 99, close: 106, ma5: null, ma20: null },
  { date: '2024-01-02', open: 104, high: 114, low: 103, close: 112, ma5: null, ma20: null },
  { date: '2024-01-03', open: 110, high: 122, low: 109, close: 120, ma5: null, ma20: null },
]
const DEMO_THREE_BLACK_CROWS = [
  { date: '2024-01-01', open: 120, high: 121, low: 111, close: 113, ma5: null, ma20: null },
  { date: '2024-01-02', open: 115, high: 116, low: 105, close: 107, ma5: null, ma20: null },
  { date: '2024-01-03', open: 109, high: 110, low: 99, close: 101, ma5: null, ma20: null },
]

// lesson_3_1 — support/resistance shown via price + MA lines acting as levels
const DEMO_SUPPORT_LEVEL = [
  { date: '2024-01-01', open: 115, high: 120, low: 100, close: 118, ma5: 100, ma20: 100 },
  { date: '2024-01-02', open: 112, high: 116, low: 100, close: 114, ma5: 100, ma20: 100 },
  { date: '2024-01-03', open: 108, high: 113, low: 100, close: 111, ma5: 100, ma20: 100 },
  { date: '2024-01-04', open: 104, high: 110, low: 100, close: 108, ma5: 100, ma20: 100 },
  { date: '2024-01-05', open: 102, high: 108, low: 100, close: 106, ma5: 100, ma20: 100 },
]
const DEMO_RESISTANCE_LEVEL = [
  { date: '2024-01-01', open: 90, high: 100, low: 86, close: 92, ma5: 100, ma20: 100 },
  { date: '2024-01-02', open: 93, high: 100, low: 89, close: 96, ma5: 100, ma20: 100 },
  { date: '2024-01-03', open: 97, high: 100, low: 93, close: 94, ma5: 100, ma20: 100 },
  { date: '2024-01-04', open: 93, high: 100, low: 89, close: 91, ma5: 100, ma20: 100 },
  { date: '2024-01-05', open: 90, high: 100, low: 85, close: 88, ma5: 100, ma20: 100 },
]
const DEMO_SUPPORT_RESISTANCE_FORMATION = [
  { date: '2024-01-01', open: 90, high: 105, low: 88, close: 103, ma5: 88, ma20: 88 },
  { date: '2024-01-02', open: 104, high: 115, low: 102, close: 113, ma5: 88, ma20: 88 },
  { date: '2024-01-03', open: 112, high: 118, low: 100, close: 102, ma5: 88, ma20: 88 },
  { date: '2024-01-04', open: 101, high: 116, low: 99, close: 114, ma5: 88, ma20: 88 },
  { date: '2024-01-05', open: 113, high: 119, low: 101, close: 103, ma5: 88, ma20: 88 },
  { date: '2024-01-06', open: 102, high: 118, low: 100, close: 116, ma5: 88, ma20: 88 },
]

// lesson_3_2
const DEMO_RESISTANCE_TO_SUPPORT = [
  { date: '2024-01-01', open: 88, high: 100, low: 85, close: 92, ma5: 100, ma20: 100 },
  { date: '2024-01-02', open: 93, high: 100, low: 90, close: 97, ma5: 100, ma20: 100 },
  { date: '2024-01-03', open: 98, high: 108, low: 97, close: 106, ma5: 100, ma20: 100 },
  { date: '2024-01-04', open: 105, high: 107, low: 100, close: 101, ma5: 100, ma20: 100 },
  { date: '2024-01-05', open: 101, high: 112, low: 99, close: 110, ma5: 100, ma20: 100 },
]
const DEMO_SUPPORT_TO_RESISTANCE = [
  { date: '2024-01-01', open: 110, high: 114, low: 100, close: 112, ma5: 100, ma20: 100 },
  { date: '2024-01-02', open: 111, high: 113, low: 100, close: 108, ma5: 100, ma20: 100 },
  { date: '2024-01-03', open: 107, high: 109, low: 92, close: 94, ma5: 100, ma20: 100 },
  { date: '2024-01-04', open: 95, high: 100, low: 91, close: 97, ma5: 100, ma20: 100 },
  { date: '2024-01-05', open: 97, high: 100, low: 86, close: 88, ma5: 100, ma20: 100 },
]

// lesson_4_1
const DEMO_FALSE_HAMMER = [
  { date: '2024-01-01', open: 102, high: 105, low: 78, close: 100, ma5: null, ma20: null },
]
const DEMO_FALSE_HAMMER_CONTEXT = [
  { date: '2023-12-26', open: 118, high: 121, low: 112, close: 114, ma5: null, ma20: null },
  { date: '2023-12-27', open: 113, high: 116, low: 107, close: 109, ma5: null, ma20: null },
  { date: '2023-12-28', open: 108, high: 110, low: 103, close: 105, ma5: null, ma20: null },
  { date: '2023-12-29', open: 104, high: 106, low: 99, close: 101, ma5: null, ma20: null },
  { date: '2024-01-01', open: 100, high: 103, low: 78, close: 99, ma5: null, ma20: null },
  { date: '2024-01-02', open: 98, high: 100, low: 90, close: 92, ma5: null, ma20: null },
  { date: '2024-01-03', open: 91, high: 94, low: 85, close: 87, ma5: null, ma20: null },
]
const DEMO_CONFLUENCE_EXAMPLE = [
  { date: '2024-01-01', open: 118, high: 121, low: 112, close: 114, ma5: 116, ma20: 104 },
  { date: '2024-01-02', open: 113, high: 116, low: 107, close: 109, ma5: 113, ma20: 104 },
  { date: '2024-01-03', open: 108, high: 110, low: 103, close: 105, ma5: 110, ma20: 104 },
  { date: '2024-01-04', open: 104, high: 107, low: 102, close: 106, ma5: 107, ma20: 104 },
  { date: '2024-01-05', open: 107, high: 114, low: 106, close: 113, ma5: 108, ma20: 105 },
]

// lesson_4_2
const DEMO_MA20_BOUNCE = [
  { date: '2024-01-01', open: 115, high: 120, low: 112, close: 118, ma5: 116, ma20: 110 },
  { date: '2024-01-02', open: 117, high: 119, low: 110, close: 112, ma5: 115, ma20: 111 },
  { date: '2024-01-03', open: 111, high: 114, low: 110, close: 113, ma5: 114, ma20: 111 },
  { date: '2024-01-04', open: 113, high: 119, low: 112, close: 118, ma5: 114, ma20: 112 },
  { date: '2024-01-05', open: 118, high: 124, low: 117, close: 123, ma5: 117, ma20: 113 },
]
const DEMO_MA20_REJECT = [
  { date: '2024-01-01', open: 88, high: 93, low: 84, close: 86, ma5: 90, ma20: 100 },
  { date: '2024-01-02', open: 87, high: 95, low: 86, close: 93, ma5: 89, ma20: 99 },
  { date: '2024-01-03', open: 94, high: 100, low: 92, close: 94, ma5: 90, ma20: 99 },
  { date: '2024-01-04', open: 93, high: 97, low: 87, close: 89, ma5: 91, ma20: 98 },
  { date: '2024-01-05', open: 88, high: 92, low: 82, close: 84, ma5: 89, ma20: 97 },
]
const DEMO_VOLUME_CONFIRM = [
  { date: '2024-01-01', open: 100, high: 104, low: 78, close: 102, ma5: null, ma20: null },
  { date: '2024-01-02', open: 103, high: 110, low: 102, close: 109, ma5: null, ma20: null },
]
const DEMO_BULLISH_CONFLUENCE = [
  { date: '2024-01-01', open: 124, high: 127, low: 119, close: 121, ma5: 123, ma20: 115 },
  { date: '2024-01-02', open: 120, high: 122, low: 115, close: 117, ma5: 121, ma20: 115 },
  { date: '2024-01-03', open: 116, high: 118, low: 114, close: 116, ma5: 119, ma20: 115 },
  { date: '2024-01-04', open: 115, high: 117, low: 111, close: 115, ma5: 117, ma20: 115 },
  { date: '2024-01-05', open: 116, high: 125, low: 115, close: 124, ma5: 118, ma20: 116 },
]
const DEMO_BEARISH_CONFLUENCE = [
  { date: '2024-01-01', open: 90, high: 105, low: 89, close: 103, ma5: 96, ma20: 94 },
  { date: '2024-01-02', open: 104, high: 115, low: 103, close: 113, ma5: 100, ma20: 95 },
  { date: '2024-01-03', open: 114, high: 118, low: 112, close: 115, ma5: 106, ma20: 96 },
  { date: '2024-01-04', open: 114, high: 115, low: 100, close: 102, ma5: 110, ma20: 97 },
  { date: '2024-01-05', open: 101, high: 103, low: 93, close: 95, ma5: 106, ma20: 97 },
]

// lesson_4_3
const DEMO_TREND_UP = [
  { date: '2024-01-01', open: 90, high: 95, low: 88, close: 93, ma5: 91, ma20: 88 },
  { date: '2024-01-02', open: 94, high: 100, low: 93, close: 99, ma5: 94, ma20: 89 },
  { date: '2024-01-03', open: 100, high: 106, low: 99, close: 105, ma5: 97, ma20: 91 },
  { date: '2024-01-04', open: 105, high: 109, low: 103, close: 107, ma5: 101, ma20: 93 },
  { date: '2024-01-05', open: 107, high: 114, low: 106, close: 113, ma5: 103, ma20: 95 },
  { date: '2024-01-08', open: 113, high: 118, low: 111, close: 116, ma5: 107, ma20: 97 },
]
const DEMO_TREND_DOWN = [
  { date: '2024-01-01', open: 116, high: 118, low: 111, close: 113, ma5: 116, ma20: 120 },
  { date: '2024-01-02', open: 112, high: 114, low: 107, close: 108, ma5: 114, ma20: 119 },
  { date: '2024-01-03', open: 107, high: 109, low: 102, close: 103, ma5: 111, ma20: 117 },
  { date: '2024-01-04', open: 102, high: 104, low: 97, close: 98, ma5: 108, ma20: 115 },
  { date: '2024-01-05', open: 97, high: 100, low: 93, close: 94, ma5: 103, ma20: 113 },
  { date: '2024-01-08', open: 93, high: 96, low: 88, close: 89, ma5: 101, ma20: 111 },
]
const DEMO_KEY_LEVELS = [
  { date: '2024-01-01', open: 88, high: 100, low: 86, close: 98, ma5: 90, ma20: 92 },
  { date: '2024-01-02', open: 99, high: 100, low: 95, close: 96, ma5: 92, ma20: 92 },
  { date: '2024-01-03', open: 96, high: 100, low: 92, close: 94, ma5: 94, ma20: 93 },
  { date: '2024-01-04', open: 94, high: 99, low: 91, close: 97, ma5: 95, ma20: 93 },
  { date: '2024-01-05', open: 98, high: 100, low: 95, close: 96, ma5: 96, ma20: 94 },
]
const DEMO_PATTERN_AT_LEVEL = [
  { date: '2024-01-01', open: 115, high: 120, low: 110, close: 117, ma5: 113, ma20: 106 },
  { date: '2024-01-02', open: 116, high: 118, low: 110, close: 111, ma5: 113, ma20: 106 },
  { date: '2024-01-03', open: 110, high: 112, low: 105, close: 107, ma5: 112, ma20: 106 },
  { date: '2024-01-04', open: 106, high: 108, low: 102, close: 106, ma5: 111, ma20: 106 },
  { date: '2024-01-05', open: 107, high: 116, low: 106, close: 115, ma5: 111, ma20: 107 },
]
const DEMO_VOLUME_AT_PATTERN = [
  { date: '2024-01-01', open: 115, high: 119, low: 110, close: 117, ma5: 112, ma20: 106 },
  { date: '2024-01-02', open: 116, high: 118, low: 109, close: 110, ma5: 112, ma20: 106 },
  { date: '2024-01-03', open: 110, high: 112, low: 104, close: 106, ma5: 112, ma20: 106 },
  { date: '2024-01-04', open: 105, high: 108, low: 101, close: 105, ma5: 111, ma20: 106 },
  { date: '2024-01-05', open: 106, high: 117, low: 105, close: 116, ma5: 111, ma20: 107 },
]
const DEMO_FULL_ANALYSIS = [
  { date: '2024-01-01', open: 108, high: 115, low: 106, close: 113, ma5: 110, ma20: 104 },
  { date: '2024-01-02', open: 114, high: 118, low: 110, close: 116, ma5: 112, ma20: 105 },
  { date: '2024-01-03', open: 115, high: 117, low: 109, close: 111, ma5: 113, ma20: 106 },
  { date: '2024-01-04', open: 110, high: 112, low: 104, close: 105, ma5: 113, ma20: 106 },
  { date: '2024-01-05', open: 104, high: 106, low: 103, close: 105, ma5: 112, ma20: 106 },
  { date: '2024-01-08', open: 106, high: 116, low: 105, close: 115, ma5: 112, ma20: 107 },
  { date: '2024-01-09', open: 116, high: 121, low: 114, close: 120, ma5: 114, ma20: 108 },
]

// lesson_3_3 — MA lines convey the cross / support / resistance
const DEMO_GOLDEN_CROSS = [
  { date: '2024-01-01', open: 95, high: 97, low: 92, close: 94, ma5: 93, ma20: 98 },
  { date: '2024-01-02', open: 94, high: 97, low: 93, close: 96, ma5: 95, ma20: 97 },
  { date: '2024-01-03', open: 97, high: 101, low: 96, close: 100, ma5: 97, ma20: 97 },
  { date: '2024-01-04', open: 100, high: 105, low: 99, close: 104, ma5: 100, ma20: 97 },
  { date: '2024-01-05', open: 104, high: 109, low: 103, close: 108, ma5: 104, ma20: 98 },
]
const DEMO_DEATH_CROSS = [
  { date: '2024-01-01', open: 105, high: 108, low: 103, close: 106, ma5: 107, ma20: 102 },
  { date: '2024-01-02', open: 105, high: 107, low: 102, close: 103, ma5: 105, ma20: 103 },
  { date: '2024-01-03', open: 102, high: 103, low: 98, close: 99, ma5: 103, ma20: 103 },
  { date: '2024-01-04', open: 98, high: 100, low: 94, close: 95, ma5: 100, ma20: 103 },
  { date: '2024-01-05', open: 94, high: 96, low: 90, close: 91, ma5: 97, ma20: 103 },
]
const DEMO_MA20_SUPPORT = [
  { date: '2024-01-01', open: 112, high: 118, low: 108, close: 116, ma5: 114, ma20: 108 },
  { date: '2024-01-02', open: 115, high: 117, low: 108, close: 110, ma5: 113, ma20: 109 },
  { date: '2024-01-03', open: 109, high: 114, low: 108, close: 113, ma5: 112, ma20: 110 },
  { date: '2024-01-04', open: 113, high: 120, low: 111, close: 119, ma5: 113, ma20: 111 },
  { date: '2024-01-05', open: 119, high: 125, low: 117, close: 124, ma5: 116, ma20: 112 },
]
const DEMO_MA20_RESISTANCE = [
  { date: '2024-01-01', open: 90, high: 95, low: 86, close: 88, ma5: 92, ma20: 98 },
  { date: '2024-01-02', open: 88, high: 93, low: 85, close: 91, ma5: 91, ma20: 97 },
  { date: '2024-01-03', open: 91, high: 97, low: 89, close: 93, ma5: 90, ma20: 97 },
  { date: '2024-01-04', open: 92, high: 97, low: 88, close: 89, ma5: 90, ma20: 97 },
  { date: '2024-01-05', open: 88, high: 93, low: 83, close: 85, ma5: 89, ma20: 96 },
]

export const CANDLE_DEMO_MAP = {
  '': { candles: DEMO_CANDLES, caption: '上影线 = 最高价 − max(开盘, 收盘) | 下影线 = min(开盘, 收盘) − 最低价' },
  'ohlc-structure': { candles: DEMO_OHlC_STRUCTURE, caption: '一根K线包含四个价格：开（O）高（H）低（L）收（C）' },
  'ohlc-bullish': { candles: DEMO_OHLC_BULLISH, caption: '阳线：收盘价 > 开盘价，实体为绿色' },
  'ohlc-bearish': { candles: DEMO_OHLC_BEARISH, caption: '阴线：收盘价 < 开盘价，实体为红色' },
  'upper-shadow': { candles: DEMO_UPPER_SHADOW, caption: '上影线：最高价高出收盘/开盘价的部分，代表上方卖压' },
  'lower-shadow': { candles: DEMO_LOWER_SHADOW, caption: '下影线：开盘/收盘低于最低价的反弹，代表下方买盘' },
  'hammer': { candles: DEMO_HAMMER, caption: '锤子线：长下影线，短实体，出现在下跌末端' },
  'shooting-star': { candles: DEMO_SHOOTING_STAR, caption: '流星线：长上影线，短实体，出现在上涨末端' },
  'doji': { candles: DEMO_DOJI, caption: '十字星：开盘价 ≈ 收盘价，多空力量均衡' },
  'morning-star': { candles: DEMO_MORNING_STAR, caption: '启明星：阴线 + 小星线 + 阳线，下跌末端反转信号' },
  'evening-star': { candles: DEMO_EVENING_STAR, caption: '黄昏之星：阳线 + 小星线 + 阴线，上涨末端反转信号' },
  'bullish-engulfing': { candles: DEMO_BULLISH_ENGULFING, caption: '阳线吞没：阳线实体完全包住前一根阴线，看涨反转' },
  'bearish-engulfing': { candles: DEMO_BEARISH_ENGULFING, caption: '阴线吞没：阴线实体完全包住前一根阳线，看跌反转' },
  'three-white-soldiers': { candles: DEMO_THREE_WHITE_SOLDIERS, caption: '三只白兵：连续三根有秩序的阳线，上涨趋势强势信号' },
  'three-black-crows': { candles: DEMO_THREE_BLACK_CROWS, caption: '三只乌鸦：连续三根有秩序的阴线，下跌趋势强势信号' },
  'support-level': { candles: DEMO_SUPPORT_LEVEL, caption: '支撑位：价格多次下跌后被托住、反弹的价格区域（MA线示意支撑）' },
  'resistance-level': { candles: DEMO_RESISTANCE_LEVEL, caption: '阻力位：价格多次上涨后被压回、回落的价格区域（MA线示意阻力）' },
  'support-resistance-formation': { candles: DEMO_SUPPORT_RESISTANCE_FORMATION, caption: '支撑/阻力的形成：多次触碰同一价位后，该位置成为关键区域' },
  'resistance-to-support': { candles: DEMO_RESISTANCE_TO_SUPPORT, caption: '阻力变支撑：价格突破阻力位后，原阻力位成为支撑（MA线示意）' },
  'support-to-resistance': { candles: DEMO_SUPPORT_TO_RESISTANCE, caption: '支撑变阻力：价格跌破支撑位后，原支撑位成为阻力（MA线示意）' },
  'golden-cross': { candles: DEMO_GOLDEN_CROSS, caption: '金叉：MA5（绿）从下方穿越MA20（橙），看涨信号' },
  'death-cross': { candles: DEMO_DEATH_CROSS, caption: '死叉：MA5（绿）从上方穿越MA20（橙），看跌信号' },
  'ma20-support': { candles: DEMO_MA20_SUPPORT, caption: 'MA20 动态支撑：上升趋势中价格触碰MA20后反弹' },
  'ma20-resistance': { candles: DEMO_MA20_RESISTANCE, caption: 'MA20 动态阻力：下降趋势中价格反弹至MA20后再跌' },
  'false-hammer': { candles: DEMO_FALSE_HAMMER, caption: '孤立的锤子线——缺乏背景验证，信号可信度低' },
  'false-hammer-context': { candles: DEMO_FALSE_HAMMER_CONTEXT, caption: '锤子线出现后价格继续下跌——假信号的真实案例' },
  'confluence-example': { candles: DEMO_CONFLUENCE_EXAMPLE, caption: '共振示例：锤子线 + MA20 支撑 + 均线向上，三者同向' },
  'ma20-bounce': { candles: DEMO_MA20_BOUNCE, caption: 'MA20 动态支撑：上升趋势中回调至MA20后反弹' },
  'ma20-reject': { candles: DEMO_MA20_REJECT, caption: 'MA20 动态阻力：下降趋势中反弹至MA20后被压回' },
  'volume-confirm': { candles: DEMO_VOLUME_CONFIRM, caption: '量价配合：锤子线 + 次日放量确认，反转信号增强' },
  'bullish-confluence': { candles: DEMO_BULLISH_CONFLUENCE, caption: '看涨三重共振：锤子线 + MA20 支撑位 + 均线向上' },
  'bearish-confluence': { candles: DEMO_BEARISH_CONFLUENCE, caption: '看跌三重共振：黄昏之星形态 + 触及阻力位 + 第3根放量' },
  'trend-up': { candles: DEMO_TREND_UP, caption: '上升趋势：MA20 方向向上，价格在 MA20 上方运行' },
  'trend-down': { candles: DEMO_TREND_DOWN, caption: '下降趋势：MA20 方向向下，价格在 MA20 下方运行' },
  'key-levels': { candles: DEMO_KEY_LEVELS, caption: '关键价位：MA线标示阻力位，价格多次触及后回落' },
  'pattern-at-level': { candles: DEMO_PATTERN_AT_LEVEL, caption: '关键位置的形态：锤子线出现在 MA20 支撑附近' },
  'volume-at-pattern': { candles: DEMO_VOLUME_AT_PATTERN, caption: '量的确认：形态出现当天成交量放大，验证反转力度' },
  'full-analysis': { candles: DEMO_FULL_ANALYSIS, caption: '完整四步分析：趋势向上 → MA20支撑 → 锤子线 → 放量反弹' },
}
