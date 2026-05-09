# 贡献指南

感谢你对 Candlewise 的关注！本文档说明如何参与项目贡献。

## 开发环境搭建

**环境要求**：Node.js 18+，npm，Python 3.9+（仅数据管道需要）

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/<your-username>/candlewise.git
cd candlewise

# 2. 安装前端依赖
npm install

# 3. 启动开发服务器
npm run dev
```

## 分支策略

| 分支 | 用途 |
|---|---|
| `main` | 稳定版本，源码 |
| `gh-pages` | 自动部署产物（勿手动提交） |
| `feat/<名称>` | 新功能开发 |
| `fix/<名称>` | Bug 修复 |

**工作流程**：

1. 从 `main` 创建新分支：`git checkout -b feat/your-feature`
2. 开发、测试
3. 提交 PR 到 `main`

## Commit 规范

采用约定式提交（Conventional Commits）格式：

```
<type>: <简短描述>
```

常用 type：

| type | 含义 |
|---|---|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档修改 |
| `style` | 样式调整（不影响逻辑） |
| `refactor` | 重构（不新增功能，不修复 bug） |
| `data` | 数据集相关变更 |
| `chore` | 构建配置、依赖更新等 |

示例：
```
feat: 新增预测模式（模式B）练习流程
fix: 修复移动端K线图高度溢出问题
docs: 更新 README 部署说明
data: 新增趋势模块案例数据 50 条
```

## PR 规范

提交 PR 时请：

1. **描述改动目的**：说明解决了什么问题或新增了什么功能
2. **关联 Issue**（如有）：`Closes #123`
3. **本地验证**：确保 `npm run build` 无报错
4. **不提交 `public/data/candlewise_cases.json`**：该文件通过 data-scripts 生成，不在 git 跟踪范围

## 数据集更新

如需修改题目数据或新增标的：

```bash
cd data-scripts

# 安装 Python 依赖
pip install akshare yfinance pandas numpy

# 拉取行情（需要网络）
python fetch_data.py

# 重新生成数据集
python build_dataset.py

# 复制到 public/
cp candlewise_cases.json ../public/data/
```

无网络环境请使用 `generate_synthetic_data.py`。

**注意**：`data-scripts/raw_data/` 已加入 `.gitignore`，请勿提交原始行情文件。

## 常见贡献方向

- **新增形态**：在 `src/data/patternMeta.js` 和数据管道中添加新的 K 线形态识别和题目
- **课程文案**：改进 `src/data/lessons/` 中的 Markdown 课时内容（共 27 个文件，lesson_1_1 ~ lesson_9_3）
- **指标模块**：完善 volume / oscillator / momentum 模块的题目数据和解析文案
- **UI/UX**：改进视觉设计，参考 `SPEC.md` 中的设计规范
- **国际化**：添加英文版界面支持
- **无障碍**：改进键盘导航和屏幕阅读器支持

## 问题反馈

- **Bug**：[提交 Issue](https://github.com/dengxuhui/candlewise/issues/new?template=bug_report.md)，附上复现步骤和浏览器版本
- **功能建议**：[提交 Feature Request](https://github.com/dengxuhui/candlewise/issues/new?template=feature_request.md)

---

*项目遵循 [MIT License](./LICENSE)*
