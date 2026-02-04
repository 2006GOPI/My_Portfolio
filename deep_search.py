import os

search_phrase = "Built with performance and design in mind"
files = ['d:/all D/portfolio/decoded_index.html', 'd:/all D/portfolio/index_backup.html']

for file_path in files:
    if not os.path.exists(file_path):
        continue
    
    print(f"Scanning {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        # Count project items
        count = content.count('class="project-item"')
        print(f"Found {count} 'project-item' occurrences.")
        
        # Search for phrase
        if search_phrase.lower() in content.lower():
            print(f"FOUND PHRASE: '{search_phrase}'")
            # Find line number
            for i, line in enumerate(content.splitlines()):
                if search_phrase.lower() in line.lower():
                    print(f"Line {i+1}: {line.strip()}")
        else:
            print(f"Phrase '{search_phrase}' NOT found.")
            
    except Exception as e:
        print(f"Error: {e}")
    print("-" * 20)
