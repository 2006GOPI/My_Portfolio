import os

files = ['d:/all D/portfolio/decoded_index.html', 'd:/all D/portfolio/index_backup.html']

replacements = {
    '\u2018': "'", # Left single quote
    '\u2019': "'", # Right single quote
    '\u201c': '"', # Left double quote
    '\u201d': '"', # Right double quote
}

for file_path in files:
    try:
        if not os.path.exists(file_path):
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for char, replacement in replacements.items():
            new_content = new_content.replace(char, replacement)
        
        if content != new_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file_path}")
        else:
            print(f"No changes needed for {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
