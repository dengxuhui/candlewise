# AGENTS.md

> 本文件基于 `SPEC.md` 生成，供 AI Agent 快速上手使用。所有中文交流均以中文进行。

## 项目状态

**当前阶段：Phase 1 ~ Phase 14 全部已完成**。项目已可正常运行，包括：
- `SPEC.md` — 项目唯一权威规格文档
- `data-scripts/` — Python 数据管道（已完成，数据集已生成）
- `public/data/candlewise_cases.json` — 题目数据已就位（含 MA5/MA20/RSI/MACD/KDJ 字段）
- `src/` — 完整前端代码（9 模块课程、27 课时 Markdown、副图指标渲染全部实现）

## 技术栈（锁定，不可更改）

| 层级 | 技术 |
|---|---|
| 前端框架 | React 18 + Vite |
| 样式 | Tailwind CSS v3 |
| 路由 | React Router v6（Hash 模式） |
| 图表 | `lightweight-charts` v4（TradingView OSS） |
| 状态管理 | Zustand + localStorage |
| Markdown | `react-markdown` + `remark-gfm` |
| 数据 | `/public/data/candlewise_cases.json`（静态文件） |
| 部署 | GitHub Pages（`gh-pages` 分支） |
| 包管理器 | **npm**（不用 yarn/pnpm） |

**明确排除**：不引入后端、API 服务器、数据库、用户认证、Next.js、AI Agent（v1）。

## 目录结构规范

```
candlewise/
├── public/data/candlewise_cases.json   ← 题目数据已就位
├── src/
│   ├── main.jsx / App.jsx
│   ├── pages/        Home, Module, Lesson, Practice
│   ├── components/   CandleChart, QuestionCard, OptionButton,
│   │                 FeedbackPanel, ProgressBar, FreeToggle,
│   │                 LessonMarkdown, Layout
│   ├── hooks/        useProgress.js, useCases.js
│   ├── store/        progressStore.js
│   └── data/         curriculum.js, lessonDemos.js, patternMeta.js,
│                     lessons/（27 个 .md 课时文案，lesson_1_1 ~ lesson_9_3）
├── data-scripts/
├── SPEC.md
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 开发命令

```bash
npm run dev       # 本地开发服务器（http://localhost:5173/candlewise/）
npm run build     # 构建到 dist/
npm run deploy    # gh-pages -d dist（部署到 GitHub Pages）
```

## UI 设计规范

- 风格：深色金融终端（参考 Brilliant.org）
- 背景色：`#0f1117`
- 主要绿色：`#00c896`
- 主要红色：`#ff4d6a`
- 字体：Noto Sans SC（中文）、JetBrains Mono（代码/数字）

## Practice 页面布局（核心页面）

```
进度条 → K线图（含MA5/MA20）+ 按模块按需显示副图 → 题目文本 → A/B/C选项 → 反馈面板
```

副图注入规则：

| 模块 | 副图 |
|---|---|
| basics / single_reversal / double_reversal / triple_pattern / trend | 无 |
| volume | 成交量柱图 |
| oscillator | 成交量 + RSI |
| momentum | 成交量 + MACD |
| synthesis | 成交量 + RSI + MACD |

## 课程模块结构（9 个模块）

| 模块 | ID | 难度 | 知识点 |
|---|---|---|---|
| Module 1 | `basics` | 1 | 十字星、大阳线、大阴线 |
| Module 2 | `single_reversal` | 1 | 锤子线、吊颈线、流星线、倒锤子线、十字星家族 |
| Module 3 | `double_reversal` | 2 | 吞没形态、乌云盖顶、刺透形态、孕线 |
| Module 4 | `triple_pattern` | 2 | 启明星、黄昏之星、三白兵、三乌鸦、三法形态 |
| Module 5 | `trend` | 3 | 支撑阻力位、角色转换、MA5/MA20 金叉死叉 |
| Module 6 | `volume` | 2 | 量价配合、量价背离、突破量能验证 |
| Module 7 | `oscillator` | 3 | RSI 超买超卖、KDJ、振荡背离 |
| Module 8 | `momentum` | 3 | MACD 金叉死叉、柱状图动能、MACD 背离 |
| Module 9 | `synthesis` | 3 | 假信号共振、三重确认法（需前八模块全通过） |

## 数据管道（已完成）

如需重新生成数据集：

```bash
cd data-scripts
pip install akshare yfinance pandas numpy
python fetch_data.py          # 拉取原始行情数据到 raw_data/
python build_dataset.py       # 生成 candlewise_cases.json（含全部指标字段）
cp candlewise_cases.json ../public/data/
```

`raw_data/` 目录已在 `.gitignore` 中排除（大文件）。`generate_synthetic_data.py` 是无网络环境下的离线备用方案。

## 部署约定

- `main` 分支：源码
- `gh-pages` 分支：构建产物（由 `npm run deploy` 推送，不手动操作）
- 纯静态站点，无服务端渲染

## 注意事项

- 路由使用 **Hash 模式**（`/#/path`），这是 GitHub Pages 静态部署的要求。
- 进度数据仅存储在 `localStorage`，无后端同步。
- `candlewise_cases.json` 已存在于 `public/data/`，无需重新生成。
- 详细规格参见根目录 `SPEC.md`，所有设计决策以该文件为准。

## Agent 行为约束

- **禁止启动长期运行的进程**：任务完成后不得运行 `npm run dev`、`npm start` 或任何会持续占用终端的服务器进程。验证构建结果请用 `npm run build`（会自动退出）。
- 重新生成数据集后，必须执行 `cp data-scripts/candlewise_cases.json public/data/candlewise_cases.json` 同步到前端目录。
