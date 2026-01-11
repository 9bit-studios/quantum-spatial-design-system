#!/usr/bin/env python3
"""
RunSmart HTML Batch Processor
- Replaces emojis with inline SVG icons
- Adds unified design system CSS link
- Standardizes button classes
"""

import os
import re
from pathlib import Path

# Define emoji to SVG replacements (inline SVG for maximum compatibility)
EMOJI_REPLACEMENTS = {
    '⚡': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2L6 13.5H10L8 22L18 11.5H14L16 2Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '🔥': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C9.28 22 4.57 19.33 4.05 14.99C3.69 11.95 5.51 9.6 6.01 8.99C6.42 11.1 7.53 12.7 8.95 12.99C9.21 13.04 9.54 13.06 9.93 12.99C9.82 10.67 10 6.33 12.86 3C13.17 2.63 13.66 2.3 14 2C14.24 4.64 14.98 6.12 15.8 7C16.91 8.19 18.59 9 19.48 11.28C19.52 11.37 19.63 11.65 19.72 12C20.34 14.38 20.04 17.88 17.76 19.99C15.85 21.76 13.35 22 13 22C12.49 22 12.56 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '💪': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4 6C14.4 7.54667 13.1467 8.8 11.6 8.8H9.6C8.71634 8.8 8 9.51634 8 10.4V14.8C8 15.9046 8.89543 16.8 10 16.8H10.8C11.9046 16.8 12.8 17.6954 12.8 18.8V21.2M9.6 3.2C9.6 4.52548 10.6745 5.6 12 5.6C13.3255 5.6 14.4 4.52548 14.4 3.2M17.6 6C17.6 4.67452 18.6745 3.6 20 3.6C21.3255 3.6 22.4 4.67452 22.4 6V10C22.4 11.5464 21.1464 12.8 19.6 12.8V16.4C19.6 19.0509 17.4509 21.2 14.8 21.2H12.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '🏃': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="13.5" cy="4" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 22L10.5 18L11 13L9 11L5 12M16 11L14 8L11 9L11.5 13L14 16M19 22L16.5 19L14 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '🚨': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64537 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3438 2.89725 12 2.89725C11.6562 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '🚀': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 16.5C3 18 3.5 20 3.5 20C3.5 20 5.5 20.5 7 19C8.5 17.5 8.5 16 8.5 16C8.5 16 6 15 4.5 16.5ZM12 15L9 12M14.5 4C17.5 4 20 6.5 20 9.5C20 11 19.5 12.5 18.5 13.5L13 19L11 17L13 15L11 13L9 15L7 13L12.5 7.5C13.5 6.5 15 6 16.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '🎁': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="8" width="18" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M12 8V21M5 12V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>''',

    '🏆': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9H4.5C3.67157 9 3 8.32843 3 7.5V6C3 5.17157 3.67157 4.5 4.5 4.5H6M18 9H19.5C20.3284 9 21 8.32843 21 7.5V6C21 5.17157 20.3284 4.5 19.5 4.5H18M12 15C9.79086 15 8 13.2091 8 11V4.5H16V11C16 13.2091 14.2091 15 12 15ZM12 15V19M9 22H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '🎉': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6L9 18L11 18.5L14 16L15 19L17 18L13.5 11.5L18 11L12 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '💡': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18H15M10 21H14M12 3C8.68629 3 6 5.68629 6 9C6 10.5 6.5 11.5 7 13C7.5 14.5 8 16 8 18H16C16 16 16.5 14.5 17 13C17.5 11.5 18 10.5 18 9C18 5.68629 15.3137 3 12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '💰': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M14.5 8.5C14.5 8.5 13.5 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5C13.6569 13.5 15 14.8431 15 16.5C15 18.1569 13.6569 19.5 12 19.5C10.5 19.5 9.5 18.5 9.5 18.5M12 5.5V7.5M12 19.5V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '👏': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 10V8C8 7.44772 8.44772 7 9 7C9.55228 7 10 7.44772 10 8V10M10 10V7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7V10M10 10V11M12 10V6C12 5.44772 12.4477 5 13 5C13.5523 5 14 5.44772 14 6V10M14 10V11C14 11 14 11.5 14 12C14 14.7614 11.7614 17 9 17C6.23858 17 4 14.7614 4 12V11.5C4 10.9477 4.44772 10.5 5 10.5C5.55228 10.5 6 10.9477 6 11.5V12M14 10V9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9V11C16 11.5 16.5 12 17 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '🎯': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/></svg>''',

    '✨': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" fill="currentColor"/></svg>''',

    '📊': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3V21H21M7 16V11M12 16V8M17 16V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',

    '📧': '''<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 7L12 13L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>''',
}

# CSS link to add
CSS_LINK = '    <link rel="stylesheet" href="../assets/runsmart-design-system.css">\n'
MOBILE_CSS_LINK = '    <link rel="stylesheet" href="../../assets/runsmart-design-system.css">\n'
WATCH_CSS_LINK = '    <link rel="stylesheet" href="../../assets/runsmart-design-system.css">\n'

def replace_emojis(content):
    """Replace emojis with inline SVG icons"""
    for emoji, svg in EMOJI_REPLACEMENTS.items():
        content = content.replace(emoji, svg)
    return content

def add_css_link(content, css_link):
    """Add CSS link to head if not already present"""
    if 'runsmart-design-system.css' in content:
        return content

    # Add before closing </head> tag
    head_close = '</head>'
    if head_close in content:
        content = content.replace(head_close, f'{css_link}{head_close}')

    return content

def standardize_buttons(content):
    """Standardize button class names"""
    # Replace variations with standard classes
    content = re.sub(r'class="header-button primary"', 'class="btn-primary"', content)
    content = re.sub(r'class="header-button secondary"', 'class="btn-secondary"', content)

    return content

def process_html_file(filepath, css_link):
    """Process a single HTML file"""
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply transformations
    content = replace_emojis(content)
    content = add_css_link(content, css_link)
    content = standardize_buttons(content)

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✓ Completed: {filepath}")

def main():
    base_dir = Path('/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/brand-theme/professional/portfolio/runsmart/runsmart-interfaces-purple')

    # Process dashboard files
    dashboard_dir = base_dir / 'dashboard'
    for html_file in dashboard_dir.glob('*.html'):
        process_html_file(html_file, CSS_LINK)

    # Process mobile files
    mobile_members_dir = base_dir / 'mobile' / 'members'
    for html_file in mobile_members_dir.glob('*.html'):
        process_html_file(html_file, MOBILE_CSS_LINK)

    mobile_coach_dir = base_dir / 'mobile' / 'coach'
    for html_file in mobile_coach_dir.glob('*.html'):
        process_html_file(html_file, MOBILE_CSS_LINK)

    # Process watch files
    watch_dir = base_dir / 'watch'
    for html_file in watch_dir.glob('*.html'):
        process_html_file(html_file, WATCH_CSS_LINK)

    # Process presentation file
    presentation_dir = base_dir / 'presentation'
    for html_file in presentation_dir.glob('*.html'):
        process_html_file(html_file, CSS_LINK)

    print("\n✓ All HTML files processed successfully!")
    print(f"  - Replaced emojis with SF Symbol SVGs")
    print(f"  - Added unified design system CSS")
    print(f"  - Standardized button classes")

if __name__ == '__main__':
    main()
