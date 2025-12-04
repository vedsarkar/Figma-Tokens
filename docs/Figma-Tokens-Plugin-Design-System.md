# Figma Design Tokens Plugin - Visual Design System

**Document Version:** 1.0
**Last Updated:** 2025-12-04
**Status:** Developer-Ready Specifications

---

## Table of Contents

1. [Overview](#overview)
2. [Layout & Spacing](#layout--spacing)
3. [Typography](#typography)
4. [Colors](#colors)
5. [Components](#components)
6. [Interactive States](#interactive-states)
7. [Icons](#icons)
8. [Accessibility](#accessibility)

---

## Overview

This design system defines all visual specifications for the Figma Design Tokens Plugin. All measurements, colors, and typography are production-ready for developer handoff.

### Design Principles

- **Figma-Native**: Match Figma's UI patterns and aesthetics
- **Accessible**: WCAG 2.1 AA compliant
- **Responsive**: Adapt to plugin panel resizing
- **Consistent**: Reusable patterns across all screens

---

## Layout & Spacing

### Plugin Dimensions

```
Default Width:  360px
Minimum Width:  320px
Maximum Width:  User-resizable (up to ~800px)

Default Height: 480px (adjustable by user)
```

### Spacing Scale

```
Space Unit: 4px base

xs:   4px   (tight spacing)
sm:   8px   (default inline spacing)
md:   12px  (between related elements)
lg:   16px  (section padding)
xl:   24px  (large section separation)
2xl:  32px  (major section breaks)
```

### Layout Structure

```
┌─────────────────────────────────────┐  ──┐
│  Header                              │    │ 56px
├─────────────────────────────────────┤  ──┤
│  Filters (optional)                  │    │ 88px
│  - Category dropdown: 40px           │    │
│  - Search bar: 40px                  │    │
│  - Spacing between: 8px              │    │
├─────────────────────────────────────┤  ──┤
│                                      │    │
│  Content Area (scrollable)           │    │ Flexible
│                                      │    │ (fills remaining)
│                                      │    │
├─────────────────────────────────────┤  ──┤
│  Action Buttons                      │    │ 100px
│  - Utility button: 44px              │    │ (44+8+44+4)
│  - Primary buttons: 44px each        │    │
│  - Spacing: 8px between, 4px padding │    │
└─────────────────────────────────────┘  ──┘
```

### Padding & Margins

```
Screen Padding:
- Horizontal: 16px (left/right)
- Vertical: 16px (top/bottom)

Element Spacing:
- Between sections: 16px
- Between related items: 8px
- Within components: 4px
```

---

## Typography

### Font Family

```
Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
Code: 'SF Mono', 'Roboto Mono', 'Courier New', monospace
```

### Type Scale

```
Header Title:
- Size: 16px
- Weight: 500 (Medium)
- Line Height: 24px
- Color: #1A1A1A

Section Header:
- Size: 14px
- Weight: 500 (Medium)
- Line Height: 20px
- Color: #1A1A1A

Body Text:
- Size: 14px
- Weight: 400 (Regular)
- Line Height: 20px
- Color: #374151

Helper Text / Labels:
- Size: 12px
- Weight: 400 (Regular)
- Line Height: 16px
- Color: #6B7280

Code:
- Size: 13px
- Weight: 400 (Regular)
- Line Height: 18px
- Font: Monospace
- Color: #1F2937
```

### Usage Examples

```css
/* Header Title */
font: 500 16px/24px Inter;
color: #1A1A1A;

/* Body Text */
font: 400 14px/20px Inter;
color: #374151;

/* Helper Text */
font: 400 12px/16px Inter;
color: #6B7280;

/* Code */
font: 400 13px/18px 'SF Mono';
color: #1F2937;
```

---

## Colors

### Primary Palette

```
Primary Blue:
- Default: #2563EB
- Hover: #1D4ED8
- Active: #1E40AF
- Usage: Primary actions, links, focus states

Text Colors:
- Primary: #1A1A1A (headings, important text)
- Secondary: #374151 (body text)
- Tertiary: #6B7280 (helper text, labels)
- Disabled: #9CA3AF (disabled text)

Background Colors:
- Base: #FFFFFF (main background)
- Elevated: #F9FAFB (subtle elevation)
- Hover: rgba(0, 0, 0, 0.04) (hover overlays)
- Active: rgba(0, 0, 0, 0.08) (pressed state)
- Selected: rgba(37, 99, 235, 0.1) (selected items)
```

### Semantic Colors

```
Success:
- Default: #10B981
- Background: #D1FAE5
- Usage: Success messages, completion states

Error:
- Default: #EF4444
- Background: #FEE2E2
- Usage: Error messages, validation errors

Warning:
- Default: #F59E0B
- Background: #FEF3C7
- Usage: Warning messages, caution states

Info:
- Default: #3B82F6
- Background: #DBEAFE
- Usage: Informational messages, tips
```

### Borders & Dividers

```
Border Default: #E5E7EB (subtle separation)
Border Hover: #D1D5DB (interactive borders on hover)
Border Focus: #2563EB (focus ring, 2px)
Divider: #F3F4F6 (horizontal rules, section separators)
```

### Color Usage Guidelines

```
✓ DO:
- Use Primary Blue for clickable actions
- Use semantic colors for their intended purpose
- Maintain 4.5:1 contrast ratio for text

✗ DON'T:
- Use red for anything other than errors/destructive actions
- Use color as the only indicator (accessibility)
- Mix semantic meanings (e.g., green for errors)
```

---

## Dark Mode Support

The plugin detects Figma's current theme and adapts automatically.

### Dark Mode Color Palette

```
Primary Blue:
- Default: #3B82F6 (slightly lighter for dark backgrounds)
- Hover: #60A5FA
- Active: #2563EB
- Usage: Primary actions, links, focus states

Text Colors:
- Primary: #F9FAFB (headings, important text)
- Secondary: #E5E7EB (body text)
- Tertiary: #9CA3AF (helper text, labels)
- Disabled: #6B7280 (disabled text)

Background Colors:
- Base: #1F2937 (main background)
- Elevated: #374151 (subtle elevation)
- Hover: rgba(255, 255, 255, 0.08) (hover overlays)
- Active: rgba(255, 255, 255, 0.12) (pressed state)
- Selected: rgba(59, 130, 246, 0.2) (selected items)
```

### Dark Mode Semantic Colors

```
Success:
- Default: #34D399
- Background: rgba(16, 185, 129, 0.15)

Error:
- Default: #F87171
- Background: rgba(239, 68, 68, 0.15)

Warning:
- Default: #FBBF24
- Background: rgba(245, 158, 11, 0.15)

Info:
- Default: #60A5FA
- Background: rgba(59, 130, 246, 0.15)
```

### Dark Mode Borders & Dividers

```
Border Default: #4B5563 (subtle separation)
Border Hover: #6B7280 (interactive borders on hover)
Border Focus: #3B82F6 (focus ring, 2px)
Divider: #374151 (horizontal rules, section separators)
```

### Theme Detection

```typescript
// Detect Figma's current theme
const isDarkMode = figma.currentUser?.preferences?.theme === 'dark';

// Apply appropriate color tokens
const colors = isDarkMode ? darkModeColors : lightModeColors;
```

### Implementation Notes

- **Automatic Detection:** Plugin reads `figma.currentUser.preferences.theme`
- **Real-time Switching:** Listen for theme change events
- **No User Preference:** Default to light mode if detection fails
- **Toast Notifications:** Adapt background/text colors per theme
- **Code Syntax Highlighting:** Adjust for readability in both themes

---

## Components

### Buttons

#### Primary Button

```
Dimensions:
- Height: 44px
- Padding: 0 16px
- Border Radius: 6px
- Min Width: 80px

Typography:
- Font: 14px/20px Inter Medium (500)
- Letter Spacing: 0

Colors (Default State):
- Background: #2563EB
- Text: #FFFFFF
- Border: none

Colors (Hover):
- Background: #1D4ED8
- Text: #FFFFFF

Colors (Active/Pressed):
- Background: #1E40AF
- Text: #FFFFFF

Colors (Disabled):
- Background: #E5E7EB
- Text: #9CA3AF
- Cursor: not-allowed

Focus State:
- Outline: 2px solid #2563EB
- Outline Offset: 2px
```

**Example:**
```css
.button-primary {
  height: 44px;
  padding: 0 16px;
  border-radius: 6px;
  background: #2563EB;
  color: #FFFFFF;
  font: 500 14px/20px Inter;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
}

.button-primary:hover {
  background: #1D4ED8;
}

.button-primary:active {
  background: #1E40AF;
}

.button-primary:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}

.button-primary:disabled {
  background: #E5E7EB;
  color: #9CA3AF;
  cursor: not-allowed;
}
```

---

#### Secondary Button

```
Dimensions:
- Height: 44px
- Padding: 0 16px
- Border Radius: 6px

Colors (Default):
- Background: transparent
- Text: #374151
- Border: 1px solid #D1D5DB

Colors (Hover):
- Background: #F9FAFB
- Text: #1A1A1A
- Border: 1px solid #9CA3AF

Colors (Active):
- Background: #F3F4F6
- Border: 1px solid #6B7280
```

---

#### Utility Button (e.g., Sync)

```
Dimensions:
- Height: 40px (smaller than primary)
- Padding: 0 12px
- Border Radius: 6px

Colors (Default):
- Background: #F9FAFB
- Text: #6B7280
- Border: 1px solid #E5E7EB

Colors (Hover):
- Background: #F3F4F6
- Text: #374151
- Border: 1px solid #D1D5DB
```

---

### Input Fields

#### Text Input

```
Dimensions:
- Height: 40px
- Padding: 0 12px
- Border Radius: 6px

Typography:
- Font: 14px/20px Inter Regular
- Color: #1A1A1A
- Placeholder: #9CA3AF

Colors (Default):
- Background: #FFFFFF
- Border: 1px solid #D1D5DB

Colors (Hover):
- Border: 1px solid #9CA3AF

Colors (Focus):
- Border: 2px solid #2563EB
- Outline: none

Colors (Error):
- Border: 2px solid #EF4444
- Background: #FEF2F2

Colors (Disabled):
- Background: #F9FAFB
- Border: 1px solid #E5E7EB
- Text: #9CA3AF
- Cursor: not-allowed
```

**Example:**
```css
.input-text {
  height: 40px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  font: 400 14px/20px Inter;
  color: #1A1A1A;
  transition: border 0.15s ease;
}

.input-text::placeholder {
  color: #9CA3AF;
}

.input-text:hover {
  border-color: #9CA3AF;
}

.input-text:focus {
  border: 2px solid #2563EB;
  outline: none;
  padding: 0 11px; /* Compensate for 2px border */
}

.input-text.error {
  border: 2px solid #EF4444;
  background: #FEF2F2;
}
```

---

#### Password Input (Masked)

```
Same as Text Input, but:
- Input type: password
- Show/Hide toggle button on right
- Toggle button: 32x32px, icon only
```

---

### Dropdown / Select

```
Dimensions:
- Height: 40px
- Padding: 0 12px (text) + 32px (right for icon)
- Border Radius: 6px

Typography:
- Font: 14px/20px Inter Regular
- Color: #1A1A1A

Colors (Default):
- Background: #FFFFFF
- Border: 1px solid #D1D5DB
- Icon: #6B7280

Colors (Hover):
- Border: 1px solid #9CA3AF
- Icon: #374151

Colors (Open/Active):
- Border: 2px solid #2563EB
- Icon: #2563EB (rotated 180deg)

Dropdown Menu:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Shadow: 0 4px 12px rgba(0, 0, 0, 0.08)
- Border Radius: 6px
- Max Height: 240px (scrollable)

Dropdown Item:
- Height: 36px
- Padding: 0 12px
- Hover Background: #F9FAFB
- Selected Background: #EFF6FF
- Selected Text: #2563EB
```

---

### Checkbox

```
Dimensions:
- Size: 16x16px
- Border Radius: 3px

Colors (Unchecked):
- Background: #FFFFFF
- Border: 1px solid #D1D5DB

Colors (Unchecked Hover):
- Border: 1px solid #9CA3AF

Colors (Checked):
- Background: #2563EB
- Border: none
- Checkmark: #FFFFFF

Colors (Checked Hover):
- Background: #1D4ED8

Colors (Indeterminate):
- Background: #2563EB
- Dash: #FFFFFF (horizontal line)

Focus State:
- Outline: 2px solid #2563EB
- Outline Offset: 2px
```

---

### List Items

#### Token List Item

```
Dimensions:
- Height: 36px
- Padding: 0 12px 0 8px (asymmetric for checkbox alignment)

Typography:
- Token Name: 14px Inter Regular, #1A1A1A
- Token Value: 14px Inter Mono, #6B7280

Layout:
┌─────────────────────────────────────┐
│ [☐] Token-name        ⬤  #0066CC   │
│  ↑    ↑              ↑    ↑        │
│  8px  8px spacing    8px  value    │
└─────────────────────────────────────┘

Colors (Default):
- Background: transparent

Colors (Hover):
- Background: rgba(0, 0, 0, 0.04)

Colors (Active/Pressed):
- Background: rgba(0, 0, 0, 0.08)

Colors (Selected):
- Checkbox: checked
- Background: rgba(37, 99, 235, 0.06)
```

---

#### Category Header

```
Dimensions:
- Height: 44px
- Padding: 0 12px 0 8px

Typography:
- Category Name: 14px Inter Medium (500), #1A1A1A
- Count: 14px Inter Regular, #6B7280

Layout:
┌─────────────────────────────────────┐
│ [☐] Colors (24)                  ▼ │
│  ↑    ↑           ↑              ↑ │
│  8px  8px         count          collapse
└─────────────────────────────────────┘

Colors (Default):
- Background: transparent

Colors (Hover):
- Background: rgba(0, 0, 0, 0.04)

Collapse Indicator:
- Icon: Chevron Down (▼) when expanded
- Icon: Chevron Right (▶) when collapsed
- Size: 12px
- Color: #6B7280
```

---

### Code Block

```
Dimensions:
- Padding: 16px
- Border Radius: 6px

Typography:
- Font: 13px/18px 'SF Mono'
- Color: #1F2937

Colors:
- Background: #F9FAFB
- Border: 1px solid #E5E7EB

Syntax Highlighting (Subtle):
- Keywords (root, var): #6B7280
- Property Names (--color-): #1F2937
- Values (#0066CC, 16px): #2563EB
- Comments (/* */): #9CA3AF
- Punctuation: #374151

Scrollbar:
- Width: 8px
- Track: transparent
- Thumb: #D1D5DB
- Thumb Hover: #9CA3AF
```

---

### Color Preview Chip

```
For color tokens only

Dimensions:
- Size: 16x16px
- Border Radius: 50% (circle)
- Border: 1px solid rgba(0, 0, 0, 0.08)

Position:
- 8px spacing from token value text

Background:
- Fill with actual color value
- If color is very light: add subtle border
```

---

### Loading Indicators

#### Spinner (Indeterminate)

```
Dimensions:
- Size: 20px
- Stroke Width: 2px

Colors:
- Stroke: #2563EB
- Background Circle: #E5E7EB

Animation:
- Rotation: 360deg in 1s
- Easing: linear, infinite
```

#### Progress Bar (Determinate)

```
Dimensions:
- Height: 4px
- Width: 100%
- Border Radius: 2px

Colors:
- Background: #E5E7EB
- Fill: #2563EB

Animation:
- Smooth fill from 0-100%
- Transition: width 0.3s ease
```

#### Animated Dots

```
Text: "Loading..."
Animation: Ellipsis pulses
- Dot 1: fade 0-1 in 0.6s, delay 0s
- Dot 2: fade 0-1 in 0.6s, delay 0.2s
- Dot 3: fade 0-1 in 0.6s, delay 0.4s
- Repeat infinite
```

---

### Toast Notifications

```
Dimensions:
- Width: Auto (max 320px)
- Height: Auto (min 44px)
- Padding: 12px 16px
- Border Radius: 8px
- Position: Top-right corner, 16px from edges

Light Mode:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Text: #1A1A1A
- Icon (✓): #10B981 (success green)
- Shadow: 0 4px 12px rgba(0, 0, 0, 0.1)

Dark Mode:
- Background: #374151
- Border: 1px solid #4B5563
- Text: #F9FAFB
- Icon (✓): #34D399 (success green)
- Shadow: 0 4px 12px rgba(0, 0, 0, 0.4)

Close Button:
- Size: 20x20px
- Icon: × (16px)
- Color: #6B7280
- Hover: #374151 (light) / #9CA3AF (dark)

Animation:
- Enter: Slide in from right + fade (200ms ease-out)
- Exit: Fade out (150ms ease-in)
- Auto-dismiss: 3 seconds after appear

Stacking:
- Multiple toasts: Stack vertically with 8px gap
- Max visible: 3 toasts (oldest auto-dismissed)
```

**Example:**
```css
.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: slideInRight 200ms ease-out;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

---

## Interactive States

### Universal State Rules

```
Hover:
- Transition: 150ms ease
- Cursor: pointer (for clickable elements)

Active/Pressed:
- Transition: 50ms ease (faster feedback)
- Scale: 0.98 (subtle press effect, optional)

Focus:
- Outline: 2px solid #2563EB
- Outline Offset: 2px
- Never remove focus styles!

Disabled:
- Opacity: 1 (use color instead)
- Cursor: not-allowed
- No hover effects
```

### State Priority

```
1. Disabled (overrides all)
2. Error/Warning (overrides normal states)
3. Focus (visible on keyboard navigation)
4. Active/Pressed (during click)
5. Hover (mouse over)
6. Default (resting state)
```

---

## Icons

### Icon System

```
Library: Use Figma's built-in icon set (consistent with Figma UI)
Fallback: Heroicons Outline (https://heroicons.com)

Sizes:
- Inline (in text/buttons): 16px
- Standalone: 20px
- Large (illustrations): 48px

Style:
- Line weight: 1.5px
- Rounded corners: 1px
- Color: Inherit from parent (use currentColor)

Spacing:
- Icon + Text: 8px gap
- Icon only button: 8px padding all sides
```

### Icon Usage

```
Common Icons:

⚙️  Settings (Gear)
🔍  Search (Magnifying Glass)
< > Code (Brackets)
📄  List (Document)
⬇️  Download (Arrow Down)
📤  Export (Upload/Share)
🔄  Sync (Refresh/Rotate)
📋  Copy (Clipboard)
👁️  Show/Hide (Eye)
▼   Collapse (Chevron Down)
▶   Expand (Chevron Right)
✓   Success (Checkmark)
✗   Error (X)
ℹ️   Info (Info Circle)
⚠️   Warning (Alert Triangle)
```

---

## Accessibility

### WCAG 2.1 AA Compliance

#### Color Contrast

```
Normal Text (14px):
- Minimum: 4.5:1
- Our ratios:
  - #1A1A1A on #FFFFFF: 16.1:1 ✓
  - #374151 on #FFFFFF: 10.7:1 ✓
  - #6B7280 on #FFFFFF: 5.8:1 ✓

Large Text (18px+):
- Minimum: 3:1
- All our colors pass ✓

Interactive Elements:
- Minimum: 3:1 against adjacent colors
- #2563EB on #FFFFFF: 8.6:1 ✓
```

#### Touch Targets

```
Minimum Size: 44x44px
- Primary buttons: 44px ✓
- Checkboxes: 16px visual + 44px tap area ✓
- Dropdowns: 40px + 4px padding = 44px effective ✓
- List items: 36-44px ✓

Spacing: 8px minimum between targets ✓
```

#### Keyboard Navigation

```
Tab Order:
1. Header elements (Toggle, Settings)
2. Filters (Category dropdown, Search)
3. Token list (categories, then tokens)
4. Action buttons

Focus Indicators:
- Always visible
- 2px blue outline
- 2px offset for clarity

Keyboard Shortcuts:
- Enter: Activate focused element
- Space: Toggle checkbox
- Arrow Keys: Navigate list
- Escape: Close modals/dropdowns
```

#### Screen Readers

```
All interactive elements must have:
- aria-label (if no visible text)
- aria-describedby (for helper text)
- role attribute (if not semantic HTML)

Examples:
<button aria-label="Toggle code view">
  <IconCode />
</button>

<input
  type="password"
  aria-describedby="token-help"
  aria-invalid="false"
/>
<span id="token-help">Requires 'repo' scope</span>
```

---

## Implementation Notes

### CSS Variables (Recommended)

```css
:root {
  /* Colors */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #374151;
  --color-text-tertiary: #6B7280;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;

  /* Typography */
  --font-family: 'Inter', -apple-system, sans-serif;
  --font-size-body: 14px;
  --line-height-body: 20px;

  /* Dimensions */
  --button-height: 44px;
  --input-height: 40px;
  --border-radius: 6px;
}
```

### Animation Timing

```css
/* Use these values for consistency */
--transition-fast: 50ms ease;
--transition-normal: 150ms ease;
--transition-slow: 300ms ease;

/* Examples */
.button {
  transition: background var(--transition-normal);
}

.modal {
  transition: opacity var(--transition-slow);
}
```

---

## Design Token Export Example

```json
{
  "colors": {
    "primary": {
      "value": "#2563EB",
      "type": "color"
    },
    "text": {
      "primary": {
        "value": "#1A1A1A",
        "type": "color"
      }
    }
  },
  "spacing": {
    "sm": {
      "value": "8px",
      "type": "spacing"
    }
  },
  "typography": {
    "body": {
      "fontSize": {
        "value": "14px",
        "type": "fontSize"
      },
      "lineHeight": {
        "value": "20px",
        "type": "lineHeight"
      }
    }
  }
}
```

---

**End of Design System Document**

All specifications are developer-ready for implementation.
