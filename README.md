# 🕯 Candlewise

> 用真实历史K线案例，系统学习股票技术分析

Candlewise 是一个仿照 [Brilliant.org](https://brilliant.org) 课程体验、专注 K 线技术分析的**开源交互式学习平台**。通过真实历史行情数据驱动的闯关练习，帮助投资者从零掌握K线形态识别与趋势判断。

**[立即体验 →](https://dengxuhui.github.io/candlewise/)**

---

## 特性

- **交互式闯关**：基于真实历史行情数据，每题展示真实K线图，选择形态答案后即时反馈
- **结构化课程**：4 大模块（单根形态 → 组合形态 → 趋势关键位 → 综合判断），循序渐进
- **专业图表**：集成 TradingView [lightweight-charts](https://github.com/tradingview/lightweight-charts)，含 MA5 / MA20 均线叠加
- **进度持久化**：学习进度存储在本地 localStorage，无需注册登录
- **模块解锁机制**：完成前置模块练习后才能解锁下一模块
- **响应式设计**：适配手机、平板、桌面端
- **纯静态部署**：零后端，GitHub Pages 托管，免费开源

## 课程结构

| 模块 | 知识点 | 难度 |
|---|---|---|
| Module 1：K线基础 | 锤子线、流星线、十字星、大阳/阴线 | ⭐ |
| Module 2：组合形态 | 启明星、黄昏之星、吞没形态、三白兵/三黑鸦 | ⭐⭐ |
| Module 3：趋势与关键位 | 支撑阻力位、角色转换、MA5/MA20 金叉死叉 | ⭐⭐⭐ |
| Module 4：综合判断 | 多指标共振，解锁条件：前三模块全部通过 | ⭐⭐⭐ |

## 本地开发

**环境要求**：Node.js 18+，npm

```bash
# 克隆项目
git clone https://github.com/dengxuhui/candlewise.git
cd candlewise

# 安装依赖
npm install

# 复制数据集（首次需要）
cp data-scripts/candlewise_cases.json public/data/

# 启动开发服务器
npm run dev
```

浏览器访问 `http://localhost:5173`

## 构建与部署

```bash
# 构建到 dist/
npm run build

# 部署到 GitHub Pages（需要先在 package.json 配置 homepage）
npm run deploy
```

部署脚本会自动将 `dist/` 推送到 `gh-pages` 分支。

## 技术栈

| 层级 | 技术 |
|---|---|
| 前端框架 | React 18 + Vite |
| 样式 | Tailwind CSS v3 |
| 路由 | React Router v6（Hash 模式） |
| 图表 | lightweight-charts v4（TradingView OSS） |
| 状态管理 | Zustand + localStorage |
| 数据 | 静态 JSON（`/public/data/candlewise_cases.json`） |
| 部署 | GitHub Pages via `gh-pages` |

## 数据集

题目数据来源于 `data-scripts/` 目录中的 Python 数据管道，使用 [akshare](https://github.com/akfamily/akshare) 拉取真实 A 股历史行情数据，自动检测 K 线形态并生成标注数据集。

如需重新生成：

```bash
cd data-scripts
pip install akshare yfinance pandas numpy
python fetch_data.py          # 拉取原始行情
python build_dataset.py       # 生成 candlewise_cases.json
cp candlewise_cases.json ../public/data/
```

无网络环境可使用 `generate_synthetic_data.py` 生成合成数据。

## 贡献

欢迎提交 Pull Request！请先阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)。

常见贡献方向：
- 新增 K 线形态的题目和解析文案
- 改进数据管道，增加更多股票标的
- UI/UX 改进
- 国际化（英文版）

## License

[MIT](./LICENSE) © 2026 dengxuhui
