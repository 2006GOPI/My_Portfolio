import re

file_path = 'd:/all D/portfolio/decoded_index.html'
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex to find project titles and their surrounding context
    matches = re.finditer(r'<h3 class="project-title">(.*?)</h3>', content)
    
    print(f"Project Titles in {file_path}:")
    for match in matches:
        # Get line number
        line_num = content[:match.start()].count('\n') + 1
        print(f"Line {line_num}: {match.group(1)}")

except Exception as e:
    print(f"Error: {e}")
