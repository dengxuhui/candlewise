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
│       └── candlewise_cases.json   # 200个K线案例数据集（见第6节）
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
│       └── lessons/                # 各课时 Markdown 文案
│           ├── lesson_1_1.md ~ lesson_1_3.md
│           ├── lesson_2_1.md ~ lesson_2_3.md
│           ├── lesson_3_1.md ~ lesson_3_3.md
│           └── lesson_4_1.md ~ lesson_4_3.md
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

共 4 个模块，每模块包含若干课时 + 一组练习题。

### Module 1：K线基础 `single_candle`
- Lesson 1-1：什么是K线（阴阳线、实体、影线）
- Lesson 1-2：单根K线的四个价格（开高低收）
- Lesson 1-3：影线的含义（多空博弈）
- Practice：识别锤子线、流星线、十字星、大阳线、大阴线（难度 1）

### Module 2：组合形态 `pattern`
- Lesson 2-1：启明星与黄昏之星
- Lesson 2-2：吞没形态（阳线吞没 / 阴线吞没）
- Lesson 2-3：三只白兵与三只乌鸦
- Practice：识别上述 6 种组合形态（难度 2）

### Module 3：趋势与关键位 `trend`
- Lesson 3-1：支撑位与阻力位的形成
- Lesson 3-2：角色转换原则（阻力变支撑）
- Lesson 3-3：均线：MA5 / MA20 金叉死叉
- Practice：判断支撑测试、阻力突破（难度 3）

### Module 4：综合判断（解锁前三关全部完成后）
- Lesson 4-1：多信号共振分析
- Lesson 4-2：假突破与陷阱识别
- Lesson 4-3：实战复盘方法论
- Practice：多指标共振 + 预测后续走势（难度 3，难度最高）

---

## 5. 核心页面规格

### 5.1 首页 Home.jsx
- 顶部 Hero：项目名 + 一句话介绍 + "开始学习"按钮
- 课程模块网格：4 个 ModuleCard，显示模块名、图标、进度百分比、锁定状态
- 模块解锁逻辑：Module 1 默认解锁，后续模块需上一模块练习通过才解锁

### 5.2 闯关练习页 Practice.jsx（最核心）

**布局：**
```
┌─────────────────────────────────────┐
│  进度条（第 X 题 / 总题数）           │
├─────────────────────────────────────┤
│                                     │
│         K 线图（lightweight-charts） │
│         含 MA5 / MA20 均线叠加       │
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
    "total_cases": 200,
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
  "module":           "pattern",
  "difficulty":       2,
  "pattern_index":    15,
  "subsequent_trend": "up",
  "candles": [
    {
      "date":   "2021-03-10",
      "open":   1920.0,
      "high":   1950.0,
      "low":    1905.0,
      "close":  1938.0,
      "volume": 3820000,
      "ma5":    1910.4,
      "ma20":   1885.2,
      "rsi":    52.3
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
| `module` | 按模块筛选题目 |
| `difficulty` | 按难度筛选题目 |
| `ma5` / `ma20` | 叠加均线显示 |

---

## 7. 进度存储方案

使用 `localStorage`，无需后端。

```js
// progressStore.js 的数据结构
{
  completedLessons: ["lesson_1_1", "lesson_1_2"],
  moduleProgress: {
    "single_candle": { completed: 5, total: 8, passed: true },
    "pattern":       { completed: 0, total: 8, passed: false }
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

---

*最后更新：2026-05-08*  
*当前阶段：Phase 7 已完成，全部开发阶段结束*
