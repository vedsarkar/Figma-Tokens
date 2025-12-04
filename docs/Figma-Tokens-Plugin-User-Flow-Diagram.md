# Figma Design Tokens Plugin - User Flow Diagram

**Document Version:** 1.0
**Last Updated:** 2025-12-04
**Purpose:** Team Presentation - Complete User Journey
**Status:** Ready for Review

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Main User Flow Diagram](#main-user-flow-diagram)
3. [Key UI Wireframes](#key-ui-wireframes)
4. [Decision Points & User Choices](#decision-points--user-choices)
5. [Success & Error Paths](#success--error-paths)
6. [Detailed Screen Annotations](#detailed-screen-annotations)
7. [Workflow Scenarios](#workflow-scenarios)

---

## Executive Summary

### What is the Figma Design Tokens Plugin?

The Figma Design Tokens Plugin enables developers to seamlessly export Figma Variables (colors, typography, spacing, effects) directly into GitHub repositories in platform-ready formats. It eliminates manual token conversion and ensures consistency between design and code.

### Core Value Proposition

- **Reduce developer effort** by automating token export in 5+ formats
- **Ensure design-code consistency** through GitHub integration
- **Support all platforms** (Web: CSS/JS, Mobile: iOS Swift/Android XML)
- **Enable scalable workflows** with version control and team collaboration
- **Accelerate delivery** by making token updates immediately available

### Target Users

- **Primary:** Front-end developers working with design systems
- **Secondary:** Designers managing design tokens
- **Tertiary:** Team leads overseeing design-to-dev workflows

### Key Features

- Auto-scan design tokens from Figma Variables
- Export to 5+ platform-specific formats
- GitHub integration with OAuth authentication
- Granular token selection (individual or bulk)
- Real-time conflict detection
- Local download fallback option

---

## Main User Flow Diagram

### Complete User Journey: First-Time User to Export

```
┌────────────────────────────────────────────────────────────────────┐
│                     FIGMA DESIGN TOKENS PLUGIN                     │
│                         COMPLETE USER FLOW                         │
└────────────────────────────────────────────────────────────────────┘

                    [User installs plugin]
                             │
                             ↓
                ┌────────────────────────────┐
                │  First Launch: Auto-Scan   │
                │  (2-5 seconds)             │
                │  "Finding your design      │
                │   tokens ● ● ●"            │
                └────────────┬───────────────┘
                             │
                             ↓
                ┌────────────────────────────┐
                │   Main UI Loads            │
                │   - List View (default)    │
                │   - All tokens displayed   │
                │   - Categories collapsed   │
                └────────────┬───────────────┘
                             │
                             ↓
            ┌────────────────┴────────────────┐
            │                                  │
            ↓                                  ↓
    ┌───────────────┐                 ┌───────────────┐
    │  View Tokens  │                 │  Configure    │
    │  & Select     │                 │  Settings     │
    └───────┬───────┘                 └───────┬───────┘
            │                                  │
            ↓                                  ↓
    ┌───────────────┐                 ┌───────────────┐
    │ Toggle Views: │                 │ - Export      │
    │ • List View   │                 │   Formats     │
    │ • Code View   │                 │ - GitHub      │
    │               │                 │   Config      │
    │ Filter/Search │                 │               │
    └───────┬───────┘                 └───────────────┘
            │
            ↓
    ┌───────────────────────────────────────┐
    │     User Makes Export Decision:       │
    │                                       │
    │  ┌─────────────┐   ┌──────────────┐  │
    │  │ Download    │   │  Export to   │  │
    │  │ Locally     │   │  GitHub      │  │
    │  └──────┬──────┘   └──────┬───────┘  │
    └─────────┼─────────────────┼──────────┘
              │                 │
              ↓                 ↓
    ┌──────────────────┐  ┌──────────────────────┐
    │ Download Flow    │  │  GitHub Flow         │
    │                  │  │                      │
    │ 1. Select tokens │  │ 1. Check connection  │
    │ 2. Click Download│  │    ├─ Not setup      │
    │ 3. Files saved   │  │    │  └─ Show setup   │
    │    locally       │  │    │      modal       │
    │ 4. Success toast │  │    │                  │
    │                  │  │    └─ Already setup  │
    │                  │  │       └─ Continue    │
    │                  │  │                      │
    │                  │  │ 2. Conflict check    │
    │                  │  │    ├─ Conflicts:     │
    │                  │  │    │  Show resolution │
    │                  │  │    └─ No conflicts:  │
    │                  │  │       Continue       │
    │                  │  │                      │
    │                  │  │ 3. Export files      │
    │                  │  │ 4. Commit to repo    │
    │                  │  │ 5. Success message   │
    └──────────────────┘  └──────────────────────┘
              │                     │
              │                     │
              └─────────┬───────────┘
                        ↓
                ┌──────────────────┐
                │  SUCCESS STATE   │
                │                  │
                │  • Toast shows   │
                │  • User can      │
                │    continue      │
                │    working       │
                └──────────────────┘
```

### Secondary Flow: Returning User (Daily Workflow)

```
     [User opens plugin]
              │
              ↓
      ┌───────────────┐
      │  Plugin loads │
      │  with cached  │
      │  settings     │
      └───────┬───────┘
              │
              ↓
      ┌───────────────────────┐
      │ Quick Actions:        │
      │                       │
      │ • Sync all (1 click)  │
      │ • Select & export     │
      │ • Refresh tokens      │
      │ • Change view         │
      └───────────────────────┘
```

---

## Key UI Wireframes

### 1. Initial Scan (First Launch Only)

**Screen Purpose:** Automatic token detection on first use

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

**Annotations:**
- Appears only on first plugin launch
- Duration: 2-5 seconds (file size dependent)
- No user interaction required
- Automatically transitions to Main UI

---

### 2. Main UI - List View (Default State)

**Screen Purpose:** Primary interface for token browsing and selection

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

**Key Components:**

1. **Header Bar**
   - Title: "Design Tokens"
   - [< > Code] button: Switch to code view
   - 🔄 icon: Re-scan Figma file
   - ⚙️ icon: Open settings

2. **Filter Section**
   - Category dropdown: All, Colors, Typography, Spacing, etc.
   - Search bar: Live token search

3. **Token List**
   - Collapsible categories with counts
   - Checkboxes for granular selection
   - Visual previews (color chips)
   - Inline value display

4. **Action Buttons**
   - Download: Save locally
   - Export to GitHub: Push to repo

**User Interactions:**
- Check/uncheck tokens or entire categories
- Filter by type or search by name
- Toggle to code view
- Re-scan to refresh
- Open settings
- Export selected tokens

---

### 3. Main UI - Code View

**Screen Purpose:** View and copy formatted code for selected tokens

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

**Key Components:**

1. **Header Bar**
   - [📄 List] button: Return to list view
   - 🔄 icon: Re-scan tokens
   - ⚙️ icon: Settings

2. **Format Bar**
   - Dropdown: CSS, JSON, JS/TS, iOS Swift, Android XML
   - 📋 Copy button: Copy to clipboard

3. **Code Display**
   - Syntax-highlighted code
   - Read-only, scrollable
   - Platform-specific formatting

4. **Action Button**
   - Download: Save as file with correct extension

**User Interactions:**
- Select format from dropdown (code updates live)
- Copy code to clipboard
- Download as file
- Return to list view

---

### 4. Settings Panel

**Screen Purpose:** Configure export formats and GitHub connection

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

**Key Features:**
- Multi-select format options
- Grouped by platform (Web/Mobile)
- Validation: At least one format required
- Settings apply to both download and GitHub export

**User Interactions:**
- Check/uncheck export formats
- Save settings to apply
- Cancel to discard changes

---

### 5. GitHub Config Panel - Step 1: Token Connection

**Screen Purpose:** Authenticate with GitHub

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

**Security Features:**
- Token input masked by default
- Toggle visibility with eye icon
- Secure storage via Figma plugin API

**User Flow:**
1. Click "Generate GitHub Token" link
2. Create Personal Access Token with 'repo' scope
3. Copy token
4. Paste into field
5. Click "Test Connection"

---

### 6. GitHub Config Panel - Step 2: Repository Settings

**Screen Purpose:** Configure export destination

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

**Configuration Fields:**

1. **Repository:** Dropdown of accessible repos
2. **Branch:** Auto-populated from selected repo
3. **File Name:** Base name for exports (e.g., "tokens")
4. **Export Path:** Folder location in repo (default: /design-tokens/)

**File Naming Convention:**
- Input: `tokens`
- Output: `tokens.css`, `tokens.json`, `tokens.js`, etc.

---

### 7. Empty State: No Tokens Found

**Screen Purpose:** Handle edge case when no tokens exist

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
- All export buttons disabled
- Sync button (🔄) still active
- Settings (⚙️) still accessible

---

### 8. Success Notification (Toast)

**Screen Purpose:** Confirm successful actions

```
┌─────────────────────────────────────┐
│  ✓ Code copied to clipboard    [×] │
└─────────────────────────────────────┘
   ↑ Top-right corner, auto-dismisses after 3s

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
- Appears in top-right corner
- Auto-dismisses after 3 seconds
- User can manually close with [×]
- Multiple toasts stack vertically

---

### 9. Error State: Connection Failure

**Screen Purpose:** Handle network/API errors

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

**Used For:**
- Network timeout
- GitHub API unavailable
- Firewall blocks
- Connection drops mid-operation

---

### 10. Conflict Resolution UI

**Screen Purpose:** Handle token value conflicts

```
┌─────────────────────────────────────┐
│  ⚠️ Changes detected in GitHub repo │
│  [View Changes]                     │
├─────────────────────────────────────┤
│  Colors (24)                        │
│    ⚠️ primary-blue     #0066CC    │
│    ❌ old-red          #CC0000    │
│    ✨ new-purple       #9933FF    │
│    ☑ accent-green     #00CC66    │
└─────────────────────────────────────┘
```

**Color-Coding System:**
- **Yellow + ⚠️:** Token modified in GitHub
- **Red + ❌:** Token removed in GitHub
- **Purple + ✨:** New token added in GitHub
- **No highlight:** No conflict

**Resolution Actions:**
- View detailed diff
- Overwrite GitHub (push Figma version)
- Pull from GitHub (update Figma)
- Review manually in GitHub

---

## Decision Points & User Choices

### Decision Tree: Export Workflow

```
                [User wants to export tokens]
                           │
                           ↓
            ┌──────────────┴──────────────┐
            │                             │
            ↓                             ↓
    [Download Locally]           [Export to GitHub]
            │                             │
            ↓                             ↓
    ┌──────────────┐             ┌──────────────┐
    │ Prerequisites│             │ Prerequisites│
    │ • None       │             │ • GitHub     │
    │ • Works      │             │   connected  │
    │   instantly  │             │ • Repo       │
    └──────┬───────┘             │   configured │
           │                     └──────┬───────┘
           ↓                            │
    ┌──────────────┐                   ↓
    │ Select tokens│            ┌──────────────┐
    │ Click button │            │ GitHub setup?│
    │ Files saved  │            └──────┬───────┘
    └──────────────┘                   │
                              ┌────────┴────────┐
                              │                 │
                              ↓                 ↓
                        [First time]      [Already setup]
                              │                 │
                              ↓                 ↓
                      ┌──────────────┐    ┌──────────────┐
                      │ Show setup   │    │ Check for    │
                      │ modal        │    │ conflicts    │
                      │              │    │              │
                      │ → Token auth │    └──────┬───────┘
                      │ → Repo config│           │
                      └──────┬───────┘    ┌──────┴───────┐
                             │            │              │
                             └─────┬──────┘              │
                                   ↓                     ↓
                           [Export tokens]      [Conflicts found]
                                   │                     │
                                   ↓                     ↓
                           [Commit to repo]    [Show resolution UI]
                                   │                     │
                                   ↓                     ↓
                           [Success message]   [User resolves]
                                                         │
                                                         ↓
                                                 [Retry export]
```

### Decision Point: View Mode

```
        [User viewing tokens in plugin]
                    │
                    ↓
        ┌───────────┴───────────┐
        │                       │
        ↓                       ↓
   [List View]            [Code View]
        │                       │
        ↓                       ↓
  • Browse tokens         • View formatted code
  • Select items          • Copy to clipboard
  • Filter/search         • Change format
  • See values            • Download file
        │                       │
        └───────────┬───────────┘
                    │
    [Toggle button switches between modes]
```

### Decision Point: Export Format Selection

```
          [User configures export in Settings]
                        │
                        ↓
            ┌───────────┴───────────┐
            │                       │
            ↓                       ↓
    [Web Development]       [Mobile Development]
            │                       │
            ↓                       ↓
    • CSS Variables          • iOS (Swift)
    • JSON                   • Android (XML)
    • JavaScript/TypeScript
            │                       │
            └───────────┬───────────┘
                        │
            [At least one required]
                        │
                        ↓
           [Save Settings → Applies to all exports]
```

---

## Success & Error Paths

### Happy Path: First-Time User to Successful Export

```
START
  │
  ├─ [1] Install plugin ✓
  │
  ├─ [2] Open plugin → Auto-scan runs ✓
  │
  ├─ [3] Main UI loads with all tokens ✓
  │
  ├─ [4] User reviews tokens (list view) ✓
  │
  ├─ [5] User clicks [Export to GitHub] ✓
  │
  ├─ [6] Setup modal appears ✓
  │
  ├─ [7] User generates GitHub token ✓
  │
  ├─ [8] User pastes token → Test Connection ✓
  │
  ├─ [9] Connection succeeds → Repo config appears ✓
  │
  ├─ [10] User selects repo, branch, path ✓
  │
  ├─ [11] User clicks [Save Configuration] ✓
  │
  ├─ [12] Returns to main UI ✓
  │
  ├─ [13] User clicks [Export to GitHub] again ✓
  │
  ├─ [14] Plugin exports files to repo ✓
  │
  ├─ [15] Success notification appears ✓
  │
END - Total time: ~3-5 minutes
```

### Happy Path: Returning User (Daily Workflow)

```
START
  │
  ├─ [1] Open plugin ✓
  │
  ├─ [2] Plugin loads instantly with cached settings ✓
  │
  ├─ [3] User clicks [Export to GitHub] ✓
  │
  ├─ [4] Conflict check runs → No conflicts ✓
  │
  ├─ [5] Export completes in 2-3 seconds ✓
  │
  ├─ [6] Success toast appears ✓
  │
END - Total time: ~10 seconds
```

### Error Path: Network Failure During Export

```
START
  │
  ├─ [1] User clicks [Export to GitHub]
  │
  ├─ [2] Network connection lost ❌
  │
  ├─ [3] Auto-retry attempt 1 (wait 2s) ⚠️
  │      └─ Failed ❌
  │
  ├─ [4] Auto-retry attempt 2 (wait 4s) ⚠️
  │      └─ Failed ❌
  │
  ├─ [5] Auto-retry attempt 3 (wait 8s) ⚠️
  │      └─ Failed ❌
  │
  ├─ [6] Error screen appears:
  │      "Unable to connect to GitHub"
  │      "Check your internet connection"
  │
  ├─ [7] User has options:
  │      ┌─ [Retry] → Go back to step 1
  │      ├─ [Download Local] → Fallback to local export ✓
  │      └─ [Cancel] → Close modal
  │
END - User can still complete task via fallback
```

### Error Path: Invalid GitHub Token

```
START
  │
  ├─ [1] User pastes GitHub token
  │
  ├─ [2] User clicks [Test Connection]
  │
  ├─ [3] Validation fails ❌
  │      → Invalid format OR missing 'repo' scope
  │
  ├─ [4] Error message appears:
  │      "Invalid token or no 'repo' access"
  │
  ├─ [5] User actions:
  │      ┌─ Fix token → Retry test ✓
  │      ├─ Generate new token with correct scope ✓
  │      └─ Contact support
  │
END - User corrects issue and continues
```

### Error Path: Token Conflicts Detected

```
START
  │
  ├─ [1] User clicks [Export to GitHub]
  │
  ├─ [2] Conflict check runs
  │
  ├─ [3] Conflicts detected ⚠️
  │      → 3 tokens modified in GitHub
  │      → 1 token removed in GitHub
  │      → 2 new tokens in GitHub
  │
  ├─ [4] Conflict resolution UI appears:
  │      • Yellow highlights: Modified
  │      • Red highlights: Removed
  │      • Purple highlights: New
  │
  ├─ [5] User chooses resolution:
  │      ┌─ [Overwrite GitHub] → Push Figma version ✓
  │      ├─ [Pull from GitHub] → Update Figma (advanced)
  │      └─ [Review in GitHub] → Opens browser
  │
  ├─ [6] User selects [Overwrite GitHub]
  │
  ├─ [7] Export proceeds with user choice ✓
  │
  ├─ [8] Success notification appears ✓
  │
END - Conflict resolved, export complete
```

---

## Detailed Screen Annotations

### Screen 1: Auto-Scan (First Launch)

**Purpose:** Discover all design tokens automatically

**What happens:**
- Plugin scans Figma file for Variables and Styles
- Extracts: colors, typography, spacing, effects, etc.
- Organizes tokens by category
- Caches results for future opens

**Duration:** 2-5 seconds (file size dependent)

**User Experience:**
- No action required
- Friendly loading animation
- Seamless transition to main UI

**Technical Details:**
- Uses `figma.variables.getLocalVariables()` API
- Parses token name, value, type, scope
- Stores in memory for session

---

### Screen 2: Main UI - List View

**Purpose:** Primary workspace for token management

**Layout Zones:**
1. **Header** - Navigation and actions
2. **Filters** - Category dropdown, search
3. **Token List** - Scrollable, collapsible categories
4. **Actions** - Download, GitHub export

**Key Interactions:**

- **Checkbox Selection:**
  - Category checkbox: Select/deselect all in category
  - Token checkbox: Select individual token
  - Selection state preserved across view toggles

- **Category Collapse/Expand:**
  - Click category header to expand
  - Shows all tokens with values
  - Collapse to save space

- **Search:**
  - Live filtering as user types
  - Searches token names
  - Empty state if no matches

- **Filter Dropdown:**
  - Show only specific category
  - Useful for large token sets (100+)

**Design Principles:**
- Scannable: Visual hierarchy with color chips
- Efficient: Bulk selection via category checkboxes
- Responsive: Works with 10 or 1000 tokens

---

### Screen 3: Main UI - Code View

**Purpose:** Preview and copy formatted code

**Format Options:**
1. **CSS Variables** - For web projects
2. **JSON** - Universal data format
3. **JavaScript/TypeScript** - For JS frameworks
4. **iOS Swift** - Native iOS development
5. **Android XML** - Native Android development

**Syntax Highlighting:**
- CSS: Keywords gray, properties dark, values blue
- JSON: Keys orange, strings green, values blue
- Swift: Keywords purple, types blue, strings red
- Kotlin: Keywords purple, types teal, strings green
- XML: Tags blue, attributes green, values red

**User Actions:**
- Change format → Code updates instantly
- Click 📋 → Copy entire code block
- Click Download → Save as file with correct extension

**Technical Details:**
- Code generated in real-time from selected tokens
- Follows platform naming conventions
- Includes comments and metadata

---

### Screen 4: Settings Panel

**Purpose:** Configure plugin behavior

**Export Formats Section:**
- Multi-select checkboxes
- Grouped by platform (Web/Mobile)
- At least one format required
- Settings persist across sessions

**Future Settings (Post-MVP):**
- Naming conventions
- File naming patterns
- Auto-sync preferences
- Notification settings

**User Experience:**
- Clear explanations for each option
- Validation prevents empty selection
- Cancel button discards unsaved changes

---

### Screen 5 & 6: GitHub Config

**Two-Step Setup Process:**

**Step 1: Authentication**
- User generates GitHub Personal Access Token
- Required scope: `repo` (repository read/write)
- Token masked for security
- Test connection validates token

**Step 2: Repository Configuration**
- Repository: Dropdown of accessible repos
- Branch: Auto-populated from selected repo
- File Name: Base name for exports
- Export Path: Folder location in repo

**Security Considerations:**
- Token stored securely via Figma plugin storage
- Never logged or transmitted insecurely
- User can disconnect anytime

**User Experience:**
- Progressive disclosure: Only show step 2 after step 1 succeeds
- Clear instructions and helper text
- Link to GitHub token generation page

---

### Screen 7-10: Empty & Error States

**Design Principles for Error Handling:**

1. **Clear Headlines** - Tell user what went wrong
2. **Plain Language** - No technical jargon
3. **Actionable Buttons** - Give user clear next steps
4. **Fallback Options** - Always provide alternative path

**Empty State Philosophy:**
- Not an error, just no data yet
- Provide helpful guidance
- Keep core functions accessible

**Error State Philosophy:**
- Friendly, never blame the user
- Offer retry and fallback
- Auto-retry when appropriate
- Escalate gracefully (retry → fallback → support)

---

## Workflow Scenarios

### Scenario 1: Web Developer Using CSS Variables

**User:** Frontend developer at a startup

**Goal:** Export color tokens to CSS for website

**Workflow:**
1. Install plugin from Figma Community
2. Open plugin in design file
3. Auto-scan discovers 24 color tokens
4. Switch to Code View
5. Select "CSS Variables" from dropdown
6. Click 📋 Copy button
7. Paste into `styles.css` file in code editor
8. Success!

**Time:** ~1 minute
**Outcome:** CSS variables ready to use immediately

---

### Scenario 2: Mobile Team Lead Setting Up GitHub Sync

**User:** Team lead managing design system for iOS and Android

**Goal:** Automate token sync to GitHub repo for both platforms

**Workflow:**
1. Open plugin in design system file
2. Click ⚙️ Settings
3. Select formats: CSS, JSON, iOS Swift, Android XML
4. Save settings
5. Click [Export to GitHub]
6. Setup modal appears
7. Generate GitHub token with 'repo' scope
8. Paste token and test connection
9. Select company repo: `company/design-system`
10. Select branch: `main`
11. Set path: `/tokens/`
12. Save configuration
13. Click [Export to GitHub] again
14. Success! All 4 formats committed to repo

**Time:** ~5 minutes (first time)
**Outcome:** Automated workflow established. Future syncs take ~10 seconds.

---

### Scenario 3: Designer Updating Tokens

**User:** Product designer making color palette changes

**Goal:** Update tokens in GitHub after design iteration

**Workflow:**
1. Update 5 color values in Figma Variables
2. Open plugin (already configured)
3. Click 🔄 Sync button to refresh token list
4. Plugin shows "5 tokens updated"
5. Click [Export to GitHub]
6. Conflict check runs → No conflicts
7. Export completes in 3 seconds
8. Success toast: "Exported 24 tokens to company/design-system"
9. Developer on team gets updated tokens automatically

**Time:** ~15 seconds
**Outcome:** Design changes propagated to code instantly

---

### Scenario 4: Handling Conflicts

**User:** Developer who manually edited tokens in GitHub

**Goal:** Sync new tokens from Figma without losing GitHub changes

**Workflow:**
1. Open plugin in Figma
2. Click [Export to GitHub]
3. Conflict warning appears: "Changes detected in GitHub repo"
4. Click [View Changes]
5. Conflict UI shows:
   - ⚠️ 3 tokens modified in GitHub (yellow)
   - ❌ 1 token removed in GitHub (red)
   - ✨ 2 new tokens in GitHub (purple)
6. User reviews each conflict
7. Decides: "Overwrite GitHub" (Figma is source of truth)
8. Export proceeds, GitHub changes replaced
9. Success!

**Time:** ~2 minutes
**Outcome:** Conflict resolved, both sides aligned

---

### Scenario 5: Network Failure Fallback

**User:** Designer working on airplane with no internet

**Goal:** Get tokens to code for offline work

**Workflow:**
1. Open plugin in Figma
2. Click [Export to GitHub]
3. Network error: "Unable to connect to GitHub"
4. Plugin auto-retries 3 times
5. All retries fail
6. Error screen appears with fallback options
7. Click [Download Local]
8. ZIP file with all formats downloads
9. User can email files or add to code manually

**Time:** ~30 seconds
**Outcome:** User not blocked, can continue working offline

---

## Appendix: Export Format Examples

### CSS Variables Example

```css
:root {
  /* Colors */
  --color-primary-blue: #0066CC;
  --color-secondary-red: #FF4444;

  /* Typography */
  --font-size-heading-large: 32px;
  --font-weight-heading-large: 700;

  /* Spacing */
  --space-md: 16px;
  --space-lg: 24px;
}
```

### JSON Example

```json
{
  "colors": {
    "primary": {
      "blue": "#0066CC",
      "red": "#FF4444"
    }
  },
  "typography": {
    "fontSize": {
      "heading": {
        "large": "32px"
      }
    }
  }
}
```

### iOS Swift Example

```swift
extension UIColor {
    struct Primary {
        static let blue = UIColor(hex: "#0066CC")
        static let red = UIColor(hex: "#FF4444")
    }
}
```

### Android XML Example

```xml
<resources>
    <color name="color_primary_blue">#0066CC</color>
    <color name="color_secondary_red">#FF4444</color>
</resources>
```

---

## Summary: Key Design Decisions

1. **No Welcome Screens** - Jump straight to value with auto-scan
2. **Progressive Disclosure** - Show config only when needed
3. **Dual Export Options** - GitHub sync OR local download
4. **Toggle Views** - List for browsing, Code for copying
5. **PAT-Based Auth** - Personal Access Token (simpler than OAuth)
6. **Granular Selection** - Individual token or category selection
7. **Conflict Resolution** - Visual color-coding for clarity
8. **Fallback Always Available** - Network errors? Download locally
9. **Toast Notifications** - Non-blocking success messages
10. **Platform-Agnostic** - Support web and mobile equally

---

**End of Document**

This user flow diagram is ready for team presentation and provides a complete visual guide to the Figma Design Tokens Plugin user experience.
