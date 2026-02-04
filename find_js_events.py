file_path = 'd:/all D/portfolio/decoded_index.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    print(f"Scanning for JS Events in {file_path}...")
    for i, line in enumerate(lines):
        if "addEventListener('click'" in line or 'addEventListener("click"' in line:
            print(f"Line {i+1}: {line.strip()}")
            # Print a few context lines
            for j in range(1, 10):
                if i+j < len(lines):
                     print(f"  {lines[i+j].strip()}")

except Exception as e:
    print(f"Error: {e}")
