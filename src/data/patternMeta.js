/**
 * patternMeta.js — K线形态元数据
 * 覆盖 SPEC.md 约定的 21 种 pattern_id
 */

export const PATTERN_META = {
  // basics
  doji: {
    name_zh: '十字星',
    module: 'basics',
    mnemonic: '开收几乎重合，多空暂时平衡',
    explanation:
      '十字星开盘价与收盘价接近，实体极小，表示多空力量在该周期内接近平衡。' +
      '若出现在关键位置，常是变盘前兆，需结合后续K线确认方向。',
  },
  large_bullish: {
    name_zh: '大阳线',
    module: 'basics',
    mnemonic: '实体饱满向上，多方主导全天',
    explanation:
      '大阳线实体占比高，显示买盘持续占优，价格通常收于阶段高位。' +
      '常见于突破或强趋势延续阶段，是基础看涨信号。',
  },
  large_bearish: {
    name_zh: '大阴线',
    module: 'basics',
    mnemonic: '实体饱满向下，空方主导全天',
    explanation:
      '大阴线实体占比高，显示卖盘持续占优，价格通常收于阶段低位。' +
      '常见于破位或弱趋势延续阶段，是基础看跌信号。',
  },

  // single_reversal
  hammer: {
    name_zh: '锤子线',
    module: 'single_reversal',
    mnemonic: '长下影短实体，底部反转可期',
    explanation:
      '锤子线常出现在下跌末端，长下影表示空方曾大幅打压但被买盘收回。' +
      '若后续出现确认阳线，反转可信度更高。',
  },
  hanging_man: {
    name_zh: '吊颈线',
    module: 'single_reversal',
    mnemonic: '形似锤子在线顶，警惕上攻乏力',
    explanation:
      '吊颈线与锤子线形态相近，但出现在上涨末端。' +
      '长下影暴露盘中抛压，若后续转弱，可能形成顶部反转。',
  },
  shooting_star: {
    name_zh: '流星线',
    module: 'single_reversal',
    mnemonic: '长上影短实体，顶部抛压明显',
    explanation:
      '流星线常见于上涨末端，长上影说明冲高后被快速卖压打回。' +
      '若次日继续转弱，见顶信号增强。',
  },
  inverted_hammer: {
    name_zh: '倒锤子线',
    module: 'single_reversal',
    mnemonic: '长上影在线底，试探反转可能',
    explanation:
      '倒锤子线出现在下跌末端，长上影表示多方尝试上攻。' +
      '单独信号偏弱，需后续阳线或放量确认。',
  },

  // double_reversal
  bullish_engulfing: {
    name_zh: '阳线吞没',
    module: 'double_reversal',
    mnemonic: '阳包阴，空转多',
    explanation:
      '两根K线组合中，后一根阳线实体完全覆盖前一根阴线实体。' +
      '体现买盘全面反制，常作为下跌末端反转信号。',
  },
  bearish_engulfing: {
    name_zh: '阴线吞没',
    module: 'double_reversal',
    mnemonic: '阴包阳，多转空',
    explanation:
      '两根K线组合中，后一根阴线实体完全覆盖前一根阳线实体。' +
      '体现卖盘全面反制，常作为上涨末端反转信号。',
  },
  dark_cloud_cover: {
    name_zh: '乌云盖顶',
    module: 'double_reversal',
    mnemonic: '高开低收压半身，顶部转弱常见',
    explanation:
      '首根为阳线，次根高开后回落并收在前阳线实体中部以下。' +
      '表示上方抛压突增，是顶部反转的常见预警。',
  },
  piercing_line: {
    name_zh: '刺透形态',
    module: 'double_reversal',
    mnemonic: '低开高收穿半身，底部转强可期',
    explanation:
      '首根为阴线，次根低开后回升并收在前阴线实体中部以上。' +
      '显示买盘快速回补，是底部反转的常见信号。',
  },
  harami: {
    name_zh: '孕线',
    module: 'double_reversal',
    mnemonic: '大实体裹小实体，趋势动能放缓',
    explanation:
      '前一根实体较大，后一根小实体完全位于前者实体内部。' +
      '表示波动收敛与动能减弱，常提示潜在反转或整理。',
  },
  harami_cross: {
    name_zh: '十字孕线',
    module: 'double_reversal',
    mnemonic: '孕线遇十字，犹豫更明显',
    explanation:
      '与孕线类似，但第二根为十字星，代表更强的多空僵持。' +
      '位于趋势末端时，反转提示通常强于普通孕线。',
  },

  // triple_pattern
  morning_star: {
    name_zh: '启明星',
    module: 'triple_pattern',
    mnemonic: '阴星阳三步走，底部反转信号',
    explanation:
      '三根组合依次为大阴线、小实体、强阳线，体现空衰多起。' +
      '常见于下跌末端，是经典看涨反转结构。',
  },
  evening_star: {
    name_zh: '黄昏之星',
    module: 'triple_pattern',
    mnemonic: '阳星阴三步走，顶部反转预警',
    explanation:
      '三根组合依次为大阳线、小实体、强阴线，体现多衰空起。' +
      '常见于上涨末端，是经典看跌反转结构。',
  },
  three_white_soldiers: {
    name_zh: '三白兵',
    module: 'triple_pattern',
    mnemonic: '三阳递进上攻，多方持续发力',
    explanation:
      '连续三根重心上移的阳线，显示买盘有序推进。' +
      '常用于判断趋势由弱转强或强势延续。',
  },
  three_black_crows: {
    name_zh: '三乌鸦',
    module: 'triple_pattern',
    mnemonic: '三阴递进下压，空方持续发力',
    explanation:
      '连续三根重心下移的阴线，显示卖盘有序推进。' +
      '常用于判断趋势由强转弱或弱势延续。',
  },
  rising_three_methods: {
    name_zh: '上升三法',
    module: 'triple_pattern',
    mnemonic: '大阳领涨中继后，再起一阳续升',
    explanation:
      '先有强阳推动，随后几根小阴在其实体范围内回撤，最后再以阳线突破。' +
      '通常表示上涨趋势中的中继整理。',
  },
  falling_three_methods: {
    name_zh: '下降三法',
    module: 'triple_pattern',
    mnemonic: '大阴领跌中继后，再起一阴续跌',
    explanation:
      '先有强阴推动，随后几根小阳在其实体范围内反弹，最后再以阴线破低。' +
      '通常表示下跌趋势中的中继整理。',
  },

  // trend
  support_breakout: {
    name_zh: '支撑位跌破',
    module: 'trend',
    mnemonic: '跌破支撑转压力，弱势结构延续',
    explanation:
      '价格有效跌破支撑位后，原支撑常转为后续反弹阻力。' +
      '结合放量与回抽失败，可提升判断可靠度。',
  },
  resistance_breakout: {
    name_zh: '阻力位突破',
    module: 'trend',
    mnemonic: '突破阻力转支撑，强势结构延续',
    explanation:
      '价格有效突破阻力位后，原阻力常转为后续回踩支撑。' +
      '结合放量与回踩企稳，可提升判断可靠度。',
  },
}

/**
 * 按模块分组的 pattern_id 列表，用于生成干扰选项
 */
export const MODULE_PATTERNS = {
  basics: ['doji', 'large_bullish', 'large_bearish'],
  single_reversal: ['hammer', 'hanging_man', 'shooting_star', 'inverted_hammer'],
  double_reversal: [
    'bullish_engulfing',
    'bearish_engulfing',
    'dark_cloud_cover',
    'piercing_line',
    'harami',
    'harami_cross',
  ],
  triple_pattern: [
    'morning_star',
    'evening_star',
    'three_white_soldiers',
    'three_black_crows',
    'rising_three_methods',
    'falling_three_methods',
  ],
  trend: ['support_breakout', 'resistance_breakout'],
}

/**
 * 根据 pattern_id 获取中文名，找不到时返回 pattern_id 本身
 */
export function getPatternName(patternId) {
  return PATTERN_META[patternId]?.name_zh ?? patternId
}

/**
 * 为某道题生成随机干扰选项（同模块不重复）
 * @param {string} correctPatternId 正确答案的 pattern_id
 * @param {string} moduleId 题目所属模块
 * @param {number} count 需要几个干扰项，默认 2
 * @returns {string[]} 干扰项的中文名数组
 */
export function getDistractors(correctPatternId, moduleId, count = 2) {
  const pool = (MODULE_PATTERNS[moduleId] ?? []).filter((p) => p !== correctPatternId)
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count).map((p) => getPatternName(p))
}
