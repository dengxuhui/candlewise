/**
 * patternMeta.js — K线形态元数据
 * 覆盖 candlewise_cases.json 中所有 13 种 pattern_id
 * 每条包含：中文名、所属模块、记忆口诀、详细解析
 */

export const PATTERN_META = {
  // ── Module 1：单根形态 ──────────────────────────────────────────
  doji: {
    name_zh: '十字星',
    module: 'single_candle',
    mnemonic: '开收相近成十字，多空平衡待变局',
    explanation:
      '十字星的开盘价与收盘价几乎相同，形成细小实体，代表多空双方力量均衡、市场犹豫不决。' +
      '出现在上升趋势顶部时，往往是反转信号；出现在下降趋势底部时，也可能预示止跌。' +
      '需结合后续K线和成交量确认方向。',
  },

  hammer: {
    name_zh: '锤子线',
    module: 'single_candle',
    mnemonic: '长下影短实体，底部反锤看涨来',
    explanation:
      '锤子线出现在下跌趋势末期，特征是下影线长度至少为实体的两倍，上影线极短或没有。' +
      '长下影线表示空方一度大幅打压，但多方强势反弹将价格拉回，说明底部支撑强劲。' +
      '次日出现阳线确认后，看涨信号更可靠。',
  },

  shooting_star: {
    name_zh: '流星线',
    module: 'single_candle',
    mnemonic: '长上影短实体，顶部流星看跌到',
    explanation:
      '流星线出现在上涨趋势末期，特征是上影线长度至少为实体的两倍，下影线极短或没有。' +
      '长上影线表示多方推高价格后，空方强势反压使收盘价跌回低位，意味着顶部阻力强。' +
      '次日出现阴线确认后，看跌信号更可靠。',
  },

  large_bullish: {
    name_zh: '大阳线',
    module: 'single_candle',
    mnemonic: '实体高大色泽绿，多方主导强势冲',
    explanation:
      '大阳线是实体占K线总长度 70% 以上的阳线，上下影线极短甚至没有。' +
      '代表多方全程主导，开盘即买、全天持续上攻，收盘接近最高点。' +
      '通常出现在趋势加速阶段或突破关键阻力后，是强烈的看涨信号。',
  },

  large_bearish: {
    name_zh: '大阴线',
    module: 'single_candle',
    mnemonic: '实体高大色泽红，空方主导强势压',
    explanation:
      '大阴线是实体占K线总长度 70% 以上的阴线，上下影线极短甚至没有。' +
      '代表空方全程主导，开盘即卖、全天持续下压，收盘接近最低点。' +
      '通常出现在趋势加速下跌或跌破关键支撑后，是强烈的看跌信号。',
  },

  // ── Module 2：组合形态 ──────────────────────────────────────────
  morning_star: {
    name_zh: '启明星',
    module: 'pattern',
    mnemonic: '大阴小星再大阳，黎明前的曙光现',
    explanation:
      '启明星是三根K线组成的看涨反转形态：第一根大阴线（空方主导）→ 第二根小实体K线跳空低开（多空犹豫）→ 第三根大阳线收盘深入第一根实体（多方反攻）。' +
      '三根K线共同描述了"下跌→犹豫→反转"的过程，在下跌趋势底部出现时信号最强。' +
      '第三根阳线越大、成交量越大，反转可信度越高。',
  },

  evening_star: {
    name_zh: '黄昏之星',
    module: 'pattern',
    mnemonic: '大阳小星再大阴，黄昏预示夜将临',
    explanation:
      '黄昏之星是三根K线组成的看跌反转形态：第一根大阳线（多方主导）→ 第二根小实体K线跳空高开（多空犹豫）→ 第三根大阴线收盘深入第一根实体（空方反攻）。' +
      '与启明星相反，描述了"上涨→犹豫→反转"的过程，在上升趋势顶部出现时信号最强。' +
      '第三根阴线越大、成交量越大，见顶可信度越高。',
  },

  bullish_engulfing: {
    name_zh: '阳线吞没',
    module: 'pattern',
    mnemonic: '阳包阴、多吞空，下跌末尾反转强',
    explanation:
      '阳线吞没由两根K线组成：前一根是阴线，后一根阳线的实体完全包裹（吞没）前一根阴线实体。' +
      '阳线"吃掉"阴线，象征多方彻底压制空方，是下跌趋势中强烈的反转信号。' +
      '吞没的幅度越大（实体越长）、出现在下跌越久之后，信号越强。',
  },

  bearish_engulfing: {
    name_zh: '阴线吞没',
    module: 'pattern',
    mnemonic: '阴包阳、空吞多，上涨末尾反转空',
    explanation:
      '阴线吞没由两根K线组成：前一根是阳线，后一根阴线的实体完全包裹（吞没）前一根阳线实体。' +
      '阴线"吃掉"阳线，象征空方彻底压制多方，是上升趋势中强烈的见顶信号。' +
      '吞没的幅度越大、出现在上涨越久之后，信号越强。',
  },

  three_white_soldiers: {
    name_zh: '三只白兵',
    module: 'pattern',
    mnemonic: '三阳连涨步步高，多方军团势如虹',
    explanation:
      '三只白兵是三根连续的阳线：每根阳线都在前一根阳线的实体内开盘，收盘则创新高，上影线极短。' +
      '三根递进的阳线展示了多方持续、有序地推高价格的强劲走势。' +
      '通常出现在下跌趋势或整理区间后，是趋势反转或加速上涨的可靠信号。',
  },

  three_black_crows: {
    name_zh: '三只乌鸦',
    module: 'pattern',
    mnemonic: '三阴连跌步步低，空方军团势如鸦',
    explanation:
      '三只乌鸦是三根连续的阴线：每根阴线都在前一根阴线的实体内开盘，收盘则创新低，下影线极短。' +
      '三根递进的阴线展示了空方持续、有序地打压价格的强劲走势。' +
      '通常出现在上升趋势或整理区间后，是趋势反转或加速下跌的可靠信号。',
  },

  // ── Module 3：趋势与关键位 ──────────────────────────────────────
  support_breakout: {
    name_zh: '支撑位突破',
    module: 'trend',
    mnemonic: '支撑一破成压力，角色转换下方行',
    explanation:
      '支撑位是价格多次止跌并反弹的价格区域，代表买方力量集中的位置。' +
      '当价格有效跌破支撑位（通常需要收盘价确认 + 成交量放大），原支撑位将转变为新的阻力位——这就是"角色转换"原则。' +
      '突破支撑后的首次反弹至前支撑位附近，往往是做空的理想时机。',
  },

  resistance_breakout: {
    name_zh: '阻力位突破',
    module: 'trend',
    mnemonic: '阻力一破成支撑，角色转换上方行',
    explanation:
      '阻力位是价格多次上涨受阻并回落的价格区域，代表卖方力量集中的位置。' +
      '当价格有效突破阻力位（通常需要收盘价确认 + 成交量放大），原阻力位将转变为新的支撑位——这就是"角色转换"原则。' +
      '突破阻力后的首次回踩至前阻力位附近，往往是做多的理想时机。',
  },
}

/**
 * 按模块分组的 pattern_id 列表，用于生成干扰选项
 */
export const MODULE_PATTERNS = {
  single_candle: ['doji', 'hammer', 'shooting_star', 'large_bullish', 'large_bearish'],
  pattern: [
    'morning_star',
    'evening_star',
    'bullish_engulfing',
    'bearish_engulfing',
    'three_white_soldiers',
    'three_black_crows',
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
 * @param {string} correctPatternId  正确答案的 pattern_id
 * @param {string} moduleId          题目所属模块
 * @param {number} count             需要几个干扰项，默认 2
 * @returns {string[]} 干扰项的中文名数组
 */
export function getDistractors(correctPatternId, moduleId, count = 2) {
  const pool = (MODULE_PATTERNS[moduleId] ?? []).filter((p) => p !== correctPatternId)
  // Fisher-Yates 打乱
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count).map((p) => getPatternName(p))
}
