"""
generate_synthetic_data.py
──────────────────────────
当网络不通或真实数据还没就位时，用几何布朗运动（GBM）
生成仿真K线数据，用于本地调试 build_dataset.py 的完整流程。

真实数据优先，仿真数据仅用于测试和补充。

运行：python generate_synthetic_data.py
"""

import os
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

RAW_DIR = "raw_data"
os.makedirs(RAW_DIR, exist_ok=True)

# 仿真股票配置（模拟不同行业的波动特征）
SYNTHETIC_STOCKS = [
    # 名称          代码     起始价   日波动率   趋势漂移    行业
    ("仿真银行A",   "SIM001", 12.0,  0.012,  0.0001,  "银行"),
    ("仿真消费B",   "SIM002", 45.0,  0.018,  0.0003,  "消费"),
    ("仿真科技C",   "SIM003", 88.0,  0.025,  0.0002,  "科技"),
    ("仿真医药D",   "SIM004", 120.0, 0.020, -0.0001,  "医药"),
    ("仿真能源E",   "SIM005", 30.0,  0.015,  0.0002,  "能源"),
    ("仿真白酒F",   "SIM006", 200.0, 0.016,  0.0004,  "白酒"),
    ("仿真汽车G",   "SIM007", 55.0,  0.022,  0.0001,  "汽车"),
    ("仿真地产H",   "SIM008", 18.0,  0.019, -0.0002,  "地产"),
]

START_DATE = datetime(2018, 1, 2)
TRADING_DAYS = 1700   # ~2018-2024


def generate_ohlcv(
    n_days: int,
    s0: float,
    mu: float,
    sigma: float,
    seed: int = None
) -> pd.DataFrame:
    """
    用几何布朗运动生成日K线数据
    s0    : 起始价格
    mu    : 日均漂移率（趋势）
    sigma : 日均波动率
    """
    rng = np.random.default_rng(seed)

    # 生成日间收益率
    dt = 1.0
    log_returns = (mu - 0.5 * sigma**2) * dt + sigma * np.sqrt(dt) * rng.normal(size=n_days)

    closes = s0 * np.exp(np.cumsum(log_returns))

    # 用日内波动模拟开高低价
    intraday_vol = sigma * rng.uniform(0.3, 1.5, size=n_days)

    opens, highs, lows, volumes = [], [], [], []
    prev_close = s0
    for i in range(n_days):
        c = closes[i]
        # 开盘价：前收附近小幅跳空
        gap = rng.normal(0, sigma * 0.3)
        o = prev_close * (1 + gap)
        # 高低价：基于当日波动范围
        rng_size = abs(c - o) + c * intraday_vol[i]
        h = max(o, c) + abs(rng.normal(0, rng_size * 0.4))
        l = min(o, c) - abs(rng.normal(0, rng_size * 0.4))
        # 量能：趋势性成交量
        base_vol = 10_000_000
        vol_mult = 1 + 2 * abs(log_returns[i]) / sigma   # 大涨大跌放量
        vol = int(base_vol * vol_mult * rng.uniform(0.6, 1.6))
        opens.append(round(o, 3))
        highs.append(round(h, 3))
        lows.append(round(l, 3))
        volumes.append(vol)
        prev_close = c

    # 生成交易日期（跳过周末）
    dates = []
    d = START_DATE
    while len(dates) < n_days:
        if d.weekday() < 5:
            dates.append(d)
        d += timedelta(days=1)

    return pd.DataFrame({
        "date":   dates,
        "open":   opens,
        "high":   highs,
        "low":    lows,
        "close":  [round(c, 3) for c in closes],
        "volume": volumes,
    })


def main():
    print("=" * 50)
    print("Candlewise 仿真数据生成器")
    print(f"每只股票 {TRADING_DAYS} 个交易日")
    print("=" * 50)

    for i, (name, code, s0, sigma, mu, sector) in enumerate(SYNTHETIC_STOCKS):
        fpath = os.path.join(RAW_DIR, f"a_{code}.csv")
        if os.path.exists(fpath):
            print(f"  [skip] {name}({code}) 已存在")
            continue

        df = generate_ohlcv(TRADING_DAYS, s0, mu, sigma, seed=i * 7 + 42)
        df["symbol"] = code
        df["name"]   = name
        df["sector"] = sector
        df["source"] = "synthetic"
        df.to_csv(fpath, index=False)
        print(f"  [ok]  {name}({code})  {len(df)} 行  起始价 {s0}  波动率 {sigma:.1%}")

    files = [f for f in os.listdir(RAW_DIR) if f.endswith(".csv")]
    print(f"\n✓ 完成：raw_data/ 中共 {len(files)} 个文件")
    print("  现在可以运行 python build_dataset.py")


if __name__ == "__main__":
    main()
