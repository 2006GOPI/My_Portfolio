import os
import re
import base64
import shutil

# Configuration
PROJECT_DIR = r"d:\all D\portfolio"
INDEX_FILE = os.path.join(PROJECT_DIR, "index.html")
BACKUP_FILE = os.path.join(PROJECT_DIR, "index_backup.html")

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def bundle_assets(html_content, base_dir):
    """
    Inlines CSS and JS files into the HTML.
    """
    
    # Inline CSS
    # Matches <link rel="stylesheet" href="...">
    def replace_css(match):
        href = match.group(1)
        if href.startswith('http'): # Skip external links
            return match.group(0)
        
        css_path = os.path.join(base_dir, href)
        if os.path.exists(css_path):
            print(f"Inlining CSS: {href}")
            css_content = read_file(css_path)
            return f'<style>\n{css_content}\n</style>'
        else:
            print(f"Warning: CSS file not found: {css_path}")
            return match.group(0)

    html_content = re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*>', replace_css, html_content)

    # Inline JS
    # Matches <script src="..."></script>
    def replace_js(match):
        src = match.group(1)
        if src.startswith('http'): # Skip external scripts
            return match.group(0)
            
        js_path = os.path.join(base_dir, src)
        if os.path.exists(js_path):
            print(f"Inlining JS: {src}")
            js_content = read_file(js_path)
            return f'<script>\n{js_content}\n</script>'
        else:
            print(f"Warning: JS file not found: {js_path}")
            return match.group(0)

    html_content = re.sub(r'<script\s+src="([^"]+)"\s*></script>', replace_js, html_content)
    
    
    # Inject Security Script (Disable Right-Click, F12, Ctrl+Shift+I, etc.)
    security_script = """
    <script>
        document.addEventListener('contextmenu', event => event.preventDefault());
        document.onkeydown = function(e) {
            if(e.keyCode == 123) { return false; }
            if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false; }
            if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { return false; }
            if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { return false; }
            if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false; }
        }
    </script>
    """
    
    # Insert before </head>
    if "</head>" in html_content:
        html_content = html_content.replace("</head>", f"{security_script}\n</head>")
        
    return html_content

def obfuscate_html(html_content):
    """
    Encodes the HTML content and creates the loader script.
    """
    # Simple Hex encoding to make it look like "encrypted" bytecode
    # This is not real encryption, but sufficient for "view source" protection
    
    encoded_bytes = html_content.encode('utf-8')
    # We'll use hex encoding for that "matrix" look, and minimal JS to decode it
    hex_content = encoded_bytes.hex()
    
    # The loader script
    # We split the long string into chunks to avoid browser line length limits in view source sometimes being weird
    # But for simplicity, one big string is fine.
    
    loader_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Secured Page</title>
<script>
/* Security Layer - Content Encrypted */
(function(){{
    // Anti-Debug: Force debugger break if devtools is open
    setInterval(function(){{
        (function(){{}}.constructor("debugger"))();
    }}, 50);
    
    // Decode and Load Content
    document.addEventListener("DOMContentLoaded", function() {{
        var _0x = "{hex_content}";
        var _0x2 = document.open("text/html", "replace");
        var _0x3 = '';
        for (var i = 0; i < _0x.length; i += 2) {{
            _0x3 += String.fromCharCode(parseInt(_0x.substr(i, 2), 16));
        }}
        _0x2.write(_0x3);
        _0x2.close();
    }});
}})();
</script>
</head>
<body style="background:#000;color:#fff;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:monospace;">
    <div>Loading Secure Content...</div>
</body>
</html>"""
    
    return loader_html

def main():
    print("Starting obfuscation process...")
    
    # 1. Backup original file if not exists
    if not os.path.exists(BACKUP_FILE):
        print(f"Creating backup: {BACKUP_FILE}")
        shutil.copy2(INDEX_FILE, BACKUP_FILE)
    else:
        print(f"Backup already exists: {BACKUP_FILE}")

    # 2. Read original HTML (from backup to avoid re-bundling if run multiple times)
    # Actually always read from backup if it exists to be safe
    source_file = BACKUP_FILE if os.path.exists(BACKUP_FILE) else INDEX_FILE
    print(f"Reading from: {source_file}")
    
    original_html = read_file(source_file)
    print(f"DEBUG: Source file read. Content start: {original_html[:300]}")
    
    # 3. Bundle Assets
    bundled_html = bundle_assets(original_html, PROJECT_DIR)
    
    # 4. Obfuscate
    protected_html = obfuscate_html(bundled_html)
    
    # 5. Write new index.html
    print(f"Writing protected content to: {INDEX_FILE}")
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write(protected_html)
        
    print("Obfuscation complete!")
    print(f"Original file saved as: {os.path.basename(BACKUP_FILE)}")

if __name__ == "__main__":
    main()
