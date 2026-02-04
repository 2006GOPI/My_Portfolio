import os

search_terms = ["Personal Portfolio", "showcasing my skills", "design in mind"]
files = ['d:/all D/portfolio/decoded_index.html', 'd:/all D/portfolio/index_backup.html', 'd:/all D/portfolio/index_original_backup.html']

for file_path in files:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
    
    print(f"Searching in {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                for term in search_terms:
                    if term.lower() in line.lower():
                        print(f"Found '{term}' at line {i+1}: {line.strip()}")
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    print("-" * 20)
