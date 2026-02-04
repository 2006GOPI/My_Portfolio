file_path = 'd:/all D/portfolio/decoded_index.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    print(f"Scanning {file_path}...")
    for i, line in enumerate(lines):
        # Check for Contact links
        if 'Contact' in line and '<a' in line:
            print(f"Line {i+1} (Link): {line.strip()}")
            
        # Check for IDs
        if 'id="contact"' in line:
            print(f"Line {i+1} (ID='contact'): {line.strip()}")
        if 'id="about"' in line:
            print(f"Line {i+1} (ID='about'): {line.strip()}")

except Exception as e:
    print(f"Error: {e}")
