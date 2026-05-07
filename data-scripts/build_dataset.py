"""
build_dataset.py
────────────────
读取 raw_data/ 中的CSV，运行形态识别，
从命中位置截取K线片段，组装为200个教学案例，
输出：candlewise_cases.json（放入前端 /public/data/）

运行：python build_dataset.py
"""

import os
import json
import random
import pandas as pd
import numpy as np
from datetime import datetime
from detect_patterns import PATTERN_REGISTRY

RAW_DIR  = "raw_data"
OUT_FILE = "candlewise_cases.json"

# 每个形态最多采集的案例数（防止某一种形态占满配额）
MAX_PER_PATTERN = 20

# 总目标案例数
TARGET_TOTAL = 200

# 各形态目标分配（大致比例，超出会被截断）
QUOTA = {
    "hammer":              18,
    "shooting_star":       15,
    "doji":                12,
    "large_bullish":       12,
    "large_bearish":       12,
    "morning_star":        25,
    "evening_star":        20,
    "bullish_engulfing":   20,
    "bearish_engulfing":   20,
    "three_white_soldiers": 15,
    "three_black_crows":   15,
    "support_breakout":    18,
    "resistance_breakout": 18,
}


# ──────────────────────────────────────────
# 工具函数
# ──────────────────────────────────────────

def load_csv(path):
    """加载CSV并标准化列名"""
    df = pd.read_csv(path, parse_dates=["date"])
    df = df.sort_values("date").reset_index(drop=True)
    # 确保必需列存在
    for col in ["open", "high", "low", "close", "volume"]:
        if col not in df.columns:
            return None
    df[["open","high","low","close","volume"]] = \
        df[["open","high","low","close","volume"]].apply(pd.to_numeric, errors="coerce")
    df = df.dropna(subset=["open","high","low","close","volume"])
    return df


def compute_ma(closes, period):
    result = []
    for i in range(len(closes)):
        if i < period - 1:
            result.append(None)
        else:
            result.append(round(float(np.mean(closes[i - period + 1:i + 1])), 4))
    return result


def compute_rsi(closes, period=14):
    result = [None] * period
    for i in range(period, len(closes)):
        window = closes[i - period:i]
        gains = [max(window[j] - window[j-1], 0) for j in range(1, len(window))]
        losses = [max(window[j-1] - window[j], 0) for j in range(1, len(window))]
        avg_gain = np.mean(gains) if gains else 0
        avg_loss = np.mean(losses) if losses else 0
        if avg_loss == 0:
            result.append(100.0)
        else:
            rs = avg_gain / avg_loss
            result.append(round(100 - 100 / (1 + rs), 2))
    return result


def slice_segment(df, pattern_start_idx, before, after):
    """
    截取以 pattern_start_idx 为形态起点的K线片段
    返回：[{date, open, high, low, close, volume, ma5, ma20, rsi}, ...]
    """
    total = len(df)
    seg_start = max(0, pattern_start_idx - before)
    seg_end   = min(total, pattern_start_idx + after + 1)
    seg = df.iloc[seg_start:seg_end].copy().reset_index(drop=True)

    closes = seg["close"].tolist()
    ma5  = compute_ma(closes, 5)
    ma20 = compute_ma(closes, 20)
    rsi  = compute_rsi(closes, 14)

    # pattern_index_in_segment：形态起点在片段内的位置
    pattern_pos = pattern_start_idx - seg_start

    candles = []
    for i, row in seg.iterrows():
        candles.append({
            "date":   row["date"].strftime("%Y-%m-%d") if hasattr(row["date"], "strftime") else str(row["date"])[:10],
            "open":   round(float(row["open"]),   3),
            "high":   round(float(row["high"]),   3),
            "low":    round(float(row["low"]),    3),
            "close":  round(float(row["close"]),  3),
            "volume": int(row["volume"]),
            "ma5":    ma5[i],
            "ma20":   ma20[i],
            "rsi":    rsi[i],
        })

    return candles, pattern_pos


def make_case(case_id, symbol, name, sector, source,
              pattern_info, candles, pattern_pos):
    """组装单个案例对象"""
    # 计算形态后续走势（用于"预测模式"揭晓答案）
    after_start = pattern_pos + 1
    if after_start < len(candles):
        after_closes = [c["close"] for c in candles[after_start:]]
        if len(after_closes) >= 3:
            trend = "up" if after_closes[-1] > after_closes[0] else "down"
        else:
            trend = "unknown"
    else:
        trend = "unknown"

    return {
        "id":               case_id,
        "symbol":           symbol,
        "name":             name,
        "sector":           sector,
        "source":           source,
        "pattern_id":       pattern_info["id"],
        "pattern_name_zh":  pattern_info["name_zh"],
        "module":           pattern_info["module"],
        "difficulty":       pattern_info["difficulty"],
        "pattern_index":    pattern_pos,   # 片段内形态起始位置（前端用于高亮）
        "subsequent_trend": trend,          # 形态后续真实走势
        "candles":          candles,
        "total_candles":    len(candles),
    }


# ──────────────────────────────────────────
# 主流程
# ──────────────────────────────────────────

def main():
    print("=" * 55)
    print("Candlewise 数据集构建脚本")
    print("=" * 55)

    csv_files = [f for f in os.listdir(RAW_DIR) if f.endswith(".csv")]
    if not csv_files:
        print(f"错误：{RAW_DIR}/ 目录为空，请先运行 fetch_data.py")
        return

    print(f"\n找到 {len(csv_files)} 个原始数据文件")

    # 加载所有股票数据
    stocks = []
    for fname in csv_files:
        df = load_csv(os.path.join(RAW_DIR, fname))
        if df is None or len(df) < 60:
            continue
        meta = {
            "symbol": df["symbol"].iloc[0] if "symbol" in df.columns else fname,
            "name":   df["name"].iloc[0]   if "name"   in df.columns else fname,
            "sector": df["sector"].iloc[0] if "sector" in df.columns else "未知",
            "source": df["source"].iloc[0] if "source" in df.columns else "unknown",
            "df":     df
        }
        stocks.append(meta)

    print(f"有效股票：{len(stocks)} 只")

    # 对每种形态，在所有股票中搜索命中位置
    all_cases = []
    case_counter = 1
    # 打乱形态顺序，让输出更自然
    registry = list(PATTERN_REGISTRY)
    random.shuffle(registry)

    for pattern in registry:
        pid = pattern["id"]
        quota = QUOTA.get(pid, MAX_PER_PATTERN)
        collected = 0
        hits_pool = []

        for stock in stocks:
            df = stock["df"]
            try:
                hits = pattern["fn"](df)
            except Exception as e:
                continue
            for h in hits:
                # 确保片段范围合法
                before = pattern["segment_before"]
                after  = pattern["segment_after"]
                if h - before < 5 or h + after >= len(df):
                    continue
                hits_pool.append((stock, df, h))

        if not hits_pool:
            print(f"  [warn] {pattern['name_zh']}({pid})：未找到命中案例")
            continue

        # 随机抽样，避免同一只股票的案例扎堆
        random.shuffle(hits_pool)
        seen_symbols = {}
        for stock, df, h in hits_pool:
            if collected >= quota:
                break
            sym = stock["symbol"]
            seen_symbols[sym] = seen_symbols.get(sym, 0) + 1
            # 每只股票同一形态最多贡献3个案例
            if seen_symbols[sym] > 3:
                continue

            candles, pattern_pos = slice_segment(
                df, h, pattern["segment_before"], pattern["segment_after"]
            )
            case = make_case(
                case_id      = f"case_{case_counter:04d}",
                symbol       = stock["symbol"],
                name         = stock["name"],
                sector       = stock["sector"],
                source       = stock["source"],
                pattern_info = pattern,
                candles      = candles,
                pattern_pos  = pattern_pos,
            )
            all_cases.append(case)
            case_counter += 1
            collected += 1

        print(f"  [ok] {pattern['name_zh']:12s}  采集 {collected:3d} 个案例")

    # 打乱顺序后限制总数
    random.shuffle(all_cases)
    all_cases = all_cases[:TARGET_TOTAL]

    # 按难度重新排序（便于课程设计）
    all_cases.sort(key=lambda x: (x["difficulty"], x["module"]))

    # 重新分配 id（排序后）
    for i, case in enumerate(all_cases):
        case["id"] = f"case_{i+1:04d}"

    # 统计
    from collections import Counter
    pattern_counts = Counter(c["pattern_id"] for c in all_cases)
    module_counts  = Counter(c["module"] for c in all_cases)
    diff_counts    = Counter(c["difficulty"] for c in all_cases)

    print(f"\n── 数据集统计 ──")
    print(f"总案例数：{len(all_cases)}")
    print(f"\n按形态：")
    for pid, cnt in sorted(pattern_counts.items(), key=lambda x: -x[1]):
        name = next((p["name_zh"] for p in PATTERN_REGISTRY if p["id"] == pid), pid)
        print(f"  {name:12s}  {cnt:3d}")
    print(f"\n按模块：{dict(module_counts)}")
    print(f"按难度：{dict(diff_counts)}")

    # 写入JSON（含元信息）
    output = {
        "meta": {
            "version":      "1.0.0",
            "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "total_cases":  len(all_cases),
            "date_range":   "2018-2024",
            "description":  "Candlewise 教学数据集 - 真实历史K线案例",
            "pattern_distribution": dict(pattern_counts),
            "module_distribution":  dict(module_counts),
            "difficulty_distribution": {str(k): v for k, v in diff_counts.items()},
        },
        "cases": all_cases
    }

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    size_kb = os.path.getsize(OUT_FILE) / 1024
    print(f"\n✓ 数据集已写入：{OUT_FILE}  ({size_kb:.0f} KB)")
    print(f"  将此文件放入前端项目：public/data/candlewise_cases.json")


if __name__ == "__main__":
    random.seed(42)   # 固定随机种子，保证复现性
    main()
