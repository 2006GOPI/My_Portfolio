import re

def list_titles():
    file_path = r'd:\all D\portfolio\index.html'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        titles = re.findall(r'<h3 class="certificate-title">(.*?)</h3>', content)
        unique_titles = sorted(list(set(titles)))
        
        print(f"Found {len(unique_titles)} unique titles:")
        for t in unique_titles:
            print(f"TITLE: {t}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_titles()
