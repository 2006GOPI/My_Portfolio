import re

def update_categories():
    file_path = r'd:\all D\portfolio\index.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define targets by exact title
    internships = [
        "Artificial Intelligence",
        "Data Analytics",
        "Machine Learning",
        "OCI Batch Internship",
        "SIDP Appreciation",
        "SIDP Completion"
    ]
    
    # We need to iterate over regex matches or reconstruct the file
    # Better to process it chunk by chunk like before or use precise regex replacement
    
    # Let's split by certificate-card again to be safe and context-aware
    chunks = content.split('<div class="certificate-card')
    new_chunks = [chunks[0]] # Preamble
    
    count = 0
    
    for chunk in chunks[1:]:
        # Find title
        title_m = re.search(r'<h3 class="certificate-title">(.*?)</h3>', chunk)
        title = title_m.group(1) if title_m else ""
        
        # Determine current category if exists (it might be in the opening tag which we split off)
        # Wait, splitting off '<div class="certificate-card' removes it from the chunk.
        # We need to prepend it back with correct category.
        
        # Check if it was duplicate
        is_duplicate = chunk.startswith(' duplicate"') or chunk.startswith('" data-category=') 
        # Actually, split consumes the separator.
        # The separator was `<div class="certificate-card`
        # The chunk starts with attributes. e.g. ` duplicate" data-category="certificate"...`
        # or `" data-category="certificate"...`
        
        # We want to force data-category="internship" for targets
        # And keep "duplicate" class if present.
        
        if title in internships:
            # Replace data-category="whatever" with data-category="internship"
            # It's usually near the start of the chunk
            chunk = re.sub(r'data-category="[^"]*"', 'data-category="internship"', chunk, count=1)
            count += 1
        
        # Add back the opening tag
        new_chunks.append('<div class="certificate-card' + chunk)
        
    new_content = "".join(new_chunks)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Updated categories for {count} certificates (including duplicates).")

if __name__ == "__main__":
    update_categories()
