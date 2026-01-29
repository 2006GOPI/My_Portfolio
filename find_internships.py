import re

def find_internships():
    file_path = r'd:\all D\portfolio\index.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to capture content of each certificate card
    card_pattern = re.compile(r'<div class="certificate-card(.*?)</div>\s*</div>', re.DOTALL)
    
    # Simple split might be better as regex for nested divs is hard
    chunks = content.split('<div class="certificate-card')
    
    candidates = []
    
    for chunk in chunks[1:]: # Skip preamble
        # Extract title
        title_m = re.search(r'<h3 class="certificate-title">(.*?)</h3>', chunk)
        title = title_m.group(1) if title_m else "Unknown"
        
        # Extract whole text for searching
        # Limit to the card part (up to hidden-details closing)
        text_content = chunk.lower()
        
        if "intern" in text_content:
            candidates.append(title)

    # Remove duplicates (since we have original and duplicate sets)
    unique_candidates = sorted(list(set(candidates)))
    
    print(f"Found {len(unique_candidates)} unique certificates with 'intern':")
    for c in unique_candidates:
        print(f"- {c}")

    print("\n--- All Titles ---")
    all_titles_m = re.findall(r'<h3 class="certificate-title">(.*?)</h3>', content)
    # Filter duplicates (consecutive because of sorted list?)
    # Just set
    for t in sorted(list(set(all_titles_m))):
        print(t)

if __name__ == "__main__":
    find_internships()
