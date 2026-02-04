file_path = 'd:/all D/portfolio/decoded_index.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    print(f"Scanning {file_path} for id=\"contact\"...")
    count = 0
    for i, line in enumerate(lines):
        if 'id="contact"' in line:
            print(f"Line {i+1}: {line.strip()}")
            count += 1
            
    print(f"Total occurrences: {count}")

except Exception as e:
    print(f"Error: {e}")
