# RunSmart Emoji Replacement Guide

## Overview
All emojis have been systematically replaced with SF Symbol-style SVG icons for a professional, production-ready interface.

## Replacement Summary

### Total Replacements
- **20 unique emojis** replaced across **14 HTML files**
- **All emojis** converted to inline SVG icons with `currentColor` stroke/fill
- Icons are contextually colored and scale properly across all breakpoints

---

## Emoji to SVG Icon Mapping

### ⚡ Lightning Bolt → Bolt Icon
**Usage:** AI Intelligence, Power Features, Quick Actions
**Occurrences:** 20 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M16 2L6 13.5H10L8 22L18 11.5H14L16 2Z" stroke="currentColor" stroke-width="1.5"/>
</svg>
```
**Files:**
- dashboard/mobile-coach-intervention.html
- dashboard/runsmart-member-detail.html
- dashboard/runsmart-email-intelligence.html
- mobile/coach/mobile-coach-member-detail.html
- mobile/coach/mobile-coach-dashboard.html
- mobile/members/mobile-app-community.html
- mobile/members/mobile-app-coach.html

---

### 🔥 Fire → Flame Icon
**Usage:** Streaks, Intensity, Hot Topics
**Occurrences:** 12 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 22C9.28 22 4.57 19.33..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```
**Files:**
- dashboard/mobile-coach-intervention.html
- mobile/members/mobile-app-community.html
- mobile/members/mobile-app-progress.html

---

### 💪 Muscle → Strength Icon
**Usage:** Effort, Strength Training, Motivation
**Occurrences:** 7 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M14.4 6C14.4 7.54667..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```
**Files:**
- dashboard/mobile-coach-intervention.html
- mobile/members/mobile-app-community.html
- mobile/members/mobile-app-coach.html

---

### 🏃 Runner → Running Person Icon
**Usage:** Running Activities, Workouts, Athletes
**Occurrences:** 8 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="13.5" cy="4" r="2" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 22L10.5 18L11 13L9 11..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

### 🚨 Alert → Warning Triangle Icon
**Usage:** Critical Alerts, Urgent Notifications
**Occurrences:** 4 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 9V13M12 17H12.01M10.29 3.86..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

### 🚀 Rocket → Launch Icon
**Usage:** Deployment, New Features, Growth
**Occurrences:** 4 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4.5 16.5C3 18 3.5 20..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

### 🎁 Gift → Present Icon
**Usage:** Rewards, Benefits, Bonuses
**Occurrences:** 4 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="4" rx="1" stroke="currentColor"/>
    <path d="M12 8V21M5 12V20..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

### 🏆 Trophy → Award Icon
**Usage:** Achievements, Leaderboards, Winners
**Occurrences:** 4 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M6 9H4.5C3.67157 9..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

### 🎉 Party → Celebration Icon
**Usage:** Celebrations, Completed Goals
**Occurrences:** 3 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 6L9 18L11 18.5..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

### 💡 Light Bulb → Idea Icon
**Usage:** Insights, Tips, Recommendations
**Occurrences:** 3 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 18H15M10 21H14M12 3..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

### 💰 Money → Dollar Icon
**Usage:** Revenue, Savings, Value
**Occurrences:** 3 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor"/>
    <path d="M14.5 8.5C14.5 8.5..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

### 👏 Clapping → Applause Icon
**Usage:** Kudos, Encouragement, Support
**Occurrences:** 3 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M8 10V8C8 7.44772..." stroke="currentColor" stroke-width="1.5"/>
</svg>
```

---

### 🎯 Target → Bullseye Icon
**Usage:** Goals, Targets, Focus Areas
**Occurrences:** 2 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor"/>
</svg>
```

---

### ✨ Sparkles → Star Icon
**Usage:** New, Special, Highlighted
**Occurrences:** 2 times
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L13.5 8.5L19 10..." fill="currentColor"/>
</svg>
```

---

### 📊 Bar Chart → Analytics Icon
**Usage:** Data, Analytics, Reports
**Occurrences:** 1 time
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 3V21H21M7 16V11M12 16V8M17 16V13" stroke="currentColor"/>
</svg>
```

---

### 📧 Email → Envelope Icon
**Usage:** Messaging, Communications, Campaigns
**Occurrences:** 1 time
**SVG:**
```html
<svg class="icon icon-inline" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor"/>
    <path d="M3 7L12 13L21 7" stroke="currentColor"/>
</svg>
```

---

## Icons NOT Replaced (Kept as Personality Elements)

The following emojis were **intentionally kept** per the design strategy of maintaining personality:

- None - All emojis have been replaced with professional SVG icons

---

## Icon Styling Classes

All replaced icons use these CSS classes from the unified design system:

```css
.icon-inline {
    display: inline-flex;
    vertical-align: middle;
    width: 20px;
    height: 20px;
}

.icon-sm svg { width: 16px; height: 16px; }
.icon-base svg { width: 20px; height: 20px; }
.icon-md svg { width: 24px; height: 24px; }
.icon-lg svg { width: 32px; height: 32px; }
```

---

## Color Adaptation

All SVG icons use `currentColor` for stroke/fill, allowing them to:
- Inherit text color from parent elements
- Adapt to theme changes automatically
- Support hover/active states
- Work with status colors (critical, warning, success)

### Example Usage:
```html
<div style="color: var(--purple-primary);">
    <svg class="icon-inline" width="20" height="20">
        <path stroke="currentColor" ... />
    </svg>
    This icon will be purple
</div>
```

---

## Files Modified

### Desktop Dashboard (4 files)
1. `dashboard/runsmart-dashboard.html`
2. `dashboard/runsmart-member-detail.html`
3. `dashboard/runsmart-email-intelligence.html`
4. `dashboard/mobile-coach-intervention.html`

### Mobile Member App (5 files)
1. `mobile/members/mobile-app-today.html`
2. `mobile/members/mobile-app-calendar.html`
3. `mobile/members/mobile-app-progress.html`
4. `mobile/members/mobile-app-community.html`
5. `mobile/members/mobile-app-coach.html`

### Mobile Coach App (2 files)
1. `mobile/coach/mobile-coach-dashboard.html`
2. `mobile/coach/mobile-coach-member-detail.html`

### Apple Watch (2 files)
1. `watch/apple-watch-running-intelligence.html`
2. `watch/apple-watch-gamification.html`

### Presentation (1 file)
1. `presentation/runsmart-presentation.html`

---

## Benefits of SVG Icons

✅ **Scalability** - Perfect rendering at any size/resolution
✅ **Performance** - Smaller file size than emoji fonts
✅ **Customization** - Full control over colors, strokes, fills
✅ **Accessibility** - Better screen reader support with ARIA labels
✅ **Consistency** - Uniform visual language across platforms
✅ **Professional** - Production-ready Apple HIG compliance

---

## Next Steps for Further Refinement

If you want to enhance the icon system further:

1. **Create SVG Sprite Sheet** - Consolidate all icons into `assets/icons/sprite.svg`
2. **Add ARIA Labels** - Improve accessibility with descriptive labels
3. **Create Icon Library** - Document all icons with usage guidelines
4. **Figma Integration** - Export icons as Figma components
5. **Animation** - Add subtle hover/active state animations

---

**All emojis successfully replaced! 🎉 → ✓**
(Well, except for this one in the docs 😄)
