# Candlewise — 项目规格文档 (SPEC.md)

> 本文档是 Candlewise 的唯一权威规格来源。  
> 在 OpenCode 中开发前，先让 AI 读取此文件作为上下文。

---

## 1. 项目定位

**Candlewise** 是一个仿照 Brilliant.org 课程体验、专注股票K线技术分析的开源学习网站。

- 目标用户：股市入门者、想系统学习技术分析的普通投资者
- 核心体验：通过**真实历史K线案例**进行交互式闯关学习，而非枯燥阅读
- 部署方式：GitHub Pages 纯静态托管，无需服务器
- 开源协议：MIT

---

## 2. 技术栈（已确定，不更改）

```
前端框架     React 18 + Vite
样式         Tailwind CSS v3
路由         React Router v6（Hash 模式，兼容 GitHub Pages）
图表         lightweight-charts（TradingView 开源库，专为K线设计）
状态管理     Zustand（轻量，无需 Redux）
Markdown     react-markdown + remark-gfm（课时内容渲染）
数据来源     /public/data/candlewise_cases.json（静态文件，构建时打包）
部署         GitHub Pages via gh-pages 分支
包管理       npm
```

**不引入的东西：**
- 无后端、无 API Server、无数据库
- 无用户登录系统（v1 阶段）
- 无 AI Agent（v1 阶段）
- 无 Next.js（SSR 对 GitHub Pages 过于复杂）

---

## 3. 目录结构

```
candlewise/
├── public/
│   └── data/
│       └── candlewise_cases.json   # ~300个K线案例数据集（见第6节）
├── src/
│   ├── main.jsx                    # 入口
│   ├── App.jsx                     # 路由根组件
│   ├── pages/
│   │   ├── Home.jsx                # 首页 / 课程地图
│   │   ├── Module.jsx              # 模块概览页（如"单根形态"）
│   │   ├── Lesson.jsx              # 单个课时页（知识讲解）
│   │   └── Practice.jsx           # 闯关练习页（核心页面）
│   ├── components/
│   │   ├── CandleChart.jsx         # K线图组件（基于 lightweight-charts）
│   │   ├── QuestionCard.jsx        # 题目卡片
│   │   ├── OptionButton.jsx        # 选项按钮（含正确/错误状态）
│   │   ├── FeedbackPanel.jsx       # 答题反馈面板
│   │   ├── ProgressBar.jsx         # 进度条
│   │   ├── FreeToggle.jsx          # 自由模式切换按钮
│   │   ├── LessonMarkdown.jsx      # Markdown 课时内容渲染组件
│   │   └── Layout.jsx              # 全局布局（导航栏 + 页脚）
│   ├── hooks/
│   │   ├── useProgress.js          # 学习进度管理（localStorage）
│   │   └── useCases.js             # 加载和筛选案例数据
│   ├── store/
│   │   └── progressStore.js        # Zustand 全局状态
│   └── data/
│       ├── curriculum.js           # 课程大纲配置（模块/课时结构）
│       ├── lessonDemos.js          # 课时示例K线数据（静态演示用）
│       ├── patternMeta.js          # 形态元数据（名称、描述、口诀等）
│               └── lessons/                # 各课时 Markdown 文案（共27节）
│           ├── lesson_1_1.md ~ lesson_1_3.md   # Module 1 K线基础
│           ├── lesson_2_1.md ~ lesson_2_3.md   # Module 2 单根反转
│           ├── lesson_3_1.md ~ lesson_3_3.md   # Module 3 双根反转
│           ├── lesson_4_1.md ~ lesson_4_3.md   # Module 4 三根形态
│           ├── lesson_5_1.md ~ lesson_5_3.md   # Module 5 趋势与关键位
│           ├── lesson_6_1.md ~ lesson_6_3.md   # Module 9 综合判断
│           ├── lesson_7_1.md ~ lesson_7_3.md   # Module 6 成交量分析（新增）
│           ├── lesson_8_1.md ~ lesson_8_3.md   # Module 7 振荡指标（新增）
│           └── lesson_9_1.md ~ lesson_9_3.md   # Module 8 趋势动能（新增）
├── data-scripts/                   # Python数据准备脚本（非前端代码）
│   ├── fetch_data.py
│   ├── detect_patterns.py
│   ├── build_dataset.py
│   └── generate_synthetic_data.py
├── SPEC.md                         # 本文件
├── README.md
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 4. 课程结构（curriculum.js 的配置依据）

共 9 个模块，每模块包含 3 个课时 + 一组练习题。模块 `id` 采用语义化命名（不使用 `module_1_xxx` 风格）。

解锁链：`basics → single_reversal → double_reversal → triple_pattern → trend → volume → oscillator → momentum → synthesis`

### Module 1：K线基础 `basics`
- Lesson 1-1：K线的起源与构成
- Lesson 1-2：读懂一根K线（实体与影线）
- Lesson 1-3：影线的语言（多空博弈）
- Practice：识别基础形态（十字星、大阳线、大阴线等，难度 1）
- unlockRequires：`null`（默认解锁）

### Module 2：单根反转 `single_reversal`
- Lesson 2-1：锤子线与吊颈线（位置决定信号）
- Lesson 2-2：流星线与倒锤子线
- Lesson 2-3：十字星家族
- Practice：识别单根反转形态（难度 1）
- unlockRequires：`["basics"]`

### Module 3：双根反转 `double_reversal`
- Lesson 3-1：吞没形态
- Lesson 3-2：乌云盖顶与刺透形态
- Lesson 3-3：孕线与十字孕线
- Practice：识别双根反转形态（难度 2）
- unlockRequires：`["single_reversal"]`

### Module 4：三根形态 `triple_pattern`
- Lesson 4-1：启明星与黄昏之星
- Lesson 4-2：三白兵与三乌鸦
- Lesson 4-3：上升三法与下降三法
- Practice：识别三根反转/持续形态（难度 2）
- unlockRequires：`["double_reversal"]`

### Module 5：趋势与关键位 `trend`
- Lesson 5-1：趋势、支撑与阻力
- Lesson 5-2：角色转换与成交量确认
- Lesson 5-3：均线系统 MA5 / MA20
- Practice：判断趋势结构与关键位突破（难度 3）
- unlockRequires：`["triple_pattern"]`

### Module 6：成交量分析 `volume` ⭐ 新增
- Lesson 7-1：成交量的基础语言
- Lesson 7-2：量价配合与背离
- Lesson 7-3：突破的量能验证
- Practice：识别量能突破与量价背离（难度 2，图表含成交量副图）
- unlockRequires：`["trend"]`

### Module 7：振荡指标 `oscillator` ⭐ 新增
- Lesson 8-1：RSI 原理与超买超卖
- Lesson 8-2：KDJ 与随机振荡
- Lesson 8-3：振荡背离信号
- Practice：识别 RSI 超买超卖与背离（难度 3，图表含 RSI 副图）
- unlockRequires：`["volume"]`

### Module 8：趋势动能 `momentum` ⭐ 新增
- Lesson 9-1：MACD 构成与金叉死叉
- Lesson 9-2：MACD 柱状图与动能变化
- Lesson 9-3：MACD 背离实战
- Practice：识别 MACD 金叉死叉与背离（难度 3，图表含 MACD 副图）
- unlockRequires：`["oscillator"]`

### Module 9：综合判断 `synthesis`
- Lesson 6-1：假信号与共振
- Lesson 6-2：三重确认法
- Lesson 6-3：实战分析框架
- Practice：综合题（全模块混合抽题，难度 3，图表含成交量 + RSI + MACD 副图）
- unlockRequires：`["basics", "single_reversal", "double_reversal", "triple_pattern", "trend", "volume", "oscillator", "momentum"]`

---

## 5. 核心页面规格

### 5.1 首页 Home.jsx
- 顶部 Hero：项目名 + 一句话介绍 + "开始学习"按钮
- 课程模块网格：9 个 ModuleCard，显示模块名、图标、进度百分比、锁定状态
- 模块解锁逻辑：Module 1 默认解锁，Module 2~8 需前一模块通过，Module 9（synthesis）需前八模块全部通过

### 5.2 闯关练习页 Practice.jsx（最核心）

**布局：**
```
┌─────────────────────────────────────┐
│  进度条（第 X 题 / 总题数）           │
├─────────────────────────────────────┤
│                                     │
│         K 线图（lightweight-charts） │
│         含 MA5 / MA20 均线叠加       │
│  ─── 副图分隔（按模块按需显示）───    │
│  成交量柱图（volume 模块起显示）      │
│  RSI 折线图（oscillator 模块起显示） │
│  MACD 柱+线图（momentum 模块起显示） │
│                                     │
├─────────────────────────────────────┤
│  题目文字                            │
│                                     │
│  [A] 选项一                          │
│  [B] 选项二                          │
│  [C] 选项三                          │
├─────────────────────────────────────┤
│  反馈面板（答题后展开）               │
│  ✓/✗ + 解析文字 + 知识点链接         │
└─────────────────────────────────────┘
```

**副图指标注入规则（按模块）：**

| 模块 | 显示副图 |
|---|---|
| `basics` / `single_reversal` / `double_reversal` / `triple_pattern` / `trend` | 无副图 |
| `volume` | 成交量柱图 |
| `oscillator` | 成交量 + RSI |
| `momentum` | 成交量 + MACD |
| `synthesis` | 成交量 + RSI + MACD |

**副图技术实现：**
- 使用 lightweight-charts v4.2 实现主图与副图拆分渲染（主图 + 多个副图实例）
- 主图：K线 + MA5 + MA20
- 成交量副图：HistogramSeries
- RSI 副图：LineSeries + 30/70 参考线
- MACD 副图：Histogram（柱）+ LineSeries × 2（DIFF/DEA）
- 十字光标与可视区间在主/副图间自动联动

**响应式副图高度：**

| 屏幕宽度 | 主图高度 | 每个副图高度 |
|---|---|---|
| < 480px | 180px | 60px |
| 480~768px | 220px | 70px |
| > 768px | 260px | 80px |

**交互逻辑：**
1. 从数据集按模块/难度筛选案例，随机抽取 5 题一组
2. 展示 K 线图（隐藏形态后续走势，`pattern_index` 后的K线用虚线或模糊显示）
3. 用户选择答案 → 高亮正确/错误选项 → 展开反馈面板
4. 反馈面板显示：是否正确、解析、该形态的记忆口诀
5. 点击"下一题" → 加载下一个案例
6. 5 题全部完成 → 结算页（得分 + 复盘入口）

**练习模式：**
- 模式 A（识别模式）：给出K线，问"这是什么形态？"
- 模式 B（预测模式）：给出K线，隐藏后续，问"之后会涨还是跌？"，结束后揭示真实走势
- v1 只做模式 A，模式 B 作为后续迭代

### 5.3 课时页 Lesson.jsx
- 左侧：章节导航目录
- 右侧：Markdown 渲染的课程内容 + 内嵌 K 线示意图（静态）
- 底部："进入练习"按钮，跳转到对应 Practice 页

---

## 6. 数据集规格

数据文件路径：`public/data/candlewise_cases.json`

由 `data-scripts/` 中的 Python 脚本生成（见 data-scripts/README.md）。

**顶层结构：**
```json
{
  "meta": {
    "version": "1.0.0",
    "total_cases": 300,
    "pattern_distribution": { "morning_star": 23, "hammer": 16 }
  },
  "cases": [ ...案例数组... ]
}
```

**单个案例结构：**
```json
{
  "id":               "case_0001",
  "symbol":           "600519",
  "name":             "贵州茅台",
  "sector":           "白酒",
  "source":           "akshare",
  "pattern_id":       "morning_star",
  "pattern_name_zh":  "启明星",
  "module":           "triple_pattern",
  "difficulty":       2,
  "pattern_index":    15,
  "subsequent_trend": "up",
  "candles": [
    {
      "date":      "2021-03-10",
      "open":      1920.0,
      "high":      1950.0,
      "low":       1905.0,
      "close":     1938.0,
      "volume":    3820000,
      "ma5":       1910.4,
      "ma20":      1885.2,
      "rsi":       52.3,
      "macd_diff": 0.12,
      "macd_dea":  0.08,
      "macd_hist": 0.08,
      "kdj_k":     45.3,
      "kdj_d":     42.1,
      "kdj_j":     51.7
    }
  ]
}
```

**前端使用关键字段：**

| 字段 | 前端用途 |
|---|---|
| `candles` | 喂给 lightweight-charts 渲染K线 |
| `pattern_index` | 高亮标注形态所在位置 |
| `subsequent_trend` | 预测模式揭晓答案 |
| `module` | 按模块筛选题目 + 决定显示哪些副图 |
| `difficulty` | 按难度筛选题目 |
| `ma5` / `ma20` | 叠加均线显示（主图） |
| `volume` | 成交量副图渲染（volume 模块起） |
| `rsi` | RSI 副图渲染（oscillator 模块起） |
| `macd_diff` / `macd_dea` / `macd_hist` | MACD 副图渲染（momentum 模块起） |
| `kdj_k` / `kdj_d` / `kdj_j` | KDJ 数据（oscillator 模块，与 RSI 共用副图区） |

**pattern_id 范围（共 29 种）：**

- `basics`：`doji`, `large_bullish`, `large_bearish`
- `single_reversal`：`hammer`, `hanging_man`, `shooting_star`, `inverted_hammer`
- `double_reversal`：`bullish_engulfing`, `bearish_engulfing`, `dark_cloud_cover`, `piercing_line`, `harami`, `harami_cross`
- `triple_pattern`：`morning_star`, `evening_star`, `three_white_soldiers`, `three_black_crows`, `rising_three_methods`, `falling_three_methods`
- `trend`：`support_breakout`, `resistance_breakout`
- `volume`：`volume_breakout`, `volume_divergence` ⭐ 新增
- `oscillator`：`rsi_oversold_reversal`, `rsi_overbought_reversal`, `rsi_divergence` ⭐ 新增
- `momentum`：`macd_golden_cross`, `macd_dead_cross`, `macd_divergence` ⭐ 新增

**数据生成约定：**

- 优先使用联网真实数据流程：`fetch_data.py` → `build_dataset.py`
- 若网络或数据源不可用，使用 `generate_synthetic_data.py` 离线兜底
- 生成后的 `candlewise_cases.json` 需包含上述全部 29 种 `pattern_id`
- 指标字段（rsi/macd_xxx/kdj_xxx）在数据前期（窗口期不足）时值为 `null`，前端图表组件需过滤 null 值后再渲染

---

## 7. 进度存储方案

使用 `localStorage`，无需后端。

```js
// progressStore.js 的数据结构
{
  completedLessons: ["lesson_1_1", "lesson_1_2"],
  moduleProgress: {
    "basics":          { completed: 5, total: 8, passed: true },
    "single_reversal": { completed: 0, total: 8, passed: false }
  },
  practiceHistory: [
    { caseId: "case_0001", correct: true, timestamp: 1700000000 }
  ]
}
```

---

## 8. UI 设计方向

参考 Brilliant.org 的课程系统，但风格偏向**金融终端**美学：

- 配色：深色背景（#0f1117）+ 绿色主色（#00c896）+ 白色文字
- K线图：上涨绿色 `#00c896`，下跌红色 `#ff4d6a`
- 字体：正文 Noto Sans SC，数据/代码 JetBrains Mono
- 交互：选项按钮点击后即时反馈（绿色边框=正确，红色边框=错误），无需二次确认
- 动效：保持轻量，仅题目切换时有淡入，反馈面板有展开动画

---

## 9. 开发顺序（推荐）

按此顺序在 OpenCode 中逐步实现，每步都可以独立验证：

```
Phase 1  项目初始化
  └─ Vite + React + Tailwind + React Router 基础配置
  └─ GitHub Pages 部署配置（vite.config.js 的 base 路径）

Phase 2  数据层
  └─ useCases.js：加载 JSON、按模块/难度筛选
  └─ progressStore.js：Zustand + localStorage

Phase 3  K线图组件
  └─ CandleChart.jsx：集成 lightweight-charts
  └─ 支持 MA5 / MA20 叠加线
  └─ 支持 pattern_index 位置标注

Phase 4  练习页（核心功能）
  └─ Practice.jsx：完整答题流程
  └─ QuestionCard / OptionButton / FeedbackPanel

Phase 5  课程地图
  └─ Home.jsx：模块卡片 + 进度显示 + 解锁逻辑

Phase 6  课时内容页
  └─ Lesson.jsx：Markdown 渲染 + 课程文案

Phase 7  收尾
  └─ 响应式适配（移动端）
  └─ README + 贡献指南

Phase 8  课程体系重构设计（4模块12课 → 6模块18课，按尼森体系重写）

Phase 9  SPEC 重写与重构施工图落地（模块ID、课时、pattern_id 21种）

Phase 10  代码与数据重构执行（curriculum/patternMeta/lessons/dataset）

Phase 11  数据脚本扩展 ⭐ 新增
  └─ build_dataset.py：新增 MACD / KDJ 指标计算函数
  └─ 新增 8 种指标形态识别函数：
     volume_breakout, volume_divergence
     rsi_oversold_reversal, rsi_overbought_reversal, rsi_divergence
     macd_golden_cross, macd_dead_cross, macd_divergence
  └─ candle 字段扩展：macd_diff/dea/hist, kdj_k/d/j
  └─ QUOTA 更新：各新模块 15~20 条，总目标 ~300 条
  └─ 重新生成 candlewise_cases.json 并放入 public/data/

Phase 12  图表组件重构 ⭐ 新增
  └─ CandleChart.jsx：基于 lightweight-charts v4.2 多图联动实现副图
  └─ 新增 indicators prop（string[]，决定显示哪些副图）
  └─ pane 0：主图（K线 + MA5 + MA20，现有逻辑不变）
  └─ pane 1：成交量 HistogramSeries（volume 起）
  └─ pane 2：RSI LineSeries + 30/70 参考水平线（oscillator 起）
  └─ pane 3：MACD Histogram + DIFF/DEA LineSeries（momentum 起）
  └─ 响应式副图高度（三档：60/70/80px）

Phase 13  课程内容扩展 ⭐ 新增
  └─ curriculum.js：新增 volume / oscillator / momentum 3 个模块
  └─ synthesis 的 unlockRequires 更新为前8个模块
  └─ patternMeta.js：新增 8 种指标形态的 name_zh / explanation / mnemonic
  └─ MODULE_PATTERNS 新增三个模块的 pattern_id 分组
  └─ lessonDemos.js：新增 ~18 个 Demo 图（含 rsi/macd 数据字段）
  └─ 新增 9 个课时 Markdown 文件：
     lesson_7_1~3.md（成交量）
     lesson_8_1~3.md（RSI/KDJ）
     lesson_9_1~3.md（MACD）

Phase 14  答题系统适配 ⭐ 新增
  └─ Practice.jsx：根据 case.module 注入 INDICATOR_CONFIG，传给 CandleChart
  └─ buildQuestion()：新增指标题型文案（RSI 状态 / MACD 信号）
  └─ 全流程测试（9 模块 × 5 题，副图渲染与题目类型一一对应）
  └─ 干扰选项兜底：模块题型不足 3 个时，自动补充跨模块干扰项
```

---

## 10. GitHub 仓库规划

```
仓库名：  candlewise
描述：    Interactive K-line learning platform for stock market education
Topic：   react, stock-market, technical-analysis, education, candlestick
分支：    main（源码）/ gh-pages（构建产物，由 CI 自动推送）
```

**package.json 关键脚本：**
```json
{
  "scripts": {
    "dev":     "vite",
    "build":   "vite build",
    "deploy":  "npm run build && gh-pages -d dist"
  }
}
```

---

## 11. 开发进度

| Phase | 内容 | 状态 | 完成时间 | 开发平台 | 模型 |
|---|---|---|---|---|---|
| Phase 1 | 项目初始化（Vite + React + Tailwind + React Router + GitHub Pages 配置） | ✅ 已完成 | 2026-05-07 | OpenCode CLI (darwin) | claude-sonnet-4.6 |
| Phase 2 | 数据层（`curriculum.js` / `progressStore.js` / `useProgress.js` / `useCases.js`） | ✅ 已完成 | 2026-05-07 16:04 | OpenCode CLI (darwin) | claude-sonnet-4.6 |
| Phase 3 | K线图组件（`CandleChart.jsx`，MA5/MA20，pattern_index 标注） | ✅ 已完成 | 2026-05-07 | OpenCode CLI (darwin) | claude-sonnet-4.6 |
| Phase 4 | 练习页（`Practice.jsx` 完整答题流程，`QuestionCard` / `OptionButton` / `FeedbackPanel`） | ✅ 已完成 | 2026-05-07 | OpenCode CLI (darwin) | claude-sonnet-4.6 |
| Phase 5 | 课程地图（`Home.jsx` 整体进度统计 + `Module.jsx` 课时完成状态） | ✅ 已完成 | 2026-05-07 | OpenCode CLI (darwin) | claude-sonnet-4.6 |
| Phase 6 | 课时内容页（`Lesson.jsx` Markdown 渲染 + 9 节课文案 + 左侧目录导航） | ✅ 已完成 | 2026-05-07 | OpenCode CLI (darwin) | claude-sonnet-4.6 |
| Phase 7 | 收尾（响应式适配 + README + 贡献指南） | ✅ 已完成 | 2026-05-07 | OpenCode CLI (darwin) | claude-sonnet-4.6 |
| Phase 8 | 课程体系重构设计（4模块12课 → 6模块18课，按尼森体系重写） | ✅ 已完成 | 2026-05-08 | OpenCode CLI (darwin) | gpt-5.3-codex |
| Phase 9 | SPEC 重写与重构施工图落地（模块ID、课时、pattern_id 21种） | ✅ 已完成 | 2026-05-08 | OpenCode CLI (darwin) | gpt-5.3-codex |
| Phase 10 | 代码与数据重构执行（curriculum/patternMeta/lessons/dataset） | ✅ 已完成 | 2026-05-08 | Cowork (claude-sonnet-4-6) | claude-sonnet-4-6 |

| Phase 11 | 数据脚本扩展（MACD/KDJ 计算 + 8 种指标形态识别 + 重新生成数据集） | ✅ 已完成 | 2026-05-09 | OpenCode CLI (darwin) | claude-sonnet-4.6 |
| Phase 12 | 图表组件重构（多副图：成交量 / RSI / MACD，跨图联动实现） | ✅ 已完成 | 2026-05-09 | OpenCode CLI (darwin) | gpt-5.3-codex |
| Phase 13 | 课程内容扩展（3 新模块 + 9 课时 Markdown + patternMeta + lessonDemos） | ✅ 已完成 | 2026-05-09 | OpenCode CLI (darwin) | gpt-5.3-codex |
| Phase 14 | 答题系统适配（Practice.jsx 副图联动 + 指标题型文案 + 全流程测试） | ✅ 已完成 | 2026-05-09 | OpenCode CLI (darwin) | gpt-5.3-codex |

---

*最后更新：2026-05-09*  
*当前阶段：Phase 1~14 已完成*
