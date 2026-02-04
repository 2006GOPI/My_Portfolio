file_path = 'd:/all D/portfolio/decoded_index.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    start_line = 2958
    end_line = 2962
    
    print(f"Lines {start_line}-{end_line} raw:")
    for i in range(start_line - 1, end_line):
        print(f"{i+1}: {repr(lines[i])}")

except Exception as e:
    print(f"Error: {e}")
