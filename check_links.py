file_path = 'd:/all D/portfolio/decoded_index.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    print(f"Scanning {file_path} for Links and IDs...")
    for i, line in enumerate(lines):
        # 1. Check Nav Links
        if '<a href="#contact"' in line:
            print(f"Line {i+1} (Nav to Contact): {line.strip()}")
        if '<a href="#about"' in line:
            print(f"Line {i+1} (Nav to About): {line.strip()}")
            
        # 2. Check Section IDs
        if '<section' in line and 'id=' in line:
            print(f"Line {i+1} (Section): {line.strip()}")
        
        # 3. Check for specific Contact section markers
        if 'id="contact"' in line:
            print(f"Line {i+1} (Contact ID): {line.strip()}")
        if 'id="about"' in line:
            print(f"Line {i+1} (About ID): {line.strip()}")

except Exception as e:
    print(f"Error: {e}")
