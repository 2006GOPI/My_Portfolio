file_path = 'd:/all D/portfolio/decoded_index.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    print("Mapping Sections:")
    stack = []
    for i, line in enumerate(lines):
        if '<section' in line:
            # Extract class or ID for identification
            ident = line.strip()
            print(f"Line {i+1} START: {ident}")
            stack.append(i+1)
        if '</section>' in line:
            if stack:
                start_line = stack.pop()
                print(f"Line {i+1} END (matches start at {start_line})")
            else:
                print(f"Line {i+1} END (ORPHAN!)")

    if stack:
        print(f"WARNING: Unclosed sections starting at lines: {stack}")

except Exception as e:
    print(f"Error: {e}")
