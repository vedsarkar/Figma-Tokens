# Figma Design Tokens Plugin - User Flow Documentation

**Document Version:** 1.0
**Last Updated:** 2025-12-03
**Status:** Focused Ideation - First-Time Onboarding Flow

---

## Table of Contents

1. [Overview](#overview)
2. [First-Time User Journey](#first-time-user-journey)
3. [Main Plugin UI](#main-plugin-ui)
4. [Settings Panel](#settings-panel)
5. [GitHub Config Flow](#github-config-flow)
6. [Export Workflows](#export-workflows)

---

## Overview

This document captures the complete user flow for the Figma Design Tokens Plugin, focusing on the first-time user experience and core interactions.

### Key Design Decisions

- **No Welcome Screens** - Jump straight to value by auto-scanning tokens
- **Progressive Disclosure** - Show configuration options only after prerequisites are met
- **Dual Export Options** - GitHub sync OR local download, user's choice
- **Toggle View** - Switch between list view and code view for flexibility
- **PAT-Based Auth** - GitHub Personal Access Token (simpler than OAuth)

---

## First-Time User Journey

### Flow Diagram

```
User installs plugin
         ↓
Opens plugin for first time
         ↓
[SCREEN 1] Auto-scan begins
         ↓
Scanning animation (2-5 seconds)
         ↓
[SCREEN 2] Main UI loads with all tokens
         ↓
User can now:
  - View tokens (list or code view)
  - Download locally
  - Export to GitHub (requires setup)
```

---

## Main Plugin UI

### Screen 1: Initial Scan (First Launch Only)

**Trigger:** User opens plugin for the first time

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│   Finding your design tokens        │
│   ● ● ●                             │
│   ↑ Animated dots (left to right)   │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Loading Animation:** Animated dots pulsing left to right (for large files)
**Duration:** 2-5 seconds depending on file size
**Next:** Automatically transitions to Screen 2 when complete

---

### Screen 2: Main UI - List View (Default) - v3 ENHANCED

**Trigger:** After initial scan completes, or any subsequent plugin open

```
┌─────────────────────────────────────┐
│  Design Tokens  [< > Code] 🔄  ⚙️  │
├─────────────────────────────────────┤
│  [Category: All ▼]                  │
│  [🔍 Search tokens...]              │
├─────────────────────────────────────┤
│                                     │
│  ☑  Colors (24)                  ▼  │
│     ☑  primary-blue      ⬤  #0066CC │
│     ☑  secondary-red     ⬤  #FF4444 │
│     ☑  accent-green      ⬤  #00CC66 │
│                                     │
│  ☑  Typography (12)              ▼  │
│     ☑  heading-large     32px/700   │
│     ☑  body-regular      16px/400   │
│                                     │
│  ☑  Spacing (8)                  ▼  │
│     ☑  space-md          16px       │
│     ☑  space-lg          24px       │
│                                     │
├─────────────────────────────────────┤
│  [⬇️  Download]   [📤 Export to GitHub] │
└─────────────────────────────────────┘
```

**✨ v3 UX Enhancements:**
- **Sync button relocated:** Now in header between [< > Code] and ⚙️ for clearer UI organization - all functions in one spot
- **Checkboxes for individual tokens:** ☑ on each token enables granular selection control
- **Category checkboxes:** Select/deselect all tokens in a category at once
- Color chips: Visual preview (⬤) for color tokens
- Collapse indicators: (▼) shows sections can expand/collapse
- Cleaner action area: Only primary actions (Download/Export) at bottom

**Components:**

- **Header:**
  - Plugin title: "Design Tokens"
  - **[< > Code]** button - Switches to code view
  - **🔄** icon - Re-scan Figma file to refresh token list (positioned between Code toggle and Settings)
  - **⚙️** icon - Opens settings

- **Filters:**
  - **Category Dropdown** - Filter by token type (All, Colors, Typography, Spacing, etc.)
  - **Search Bar** - Search tokens by name

- **Token List:**
  - Collapsible category sections with checkboxes and counts
  - Individual tokens with checkboxes for granular selection
  - Token values displayed inline
  - Color preview chips (⬤) for color tokens

- **Action Buttons:**
  - **[⬇️ Download]** - Download selected tokens as files (primary action)
  - **[📤 Export to GitHub]** - Push selected tokens to GitHub repo (primary action)

**User Actions:**
- Check/uncheck individual tokens for granular export control
- Check/uncheck entire categories to select all tokens at once
- Filter by category
- Search for specific tokens
- Click [< > Code] to switch to code view
- Click 🔄 to re-scan and refresh tokens
- Click ⚙️ to open settings
- Click Download or Export buttons to export selected tokens

---

### Screen 3: Main UI - Code View - v3 ENHANCED

**Trigger:** User clicks [< > Code] button from list view

```
┌─────────────────────────────────────┐
│  Design Tokens  [📄 List] 🔄  ⚙️   │
├─────────────────────────────────────┤
│  [CSS Variables              ▼] 📋 │
├─────────────────────────────────────┤
│                                     │
│  :root {                            │
│    /* Colors */                     │
│    --color-primary-blue: #0066CC;   │
│    --color-secondary-red: #FF4444;  │
│    --color-accent-green: #00CC66;   │
│                                     │
│    /* Typography */                 │
│    --font-size-heading-large: 32px; │
│    --font-weight-heading-large: 700;│
│    --font-size-body-regular: 16px;  │
│    --font-weight-body-regular: 400; │
│                                     │
│    /* Spacing */                    │
│    --space-md: 16px;                │
│    --space-lg: 24px;                │
│  }                                  │
│                                     │
├─────────────────────────────────────┤
│              [⬇️ Download]          │
└─────────────────────────────────────┘
```

**✨ v3 UX Enhancements:**
- **Simplified format selector:** Removed "Export as:" label - clean dropdown gives clear affordance
- **Copy button relocated:** 📋 icon now in top-right corner of format bar for easy access without scrolling
- **Platform-specific syntax highlighting:** CSS (shown), JSON, Swift, Kotlin, XML each with appropriate syntax colors
- **Sync in header:** 🔄 consistent with list view - all functions in header
- **Single Download action:** Copy is primary (top-right), Download is secondary (bottom)

**Components:**

- **Header:**
  - Plugin title: "Design Tokens"
  - **[📄 List]** button - Returns to list view
  - **🔄** icon - Re-scan Figma file to refresh tokens
  - **⚙️** icon - Opens settings

- **Format Bar:**
  - **Format Dropdown** (left) - Choose code format: CSS Variables, JSON, JavaScript/TypeScript, iOS Swift, Android XML
  - **📋 Copy Button** (right) - Copy displayed code to clipboard

- **Code Display:**
  - Full formatted code for all selected tokens
  - **Platform-specific syntax highlighting:**
    - CSS: Keywords gray, properties dark, values blue
    - JSON: Keys orange, strings green, values blue
    - Swift: Keywords purple, types blue, strings red
    - Kotlin: Keywords purple, types teal, strings green
    - XML: Tags blue, attributes green, values red
  - Read-only, scrollable
  - Line numbers (optional)

- **Action Button:**
  - **[⬇️ Download]** - Download code as file(s) with correct extension

**User Actions:**
- Select format from dropdown (code updates live with appropriate syntax highlighting)
- Click 📋 to instantly copy code to clipboard
- Download code as platform-specific file
- Toggle back to list view

---

## Empty & Error States

### Empty State: No Tokens Found

**Trigger:** Plugin scans file but finds no Figma Variables or Styles

```
┌─────────────────────────────────────┐
│  Design Tokens  [< > Code] 🔄  ⚙️  │
├─────────────────────────────────────┤
│                                     │
│                                     │
│             🎨                      │
│                                     │
│      No design tokens found         │
│                                     │
│   This file doesn't have any        │
│   Figma Variables or Styles yet.    │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Behavior:**
- All export buttons disabled (grayed out)
- Sync button (🔄) still active to re-scan
- Settings (⚙️) still accessible

---

### Empty Search State

**Trigger:** User searches but no tokens match query

```
┌─────────────────────────────────────┐
│  Design Tokens  [< > Code] 🔄  ⚙️  │
├─────────────────────────────────────┤
│  [Category: All ▼]                  │
│  [🔍 primary-red_________________]  │
├─────────────────────────────────────┤
│                                     │
│                                     │
│   No tokens match "primary-red"     │
│                                     │
│   • Check your spelling             │
│   • Try different keywords          │
│   • Clear search to see all tokens  │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

### Success Notifications (Toast)

**Trigger:** After successful actions

```
┌─────────────────────────────────────┐
│  ✓ Code copied to clipboard    [×] │
└─────────────────────────────────────┘
   ↑ Appears top-right, auto-dismisses after 3s

┌─────────────────────────────────────┐
│  ✓ tokens.css downloaded        [×] │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ✓ Exported to username/repo    [×] │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ✓ Synced 24 tokens              [×] │
└─────────────────────────────────────┘
```

**Behavior:**
- Toast appears in top-right corner of plugin window
- Auto-dismisses after 3 seconds
- User can click [×] to dismiss immediately
- Multiple toasts stack vertically if triggered in quick succession

---

## Error Screens (Patterns A-G)

### Pattern A: Empty State - No Repositories

**Trigger:** User connects to GitHub but has no repositories

```
┌─────────────────────────────────────┐
│  🔗 GitHub Config                   │
├─────────────────────────────────────┤
│  ✅ Connected as @username          │
│  [Disconnect]                       │
├─────────────────────────────────────┤
│                                     │
│            📦                       │
│                                     │
│   You don't have any repositories   │
│                                     │
│   Create a repository on GitHub     │
│   to export your design tokens.     │
│                                     │
│   [Go to GitHub]                    │
│                                     │
└─────────────────────────────────────┘
```

---

### Pattern B: Connection Failure

**Trigger:** Network error or GitHub API unreachable

```
┌─────────────────────────────────────┐
│  🔗 GitHub Config                   │
├─────────────────────────────────────┤
│                                     │
│            ⚠️                       │
│                                     │
│     Connection failed               │
│                                     │
│   Unable to reach GitHub.           │
│   Check your internet connection    │
│   and try again.                    │
│                                     │
│   [Retry]        [Cancel]           │
│                                     │
└─────────────────────────────────────┘
```

**Also used for:**
- Network timeout during scan
- GitHub API unavailable (503/504)
- Corporate firewall blocks
- Network drops mid-export

---

### Pattern C: Permission Denied

**Trigger:** Token missing 'repo' scope or insufficient permissions

```
┌─────────────────────────────────────┐
│  🔗 GitHub Config                   │
├─────────────────────────────────────┤
│                                     │
│            🔒                       │
│                                     │
│      Permission denied              │
│                                     │
│   Your token doesn't have the       │
│   'repo' scope required to write    │
│   to repositories.                  │
│                                     │
│   [Generate New Token]              │
│                                     │
└─────────────────────────────────────┘
```

**Also used for:**
- User loses repo access
- Repository archived (read-only)
- Protected branch requires review

---

### Pattern D: Invalid/Expired

**Trigger:** Token expires or configuration becomes invalid

```
┌─────────────────────────────────────┐
│  🔗 GitHub Config                   │
├─────────────────────────────────────┤
│                                     │
│            ⏱️                       │
│                                     │
│      Token expired                  │
│                                     │
│   Your GitHub token is no longer    │
│   valid. Please generate a new      │
│   token and reconnect.              │
│                                     │
│   [Reconnect]                       │
│                                     │
└─────────────────────────────────────┘
```

**Also used for:**
- Invalid token format
- Repository deleted
- Branch deleted
- Configuration broken/outdated

---

### Pattern E: Overload/Performance

**Trigger:** Large file with 1000+ tokens or slow response

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│   Scanning tokens                   │
│   ● ● ●                             │
│   ↑ Animated dots                   │
│                                     │
│   This may take a moment...         │
│                                     │
└─────────────────────────────────────┘
```

**Also used for:**
- Rate limit exceeded (shows "GitHub rate limit reached. Try again in X minutes.")
- Loading 500+ repositories (shows "Loading repositories...")

---

### Pattern F: Confirmation Dialog

**Trigger:** User attempts destructive action

```
┌─────────────────────────────────────┐
│  Disconnect from GitHub?            │
├─────────────────────────────────────┤
│                                     │
│  You'll need to reconnect to        │
│  export tokens to GitHub again.     │
│                                     │
│  [Cancel]    [Disconnect]           │
│                                     │
└─────────────────────────────────────┘
```

**Also used for:**
- "Overwrite existing files?" warning
- "Discard unsaved changes?" when closing settings

```
┌─────────────────────────────────────┐
│  Unsaved changes                    │
├─────────────────────────────────────┤
│                                     │
│  You have unsaved export format     │
│  settings. Discard changes?         │
│                                     │
│  [Cancel]    [Discard]              │
│                                     │
└─────────────────────────────────────┘
```

---

### Pattern G: Data Validation Warning

**Trigger:** Token data quality issues detected

```
┌─────────────────────────────────────┐
│  Design Tokens  [< > Code] 🔄  ⚙️  │
├─────────────────────────────────────┤
│ ⚠️ 3 tokens have issues             │
│ [View Issues]                  [×]  │
├─────────────────────────────────────┤
│  ☑  Colors (24)                  ▼  │
│     ☑  primary-blue      ⬤  #0066CC │
│     ⚠️  invalid-color    (No value) │
```

**Issue Details Panel:**
```
┌─────────────────────────────────────┐
│  Token Issues                  [×]  │
├─────────────────────────────────────┤
│                                     │
│  ⚠️ invalid-color                   │
│     Missing color value             │
│                                     │
│  ⚠️ heading-💥-large                │
│     Special characters in name      │
│                                     │
│  ⚠️ spacing-md                      │
│     Duplicate token name            │
│                                     │
│  These tokens will be skipped       │
│  during export.                     │
│                                     │
│  [Close]                            │
└─────────────────────────────────────┘
```

---

## Settings Panel

### Settings Screen - v2 POLISHED

**Trigger:** User clicks ⚙️ icon from main UI

```
┌─────────────────────────────────────┐
│  ⚙️ Settings                        │
├─────────────────────────────────────┤
│  Export Formats                     │
│  Choose which code formats to       │
│  generate when exporting tokens     │
│                                     │
│  Web Development                    │
│  ☑  CSS Variables                   │
│  ☑  JSON                            │
│  ☑  JavaScript/TypeScript           │
│                                     │
│  Mobile Development                 │
│  ☐  iOS (Swift)                     │
│  ☐  Android (XML)                   │
│                                     │
│  ℹ️ At least one format required    │
│                                     │
│  [Cancel]       [Save Settings]     │
└─────────────────────────────────────┘
```

**🎨 v2 UX Improvements:**
- Explanation text: Clarifies what settings affect
- Grouped by platform: Web vs Mobile (clearer organization)
- Validation message: Prevents empty selection
- Cancel button: Standard dialog pattern

**Purpose:** Configure which export formats to use for downloads and GitHub exports

**User Actions:**
- Check/uncheck desired export formats
- Click [Save Settings] to apply changes

**Note:** These format settings apply to both [Download All] and [Github Export] actions

---

## GitHub Config Flow

### When GitHub Is Not Connected

**Trigger:** User clicks [Github Export] without prior GitHub setup

```
┌─────────────────────────────────────┐
│  GitHub Setup Required              │
│                                     │
│  To export to GitHub, configure     │
│  your connection.                   │
│                                     │
│  [Open GitHub Config] [Cancel]      │
└─────────────────────────────────────┘
```

**User Actions:**
- **[Open GitHub Config]** - Opens GitHub Config panel
- **[Cancel]** - Dismisses modal, returns to main UI

---

### GitHub Config - Step 1: Token Connection - v2 POLISHED

**Trigger:** User clicks [Open GitHub Config] from modal

```
┌─────────────────────────────────────┐
│  🔗 GitHub Config                   │
├─────────────────────────────────────┤
│  Connect to GitHub                  │
│                                     │
│  GitHub Access Token: *             │
│  [••••••••••••••••••••••••••••••••] │
│  [👁️ Show]                          │
│                                     │
│  [Test Connection]                  │
│                                     │
│  Need a token?                      │
│  [Generate GitHub Token →]          │
│  Requires 'repo' scope              │
│                                     │
└─────────────────────────────────────┘
```

**🎨 v2 UX Improvements:**
- **SECURITY FIX:** Token input masked by default
- Toggle visibility: [👁️ Show] button to view token if needed
- Required field indicator: * shows it's required
- Clearer helper: "Need a token?" + button (vs plain text link)
- Simpler heading: "Connect to GitHub" (less redundant)

**State:** Initial GitHub Config screen before connection

**User Actions:**
1. Click link to open GitHub token generation page
2. Generate Personal Access Token with `repo` scope
3. Copy token
4. Paste into text input field
5. Click [Test Connection]

**Next:** Loading state appears while validating token

---

### GitHub Config - Loading State

**Trigger:** User clicks [Test Connection]

```
┌─────────────────────────────────────┐
│  🔗 GitHub Config                   │
├─────────────────────────────────────┤
│  GitHub Configuration               │
│                                     │
│  GitHub Access Token:               │
│  [••••••••••••••••••••••••••••••••] │
│                                     │
│  [Validating token...]              │
│                                     │
│  ℹ️ Generate token at:              │
│     github.com/settings/tokens      │
│     (Requires 'repo' scope)         │
│                                     │
└─────────────────────────────────────┘
```

**Duration:** 1-3 seconds

**Outcomes:**
- **Success:** Expands to Step 2 (Repository Settings)
- **Failure:** Shows error message, keeps Step 1 visible

---

### GitHub Config - Error State

**Trigger:** Token validation fails

```
┌─────────────────────────────────────┐
│  🔗 GitHub Config                   │
├─────────────────────────────────────┤
│  GitHub Configuration               │
│                                     │
│  GitHub Access Token:               │
│  [••••••••••••••••••••••••••••••••] │
│                                     │
│  ❌ Invalid token or no 'repo' access│
│  Please check your token and try again│
│                                     │
│  [Test Connection]                  │
│                                     │
│  ℹ️ Generate token at:              │
│     github.com/settings/tokens      │
│     (Requires 'repo' scope)         │
│                                     │
└─────────────────────────────────────┘
```

**User Actions:**
- Check token and paste correct one
- Click [Test Connection] again

---

### GitHub Config - Step 2: Repository Configuration - v2 POLISHED

**Trigger:** Token validation succeeds

```
┌─────────────────────────────────────┐
│  🔗 GitHub Config                   │
├─────────────────────────────────────┤
│  ✅ Connected as @alex-developer    │
│  [Disconnect]                       │
├─────────────────────────────────────┤
│  Repository Settings                │
│                                     │
│  Repository: *                      │
│  [company/design-system        ▼]   │
│                                     │
│  Branch: *                          │
│  [main                         ▼]   │
│                                     │
│  File Name:                         │
│  [tokens_________________________]  │
│  Creates: tokens.css, tokens.json...│
│                                     │
│  Export Path:                       │
│  [/design-tokens/_________________] │
│  Where files will be saved in repo  │
│                                     │
│  [Cancel]      [Save Configuration] │
└─────────────────────────────────────┘
```

**🎨 v2 UX Improvements:**
- Required field markers: * indicates Repository and Branch are required
- Helper text: Examples show what each field does
- Cancel button: Standard dialog pattern
- Clearer labels: "Creates:" and "Where files will be saved"

**State:** Full GitHub Config screen with repository settings

**Components:**

1. **GitHub Status:**
   - Shows connected username
   - [Disconnect] button to clear token

2. **Repository Dropdown:**
   - Auto-populated with user's accessible repos
   - Searchable if many repos

3. **Branch Dropdown:**
   - Auto-populated based on selected repository
   - Updates when repository changes

4. **File Name:**
   - Base name for exported files
   - Example: `tokens` → generates `tokens.css`, `tokens.json`, `tokens.js`
   - File naming: `{basename}.{extension}` based on selected formats in Settings

5. **Export Path:**
   - Folder path within repository
   - Default: `/design-tokens/`
   - User can customize

**User Actions:**
1. Select repository from dropdown
2. Select branch from dropdown
3. Enter file name (or keep default)
4. Enter export path (or keep default)
5. Click [Save Configuration]

**Next:** Configuration saved, returns to main UI, ready to export

**Note:** Export formats are configured separately in Settings (⚙️ icon from main UI)

---

## Export Workflows

### Workflow 1: Download All (Local Export)

**Trigger:** User clicks [Download All] from main UI

**Prerequisites:** None (works immediately)

**Flow:**

```
User clicks [Download All]
         ↓
Plugin generates files in selected formats
  (based on Settings > Export Formats)
         ↓
Downloads as ZIP or individual files
         ↓
Success notification appears:
  "✅ Downloaded 47 tokens"
```

**Files Generated:**
- Based on Export Formats selected in Settings
- File naming: `{basename}.{extension}` (e.g., `tokens.css`, `tokens.json`, `tokens.js`)
- Default formats: CSS, JSON, JavaScript
- All files saved to same export path in repository

**User Experience:**
- Instant download, no configuration needed
- Works even without GitHub setup
- Quick way to get tokens into codebase

---

### Workflow 2: GitHub Export (First Time)

**Trigger:** User clicks [Github Export] without prior setup

**Flow:**

```
User clicks [Github Export]
         ↓
Modal appears: "GitHub Setup Required"
         ↓
User clicks [Open GitHub Config]
         ↓
GitHub Config opens (Step 1: Token Connection)
         ↓
User pastes token → [Test Connection]
         ↓
Validation succeeds
         ↓
GitHub Config expands (Step 2: Repository Config)
         ↓
User configures:
  - Repository
  - Branch
  - File name
  - Export path
         ↓
User clicks [Save Configuration]
         ↓
Returns to main UI
         ↓
User clicks [Github Export] again
         ↓
Export succeeds → Success message
```

**Note:** Export formats are set separately in Settings (⚙️)

---

### Workflow 3: GitHub Export (Subsequent Times)

**Trigger:** User clicks [Github Export] with existing setup

**Prerequisites:** GitHub already configured in Settings

**Flow:**

```
User clicks [Github Export]
         ↓
Loading state: "Exporting to GitHub..."
         ↓
Plugin commits files to configured repo/branch
         ↓
Success notification appears:
  "✅ Exported 47 tokens to company/design-system"
  [View in GitHub]
```

**Behind the Scenes:**
1. Plugin validates token is still valid
2. Fetches latest commit SHA from branch
3. Generates files in configured formats
4. Creates commit with all files
5. Pushes to GitHub

**User Experience:**
- One-click export after initial setup
- Clear success confirmation
- Link to view changes in GitHub

---

### Workflow 4: Sync Tokens (Refresh)

**Trigger:** User clicks [Sync] button

**Use Case:** Designer adds/modifies tokens in Figma, wants to refresh plugin list

**Flow:**

```
User clicks [Sync]
         ↓
Brief loading state: "Syncing..."
         ↓
Plugin re-scans Figma file
         ↓
Token list updates with:
  - New tokens added
  - Modified tokens updated
  - Deleted tokens removed
         ↓
Notification:
  "✅ Synced: 3 new, 2 updated, 1 removed"
```

**User Experience:**
- Quick refresh without reopening plugin
- Clear summary of changes
- Maintains user's selection state where possible

---

### Workflow 5: Toggle Between Views

**Trigger:** User clicks [Toggle] or [Toggle List]

**List → Code View:**

```
User clicks [Toggle]
         ↓
UI transitions to code view
         ↓
Shows formatted code for checked tokens
         ↓
User can:
  - Change format via dropdown
  - Copy code
  - Download
  - Toggle back to list
```

**Code → List View:**

```
User clicks [Toggle List]
         ↓
UI transitions back to list view
         ↓
Shows token list with checkboxes
         ↓
User's previous selections preserved
```

**User Experience:**
- Smooth transitions
- Preserves user state
- Clear toggle button labels

---

## Edge Cases & Error Handling

### Edge Case 1: No Tokens Found

**Trigger:** Figma file has no design variables/tokens

```
┌─────────────────────────────────────┐
│                                     │
│      [Empty State Icon]             │
│                                     │
│   No design tokens found            │
│                                     │
│   This Figma file doesn't contain  │
│   any design variables. Create      │
│   tokens to get started.            │
│                                     │
│   [Refresh] [Learn More]            │
│                                     │
└─────────────────────────────────────┘
```

---

### Edge Case 2: GitHub Export Fails

**Trigger:** Network error, permission issue, or GitHub API failure

```
┌─────────────────────────────────────┐
│  Export Failed                      │
│                                     │
│  Unable to export to GitHub         │
│  Check your connection and try again│
│                                     │
│  [Retry] [Download Locally]         │
└─────────────────────────────────────┘
```

**User Actions:**
- [Retry] - Attempt export again
- [Download Locally] - Fallback to local download

---

### Edge Case 3: Token Validation Error

**Trigger:** Invalid token values detected during export

```
┌─────────────────────────────────────┐
│  ⚠️ Token Issues Detected           │
│                                     │
│  3 tokens have invalid values:      │
│  • "primary-color!" - invalid char  │
│  • "spacing-lg" - missing value     │
│  • "shadow-1" - unsupported format  │
│                                     │
│  [Fix Manually] [Skip & Continue]   │
└─────────────────────────────────────┘
```

---

## Navigation Map

```
Main UI (List View)
    ├─→ [Toggle] → Code View
    │                ├─→ [Toggle List] → Back to List View
    │                ├─→ [Copy Code] → Clipboard
    │                └─→ [Download] → Local files
    │
    ├─→ [⚙️] → Settings Panel
    │            └─→ Configure Export Formats
    │
    ├─→ [Sync] → Re-scan tokens → Refresh list
    │
    ├─→ [Download All] → Local export → Files downloaded
    │
    └─→ [Github Export]
              ├─→ If not setup → Modal → GitHub Config
              │                           ├─→ Step 1: Token Connection
              │                           └─→ Step 2: Repository Settings
              └─→ If setup → Export → Success
```

---

## Key Interactions Summary

| Action                | Trigger                      | Result                          |
|-----------------------|------------------------------|---------------------------------|
| **First Launch**      | Open plugin                  | Auto-scan → Main UI             |
| **Toggle View**       | Click [Toggle]               | Switch List ↔ Code view         |
| **Open Settings**     | Click ⚙️                     | Settings panel (Export Formats) |
| **Configure GitHub**  | [Github Export] (first time) | GitHub Config panel             |
| **Connect GitHub**    | Paste token + Test           | Expand to repo config           |
| **Download Local**    | Click [Download All]         | Files download                  |
| **Export to GitHub**  | Click [Github Export]        | Commit to repo                  |
| **Refresh Tokens**    | Click [Sync]                 | Re-scan Figma file              |
| **Copy Code**         | Click [Copy Code]            | Copy to clipboard               |
| **Search Tokens**     | Type in search               | Filter token list               |
| **Filter Category**   | Select from dropdown         | Show only category              |

---

## Design Principles Applied

1. **Immediate Value** - Auto-scan on first launch, no setup required to see tokens
2. **Progressive Disclosure** - Show advanced options only when needed
3. **Clear Paths** - Separate buttons for GitHub vs local export
4. **Flexible Workflows** - Support both quick copy-paste and formal GitHub sync
5. **Error Recovery** - Fallback options when things fail
6. **State Preservation** - Remember selections when switching views
7. **Contextual Help** - Show instructions inline when needed

---

**End of User Flow Document**

This document will be updated as the design evolves.
