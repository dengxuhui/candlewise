"""
slim_dataset.py — 精简并压缩 candlewise_cases.json

功能：
  1. 去掉 case 级别的冗余元数据字段：sector、source、pattern_index
  2. 去掉 candle 级别的 KDJ 指标字段：kdj_k、kdj_d、kdj_j
     （当前代码库中 KDJ 无任何组件使用；若未来需要，重跑 build_dataset.py 后再次执行本脚本）
  3. 输出为无空白符的压缩 JSON（去除换行 / 缩进），约减少 45% 体积
  4. 直接覆盖 public/data/candlewise_cases.json

预期体积变化：
  原始（格式化）：~3,900 KB
  精简 + 压缩后：~1,100 KB（减少约 71%）

用法：
  cd data-scripts
  python slim_dataset.py

注意：
  每次重新运行 build_dataset.py 生成新数据后，都需要再次运行本脚本。
"""

import json
import os

# 路径
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_PATH = os.path.join(SCRIPT_DIR, '..', 'public', 'data', 'candlewise_cases.json')
OUTPUT_PATH = INPUT_PATH  # 直接覆盖原文件

# 保留的 case 级别字段（去掉 sector / source / pattern_index）
KEEP_CASE_KEYS = {
    'id', 'symbol', 'name', 'module', 'difficulty',
    'pattern_id', 'pattern_name_zh', 'subsequent_trend', 'total_candles',
}

# 保留的 candle 级别字段（去掉 kdj_k / kdj_d / kdj_j）
KEEP_CANDLE_KEYS = {
    'date', 'open', 'high', 'low', 'close', 'volume',
    'ma5', 'ma20',
    'rsi',
    'macd_diff', 'macd_dea', 'macd_hist',
}


def slim_case(case: dict) -> dict:
    slim = {k: case[k] for k in KEEP_CASE_KEYS if k in case}
    slim['candles'] = [
        {k: candle[k] for k in KEEP_CANDLE_KEYS if k in candle}
        for candle in case.get('candles', [])
    ]
    return slim


def main():
    print(f'读取: {INPUT_PATH}')
    with open(INPUT_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    original_size = os.path.getsize(INPUT_PATH)

    cases = data.get('cases', [])
    print(f'共 {len(cases)} 条案例，开始精简...')

    slim_cases = [slim_case(c) for c in cases]

    # 保留 meta 字段（如 version），更新 cases
    output = {**data, 'cases': slim_cases}

    # 压缩输出：无缩进、无多余空白
    output_str = json.dumps(output, ensure_ascii=False, separators=(',', ':'))

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write(output_str)

    new_size = os.path.getsize(OUTPUT_PATH)
    reduction = (1 - new_size / original_size) * 100
    print(f'完成！')
    print(f'  原始大小: {original_size / 1024:.1f} KB')
    print(f'  精简后:   {new_size / 1024:.1f} KB')
    print(f'  减少:     {reduction:.1f}%')
    print(f'  输出路径: {OUTPUT_PATH}')


if __name__ == '__main__':
    main()
