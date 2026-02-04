import os

search_term = "Personal Portfolio"
root_dir = 'd:/all D/portfolio'

print(f"Searching for '{search_term}' in {root_dir}...")

for root, dirs, files in os.walk(root_dir):
    if '.git' in root: continue
    for file in files:
        if file.endswith(('.html', '.js', '.css', '.md', '.txt', '.py')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if search_term.lower() in content.lower():
                        print(f"Found in: {path}")
                        for i, line in enumerate(content.splitlines()):
                            if search_term.lower() in line.lower():
                                print(f"  Line {i+1}: {line.strip()[:100]}...")
            except Exception as e:
                print(f"Error reading {path}: {e}")
