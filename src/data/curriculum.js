/**
 * curriculum.js — 课程大纲配置
 * 唯一权威来源：SPEC.md §4
 */

export const CURRICULUM = [
  {
    id: 'single_candle',
    title: 'K线基础',
    subtitle: '单根形态',
    description: '学习锤子线、流星线、十字星等单根K线形态，理解多空博弈逻辑',
    icon: '🕯',
    difficulty: 1,
    lessons: [
      { id: 'lesson_1_1', title: '什么是K线（阴阳线、实体、影线）' },
      { id: 'lesson_1_2', title: '单根K线的四个价格（开高低收）' },
      { id: 'lesson_1_3', title: '影线的含义（多空博弈）' },
    ],
    practice: { module: 'single_candle', difficulty: 1, count: 5 },
    unlockRequires: null, // 默认解锁
  },
  {
    id: 'pattern',
    title: '组合形态',
    subtitle: '多根信号',
    description: '识别启明星、黄昏之星、吞没形态等强力的反转与持续信号',
    icon: '📊',
    difficulty: 2,
    lessons: [
      { id: 'lesson_2_1', title: '启明星与黄昏之星' },
      { id: 'lesson_2_2', title: '吞没形态（阳线吞没 / 阴线吞没）' },
      { id: 'lesson_2_3', title: '三只白兵与三只乌鸦' },
    ],
    practice: { module: 'pattern', difficulty: 2, count: 5 },
    unlockRequires: ['single_candle'], // 需 single_candle 通过
  },
  {
    id: 'trend',
    title: '趋势与关键位',
    subtitle: '支撑阻力 · 均线',
    description: '掌握支撑阻力位识别、角色转换原则，以及 MA5/MA20 金叉死叉',
    icon: '📈',
    difficulty: 3,
    lessons: [
      { id: 'lesson_3_1', title: '支撑位与阻力位的形成' },
      { id: 'lesson_3_2', title: '角色转换原则（阻力变支撑）' },
      { id: 'lesson_3_3', title: '均线：MA5 / MA20 金叉死叉' },
    ],
    practice: { module: 'trend', difficulty: 3, count: 5 },
    unlockRequires: ['pattern'], // 需 pattern 通过
  },
  {
    id: 'synthesis',
    title: '综合判断',
    subtitle: '多指标共振',
    description: '综合运用所学知识，进行多指标共振分析与走势预测',
    icon: '🎯',
    difficulty: 3,
    lessons: [
      { id: 'lesson_4_1', title: '为什么单一信号不可靠（假信号与共振）' },
      { id: 'lesson_4_2', title: '三重确认法：形态 + 均线 + 成交量' },
      { id: 'lesson_4_3', title: '实战分析框架：从宏到微四步法' },
    ],
    practice: { module: null, difficulty: 3, count: 5 }, // 从所有模块抽题
    unlockRequires: ['single_candle', 'pattern', 'trend'], // 需前三全部通过
  },
]

/** 按 id 快速查找模块 */
export const MODULE_MAP = Object.fromEntries(CURRICULUM.map((m) => [m.id, m]))

/** 获取模块索引（用于显示 Module 1/2/3/4） */
export function getModuleIndex(moduleId) {
  return CURRICULUM.findIndex((m) => m.id === moduleId)
}
