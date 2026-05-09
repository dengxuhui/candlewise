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
const DEMO_HANGING_MAN = [
  { date: '2024-01-01', open: 108, high: 110, low: 82, close: 106, ma5: null, ma20: null },
]
const DEMO_INVERTED_HAMMER = [
  { date: '2024-01-01', open: 95, high: 116, low: 93, close: 97, ma5: null, ma20: null },
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
const DEMO_DARK_CLOUD_COVER = [
  { date: '2024-01-01', open: 96, high: 118, low: 95, close: 116, ma5: null, ma20: null },
  { date: '2024-01-02', open: 119, high: 121, low: 102, close: 104, ma5: null, ma20: null },
]
const DEMO_PIERCING_LINE = [
  { date: '2024-01-01', open: 118, high: 119, low: 100, close: 102, ma5: null, ma20: null },
  { date: '2024-01-02', open: 98, high: 114, low: 96, close: 112, ma5: null, ma20: null },
]
const DEMO_HARAMI = [
  { date: '2024-01-01', open: 112, high: 114, low: 94, close: 96, ma5: null, ma20: null },
  { date: '2024-01-02', open: 99, high: 104, low: 98, close: 102, ma5: null, ma20: null },
]
const DEMO_HARAMI_CROSS = [
  { date: '2024-01-01', open: 96, high: 116, low: 94, close: 114, ma5: null, ma20: null },
  { date: '2024-01-02', open: 106, high: 110, low: 102, close: 106, ma5: null, ma20: null },
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
const DEMO_RISING_THREE_METHODS = [
  { date: '2024-01-01', open: 100, high: 116, low: 99, close: 114, ma5: null, ma20: null },
  { date: '2024-01-02', open: 113, high: 114, low: 107, close: 108, ma5: null, ma20: null },
  { date: '2024-01-03', open: 108, high: 110, low: 104, close: 105, ma5: null, ma20: null },
  { date: '2024-01-04', open: 105, high: 108, low: 103, close: 107, ma5: null, ma20: null },
  { date: '2024-01-05', open: 108, high: 122, low: 107, close: 121, ma5: null, ma20: null },
]
const DEMO_FALLING_THREE_METHODS = [
  { date: '2024-01-01', open: 122, high: 123, low: 108, close: 110, ma5: null, ma20: null },
  { date: '2024-01-02', open: 111, high: 116, low: 110, close: 115, ma5: null, ma20: null },
  { date: '2024-01-03', open: 114, high: 118, low: 113, close: 117, ma5: null, ma20: null },
  { date: '2024-01-04', open: 116, high: 119, low: 114, close: 115, ma5: null, ma20: null },
  { date: '2024-01-05', open: 114, high: 115, low: 101, close: 102, ma5: null, ma20: null },
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

// ── lesson_4_1 补充：带趋势背景的启明星与黄昏之星 ──────────────────────────
const DEMO_MORNING_STAR_CONTEXT = [
  { date: '2024-01-01', open: 120, high: 122, low: 114, close: 115, ma5: 119, ma20: 116 },
  { date: '2024-01-02', open: 114, high: 115, low: 108, close: 109, ma5: 117, ma20: 115 },
  { date: '2024-01-03', open: 108, high: 110, low: 105, close: 106, ma5: 114, ma20: 115 },
  { date: '2024-01-04', open: 105, high: 107, low: 102, close: 104, ma5: 111, ma20: 114 },
  // 启明星三根：大阴 + 小星 + 大阳
  { date: '2024-01-05', open: 103, high: 104, low: 95, close: 96, ma5: 106, ma20: 113 },
  { date: '2024-01-08', open: 94, high: 98, low: 92, close: 95, ma5: 102, ma20: 113 },
  { date: '2024-01-09', open: 96, high: 112, low: 95, close: 110, ma5: 102, ma20: 112 },
]
const DEMO_EVENING_STAR_CONTEXT = [
  { date: '2024-01-01', open: 92, high: 98, low: 91, close: 97, ma5: 94, ma20: 90 },
  { date: '2024-01-02', open: 97, high: 104, low: 96, close: 103, ma5: 97, ma20: 91 },
  { date: '2024-01-03', open: 103, high: 110, low: 102, close: 109, ma5: 101, ma20: 93 },
  { date: '2024-01-04', open: 109, high: 115, low: 108, close: 114, ma5: 105, ma20: 95 },
  // 黄昏之星三根：大阳 + 小星 + 大阴
  { date: '2024-01-05', open: 115, high: 122, low: 114, close: 121, ma5: 109, ma20: 97 },
  { date: '2024-01-08', open: 122, high: 124, low: 120, close: 122, ma5: 114, ma20: 99 },
  { date: '2024-01-09', open: 121, high: 122, low: 107, close: 108, ma5: 114, ma20: 100 },
]

// ── lesson_4_2 补充：弱化版三白兵与三乌鸦 ──────────────────────────────────
const DEMO_THREE_WHITE_SOLDIERS_WEAK = [
  // 有较长上影线的三白兵，说明遇到一定压力
  { date: '2024-01-01', open: 100, high: 113, low: 99, close: 106, ma5: null, ma20: null },
  { date: '2024-01-02', open: 105, high: 118, low: 104, close: 110, ma5: null, ma20: null },
  { date: '2024-01-03', open: 109, high: 124, low: 108, close: 113, ma5: null, ma20: null },
]
const DEMO_THREE_BLACK_CROWS_WEAK = [
  // 有较长下影线的三乌鸦，说明遇到一定承接
  { date: '2024-01-01', open: 120, high: 121, low: 108, close: 113, ma5: null, ma20: null },
  { date: '2024-01-02', open: 114, high: 115, low: 103, close: 108, ma5: null, ma20: null },
  { date: '2024-01-03', open: 109, high: 110, low: 97, close: 103, ma5: null, ma20: null },
]

// ── lesson_4_3 补充：上升三法细节示意 ──────────────────────────────────────
const DEMO_RISING_THREE_METHODS_DETAIL = [
  // 大阳线推动
  { date: '2024-01-01', open: 98, high: 116, low: 97, close: 114, ma5: null, ma20: null },
  // 三根小阴回踩（未跌破大阳线开盘）
  { date: '2024-01-02', open: 113, high: 114, low: 107, close: 108, ma5: null, ma20: null },
  { date: '2024-01-03', open: 108, high: 112, low: 105, close: 107, ma5: null, ma20: null },
  { date: '2024-01-04', open: 107, high: 110, low: 104, close: 109, ma5: null, ma20: null },
  // 再次突破，收高于大阳线收盘
  { date: '2024-01-05', open: 110, high: 124, low: 109, close: 122, ma5: null, ma20: null },
]

// ── lesson_5_2 补充：放量突破与缩量假突破 ──────────────────────────────────
const DEMO_VOLUME_BREAKOUT = [
  // 价格在阻力位附近整理，最后放量突破
  { date: '2024-01-01', open: 96, high: 100, low: 93, close: 98, ma5: 97, ma20: 95 },
  { date: '2024-01-02', open: 98, high: 100, low: 95, close: 99, ma5: 98, ma20: 96 },
  { date: '2024-01-03', open: 99, high: 100, low: 96, close: 98, ma5: 98, ma20: 96 },
  { date: '2024-01-04', open: 99, high: 100, low: 97, close: 99, ma5: 98, ma20: 97 },
  // 放量突破（ma5/ma20暗示K线位置）
  { date: '2024-01-05', open: 100, high: 110, low: 99, close: 109, ma5: 100, ma20: 97 },
  { date: '2024-01-08', open: 109, high: 112, low: 106, close: 111, ma5: 103, ma20: 98 },
]
const DEMO_VOLUME_FAKE_BREAKOUT = [
  // 缩量突破后迅速回落（假突破）
  { date: '2024-01-01', open: 96, high: 100, low: 93, close: 98, ma5: 97, ma20: 95 },
  { date: '2024-01-02', open: 98, high: 100, low: 95, close: 99, ma5: 98, ma20: 96 },
  // 缩量刚刚突破100
  { date: '2024-01-03', open: 100, high: 103, low: 99, close: 101, ma5: 98, ma20: 96 },
  // 次日迅速回落至100以下
  { date: '2024-01-04', open: 100, high: 100, low: 93, close: 94, ma5: 98, ma20: 96 },
  { date: '2024-01-05', open: 93, high: 96, low: 89, close: 91, ma5: 97, ma20: 96 },
]

// ── lesson_5_3 补充：MA5/MA20 多头排列 ────────────────────────────────────
const DEMO_MA5_MA20_TREND = [
  { date: '2024-01-01', open: 100, high: 103, low: 99, close: 102, ma5: 100, ma20: 96 },
  { date: '2024-01-02', open: 102, high: 106, low: 101, close: 105, ma5: 102, ma20: 97 },
  { date: '2024-01-03', open: 105, high: 109, low: 104, close: 108, ma5: 104, ma20: 98 },
  { date: '2024-01-04', open: 107, high: 112, low: 106, close: 111, ma5: 107, ma20: 100 },
  { date: '2024-01-05', open: 110, high: 116, low: 109, close: 115, ma5: 110, ma20: 102 },
  { date: '2024-01-08', open: 114, high: 120, low: 113, close: 119, ma5: 114, ma20: 104 },
]

// ── lesson_6_1 补充：假突破案例 ────────────────────────────────────────────
const DEMO_FALSE_BREAKOUT = [
  // 阻力位 = 120（MA线示意）
  { date: '2024-01-01', open: 112, high: 118, low: 111, close: 116, ma5: 114, ma20: 120 },
  { date: '2024-01-02', open: 116, high: 122, low: 115, close: 121, ma5: 116, ma20: 120 }, // 缩量假突破
  { date: '2024-01-03', open: 120, high: 121, low: 112, close: 113, ma5: 116, ma20: 120 }, // 回落
  { date: '2024-01-04', open: 112, high: 114, low: 107, close: 109, ma5: 115, ma20: 119 },
  { date: '2024-01-05', open: 108, high: 112, low: 105, close: 107, ma5: 113, ma20: 118 },
]

// ── lesson_6_2 补充：三重确认综合图 ───────────────────────────────────────
const DEMO_TRIPLE_CONFIRM_BULLISH = [
  // 下跌趋势背景（MA20向下）
  { date: '2024-01-01', open: 120, high: 121, low: 113, close: 114, ma5: 119, ma20: 122 },
  { date: '2024-01-02', open: 113, high: 114, low: 107, close: 108, ma5: 116, ma20: 121 },
  { date: '2024-01-03', open: 107, high: 109, low: 103, close: 105, ma5: 113, ma20: 120 },
  { date: '2024-01-04', open: 104, high: 106, low: 100, close: 102, ma5: 110, ma20: 119 },
  // 启明星底部（大阴 + 小星 + 大阳），触及支撑位（MA20），放量
  { date: '2024-01-05', open: 101, high: 103, low: 96, close: 97, ma5: 105, ma20: 118 },
  { date: '2024-01-08', open: 96, high: 99, low: 94, close: 96, ma5: 100, ma20: 117 },
  { date: '2024-01-09', open: 97, high: 113, low: 96, close: 112, ma5: 100, ma20: 116 },
  { date: '2024-01-10', open: 113, high: 117, low: 111, close: 116, ma5: 103, ma20: 115 },
]
const DEMO_TRIPLE_CONFIRM_BEARISH = [
  // 上涨趋势背景（MA20向上）
  { date: '2024-01-01', open: 92, high: 97, low: 91, close: 96, ma5: 93, ma20: 88 },
  { date: '2024-01-02', open: 96, high: 102, low: 95, close: 101, ma5: 96, ma20: 90 },
  { date: '2024-01-03', open: 101, high: 108, low: 100, close: 107, ma5: 100, ma20: 92 },
  { date: '2024-01-04', open: 107, high: 115, low: 106, close: 114, ma5: 104, ma20: 94 },
  // 黄昏之星顶部（大阳 + 小星 + 大阴），触及阻力位（MA20附近高位），放量
  { date: '2024-01-05', open: 115, high: 122, low: 114, close: 121, ma5: 108, ma20: 97 },
  { date: '2024-01-08', open: 122, high: 124, low: 120, close: 122, ma5: 112, ma20: 99 },
  { date: '2024-01-09', open: 121, high: 122, low: 108, close: 109, ma5: 114, ma20: 101 },
  { date: '2024-01-10', open: 108, high: 110, low: 103, close: 104, ma5: 112, ma20: 102 },
]

// ── lesson_6_3 补充：完整分析框架四步骤图 ─────────────────────────────────
const DEMO_ANALYSIS_FRAMEWORK = [
  // Step1: 确认趋势（上升趋势，MA20向上）
  { date: '2024-01-01', open: 96, high: 102, low: 95, close: 101, ma5: 98, ma20: 94 },
  { date: '2024-01-02', open: 101, high: 107, low: 100, close: 106, ma5: 101, ma20: 96 },
  { date: '2024-01-03', open: 105, high: 109, low: 103, close: 107, ma5: 104, ma20: 98 },
  // Step2: 找关键位（价格回踩MA20）
  { date: '2024-01-04', open: 106, high: 108, low: 102, close: 104, ma5: 105, ma20: 100 },
  { date: '2024-01-05', open: 103, high: 105, low: 100, close: 101, ma5: 104, ma20: 101 },
  // Step3: 识别形态（锤子线出现在MA20附近）
  { date: '2024-01-08', open: 100, high: 103, low: 94, close: 102, ma5: 104, ma20: 102 },
  // Step4: 量能确认（次日放量阳线）
  { date: '2024-01-09', open: 103, high: 114, low: 102, close: 113, ma5: 105, ma20: 103 },
  { date: '2024-01-10', open: 113, high: 119, low: 112, close: 118, ma5: 107, ma20: 104 },
]

// ── lesson_7_x 成交量分析 ─────────────────────────────────────────────────
const DEMO_INDICATORS = {
  volumeOnly: ['volume'],
  volumeRsi: ['volume', 'rsi'],
  volumeMacd: ['volume', 'macd'],
}

const DEMO_VOLUME_LANGUAGE_RISING = [
  { date: '2024-02-01', open: 100, high: 103, low: 99, close: 102, ma5: 100, ma20: 96, volume: 1200000, rsi: 52, macd_diff: 0.12, macd_dea: 0.08, macd_hist: 0.08, kdj_k: 56, kdj_d: 52, kdj_j: 64 },
  { date: '2024-02-02', open: 102, high: 106, low: 101, close: 105, ma5: 101, ma20: 97, volume: 1480000, rsi: 56, macd_diff: 0.19, macd_dea: 0.12, macd_hist: 0.14, kdj_k: 61, kdj_d: 55, kdj_j: 73 },
  { date: '2024-02-05', open: 105, high: 109, low: 104, close: 108, ma5: 103, ma20: 98, volume: 1710000, rsi: 60, macd_diff: 0.28, macd_dea: 0.17, macd_hist: 0.22, kdj_k: 66, kdj_d: 59, kdj_j: 80 },
  { date: '2024-02-06', open: 108, high: 113, low: 107, close: 112, ma5: 106, ma20: 99, volume: 1980000, rsi: 64, macd_diff: 0.37, macd_dea: 0.23, macd_hist: 0.28, kdj_k: 71, kdj_d: 63, kdj_j: 87 },
  { date: '2024-02-07', open: 112, high: 116, low: 111, close: 115, ma5: 109, ma20: 100, volume: 2260000, rsi: 68, macd_diff: 0.46, macd_dea: 0.3, macd_hist: 0.32, kdj_k: 75, kdj_d: 67, kdj_j: 91 },
]

const DEMO_VOLUME_LANGUAGE_FADING = [
  { date: '2024-02-01', open: 104, high: 108, low: 103, close: 107, ma5: 103, ma20: 99, volume: 2320000, rsi: 64, macd_diff: 0.42, macd_dea: 0.31, macd_hist: 0.22, kdj_k: 74, kdj_d: 69, kdj_j: 84 },
  { date: '2024-02-02', open: 107, high: 111, low: 106, close: 110, ma5: 105, ma20: 100, volume: 2050000, rsi: 66, macd_diff: 0.46, macd_dea: 0.35, macd_hist: 0.22, kdj_k: 76, kdj_d: 71, kdj_j: 86 },
  { date: '2024-02-05', open: 110, high: 114, low: 109, close: 113, ma5: 108, ma20: 101, volume: 1780000, rsi: 67, macd_diff: 0.49, macd_dea: 0.39, macd_hist: 0.2, kdj_k: 77, kdj_d: 73, kdj_j: 85 },
  { date: '2024-02-06', open: 113, high: 116, low: 111, close: 114, ma5: 110, ma20: 102, volume: 1520000, rsi: 66, macd_diff: 0.48, macd_dea: 0.42, macd_hist: 0.12, kdj_k: 74, kdj_d: 73, kdj_j: 76 },
  { date: '2024-02-07', open: 114, high: 115, low: 109, close: 110, ma5: 111, ma20: 103, volume: 1680000, rsi: 59, macd_diff: 0.39, macd_dea: 0.41, macd_hist: -0.04, kdj_k: 63, kdj_d: 70, kdj_j: 49 },
]

const DEMO_VOLUME_SPIKE_REVERSAL = [
  { date: '2024-02-08', open: 116, high: 118, low: 111, close: 112, ma5: 113, ma20: 104, volume: 1720000, rsi: 55, macd_diff: 0.31, macd_dea: 0.38, macd_hist: -0.14, kdj_k: 58, kdj_d: 66, kdj_j: 42 },
  { date: '2024-02-09', open: 112, high: 114, low: 108, close: 109, ma5: 112, ma20: 104, volume: 1850000, rsi: 51, macd_diff: 0.22, macd_dea: 0.35, macd_hist: -0.26, kdj_k: 51, kdj_d: 62, kdj_j: 29 },
  { date: '2024-02-12', open: 109, high: 110, low: 101, close: 103, ma5: 110, ma20: 103, volume: 3180000, rsi: 42, macd_diff: 0.03, macd_dea: 0.28, macd_hist: -0.5, kdj_k: 39, kdj_d: 54, kdj_j: 9 },
  { date: '2024-02-13', open: 103, high: 106, low: 100, close: 105, ma5: 108, ma20: 103, volume: 2420000, rsi: 45, macd_diff: -0.04, macd_dea: 0.22, macd_hist: -0.52, kdj_k: 42, kdj_d: 50, kdj_j: 25 },
  { date: '2024-02-14', open: 106, high: 109, low: 104, close: 108, ma5: 107, ma20: 103, volume: 1960000, rsi: 50, macd_diff: 0.04, macd_dea: 0.18, macd_hist: -0.28, kdj_k: 49, kdj_d: 49, kdj_j: 49 },
]

const DEMO_VOLUME_PRICE_SYNC = [
  { date: '2024-02-15', open: 98, high: 100, low: 96, close: 99, ma5: 98, ma20: 95, volume: 980000, rsi: 51, macd_diff: 0.08, macd_dea: 0.05, macd_hist: 0.06, kdj_k: 54, kdj_d: 52, kdj_j: 58 },
  { date: '2024-02-16', open: 99, high: 103, low: 98, close: 102, ma5: 99, ma20: 96, volume: 1230000, rsi: 56, macd_diff: 0.15, macd_dea: 0.08, macd_hist: 0.14, kdj_k: 60, kdj_d: 55, kdj_j: 70 },
  { date: '2024-02-19', open: 102, high: 106, low: 101, close: 105, ma5: 101, ma20: 97, volume: 1490000, rsi: 60, macd_diff: 0.24, macd_dea: 0.13, macd_hist: 0.22, kdj_k: 66, kdj_d: 59, kdj_j: 80 },
  { date: '2024-02-20', open: 105, high: 109, low: 104, close: 108, ma5: 103, ma20: 98, volume: 1780000, rsi: 64, macd_diff: 0.33, macd_dea: 0.19, macd_hist: 0.28, kdj_k: 71, kdj_d: 63, kdj_j: 87 },
  { date: '2024-02-21', open: 108, high: 113, low: 107, close: 112, ma5: 106, ma20: 99, volume: 2050000, rsi: 68, macd_diff: 0.42, macd_dea: 0.26, macd_hist: 0.32, kdj_k: 76, kdj_d: 67, kdj_j: 94 },
]

const DEMO_VOLUME_PRICE_DIVERGENCE = [
  { date: '2024-02-15', open: 98, high: 101, low: 97, close: 100, ma5: 99, ma20: 96, volume: 2060000, rsi: 58, macd_diff: 0.21, macd_dea: 0.16, macd_hist: 0.1, kdj_k: 62, kdj_d: 58, kdj_j: 70 },
  { date: '2024-02-16', open: 100, high: 104, low: 99, close: 103, ma5: 100, ma20: 97, volume: 1890000, rsi: 61, macd_diff: 0.26, macd_dea: 0.19, macd_hist: 0.14, kdj_k: 66, kdj_d: 60, kdj_j: 78 },
  { date: '2024-02-19', open: 103, high: 108, low: 102, close: 107, ma5: 102, ma20: 98, volume: 1640000, rsi: 64, macd_diff: 0.31, macd_dea: 0.22, macd_hist: 0.18, kdj_k: 69, kdj_d: 63, kdj_j: 81 },
  { date: '2024-02-20', open: 107, high: 111, low: 106, close: 110, ma5: 104, ma20: 99, volume: 1390000, rsi: 65, macd_diff: 0.34, macd_dea: 0.25, macd_hist: 0.18, kdj_k: 70, kdj_d: 65, kdj_j: 80 },
  { date: '2024-02-21', open: 110, high: 113, low: 108, close: 112, ma5: 106, ma20: 100, volume: 1180000, rsi: 63, macd_diff: 0.31, macd_dea: 0.27, macd_hist: 0.08, kdj_k: 66, kdj_d: 65, kdj_j: 68 },
]

const DEMO_BREAKOUT_VOLUME_VALIDATION = [
  { date: '2024-02-22', open: 96, high: 100, low: 95, close: 99, ma5: 98, ma20: 96, volume: 1020000, rsi: 51, macd_diff: 0.05, macd_dea: 0.03, macd_hist: 0.04, kdj_k: 53, kdj_d: 51, kdj_j: 57 },
  { date: '2024-02-23', open: 99, high: 100, low: 97, close: 98, ma5: 98, ma20: 96, volume: 960000, rsi: 49, macd_diff: 0.03, macd_dea: 0.03, macd_hist: 0, kdj_k: 50, kdj_d: 50, kdj_j: 50 },
  { date: '2024-02-26', open: 98, high: 101, low: 97, close: 100, ma5: 99, ma20: 96, volume: 1080000, rsi: 52, macd_diff: 0.06, macd_dea: 0.04, macd_hist: 0.04, kdj_k: 54, kdj_d: 51, kdj_j: 60 },
  { date: '2024-02-27', open: 100, high: 112, low: 99, close: 111, ma5: 102, ma20: 97, volume: 2840000, rsi: 66, macd_diff: 0.28, macd_dea: 0.11, macd_hist: 0.34, kdj_k: 74, kdj_d: 58, kdj_j: 106 },
  { date: '2024-02-28', open: 111, high: 115, low: 109, close: 114, ma5: 105, ma20: 98, volume: 2130000, rsi: 70, macd_diff: 0.41, macd_dea: 0.18, macd_hist: 0.46, kdj_k: 80, kdj_d: 64, kdj_j: 112 },
]

// ── lesson_8_x 振荡指标 ───────────────────────────────────────────────────
const DEMO_RSI_OVERBOUGHT_ZONE = [
  { date: '2024-03-01', open: 102, high: 107, low: 101, close: 106, ma5: 103, ma20: 98, volume: 1320000, rsi: 66, macd_diff: 0.32, macd_dea: 0.19, macd_hist: 0.26, kdj_k: 78, kdj_d: 68, kdj_j: 98 },
  { date: '2024-03-04', open: 106, high: 111, low: 105, close: 110, ma5: 105, ma20: 99, volume: 1460000, rsi: 71, macd_diff: 0.41, macd_dea: 0.24, macd_hist: 0.34, kdj_k: 83, kdj_d: 73, kdj_j: 103 },
  { date: '2024-03-05', open: 110, high: 114, low: 109, close: 113, ma5: 108, ma20: 100, volume: 1590000, rsi: 74, macd_diff: 0.49, macd_dea: 0.3, macd_hist: 0.38, kdj_k: 86, kdj_d: 77, kdj_j: 104 },
  { date: '2024-03-06', open: 113, high: 115, low: 108, close: 109, ma5: 109, ma20: 101, volume: 1640000, rsi: 67, macd_diff: 0.44, macd_dea: 0.33, macd_hist: 0.22, kdj_k: 72, kdj_d: 75, kdj_j: 66 },
  { date: '2024-03-07', open: 109, high: 111, low: 104, close: 105, ma5: 109, ma20: 101, volume: 1580000, rsi: 59, macd_diff: 0.31, macd_dea: 0.33, macd_hist: -0.04, kdj_k: 58, kdj_d: 70, kdj_j: 34 },
]

const DEMO_RSI_OVERSOLD_ZONE = [
  { date: '2024-03-01', open: 118, high: 119, low: 112, close: 113, ma5: 117, ma20: 122, volume: 1720000, rsi: 38, macd_diff: -0.42, macd_dea: -0.31, macd_hist: -0.22, kdj_k: 29, kdj_d: 36, kdj_j: 15 },
  { date: '2024-03-04', open: 113, high: 114, low: 107, close: 108, ma5: 115, ma20: 121, volume: 1850000, rsi: 33, macd_diff: -0.52, macd_dea: -0.37, macd_hist: -0.3, kdj_k: 23, kdj_d: 31, kdj_j: 7 },
  { date: '2024-03-05', open: 108, high: 109, low: 101, close: 102, ma5: 112, ma20: 120, volume: 2060000, rsi: 28, macd_diff: -0.65, macd_dea: -0.45, macd_hist: -0.4, kdj_k: 18, kdj_d: 26, kdj_j: 2 },
  { date: '2024-03-06', open: 102, high: 106, low: 100, close: 105, ma5: 109, ma20: 119, volume: 1910000, rsi: 33, macd_diff: -0.58, macd_dea: -0.48, macd_hist: -0.2, kdj_k: 28, kdj_d: 27, kdj_j: 30 },
  { date: '2024-03-07', open: 105, high: 109, low: 104, close: 108, ma5: 107, ma20: 118, volume: 1760000, rsi: 38, macd_diff: -0.49, macd_dea: -0.48, macd_hist: -0.02, kdj_k: 36, kdj_d: 30, kdj_j: 48 },
]

const DEMO_RSI_CENTERLINE = [
  { date: '2024-03-08', open: 96, high: 99, low: 95, close: 98, ma5: 97, ma20: 96, volume: 1010000, rsi: 46, macd_diff: 0.01, macd_dea: 0.02, macd_hist: -0.02, kdj_k: 48, kdj_d: 49, kdj_j: 46 },
  { date: '2024-03-11', open: 98, high: 102, low: 97, close: 101, ma5: 98, ma20: 96, volume: 1120000, rsi: 49, macd_diff: 0.04, macd_dea: 0.02, macd_hist: 0.04, kdj_k: 52, kdj_d: 50, kdj_j: 56 },
  { date: '2024-03-12', open: 101, high: 104, low: 100, close: 103, ma5: 100, ma20: 97, volume: 1250000, rsi: 52, macd_diff: 0.09, macd_dea: 0.04, macd_hist: 0.1, kdj_k: 58, kdj_d: 53, kdj_j: 68 },
  { date: '2024-03-13', open: 103, high: 107, low: 102, close: 106, ma5: 102, ma20: 97, volume: 1380000, rsi: 57, macd_diff: 0.15, macd_dea: 0.07, macd_hist: 0.16, kdj_k: 64, kdj_d: 57, kdj_j: 78 },
  { date: '2024-03-14', open: 106, high: 110, low: 105, close: 109, ma5: 104, ma20: 98, volume: 1490000, rsi: 61, macd_diff: 0.22, macd_dea: 0.1, macd_hist: 0.24, kdj_k: 69, kdj_d: 61, kdj_j: 85 },
]

const DEMO_KDJ_GOLDEN_CROSS = [
  { date: '2024-03-15', open: 94, high: 96, low: 90, close: 91, ma5: 95, ma20: 100, volume: 1620000, rsi: 35, macd_diff: -0.34, macd_dea: -0.24, macd_hist: -0.2, kdj_k: 18, kdj_d: 26, kdj_j: 2 },
  { date: '2024-03-18', open: 91, high: 93, low: 88, close: 89, ma5: 93, ma20: 99, volume: 1730000, rsi: 32, macd_diff: -0.39, macd_dea: -0.28, macd_hist: -0.22, kdj_k: 16, kdj_d: 22, kdj_j: 4 },
  { date: '2024-03-19', open: 89, high: 94, low: 88, close: 93, ma5: 92, ma20: 99, volume: 1690000, rsi: 38, macd_diff: -0.33, macd_dea: -0.29, macd_hist: -0.08, kdj_k: 28, kdj_d: 24, kdj_j: 36 },
  { date: '2024-03-20', open: 93, high: 98, low: 92, close: 97, ma5: 93, ma20: 98, volume: 1810000, rsi: 44, macd_diff: -0.22, macd_dea: -0.28, macd_hist: 0.12, kdj_k: 44, kdj_d: 30, kdj_j: 72 },
  { date: '2024-03-21', open: 97, high: 101, low: 96, close: 100, ma5: 94, ma20: 98, volume: 1880000, rsi: 49, macd_diff: -0.12, macd_dea: -0.25, macd_hist: 0.26, kdj_k: 58, kdj_d: 39, kdj_j: 96 },
]

const DEMO_KDJ_DEATH_CROSS = [
  { date: '2024-03-15', open: 106, high: 110, low: 105, close: 109, ma5: 104, ma20: 98, volume: 1540000, rsi: 66, macd_diff: 0.38, macd_dea: 0.25, macd_hist: 0.26, kdj_k: 84, kdj_d: 74, kdj_j: 104 },
  { date: '2024-03-18', open: 109, high: 113, low: 108, close: 112, ma5: 106, ma20: 99, volume: 1610000, rsi: 69, macd_diff: 0.44, macd_dea: 0.29, macd_hist: 0.3, kdj_k: 87, kdj_d: 79, kdj_j: 103 },
  { date: '2024-03-19', open: 112, high: 114, low: 109, close: 110, ma5: 108, ma20: 100, volume: 1580000, rsi: 64, macd_diff: 0.41, macd_dea: 0.31, macd_hist: 0.2, kdj_k: 74, kdj_d: 77, kdj_j: 68 },
  { date: '2024-03-20', open: 110, high: 111, low: 104, close: 105, ma5: 109, ma20: 101, volume: 1720000, rsi: 56, macd_diff: 0.29, macd_dea: 0.31, macd_hist: -0.04, kdj_k: 58, kdj_d: 71, kdj_j: 32 },
  { date: '2024-03-21', open: 105, high: 106, low: 99, close: 101, ma5: 108, ma20: 101, volume: 1840000, rsi: 49, macd_diff: 0.16, macd_dea: 0.28, macd_hist: -0.24, kdj_k: 42, kdj_d: 61, kdj_j: 4 },
]

const DEMO_RSI_DIVERGENCE_DEMO = [
  { date: '2024-03-22', open: 98, high: 100, low: 93, close: 94, ma5: 97, ma20: 101, volume: 1950000, rsi: 29, macd_diff: -0.41, macd_dea: -0.28, macd_hist: -0.26, kdj_k: 20, kdj_d: 29, kdj_j: 2 },
  { date: '2024-03-25', open: 94, high: 97, low: 92, close: 96, ma5: 96, ma20: 100, volume: 1710000, rsi: 34, macd_diff: -0.35, macd_dea: -0.29, macd_hist: -0.12, kdj_k: 29, kdj_d: 29, kdj_j: 29 },
  { date: '2024-03-26', open: 96, high: 98, low: 91, close: 92, ma5: 95, ma20: 100, volume: 2030000, rsi: 33, macd_diff: -0.33, macd_dea: -0.3, macd_hist: -0.06, kdj_k: 27, kdj_d: 28, kdj_j: 25 },
  { date: '2024-03-27', open: 92, high: 96, low: 90, close: 95, ma5: 94, ma20: 99, volume: 1760000, rsi: 39, macd_diff: -0.25, macd_dea: -0.29, macd_hist: 0.08, kdj_k: 38, kdj_d: 31, kdj_j: 52 },
  { date: '2024-03-28', open: 95, high: 99, low: 94, close: 98, ma5: 95, ma20: 99, volume: 1690000, rsi: 45, macd_diff: -0.16, macd_dea: -0.26, macd_hist: 0.2, kdj_k: 49, kdj_d: 37, kdj_j: 73 },
]

// ── lesson_9_x MACD 动能 ─────────────────────────────────────────────────
const DEMO_MACD_GOLDEN_CROSS = [
  { date: '2024-04-01', open: 94, high: 96, low: 90, close: 91, ma5: 95, ma20: 101, volume: 1820000, rsi: 36, macd_diff: -0.42, macd_dea: -0.31, macd_hist: -0.22, kdj_k: 24, kdj_d: 30, kdj_j: 12 },
  { date: '2024-04-02', open: 91, high: 93, low: 88, close: 89, ma5: 93, ma20: 100, volume: 1910000, rsi: 33, macd_diff: -0.46, macd_dea: -0.35, macd_hist: -0.22, kdj_k: 20, kdj_d: 27, kdj_j: 6 },
  { date: '2024-04-03', open: 89, high: 94, low: 88, close: 93, ma5: 92, ma20: 100, volume: 1760000, rsi: 39, macd_diff: -0.37, macd_dea: -0.35, macd_hist: -0.04, kdj_k: 31, kdj_d: 28, kdj_j: 37 },
  { date: '2024-04-04', open: 93, high: 98, low: 92, close: 97, ma5: 92, ma20: 99, volume: 1840000, rsi: 45, macd_diff: -0.25, macd_dea: -0.33, macd_hist: 0.16, kdj_k: 45, kdj_d: 33, kdj_j: 69 },
  { date: '2024-04-05', open: 97, high: 102, low: 96, close: 101, ma5: 94, ma20: 99, volume: 1930000, rsi: 51, macd_diff: -0.11, macd_dea: -0.29, macd_hist: 0.36, kdj_k: 58, kdj_d: 41, kdj_j: 92 },
]

const DEMO_MACD_DEATH_CROSS = [
  { date: '2024-04-01', open: 108, high: 112, low: 107, close: 111, ma5: 106, ma20: 100, volume: 1620000, rsi: 67, macd_diff: 0.41, macd_dea: 0.29, macd_hist: 0.24, kdj_k: 82, kdj_d: 74, kdj_j: 98 },
  { date: '2024-04-02', open: 111, high: 115, low: 110, close: 114, ma5: 108, ma20: 101, volume: 1690000, rsi: 70, macd_diff: 0.45, macd_dea: 0.33, macd_hist: 0.24, kdj_k: 85, kdj_d: 78, kdj_j: 99 },
  { date: '2024-04-03', open: 114, high: 116, low: 109, close: 110, ma5: 109, ma20: 102, volume: 1710000, rsi: 63, macd_diff: 0.37, macd_dea: 0.34, macd_hist: 0.06, kdj_k: 72, kdj_d: 76, kdj_j: 64 },
  { date: '2024-04-04', open: 110, high: 111, low: 104, close: 105, ma5: 110, ma20: 102, volume: 1860000, rsi: 55, macd_diff: 0.24, macd_dea: 0.32, macd_hist: -0.16, kdj_k: 57, kdj_d: 70, kdj_j: 31 },
  { date: '2024-04-05', open: 105, high: 106, low: 99, close: 101, ma5: 108, ma20: 102, volume: 1980000, rsi: 48, macd_diff: 0.11, macd_dea: 0.28, macd_hist: -0.34, kdj_k: 43, kdj_d: 61, kdj_j: 7 },
]

const DEMO_MACD_HIST_EXPANSION = [
  { date: '2024-04-08', open: 99, high: 102, low: 98, close: 101, ma5: 99, ma20: 96, volume: 1180000, rsi: 53, macd_diff: 0.12, macd_dea: 0.09, macd_hist: 0.06, kdj_k: 55, kdj_d: 52, kdj_j: 61 },
  { date: '2024-04-09', open: 101, high: 105, low: 100, close: 104, ma5: 100, ma20: 97, volume: 1290000, rsi: 57, macd_diff: 0.2, macd_dea: 0.12, macd_hist: 0.16, kdj_k: 61, kdj_d: 55, kdj_j: 73 },
  { date: '2024-04-10', open: 104, high: 108, low: 103, close: 107, ma5: 102, ma20: 98, volume: 1410000, rsi: 61, macd_diff: 0.29, macd_dea: 0.16, macd_hist: 0.26, kdj_k: 67, kdj_d: 59, kdj_j: 83 },
  { date: '2024-04-11', open: 107, high: 112, low: 106, close: 111, ma5: 105, ma20: 99, volume: 1560000, rsi: 65, macd_diff: 0.39, macd_dea: 0.21, macd_hist: 0.36, kdj_k: 73, kdj_d: 63, kdj_j: 93 },
  { date: '2024-04-12', open: 111, high: 116, low: 110, close: 115, ma5: 108, ma20: 100, volume: 1680000, rsi: 69, macd_diff: 0.49, macd_dea: 0.27, macd_hist: 0.44, kdj_k: 78, kdj_d: 68, kdj_j: 98 },
]

const DEMO_MACD_HIST_CONTRACTION = [
  { date: '2024-04-08', open: 115, high: 117, low: 111, close: 112, ma5: 114, ma20: 108, volume: 1740000, rsi: 62, macd_diff: 0.41, macd_dea: 0.22, macd_hist: 0.38, kdj_k: 74, kdj_d: 66, kdj_j: 90 },
  { date: '2024-04-09', open: 112, high: 113, low: 108, close: 109, ma5: 113, ma20: 108, volume: 1680000, rsi: 58, macd_diff: 0.37, macd_dea: 0.25, macd_hist: 0.24, kdj_k: 67, kdj_d: 66, kdj_j: 69 },
  { date: '2024-04-10', open: 109, high: 110, low: 105, close: 106, ma5: 111, ma20: 107, volume: 1620000, rsi: 54, macd_diff: 0.31, macd_dea: 0.26, macd_hist: 0.1, kdj_k: 59, kdj_d: 64, kdj_j: 49 },
  { date: '2024-04-11', open: 106, high: 108, low: 102, close: 103, ma5: 108, ma20: 107, volume: 1690000, rsi: 49, macd_diff: 0.22, macd_dea: 0.25, macd_hist: -0.06, kdj_k: 48, kdj_d: 59, kdj_j: 26 },
  { date: '2024-04-12', open: 103, high: 105, low: 99, close: 100, ma5: 106, ma20: 106, volume: 1820000, rsi: 44, macd_diff: 0.11, macd_dea: 0.22, macd_hist: -0.22, kdj_k: 36, kdj_d: 51, kdj_j: 6 },
]

const DEMO_MACD_BULLISH_DIVERGENCE = [
  { date: '2024-04-15', open: 97, high: 99, low: 92, close: 93, ma5: 96, ma20: 101, volume: 1860000, rsi: 30, macd_diff: -0.48, macd_dea: -0.31, macd_hist: -0.34, kdj_k: 21, kdj_d: 30, kdj_j: 3 },
  { date: '2024-04-16', open: 93, high: 95, low: 90, close: 91, ma5: 95, ma20: 100, volume: 1790000, rsi: 29, macd_diff: -0.44, macd_dea: -0.33, macd_hist: -0.22, kdj_k: 19, kdj_d: 27, kdj_j: 3 },
  { date: '2024-04-17', open: 91, high: 93, low: 89, close: 90, ma5: 93, ma20: 100, volume: 1710000, rsi: 32, macd_diff: -0.38, macd_dea: -0.34, macd_hist: -0.08, kdj_k: 23, kdj_d: 26, kdj_j: 17 },
  { date: '2024-04-18', open: 90, high: 95, low: 89, close: 94, ma5: 92, ma20: 99, volume: 1680000, rsi: 38, macd_diff: -0.28, macd_dea: -0.33, macd_hist: 0.1, kdj_k: 36, kdj_d: 29, kdj_j: 50 },
  { date: '2024-04-19', open: 94, high: 99, low: 93, close: 98, ma5: 93, ma20: 99, volume: 1730000, rsi: 45, macd_diff: -0.16, macd_dea: -0.3, macd_hist: 0.28, kdj_k: 49, kdj_d: 35, kdj_j: 77 },
]

const DEMO_MACD_BEARISH_DIVERGENCE = [
  { date: '2024-04-15', open: 104, high: 109, low: 103, close: 108, ma5: 103, ma20: 98, volume: 1490000, rsi: 66, macd_diff: 0.46, macd_dea: 0.27, macd_hist: 0.38, kdj_k: 81, kdj_d: 72, kdj_j: 99 },
  { date: '2024-04-16', open: 108, high: 113, low: 107, close: 112, ma5: 105, ma20: 99, volume: 1560000, rsi: 69, macd_diff: 0.5, macd_dea: 0.31, macd_hist: 0.38, kdj_k: 84, kdj_d: 76, kdj_j: 100 },
  { date: '2024-04-17', open: 112, high: 116, low: 111, close: 115, ma5: 108, ma20: 100, volume: 1470000, rsi: 67, macd_diff: 0.47, macd_dea: 0.34, macd_hist: 0.26, kdj_k: 80, kdj_d: 77, kdj_j: 86 },
  { date: '2024-04-18', open: 115, high: 117, low: 112, close: 113, ma5: 110, ma20: 101, volume: 1520000, rsi: 62, macd_diff: 0.39, macd_dea: 0.35, macd_hist: 0.08, kdj_k: 70, kdj_d: 75, kdj_j: 60 },
  { date: '2024-04-19', open: 113, high: 114, low: 107, close: 108, ma5: 111, ma20: 102, volume: 1680000, rsi: 55, macd_diff: 0.26, macd_dea: 0.33, macd_hist: -0.14, kdj_k: 56, kdj_d: 69, kdj_j: 30 },
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
  'hanging-man': { candles: DEMO_HANGING_MAN, caption: '吊颈线：形似锤子线，但出现在上涨末端，警惕见顶' },
  'inverted-hammer': { candles: DEMO_INVERTED_HAMMER, caption: '倒锤子线：长上影短实体，出现在下跌末端需确认' },
  'doji': { candles: DEMO_DOJI, caption: '十字星：开盘价 ≈ 收盘价，多空力量均衡' },
  'morning-star': { candles: DEMO_MORNING_STAR, caption: '启明星：阴线 + 小星线 + 阳线，下跌末端反转信号' },
  'evening-star': { candles: DEMO_EVENING_STAR, caption: '黄昏之星：阳线 + 小星线 + 阴线，上涨末端反转信号' },
  'bullish-engulfing': { candles: DEMO_BULLISH_ENGULFING, caption: '阳线吞没：阳线实体完全包住前一根阴线，看涨反转' },
  'bearish-engulfing': { candles: DEMO_BEARISH_ENGULFING, caption: '阴线吞没：阴线实体完全包住前一根阳线，看跌反转' },
  'dark-cloud-cover': { candles: DEMO_DARK_CLOUD_COVER, caption: '乌云盖顶：高开回落，收盘压入前阳线实体中部以下' },
  'piercing-line': { candles: DEMO_PIERCING_LINE, caption: '刺透形态：低开回升，收盘刺入前阴线实体中部以上' },
  'harami': { candles: DEMO_HARAMI, caption: '孕线：前大后小，第二根实体被包在第一根实体内部' },
  'harami-cross': { candles: DEMO_HARAMI_CROSS, caption: '十字孕线：孕线结构中第二根为十字星，犹豫更强' },
  'three-white-soldiers': { candles: DEMO_THREE_WHITE_SOLDIERS, caption: '三只白兵：连续三根有秩序的阳线，上涨趋势强势信号' },
  'three-black-crows': { candles: DEMO_THREE_BLACK_CROWS, caption: '三只乌鸦：连续三根有秩序的阴线，下跌趋势强势信号' },
  'rising-three-methods': { candles: DEMO_RISING_THREE_METHODS, caption: '上升三法：上涨中继结构，回撤后再创新高' },
  'falling-three-methods': { candles: DEMO_FALLING_THREE_METHODS, caption: '下降三法：下跌中继结构，反弹后再创新低' },
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

  // ── lesson_4_1 补充 key ────────────────────────────────────────────────
  'morning-star-context': { candles: DEMO_MORNING_STAR_CONTEXT, caption: '启明星背景示例：下跌趋势中出现大阴 + 小星 + 大阳，底部反转' },
  'evening-star-context': { candles: DEMO_EVENING_STAR_CONTEXT, caption: '黄昏之星背景示例：上涨趋势中出现大阳 + 小星 + 大阴，顶部反转' },

  // ── lesson_4_2 补充 key ────────────────────────────────────────────────
  'three-white-soldiers-weak': { candles: DEMO_THREE_WHITE_SOLDIERS_WEAK, caption: '弱化三白兵：上影线较长，说明上方有压力，信号强度下降' },
  'three-black-crows-weak': { candles: DEMO_THREE_BLACK_CROWS_WEAK, caption: '弱化三乌鸦：下影线较长，说明下方有承接，信号强度下降' },

  // ── lesson_4_3 补充 key ────────────────────────────────────────────────
  'rising-three-methods-detail': { candles: DEMO_RISING_THREE_METHODS_DETAIL, caption: '上升三法细节：大阳推进 → 三根小阴回踩（未破大阳开盘） → 再创新高' },

  // ── lesson_5_2 补充 key ────────────────────────────────────────────────
  'volume-breakout': { candles: DEMO_VOLUME_BREAKOUT, caption: '放量突破：价格整理后放量突破阻力位，突破可信度高' },
  'volume-fake-breakout': { candles: DEMO_VOLUME_FAKE_BREAKOUT, caption: '缩量假突破：勉强越过阻力后迅速回落，突破不可信' },

  // ── lesson_5_3 补充 key ────────────────────────────────────────────────
  'ma5-ma20-trend': { candles: DEMO_MA5_MA20_TREND, caption: 'MA5/MA20 多头排列：MA5 > MA20，价格在两条均线上方运行，趋势健康' },

  // ── lesson_6_1 补充 key ────────────────────────────────────────────────
  'false-breakout': { candles: DEMO_FALSE_BREAKOUT, caption: '假突破：缩量突破阻力位后快速回落，多方接力不足' },

  // ── lesson_6_2 补充 key ────────────────────────────────────────────────
  'triple-confirm-bullish': { candles: DEMO_TRIPLE_CONFIRM_BULLISH, caption: '三重看涨确认：启明星形态 + 触及支撑位 + 放量大阳线' },
  'triple-confirm-bearish': { candles: DEMO_TRIPLE_CONFIRM_BEARISH, caption: '三重看跌确认：黄昏之星形态 + 触及阻力位 + 放量大阴线' },

  // ── lesson_6_3 补充 key ────────────────────────────────────────────────
  'analysis-framework': { candles: DEMO_ANALYSIS_FRAMEWORK, caption: '实战四步框架：①趋势判断 → ②关键位识别 → ③形态确认 → ④量能验证' },

  // ── lesson_7_x 成交量分析 ───────────────────────────────────────────────
  'volume-language-rising': { candles: DEMO_VOLUME_LANGUAGE_RISING, indicators: DEMO_INDICATORS.volumeOnly, caption: '温和上涨 + 量能递增：趋势延续时常见的健康量价结构' },
  'volume-language-fading': { candles: DEMO_VOLUME_LANGUAGE_FADING, indicators: DEMO_INDICATORS.volumeOnly, caption: '价格仍创新高但量能递减：上涨动能衰减，需警惕回落' },
  'volume-spike-reversal': { candles: DEMO_VOLUME_SPIKE_REVERSAL, indicators: DEMO_INDICATORS.volumeOnly, caption: '高位长阴放巨量：筹码集中换手后，阶段性转弱概率上升' },
  'volume-price-sync': { candles: DEMO_VOLUME_PRICE_SYNC, indicators: DEMO_INDICATORS.volumeOnly, caption: '量价齐升：价格上行伴随成交量放大，多头推进更扎实' },
  'volume-price-divergence': { candles: DEMO_VOLUME_PRICE_DIVERGENCE, indicators: DEMO_INDICATORS.volumeOnly, caption: '量价背离：价格创新高但量能持续走低，追涨意愿减弱' },
  'breakout-volume-validation': { candles: DEMO_BREAKOUT_VOLUME_VALIDATION, indicators: DEMO_INDICATORS.volumeOnly, caption: '突破量能验证：关键位突破需明显放量，后续延续概率更高' },

  // ── lesson_8_x 振荡指标 ───────────────────────────────────────────────
  'rsi-overbought-zone': { candles: DEMO_RSI_OVERBOUGHT_ZONE, indicators: DEMO_INDICATORS.volumeRsi, caption: 'RSI 进入 70 以上超买区：趋势强但短线回撤风险上升' },
  'rsi-oversold-zone': { candles: DEMO_RSI_OVERSOLD_ZONE, indicators: DEMO_INDICATORS.volumeRsi, caption: 'RSI 进入 30 以下超卖区：抛压接近极值，反弹概率提升' },
  'rsi-centerline': { candles: DEMO_RSI_CENTERLINE, indicators: DEMO_INDICATORS.volumeRsi, caption: 'RSI 上穿 50 中轴：多头动能重新占优，常作为趋势确认' },
  'kdj-golden-cross': { candles: DEMO_KDJ_GOLDEN_CROSS, indicators: DEMO_INDICATORS.volumeRsi, caption: 'KDJ 低位金叉：K 线向上穿越 D 线，短线反弹信号增强' },
  'kdj-death-cross': { candles: DEMO_KDJ_DEATH_CROSS, indicators: DEMO_INDICATORS.volumeRsi, caption: 'KDJ 高位死叉：K 线下穿 D 线，短线回调压力增大' },
  'rsi-divergence-demo': { candles: DEMO_RSI_DIVERGENCE_DEMO, indicators: DEMO_INDICATORS.volumeRsi, caption: 'RSI 底背离：价格创新低但 RSI 未创新低，动能转强预警' },

  // ── lesson_9_x MACD 动能 ───────────────────────────────────────────────
  'macd-golden-cross': { candles: DEMO_MACD_GOLDEN_CROSS, indicators: DEMO_INDICATORS.volumeMacd, caption: 'MACD 金叉：DIFF 上穿 DEA，动能由弱转强' },
  'macd-death-cross': { candles: DEMO_MACD_DEATH_CROSS, indicators: DEMO_INDICATORS.volumeMacd, caption: 'MACD 死叉：DIFF 下穿 DEA，动能由强转弱' },
  'macd-hist-expansion': { candles: DEMO_MACD_HIST_EXPANSION, indicators: DEMO_INDICATORS.volumeMacd, caption: '柱状图扩张：多头动能持续增强，趋势推进更顺畅' },
  'macd-hist-contraction': { candles: DEMO_MACD_HIST_CONTRACTION, indicators: DEMO_INDICATORS.volumeMacd, caption: '柱状图收缩转负：多头动能衰退，回撤风险抬升' },
  'macd-bullish-divergence': { candles: DEMO_MACD_BULLISH_DIVERGENCE, indicators: DEMO_INDICATORS.volumeMacd, caption: 'MACD 底背离：价格新低但 MACD 未新低，空头动能减弱' },
  'macd-bearish-divergence': { candles: DEMO_MACD_BEARISH_DIVERGENCE, indicators: DEMO_INDICATORS.volumeMacd, caption: 'MACD 顶背离：价格新高但 MACD 未新高，多头动能减弱' },
}
