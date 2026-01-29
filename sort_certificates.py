import re
import os

def parse_year(date_str):
    # Handle ranges like "2022-2023" -> 2023? Or 2022?
    # User said "2023 - 2025".
    # If the date is "2022-2023", it probably belongs to 2023 completion.
    if '-' in date_str:
        return int(date_str.split('-')[-1])
    try:
        return int(date_str)
    except:
        return 0 # Fallback

def sort_certificates():
    file_path = r'd:\all D\portfolio\index.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the certificates track
    start_marker = '<div class="certificates-track">'
    # Logic to find the end is simpler if we just split by lines and look for structure
    # But let's reuse the robust finding I wrote before
    
    track_start_idx = content.find(start_marker)
    if track_start_idx == -1:
        print("Could not find certificates-track")
        return

    curr_idx = track_start_idx + len(start_marker)
    div_balance = 1
    while div_balance > 0 and curr_idx < len(content):
        if content[curr_idx:curr_idx+4] == '<div':
            div_balance += 1
            curr_idx += 4
        elif content[curr_idx:curr_idx+5] == '</div':
            div_balance -= 1
            curr_idx += 5
        else:
            curr_idx += 1
    
    track_end_idx = curr_idx
    track_content = content[track_start_idx + len(start_marker):track_end_idx - 6]

    lines = track_content.split('\n')
    cards = []
    current_card = []
    in_card = False
    card_comment = ""
    
    for line in lines:
        stripped = line.strip()
        # Parse comments but ignore "SET" markers
        if stripped.startswith('<!--') and ('SET' not in stripped):
            card_comment = line
        elif '<div class="certificate-card' in line:
            in_card = True
            current_card = [line]
        elif in_card:
            current_card.append(line)
            if stripped == '</div>':
                card_str = "\n".join(current_card)
                if card_str.count('<div') == card_str.count('</div>'):
                    full_card_html = card_str
                    in_card = False
                    
                    is_duplicate = 'duplicate' in current_card[0]
                    if not is_duplicate: # Unify unique cards
                        year_match = re.search(r'<p class="certificate-date">(.*?)</p>', full_card_html)
                        year = parse_year(year_match.group(1)) if year_match else 0
                        title_match = re.search(r'<h3 class="certificate-title">(.*?)</h3>', full_card_html)
                        title = title_match.group(1) if title_match else ""
                        
                        cards.append({
                            'html': full_card_html, 
                            'year': year,
                            'title': title,
                            'comment': card_comment
                        })
                        card_comment = ""
    
    # Sort Ascending (Older -> Newer)
    sorted_cards = sorted(cards, key=lambda x: (x['year'], x['title']))
    
    # Reconstruct HTML
    new_track_html = '\n'
    new_track_html += '                    <!-- === ORIGINAL SET === -->\n'
    
    for i, card in enumerate(sorted_cards):
        card_html = re.sub(r'class="certificate-card.*?"', 'class="certificate-card"', card['html'])
        new_track_html += f'                    <!-- {i+1}. {card["title"]} -->\n'
        new_track_html += card_html + '\n'

    new_track_html += '\n                    <!-- === DUPLICATE SET (Identical Certificates) === -->\n'
    
    for i, card in enumerate(sorted_cards):
        card_html = re.sub(r'class="certificate-card.*?"', 'class="certificate-card duplicate"', card['html'])
        new_track_html += f'                    <!-- {i+1}. {card["title"]} -->\n'
        new_track_html += card_html + '\n'

    new_track_html += '                '

    new_full_content = content[:track_start_idx + len(start_marker)] + new_track_html + content[track_end_idx - 6:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_full_content)
    
    print(f"Successfully sorted {len(sorted_cards)} certificates (Ascending).")

if __name__ == "__main__":
    sort_certificates()
