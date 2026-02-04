import re

try:
    with open('d:/all D/portfolio/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'var _0x = "([0-9a-fA-F]+)"', content)
    if match:
        hex_string = match.group(1)
        decoded_content = bytes.fromhex(hex_string).decode('utf-8')
        with open('d:/all D/portfolio/decoded_index.html', 'w', encoding='utf-8') as f_out:
            f_out.write(decoded_content)
        print("Successfully decoded content to decoded_index.html")
    else:
        print("No hex string found in index.html")

except Exception as e:
    print(f"Error: {e}")
