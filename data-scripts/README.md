# candlewise / data-scripts

Candlewise 教学数据集准备脚本，输出 `candlewise_cases.json`，
供前端项目直接读取，无需服务器。

---

## 文件说明

```
data-scripts/
├── fetch_data.py              # 第一步：从真实数据源拉取原始K线
├── generate_synthetic_data.py # 备用：无网络时生成仿真数据（调试用）
├── detect_patterns.py         # 形态识别算法库
├── build_dataset.py           # 最后一步：组装输出 JSON
├── raw_data/                  # 自动创建，存放原始CSV
└── candlewise_cases.json      # 最终产物，放入前端 public/data/
```

---

## 快速开始

### 1. 安装依赖

```bash
pip install akshare yfinance pandas numpy
```

### 2. 拉取真实数据（需要网络）

```bash
python fetch_data.py
```

- A 股数据来源：[AKShare](https://akshare.akfun.cn/)，完全免费
- 港股/ETF/指数来源：yfinance（Yahoo Finance）
- 数据区间：2018-01-01 ~ 2024-12-31（约 7 年）
- 预计耗时：3~5 分钟（有限速保护）
- 输出到 `raw_data/` 目录

> 如果网络受限，可先用 `python generate_synthetic_data.py` 生成仿真数据调试流程。

### 3. 构建数据集

```bash
python build_dataset.py
```

- 自动运行 13 种形态识别算法
- 从命中位置截取 30~60 根K线片段
- 每个片段附带 MA5、MA20、RSI 指标
- 输出 `candlewise_cases.json`

### 4. 放入前端项目

```bash
cp candlewise_cases.json ../candlewise/public/data/
```

---

## 数据集结构

```json
{
  "meta": {
    "version": "1.0.0",
    "total_cases": 200,
    "pattern_distribution": { "morning_star": 23, "hammer": 16, ... }
  },
  "cases": [
    {
      "id":              "case_0001",
      "symbol":          "600519",
      "name":            "贵州茅台",
      "sector":          "白酒",
      "pattern_id":      "morning_star",
      "pattern_name_zh": "启明星",
      "module":          "pattern",
      "difficulty":      2,
      "pattern_index":   15,
      "subsequent_trend": "up",
      "candles": [
        {
          "date":  "2021-03-10",
          "open":  1920.0,
          "high":  1950.0,
          "low":   1905.0,
          "close": 1938.0,
          "volume": 3820000,
          "ma5":   1910.4,
          "ma20":  1885.2,
          "rsi":   52.3
        }
      ]
    }
  ]
}
```

### 关键字段说明

| 字段 | 含义 |
|---|---|
| `pattern_index` | 形态起始K线在 `candles` 数组中的位置（前端用于高亮标注） |
| `subsequent_trend` | 形态发生后实际走势（`up` / `down`），用于"预测模式"揭晓答案 |
| `module` | 所属课程模块：`single_candle` / `pattern` / `trend` |
| `difficulty` | 难度等级：1（基础）/ 2（进阶）/ 3（综合） |

---

## 支持的形态（13 种）

| 模块 | 形态 | 难度 |
|---|---|---|
| single_candle | 锤子线、流星线、十字星、大阳线、大阴线 | ⭐ |
| pattern | 启明星、黄昏之星、阳线吞没、阴线吞没、三只白兵、三只乌鸦 | ⭐⭐ |
| trend | 支撑位测试、阻力位突破 | ⭐⭐⭐ |

---

## 扩展数据集

想增加新形态，在 `detect_patterns.py` 末尾的 `PATTERN_REGISTRY` 中添加：

```python
{
    "id": "my_pattern",
    "name_zh": "我的形态",
    "module": "pattern",
    "difficulty": 2,
    "segment_before": 15,
    "segment_after": 10,
    "fn": my_detect_function,   # 接收 df，返回命中索引列表
}
```

并在 `build_dataset.py` 的 `QUOTA` 字典中设置采集上限即可。
