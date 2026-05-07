"""
detect_patterns.py
──────────────────
K线形态识别算法库
每个函数接收 DataFrame（含 open/high/low/close/volume 列），
返回所有命中该形态的起始索引列表。
"""

import pandas as pd
import numpy as np


# ──────────────────────────────────────────
# 基础工具函数
# ──────────────────────────────────────────

def body(df, i):
    """实体大小（绝对值）"""
    return abs(df['close'].iloc[i] - df['open'].iloc[i])

def body_top(df, i):
    return max(df['close'].iloc[i], df['open'].iloc[i])

def body_bottom(df, i):
    return min(df['close'].iloc[i], df['open'].iloc[i])

def upper_shadow(df, i):
    return df['high'].iloc[i] - body_top(df, i)

def lower_shadow(df, i):
    return body_bottom(df, i) - df['low'].iloc[i]

def candle_range(df, i):
    return df['high'].iloc[i] - df['low'].iloc[i]

def is_bullish(df, i):
    return df['close'].iloc[i] > df['open'].iloc[i]

def is_bearish(df, i):
    return df['close'].iloc[i] < df['open'].iloc[i]

def avg_body(df, i, n=5):
    """过去 n 根K线的平均实体大小"""
    start = max(0, i - n)
    return np.mean([body(df, j) for j in range(start, i)])


# ──────────────────────────────────────────
# 单根K线形态
# ──────────────────────────────────────────

def find_hammer(df, window=20, trend_bars=5):
    """
    锤子线：下跌趋势末端
    条件：长下影线（≥实体2倍）+ 小实体 + 几乎无上影线
    返回命中索引列表
    """
    hits = []
    for i in range(trend_bars, len(df) - 1):
        b = body(df, i)
        ls = lower_shadow(df, i)
        us = upper_shadow(df, i)
        cr = candle_range(df, i)
        if cr == 0:
            continue
        avg = avg_body(df, i)
        # 实体偏小
        if b > avg * 0.6:
            continue
        # 下影线是实体的2倍以上
        if ls < b * 2:
            continue
        # 上影线很短
        if us > b * 0.3:
            continue
        # 出现前有下跌趋势（前5根收盘价整体下行）
        closes = df['close'].iloc[i - trend_bars:i].values
        if closes[-1] >= closes[0]:
            continue
        hits.append(i)
    return hits


def find_shooting_star(df, trend_bars=5):
    """
    流星线：上涨趋势末端
    条件：长上影线（≥实体2倍）+ 小实体 + 几乎无下影线
    """
    hits = []
    for i in range(trend_bars, len(df) - 1):
        b = body(df, i)
        us = upper_shadow(df, i)
        ls = lower_shadow(df, i)
        cr = candle_range(df, i)
        if cr == 0:
            continue
        avg = avg_body(df, i)
        if b > avg * 0.6:
            continue
        if us < b * 2:
            continue
        if ls > b * 0.3:
            continue
        # 出现前有上涨趋势
        closes = df['close'].iloc[i - trend_bars:i].values
        if closes[-1] <= closes[0]:
            continue
        hits.append(i)
    return hits


def find_doji(df):
    """
    十字星：开收价几乎相等
    条件：实体 < 全幅的5%
    """
    hits = []
    for i in range(1, len(df) - 1):
        cr = candle_range(df, i)
        if cr == 0:
            continue
        if body(df, i) / cr < 0.05:
            hits.append(i)
    return hits


def find_large_bullish(df):
    """
    大阳线：实体 > 平均实体的2倍，收盘接近最高价
    """
    hits = []
    for i in range(5, len(df) - 1):
        b = body(df, i)
        avg = avg_body(df, i)
        cr = candle_range(df, i)
        if cr == 0:
            continue
        if not is_bullish(df, i):
            continue
        if b < avg * 2:
            continue
        # 收盘在全幅80%以上
        if (df['close'].iloc[i] - df['low'].iloc[i]) / cr < 0.75:
            continue
        hits.append(i)
    return hits


def find_large_bearish(df):
    """
    大阴线：实体 > 平均实体的2倍，收盘接近最低价
    """
    hits = []
    for i in range(5, len(df) - 1):
        b = body(df, i)
        avg = avg_body(df, i)
        cr = candle_range(df, i)
        if cr == 0:
            continue
        if not is_bearish(df, i):
            continue
        if b < avg * 2:
            continue
        if (df['high'].iloc[i] - df['close'].iloc[i]) / cr < 0.75:
            continue
        hits.append(i)
    return hits


# ──────────────────────────────────────────
# 多根K线组合形态
# ──────────────────────────────────────────

def find_morning_star(df, trend_bars=5):
    """
    启明星（底部反转）：大阴线 + 小实体星 + 大阳线
    第③根阳线收盘超过第①根阴线实体中点
    """
    hits = []
    for i in range(trend_bars + 2, len(df) - 1):
        c1, c2, c3 = i - 2, i - 1, i
        # ① 大阴线
        if not is_bearish(df, c1):
            continue
        b1 = body(df, c1)
        avg = avg_body(df, c1)
        if b1 < avg * 1.2:
            continue
        # ② 小实体星（跳空或接近）
        b2 = body(df, c2)
        if b2 > b1 * 0.35:
            continue
        # ③ 大阳线
        if not is_bullish(df, c3):
            continue
        b3 = body(df, c3)
        if b3 < avg * 1.0:
            continue
        # ③收盘超过①实体中点
        midpoint = (df['open'].iloc[c1] + df['close'].iloc[c1]) / 2
        if df['close'].iloc[c3] < midpoint:
            continue
        # 前有下跌趋势
        closes = df['close'].iloc[i - trend_bars - 2:i - 2].values
        if len(closes) < 2 or closes[-1] >= closes[0]:
            continue
        hits.append(c1)
    return hits


def find_evening_star(df, trend_bars=5):
    """
    黄昏之星（顶部反转）：大阳线 + 小实体星 + 大阴线
    """
    hits = []
    for i in range(trend_bars + 2, len(df) - 1):
        c1, c2, c3 = i - 2, i - 1, i
        if not is_bullish(df, c1):
            continue
        b1 = body(df, c1)
        avg = avg_body(df, c1)
        if b1 < avg * 1.2:
            continue
        b2 = body(df, c2)
        if b2 > b1 * 0.35:
            continue
        if not is_bearish(df, c3):
            continue
        b3 = body(df, c3)
        if b3 < avg * 1.0:
            continue
        midpoint = (df['open'].iloc[c1] + df['close'].iloc[c1]) / 2
        if df['close'].iloc[c3] > midpoint:
            continue
        closes = df['close'].iloc[i - trend_bars - 2:i - 2].values
        if len(closes) < 2 or closes[-1] <= closes[0]:
            continue
        hits.append(c1)
    return hits


def find_bullish_engulfing(df, trend_bars=5):
    """
    阳线吞没：下跌趋势后，大阳线实体完全覆盖前一根阴线实体
    """
    hits = []
    for i in range(trend_bars + 1, len(df) - 1):
        c1, c2 = i - 1, i
        if not is_bearish(df, c1):
            continue
        if not is_bullish(df, c2):
            continue
        # 阳线实体完全吞没阴线实体
        if df['open'].iloc[c2] > df['close'].iloc[c1]:
            continue
        if df['close'].iloc[c2] < df['open'].iloc[c1]:
            continue
        closes = df['close'].iloc[i - trend_bars - 1:i - 1].values
        if len(closes) < 2 or closes[-1] >= closes[0]:
            continue
        hits.append(c1)
    return hits


def find_bearish_engulfing(df, trend_bars=5):
    """
    阴线吞没：上涨趋势后，大阴线实体完全覆盖前一根阳线实体
    """
    hits = []
    for i in range(trend_bars + 1, len(df) - 1):
        c1, c2 = i - 1, i
        if not is_bullish(df, c1):
            continue
        if not is_bearish(df, c2):
            continue
        if df['open'].iloc[c2] < df['close'].iloc[c1]:
            continue
        if df['close'].iloc[c2] > df['open'].iloc[c1]:
            continue
        closes = df['close'].iloc[i - trend_bars - 1:i - 1].values
        if len(closes) < 2 or closes[-1] <= closes[0]:
            continue
        hits.append(c1)
    return hits


def find_three_white_soldiers(df):
    """
    三只白兵：连续三根大阳线，每根开盘在前一根实体内，收盘创新高
    """
    hits = []
    for i in range(2, len(df) - 1):
        c1, c2, c3 = i - 2, i - 1, i
        if not (is_bullish(df, c1) and is_bullish(df, c2) and is_bullish(df, c3)):
            continue
        avg = avg_body(df, c1)
        if body(df, c1) < avg or body(df, c2) < avg or body(df, c3) < avg:
            continue
        # 每根收盘递增
        if not (df['close'].iloc[c1] < df['close'].iloc[c2] < df['close'].iloc[c3]):
            continue
        # 每根开盘在前一根实体内
        if not (body_bottom(df, c1) < df['open'].iloc[c2] < body_top(df, c1)):
            continue
        if not (body_bottom(df, c2) < df['open'].iloc[c3] < body_top(df, c2)):
            continue
        hits.append(c1)
    return hits


def find_three_black_crows(df):
    """
    三只乌鸦：连续三根大阴线，每根开盘在前一根实体内，收盘创新低
    """
    hits = []
    for i in range(2, len(df) - 1):
        c1, c2, c3 = i - 2, i - 1, i
        if not (is_bearish(df, c1) and is_bearish(df, c2) and is_bearish(df, c3)):
            continue
        avg = avg_body(df, c1)
        if body(df, c1) < avg or body(df, c2) < avg or body(df, c3) < avg:
            continue
        if not (df['close'].iloc[c1] > df['close'].iloc[c2] > df['close'].iloc[c3]):
            continue
        if not (body_bottom(df, c1) < df['open'].iloc[c2] < body_top(df, c1)):
            continue
        if not (body_bottom(df, c2) < df['open'].iloc[c3] < body_top(df, c2)):
            continue
        hits.append(c1)
    return hits


def find_support_breakout(df, window=20):
    """
    支撑位突破：价格跌破近期低点后反弹（假突破 / 确认支撑）
    返回：支撑反弹的起始索引
    """
    hits = []
    for i in range(window + 2, len(df) - 3):
        recent_lows = df['low'].iloc[i - window:i].values
        support = np.min(recent_lows)
        # 当根跌破支撑
        if df['low'].iloc[i] < support * 0.998:
            # 但收盘收回支撑以上（假突破）
            if df['close'].iloc[i] > support:
                hits.append(i)
    return hits


def find_resistance_breakout(df, window=20):
    """
    阻力位突破：放量突破近期高点
    """
    hits = []
    for i in range(window + 1, len(df) - 2):
        recent_highs = df['high'].iloc[i - window:i].values
        resistance = np.max(recent_highs)
        if df['close'].iloc[i] > resistance * 1.002:
            # 成交量放大确认
            avg_vol = df['volume'].iloc[i - window:i].mean()
            if df['volume'].iloc[i] > avg_vol * 1.3:
                hits.append(i)
    return hits


# ──────────────────────────────────────────
# 形态注册表（供 build_dataset.py 调用）
# ──────────────────────────────────────────

PATTERN_REGISTRY = [
    {
        "id": "hammer",
        "name_zh": "锤子线",
        "module": "single_candle",
        "difficulty": 1,
        "segment_before": 15,   # 形态前展示多少根K线
        "segment_after": 10,    # 形态后展示多少根K线
        "fn": find_hammer,
    },
    {
        "id": "shooting_star",
        "name_zh": "流星线",
        "module": "single_candle",
        "difficulty": 1,
        "segment_before": 15,
        "segment_after": 10,
        "fn": find_shooting_star,
    },
    {
        "id": "doji",
        "name_zh": "十字星",
        "module": "single_candle",
        "difficulty": 1,
        "segment_before": 10,
        "segment_after": 8,
        "fn": find_doji,
    },
    {
        "id": "large_bullish",
        "name_zh": "大阳线",
        "module": "single_candle",
        "difficulty": 1,
        "segment_before": 10,
        "segment_after": 8,
        "fn": find_large_bullish,
    },
    {
        "id": "large_bearish",
        "name_zh": "大阴线",
        "module": "single_candle",
        "difficulty": 1,
        "segment_before": 10,
        "segment_after": 8,
        "fn": find_large_bearish,
    },
    {
        "id": "morning_star",
        "name_zh": "启明星",
        "module": "pattern",
        "difficulty": 2,
        "segment_before": 15,
        "segment_after": 12,
        "fn": find_morning_star,
    },
    {
        "id": "evening_star",
        "name_zh": "黄昏之星",
        "module": "pattern",
        "difficulty": 2,
        "segment_before": 15,
        "segment_after": 12,
        "fn": find_evening_star,
    },
    {
        "id": "bullish_engulfing",
        "name_zh": "阳线吞没",
        "module": "pattern",
        "difficulty": 2,
        "segment_before": 12,
        "segment_after": 10,
        "fn": find_bullish_engulfing,
    },
    {
        "id": "bearish_engulfing",
        "name_zh": "阴线吞没",
        "module": "pattern",
        "difficulty": 2,
        "segment_before": 12,
        "segment_after": 10,
        "fn": find_bearish_engulfing,
    },
    {
        "id": "three_white_soldiers",
        "name_zh": "三只白兵",
        "module": "pattern",
        "difficulty": 2,
        "segment_before": 12,
        "segment_after": 10,
        "fn": find_three_white_soldiers,
    },
    {
        "id": "three_black_crows",
        "name_zh": "三只乌鸦",
        "module": "pattern",
        "difficulty": 2,
        "segment_before": 12,
        "segment_after": 10,
        "fn": find_three_black_crows,
    },
    {
        "id": "support_breakout",
        "name_zh": "支撑位测试",
        "module": "trend",
        "difficulty": 3,
        "segment_before": 25,
        "segment_after": 10,
        "fn": find_support_breakout,
    },
    {
        "id": "resistance_breakout",
        "name_zh": "阻力位突破",
        "module": "trend",
        "difficulty": 3,
        "segment_before": 25,
        "segment_after": 10,
        "fn": find_resistance_breakout,
    },
]
