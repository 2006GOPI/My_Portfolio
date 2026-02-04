file_path = 'd:/all D/portfolio/decoded_index.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    print("Checking HREFs:")
    for i, line in enumerate(lines):
        if 'href="#contact"' in line:
            print(f"Line {i+1} (#contact): {line.strip()[:100]}...")
        if 'href="#about"' in line:
            print(f"Line {i+1} (#about): {line.strip()[:100]}...")

except Exception as e:
    print(f"Error: {e}")
