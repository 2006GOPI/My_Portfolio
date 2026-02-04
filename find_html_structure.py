file_path = 'd:/all D/portfolio/decoded_index.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    print(f"Scanning {file_path}...")
    for i, line in enumerate(lines):
        if '<div class="hero"' in line or '<div class="hero ' in line:
            print(f"Line {i+1} (Hero start): {line.strip()}")
        if '<div class="hero-social"' in line:
            print(f"Line {i+1} (Hero Social): {line.strip()}")
        if '</section>' in line and i > 2100 and i < 2250:
             print(f"Line {i+1} (Section end): {line.strip()}")

except Exception as e:
    print(f"Error: {e}")
