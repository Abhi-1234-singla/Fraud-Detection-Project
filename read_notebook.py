import json

with open('analysis_mode.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

for i, cell in enumerate(nb['cells']):
    print(f"--- Cell {i} ({cell['cell_type']}) ---")
    source = "".join(cell['source'])
    if len(source) > 300:
        print(source[:300] + "...\n[TRUNCATED]")
    else:
        print(source)
    print()
