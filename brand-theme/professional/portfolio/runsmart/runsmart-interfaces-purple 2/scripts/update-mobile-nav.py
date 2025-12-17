#!/usr/bin/env python3
"""
Update mobile app navigation to connect all screens with working footer nav
"""

import os
import re

# Define navigation HTML for member screens
MEMBER_NAV = '''            <div class="tab-bar">
                <a href="mobile-app-today.html" class="tab-item{today_active}">
                    <svg class="tab-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    <div class="tab-label">Today</div>
                </a>
                <a href="mobile-app-calendar.html" class="tab-item{calendar_active}">
                    <svg class="tab-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                    </svg>
                    <div class="tab-label">Calendar</div>
                </a>
                <a href="mobile-app-progress.html" class="tab-item{progress_active}">
                    <svg class="tab-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 9h2v9h-2v-9zm4-5h2v14h-2V7z"/>
                    </svg>
                    <div class="tab-label">Progress</div>
                </a>
                <a href="mobile-app-coach.html" class="tab-item{coach_active}">
                    <svg class="tab-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                    <div class="tab-label">Coach</div>
                </a>
                <a href="mobile-app-community.html" class="tab-item{community_active}">
                    <svg class="tab-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                    <div class="tab-label">Community</div>
                </a>
            </div>'''

# Define navigation HTML for coach screens
COACH_NAV = '''            <div class="tab-bar">
                <a href="mobile-coach-dashboard.html" class="tab-item{dashboard_active}">
                    <svg class="tab-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                    <div class="tab-label">Dashboard</div>
                </a>
                <a href="mobile-coach-member-detail.html" class="tab-item{members_active}">
                    <svg class="tab-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                    <div class="tab-label">Members</div>
                </a>
                <a href="mobile-coach-messages.html" class="tab-item{messages_active}">
                    <svg class="tab-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                    <div class="tab-label">Messages</div>
                </a>
                <a href="mobile-coach-settings.html" class="tab-item{settings_active}">
                    <svg class="tab-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                    </svg>
                    <div class="tab-label">Settings</div>
                </a>
            </div>'''

def update_mobile_navigation():
    """Update navigation in all mobile screens"""

    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Member screens configuration
    member_screens = {
        'mobile/members/mobile-app-today.html': 'today',
        'mobile/members/mobile-app-calendar.html': 'calendar',
        'mobile/members/mobile-app-progress.html': 'progress',
        'mobile/members/mobile-app-coach.html': 'coach',
        'mobile/members/mobile-app-community.html': 'community',
    }

    # Coach screens configuration
    coach_screens = {
        'mobile/coach/mobile-coach-dashboard.html': 'dashboard',
        'mobile/coach/mobile-coach-member-detail.html': 'members',
        'mobile/coach/mobile-coach-messages.html': 'messages',
        'mobile/coach/mobile-coach-settings.html': 'settings',
    }

    # Update member screens
    for filepath, active_tab in member_screens.items():
        full_path = os.path.join(base_dir, filepath)
        if not os.path.exists(full_path):
            print(f"Warning: {filepath} not found")
            continue

        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Prepare navigation with active state
        nav_html = MEMBER_NAV.format(
            today_active=' active' if active_tab == 'today' else '',
            calendar_active=' active' if active_tab == 'calendar' else '',
            progress_active=' active' if active_tab == 'progress' else '',
            coach_active=' active' if active_tab == 'coach' else '',
            community_active=' active' if active_tab == 'community' else ''
        )

        # Find and replace tab-bar section
        pattern = r'<div class="tab-bar">.*?</div>\s*</div>\s*</div>\s*</body>'
        replacement = nav_html + '\n        </div>\n    </div>\n</body>'

        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated {filepath}")
        else:
            print(f"✗ Could not find tab-bar in {filepath}")

    # Update coach screens
    for filepath, active_tab in coach_screens.items():
        full_path = os.path.join(base_dir, filepath)
        if not os.path.exists(full_path):
            print(f"Warning: {filepath} not found")
            continue

        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Prepare navigation with active state
        nav_html = COACH_NAV.format(
            dashboard_active=' active' if active_tab == 'dashboard' else '',
            members_active=' active' if active_tab == 'members' else '',
            messages_active=' active' if active_tab == 'messages' else '',
            settings_active=' active' if active_tab == 'settings' else ''
        )

        # Find and replace tab-bar section
        pattern = r'<div class="tab-bar">.*?</div>\s*</div>\s*</div>\s*</body>'
        replacement = nav_html + '\n        </div>\n    </div>\n</body>'

        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated {filepath}")
        else:
            print(f"✗ Could not find tab-bar in {filepath}")

    print("\n✅ Mobile navigation update complete!")

if __name__ == '__main__':
    update_mobile_navigation()
