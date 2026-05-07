# AGENTS.md

> 本文件基于 `SPEC.md` 生成，供 AI Agent 快速上手使用。所有中文交流均以中文进行。

## 项目状态

**当前阶段：初始化前（pre-Phase 1）**。前端代码尚未创建，仅存在：
- `SPEC.md` — 项目唯一权威规格文档（中文，312行）
- `data-scripts/` — Python 数据管道（已完成，数据集已生成）
- `data-scripts/candlewise_cases.json` — 已生成的题目数据，前端搭建后需复制到 `public/data/`

## 技术栈（锁定，不可更改）

| 层级 | 技术 |
|---|---|
| 前端框架 | React 18 + Vite |
| 样式 | Tailwind CSS v3 |
| 路由 | React Router v6（Hash 模式） |
| 图表 | `lightweight-charts`（TradingView OSS） |
| 状态管理 | Zustand + localStorage |
| 数据 | `/public/data/candlewise_cases.json`（静态文件） |
| 部署 | GitHub Pages（`gh-pages` 分支） |
| 包管理器 | **npm**（不用 yarn/pnpm） |

**明确排除**：不引入后端、API 服务器、数据库、用户认证、Next.js、AI Agent（v1）。

## 目录结构规范

```
candlewise/
├── public/data/candlewise_cases.json   ← 从 data-scripts/ 复制过来
├── src/
│   ├── main.jsx / App.jsx
│   ├── pages/        Home, Module, Lesson, Practice
│   ├── components/   CandleChart, QuestionCard, OptionButton,
│   │                 FeedbackPanel, ProgressBar, ModuleCard, Layout
│   ├── hooks/        useProgress.js, useCases.js
│   ├── store/        progressStore.js
│   └── data/         curriculum.js
├── data-scripts/
├── SPEC.md
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 开发命令（Phase 1 后有效）

```bash
npm run dev       # 本地开发服务器
npm run build     # 构建到 dist/
npm run deploy    # gh-pages -d dist（部署到 GitHub Pages）
```

## 开发阶段顺序

严格按 SPEC.md 中的顺序执行：

1. Vite + React + Tailwind + React Router + GitHub Pages 配置
2. 数据层（`useCases.js`、`progressStore.js` + Zustand）
3. `CandleChart.jsx`（lightweight-charts，含 MA5/MA20）
4. `Practice.jsx` 完整答题流程
5. `Home.jsx` 课程地图
6. `Lesson.jsx` Markdown 渲染
7. 响应式设计 + README

## UI 设计规范

- 风格：深色金融终端（参考 Brilliant.org）
- 背景色：`#0f1117`
- 主要绿色：`#00c896`
- 主要红色：`#ff4d6a`
- 字体：Noto Sans SC（中文）、JetBrains Mono（代码/数字）

## Practice 页面布局（核心页面）

```
进度条 → K线图（含MA5/MA20） → 题目文本 → A/B/C选项 → 反馈面板
```

## 课程模块结构

| 模块 | ID | 难度 | 知识点 |
|---|---|---|---|
| Module 1 | `single_candle` | 1 | 锤子线、射击之星、十字星、大阳/阴线 |
| Module 2 | `pattern` | 2 | 晨星、暮星、吞没形态、三白兵/三黑鸦 |
| Module 3 | `trend` | 3 | 支撑阻力位、MA5/MA20 金叉死叉 |
| Module 4 | 综合 | 3 | 解锁条件：前三模块全部完成 |

## 数据管道（已完成）

如需重新生成数据集：

```bash
cd data-scripts
pip install akshare yfinance pandas numpy
python fetch_data.py          # 拉取原始行情数据到 raw_data/
python build_dataset.py       # 生成 candlewise_cases.json
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
- `candlewise_cases.json` 已存在于 `data-scripts/`，Phase 1 搭好 `public/` 目录后立即复制，不要重新生成。
- 详细规格参见根目录 `SPEC.md`，所有设计决策以该文件为准。
