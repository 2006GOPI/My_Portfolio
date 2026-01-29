import re

def update_oci_batch():
    file_path = r'd:\all D\portfolio\index.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Target title
    target = "OCI Batch Internship"
    
    chunks = content.split('<div class="certificate-card')
    new_chunks = [chunks[0]] # Preamble
    
    update_count = 0
    
    for chunk in chunks[1:]:
        # Find title
        title_m = re.search(r'<h3 class="certificate-title">(.*?)</h3>', chunk)
        title = title_m.group(1) if title_m else ""
        
        if title == target:
            # Replace current data-category with "batch"
            # It could be "certificate", "internship" (unlikely now), etc.
            # Regex replacement for data-category="..."
            
            if 'data-category="' in chunk:
                # Replace the first occurrence
                chunk = re.sub(r'data-category="[^"]*"', 'data-category="batch"', chunk, count=1)
                update_count += 1
        
        new_chunks.append('<div class="certificate-card' + chunk)
        
    new_content = "".join(new_chunks)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Updated {update_count} 'OCI Batch Internship' certificates to category 'batch'.")

if __name__ == "__main__":
    update_oci_batch()
