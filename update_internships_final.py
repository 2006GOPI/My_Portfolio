import re

def update_internships_final():
    file_path = r'd:\all D\portfolio\index.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The 6 correct titles
    targets = [
        "Artificial Intelligence",
        "Data Analytics",
        "Machine Learning",
        "Full Stack Development",
        "Mern Stack Development",
        "Advanced UI/UX"
    ]
    
    # Strategy:
    # 1. Split by <div class="certificate-card
    # 2. Iterate chunks.
    # 3. If chunk has data-category="internship", replace with "certificate" (RESET)
    # 4. If title in targets, set data-category="internship"
    
    chunks = content.split('<div class="certificate-card')
    new_chunks = [chunks[0]] # Preamble
    
    reset_count = 0
    update_count = 0
    
    for chunk in chunks[1:]:
        # Find title
        title_m = re.search(r'<h3 class="certificate-title">(.*?)</h3>', chunk)
        title = title_m.group(1) if title_m else ""
        
        # 1. Reset existing "internship" to "certificate"
        # Be careful not to mess up if it was "batch" or something else? 
        # User only mentioned internship vs certificate (and there is 'batch' button in HTML but let's assume default is certificate)
        # Actually in the file I saw data-category="certificate", "internship". 
        # I should probably just force "certificate" if it's not in targets?
        # But wait, logic:
        # If it is currently "internship", make it "certificate".
        # Then applies new rule.
        
        if 'data-category="internship"' in chunk:
            chunk = chunk.replace('data-category="internship"', 'data-category="certificate"')
            reset_count += 1
            
        # 2. Apply new rule
        if title in targets:
            # Replace "certificate" with "internship"
            # It should represent the attribute right at the start of the chunk usually
            # But duplicate cards might have ` class="certificate-card duplicate" data-category="certificate"`
            # effectively: ` data-category="certificate"` (leading space)
            
            if 'data-category="certificate"' in chunk:
                chunk = chunk.replace('data-category="certificate"', 'data-category="internship"', 1)
                update_count += 1
            # If it was something else (e.g. if I missed a reset, or it was 'batch'?), force it.
            # But the Reset step handles the previous 'internship' ones.
        
        new_chunks.append('<div class="certificate-card' + chunk)
        
    new_content = "".join(new_chunks)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Reset {reset_count} existing internships.")
    print(f"Updated {update_count} certificates to internship (including duplicates).")

if __name__ == "__main__":
    update_internships_final()
