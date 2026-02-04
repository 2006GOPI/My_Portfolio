import re

try:
    # Read the modified decoded HTML
    with open('d:/all D/portfolio/decoded_index.html', 'r', encoding='utf-8') as f:
        decoded_content = f.read()

    # Convert to hex string
    hex_string = decoded_content.encode('utf-8').hex()

    # Read the original index.html
    with open('d:/all D/portfolio/index.html', 'r', encoding='utf-8') as f:
        original_content = f.read()

    # Replace the old hex string with the new one
    # Regex designed to be robust but assumes the var _0x = "..." pattern
    new_content = re.sub(r'var _0x = "([0-9a-fA-F]+)"', f'var _0x = "{hex_string}"', original_content)

    # Write back to index.html
    with open('d:/all D/portfolio/index.html', 'w', encoding='utf-8') as f_out:
        f_out.write(new_content)
    
    print("Successfully re-encoded content into index.html")

except Exception as e:
    print(f"Error: {e}")
