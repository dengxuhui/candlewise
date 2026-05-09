# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

CandleWise 是一个 K 线图学习平台，纯静态前端应用，部署在 GitHub Pages。用户通过阅读课时 Markdown 内容、在 K 线图上识别形态来学习技术分析。

**权威文档**：所有设计决策以 `SPEC.md` 为准，本文件不重复其内容。

## 开发命令

```bash
npm run dev      # 本地开发服务器（http://localhost:5173/candlewise/）
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物
npm run deploy   # 构建 + 推送到 gh-pages 分支
```

无测试框架，无 lint 脚本。

## 技术栈约束

- **包管理器**：npm（不用 yarn/pnpm）
- **路由**：Hash 模式（`/#/path`），GitHub Pages 静态部署要求
- **图表**：`lightweight-charts` v4（TradingView OSS），不可替换
- **状态**：Zustand + `localStorage`（key: `candlewise-progress`），无后端
- **数据**：`/public/data/candlewise_cases.json` 静态文件，运行时 fetch

## 架构要点

### 路由结构（`src/App.jsx`）

```
/                        → Home（课程地图 + 预测挑战入口）
/module/:moduleId        → Module（模块详情）
/module/:moduleId/lesson/:lessonId → Lesson（Markdown 课时）
/module/:moduleId/practice         → Practice（识别模式，模式 A）
/predict                           → Predict（预测挑战，模式 B）
```

### 数据流

1. `useCases.js`：模块级缓存，首次 fetch `candlewise_cases.json`，后续复用，支持按 `module`/`difficulty` 筛选和随机抽题
2. `progressStore.js`（Zustand）：持久化 `completedLessons`、`moduleProgress`、`practiceHistory`、`freeMode`、`colorTheme`、`predictBestScore`（预测最高分）
3. 模块解锁逻辑在 `isModuleUnlocked()`：检查 `unlockRequires` 数组中所有前置模块是否 `passed`

### 课程配置（`src/data/curriculum.js`）

9 个模块顺序解锁：`basics` → `single_reversal` → `double_reversal` → `triple_pattern` → `trend` → `volume` → `oscillator` → `momentum` → `synthesis`（需前八个全通过）。每模块 3 课时 + 5 题练习，通过条件为 ≥ 3/5 正确。

### CandleChart 组件

- 读取 `colorTheme` 决定涨跌色：`chinese`（红涨绿跌）/ `western`（绿涨红跌）
- 自动计算并渲染 MA5（橙色）、MA20（蓝色）均线
- `patternIndex` 参数在对应 K 线上方渲染三角标记

### 课时内容

27 个 Markdown 文件在 `src/data/lessons/`（lesson_1_1 ~ lesson_9_3），由 `LessonMarkdown.jsx` 通过 `react-markdown` + `remark-gfm` 渲染。

## UI 规范

- 背景：`#0f1117`，深色金融终端风格
- 涨色（western）：`#00c896`，跌色（western）：`#ff4d6a`
- 字体：Noto Sans SC（中文），JetBrains Mono（数字/代码）

## 数据管道（通常无需操作）

如需重新生成题目数据：

```bash
cd data-scripts
pip install akshare yfinance pandas numpy
python fetch_data.py       # 拉取原始行情 → raw_data/（已 gitignore）
python build_dataset.py    # 生成 candlewise_cases.json
cp candlewise_cases.json ../public/data/
```

## 部署约定

- `main`：源码
- `gh-pages`：构建产物（`npm run deploy` 自动推送，勿手动操作）
- Vite base 路径固定为 `/candlewise/`
