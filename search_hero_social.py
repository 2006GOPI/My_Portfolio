file_path = 'd:/all D/portfolio/decoded_index.html'
search_term = 'hero-social'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    print(f"Searching for '{search_term}' in {file_path}...")
    for i, line in enumerate(lines):
        if search_term in line:
            print(f"Line {i+1}: {line.strip()}")

except Exception as e:
    print(f"Error: {e}")
