/**
 * curriculum.js — 课程大纲配置
 * 唯一权威来源：SPEC.md §4
 */

export const CURRICULUM = [
  {
    id: 'basics',
    title: 'K线基础',
    subtitle: '构成与读法',
    description: '学习K线的起源、实体与影线结构，建立基础读图能力与多空语言',
    icon: '🕯',
    difficulty: 1,
    lessons: [
      { id: 'lesson_1_1', title: 'K线的起源与构成' },
      { id: 'lesson_1_2', title: '读懂一根K线（实体与影线）' },
      { id: 'lesson_1_3', title: '影线的语言（多空博弈）' },
    ],
    practice: { module: 'basics', difficulty: 1, count: 5 },
    unlockRequires: null, // 默认解锁
  },
  {
    id: 'single_reversal',
    title: '单根反转',
    subtitle: '位置决定信号',
    description: '识别锤子线、吊颈线、流星线、倒锤子线与十字星家族的单根反转逻辑',
    icon: '🪙',
    difficulty: 1,
    lessons: [
      { id: 'lesson_2_1', title: '锤子线与吊颈线（位置决定信号）' },
      { id: 'lesson_2_2', title: '流星线与倒锤子线' },
      { id: 'lesson_2_3', title: '十字星家族' },
    ],
    practice: { module: 'single_reversal', difficulty: 1, count: 5 },
    unlockRequires: ['basics'],
  },
  {
    id: 'double_reversal',
    title: '双根反转',
    subtitle: '双烛关系',
    description: '掌握吞没、乌云盖顶、刺透、孕线、十字孕线等双根形态的反转判读',
    icon: '⚖️',
    difficulty: 2,
    lessons: [
      { id: 'lesson_3_1', title: '吞没形态' },
      { id: 'lesson_3_2', title: '乌云盖顶与刺透形态' },
      { id: 'lesson_3_3', title: '孕线与十字孕线' },
    ],
    practice: { module: 'double_reversal', difficulty: 2, count: 5 },
    unlockRequires: ['single_reversal'],
  },
  {
    id: 'triple_pattern',
    title: '三根形态',
    subtitle: '反转与持续',
    description: '学习启明星、黄昏之星、三白兵、三乌鸦与上升/下降三法等三根组合',
    icon: '📊',
    difficulty: 2,
    lessons: [
      { id: 'lesson_4_1', title: '启明星与黄昏之星' },
      { id: 'lesson_4_2', title: '三白兵与三乌鸦' },
      { id: 'lesson_4_3', title: '上升三法与下降三法' },
    ],
    practice: { module: 'triple_pattern', difficulty: 2, count: 5 },
    unlockRequires: ['double_reversal'],
  },
  {
    id: 'trend',
    title: '趋势与关键位',
    subtitle: '结构与确认',
    description: '掌握趋势、支撑阻力、角色转换、成交量确认以及 MA5/MA20 均线系统',
    icon: '📈',
    difficulty: 3,
    lessons: [
      { id: 'lesson_5_1', title: '趋势、支撑与阻力' },
      { id: 'lesson_5_2', title: '角色转换与成交量确认' },
      { id: 'lesson_5_3', title: '均线系统 MA5 / MA20' },
    ],
    practice: { module: 'trend', difficulty: 3, count: 5 },
    unlockRequires: ['triple_pattern'],
  },
  {
    id: 'volume',
    title: '成交量分析',
    subtitle: '量价与突破',
    description: '学习成交量的基础语言、量价背离与突破确认，建立量能验证思维',
    icon: '📦',
    difficulty: 2,
    lessons: [
      { id: 'lesson_7_1', title: '成交量的基础语言' },
      { id: 'lesson_7_2', title: '量价配合与背离' },
      { id: 'lesson_7_3', title: '突破的量能验证' },
    ],
    practice: { module: 'volume', difficulty: 2, count: 5 },
    unlockRequires: ['trend'],
  },
  {
    id: 'oscillator',
    title: '振荡指标',
    subtitle: 'RSI 与 KDJ',
    description: '掌握 RSI 超买超卖与背离结构，理解振荡指标在区间与反转中的应用',
    icon: '📉',
    difficulty: 3,
    lessons: [
      { id: 'lesson_8_1', title: 'RSI 原理与超买超卖' },
      { id: 'lesson_8_2', title: 'KDJ 与随机振荡' },
      { id: 'lesson_8_3', title: '振荡背离信号' },
    ],
    practice: { module: 'oscillator', difficulty: 3, count: 5 },
    unlockRequires: ['volume'],
  },
  {
    id: 'momentum',
    title: '趋势动能',
    subtitle: 'MACD 实战',
    description: '学习 MACD 金叉死叉、柱状图动能变化与背离，识别趋势强弱转折',
    icon: '🚀',
    difficulty: 3,
    lessons: [
      { id: 'lesson_9_1', title: 'MACD 构成与金叉死叉' },
      { id: 'lesson_9_2', title: 'MACD 柱状图与动能变化' },
      { id: 'lesson_9_3', title: 'MACD 背离实战' },
    ],
    practice: { module: 'momentum', difficulty: 3, count: 5 },
    unlockRequires: ['oscillator'],
  },
  {
    id: 'synthesis',
    title: '综合判断',
    subtitle: '多指标共振',
    description: '综合运用形态、趋势、关键位与量能进行共振判断，形成实战分析框架',
    icon: '🎯',
    difficulty: 3,
    lessons: [
      { id: 'lesson_6_1', title: '假信号与共振' },
      { id: 'lesson_6_2', title: '三重确认法' },
      { id: 'lesson_6_3', title: '实战分析框架' },
    ],
    practice: { module: null, difficulty: 3, count: 5 }, // 从所有模块抽题
    unlockRequires: [
      'basics',
      'single_reversal',
      'double_reversal',
      'triple_pattern',
      'trend',
      'volume',
      'oscillator',
      'momentum',
    ],
  },
]

/** 按 id 快速查找模块 */
export const MODULE_MAP = Object.fromEntries(CURRICULUM.map((m) => [m.id, m]))

/** 获取模块索引（用于显示 Module 1/2/3/4） */
export function getModuleIndex(moduleId) {
  return CURRICULUM.findIndex((m) => m.id === moduleId)
}
