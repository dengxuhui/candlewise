"""
fetch_data.py
─────────────
从 AKShare（A股）和 yfinance（港股/ETF）拉取历史日K线数据
输出：raw_data/ 目录下每只股票一个 CSV 文件

运行：python fetch_data.py
"""

import os
import time
import pandas as pd
import akshare as ak
import yfinance as yf

RAW_DIR = "raw_data"
os.makedirs(RAW_DIR, exist_ok=True)

# ──────────────────────────────────────────
# 股票池：精选覆盖不同行业、不同波动特征
# 目的是让形态识别算法有足够多样的素材
# ──────────────────────────────────────────

A_SHARES = [
    # 代码       名称          行业
    ("000001",  "平安银行",    "银行"),
    ("000333",  "美的集团",    "家电"),
    ("000651",  "格力电器",    "家电"),
    ("000858",  "五粮液",      "白酒"),
    ("002475",  "立讯精密",    "消费电子"),
    ("002594",  "比亚迪",      "新能源"),
    ("300750",  "宁德时代",    "新能源"),
    ("600000",  "浦发银行",    "银行"),
    ("600036",  "招商银行",    "银行"),
    ("600276",  "恒瑞医药",    "医药"),
    ("600519",  "贵州茅台",    "白酒"),
    ("600900",  "长江电力",    "公用事业"),
    ("601318",  "中国平安",    "保险"),
    ("601888",  "中国中免",    "消费"),
    ("603288",  "海天味业",    "食品"),
]

# yfinance 格式：ticker symbol
INTL_STOCKS = [
    # ticker       名称            类型
    ("0700.HK",   "腾讯控股",      "港股科技"),
    ("9988.HK",   "阿里巴巴",      "港股电商"),
    ("^HSI",      "恒生指数",      "港股指数"),
    ("000300.SS", "沪深300指数",   "A股指数"),
    ("510300.SS", "沪深300ETF",    "ETF"),
]

START_DATE = "2018-01-01"
END_DATE   = "2024-12-31"


def fetch_a_share(code, name, sector):
    """用 AKShare 拉取A股日K线"""
    fpath = os.path.join(RAW_DIR, f"a_{code}.csv")
    if os.path.exists(fpath):
        print(f"  [skip] {name}({code}) 已存在")
        return

    try:
        df = ak.stock_zh_a_hist(
            symbol=code,
            period="daily",
            start_date=START_DATE.replace("-", ""),
            end_date=END_DATE.replace("-", ""),
            adjust="qfq"          # 前复权，消除分红/配股影响
        )
        # 统一列名
        df = df.rename(columns={
            "日期": "date",
            "开盘": "open",
            "最高": "high",
            "最低": "low",
            "收盘": "close",
            "成交量": "volume",
            "成交额": "amount",
            "涨跌幅": "pct_change",
        })
        df["date"] = pd.to_datetime(df["date"])
        df = df.sort_values("date").reset_index(drop=True)
        df["symbol"] = code
        df["name"] = name
        df["sector"] = sector
        df["source"] = "akshare"
        df.to_csv(fpath, index=False)
        print(f"  [ok]   {name}({code})  {len(df)} 行")
    except Exception as e:
        print(f"  [err]  {name}({code}): {e}")
    time.sleep(0.8)   # 避免请求过快被限速


def fetch_intl(ticker, name, category):
    """用 yfinance 拉取港股/指数/ETF"""
    fpath = os.path.join(RAW_DIR, f"intl_{ticker.replace('.','_').replace('^','idx')}.csv")
    if os.path.exists(fpath):
        print(f"  [skip] {name}({ticker}) 已存在")
        return

    try:
        tkr = yf.Ticker(ticker)
        df = tkr.history(start=START_DATE, end=END_DATE, interval="1d")
        if df.empty:
            print(f"  [warn] {name}({ticker}) 无数据")
            return
        df = df.reset_index()
        df.columns = [c.lower().replace(" ", "_") for c in df.columns]
        df = df.rename(columns={"date": "date", "stock_splits": "splits"})
        if "date" in df.columns:
            df["date"] = pd.to_datetime(df["date"]).dt.tz_localize(None)
        df["symbol"] = ticker
        df["name"] = name
        df["sector"] = category
        df["source"] = "yfinance"
        df = df.sort_values("date").reset_index(drop=True)
        df.to_csv(fpath, index=False)
        print(f"  [ok]   {name}({ticker})  {len(df)} 行")
    except Exception as e:
        print(f"  [err]  {name}({ticker}): {e}")
    time.sleep(0.5)


def main():
    print("=" * 50)
    print("Candlewise 数据抓取脚本")
    print(f"区间：{START_DATE} ~ {END_DATE}")
    print("=" * 50)

    print("\n── A股数据（AKShare）──")
    for code, name, sector in A_SHARES:
        fetch_a_share(code, name, sector)

    print("\n── 港股 / 指数 / ETF（yfinance）──")
    for ticker, name, category in INTL_STOCKS:
        fetch_intl(ticker, name, category)

    # 简单统计
    files = [f for f in os.listdir(RAW_DIR) if f.endswith(".csv")]
    total_rows = 0
    for f in files:
        try:
            n = len(pd.read_csv(os.path.join(RAW_DIR, f)))
            total_rows += n
        except:
            pass

    print(f"\n✓ 完成：{len(files)} 个文件，共 {total_rows:,} 行数据")
    print(f"  输出目录：{os.path.abspath(RAW_DIR)}/")


if __name__ == "__main__":
    main()
