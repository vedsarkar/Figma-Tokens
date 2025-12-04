# Figma Design Tokens Plugin - Edge Cases Documentation

**Document Version:** 1.0
**Last Updated:** 2025-12-04
**Status:** Focused Ideation - Edge Case Analysis

---

## Table of Contents

1. [Overview](#overview)
2. [Edge Case Patterns](#edge-case-patterns)
3. [Complete Edge Case Inventory](#complete-edge-case-inventory)
4. [Error Screen Designs](#error-screen-designs)
5. [Implementation Priority](#implementation-priority)

---

## Overview

This document catalogs all identified edge cases for the Figma Design Tokens Plugin and groups them into reusable error handling patterns to avoid over-engineering individual solutions.

### Design Philosophy

- **Group similar problems** - Use pattern-based error screens
- **Friendly messaging** - No technical jargon
- **Clear recovery paths** - Always offer next steps
- **Don't over-engineer** - Pragmatic v1 vs v2 prioritization

---

## Edge Case Patterns

We've identified **7 reusable error patterns** that handle all edge cases:

| Pattern                       | Use Case                          | Priority         | Screen Type                      |
|-------------------------------|-----------------------------------|------------------|----------------------------------|
| **A: Empty State**            | Nothing available to show/do      | v1 Must-Have     | Info screen with guidance        |
| **B: Connection Failure**     | Network/API unreachable           | v1 Must-Have     | Error with retry option          |
| **C: Permission Denied**      | User lacks access rights          | v1 Must-Have     | Error with alternative action    |
| **D: Invalid/Expired**        | Configuration broken/outdated     | v1 Must-Have     | Error with reconfiguration       |
| **E: Overload/Performance**   | Too much data or slow response    | v1 Must-Have     | Progress indicator               |
| **F: User Error Prevention**  | Stop user from making mistakes    | v2 Nice-to-Have  | Confirmation dialogs             |
| **G: Data Validation**        | Token data quality issues         | v2 Nice-to-Have  | Warning with auto-fix            |

---

## Complete Edge Case Inventory

### Stage 1: Initial Scan (Main UI)

| #   | Edge Case                      | Pattern | Description                             |
|-----|--------------------------------|---------|-----------------------------------------|
| 1   | No tokens found                | A       | Figma file has no variables/tokens      |
| 2   | 1000+ tokens                   | E       | Very large file, slow scan              |
| 3   | Network timeout                | B       | Connection lost during scan             |
| 4   | Plugin crashes                 | -       | Handled by Figma's error boundary       |
| 5   | Invalid token values           | G       | Malformed colors, missing units         |
| 6   | Special characters in names    | G       | Emojis, symbols in token names          |
| 7   | Duplicate token names          | G       | Same name across different pages        |

---

### Stage 2: GitHub Config - Token Connection

| #   | Edge Case                          | Pattern | Description                              |
|-----|------------------------------------|---------|------------------------------------------|
| 8   | Invalid token format               | D       | User pastes wrong format                 |
| 9   | Token missing 'repo' scope         | C       | Valid token but insufficient permissions |
| 10  | Token expires                      | D       | Token becomes invalid during session     |
| 11  | Network down                       | B       | Can't reach GitHub API                   |
| 12  | GitHub API unavailable             | B       | GitHub returns 503/504                   |
| 13  | Rate limit exceeded                | E       | Too many API requests                    |
| 14  | User closes without saving         | F       | Unsaved configuration changes            |
| 15  | Corporate firewall blocks GitHub   | B       | github.com blocked by network            |

---

### Stage 3: GitHub Config - Repository Selection

| #   | Edge Case                      | Pattern | Description                          |
|-----|--------------------------------|---------|--------------------------------------|
| 16  | User has 0 repositories        | A       | New GitHub account with no repos     |
| 17  | User has 500+ repositories     | E       | Needs search/pagination              |
| 18  | Repository deleted             | D       | Selected repo no longer exists       |
| 19  | User loses repo access         | C       | Permissions revoked                  |
| 20  | Repository archived            | C       | Repo is read-only                    |
| 21  | Repository has no branches     | A       | Edge case, very unlikely             |
| 22  | Branch deleted                 | D       | Selected branch no longer exists     |
| 23  | Protected branch               | C       | Branch requires review/checks        |
| 24  | Export path doesn't exist      | -       | Create path automatically            |

---

### Stage 4: Export Actions

| #   | Edge Case                      | Pattern | Description                                          |
|-----|--------------------------------|---------|------------------------------------------------------|
| 25  | Network drops mid-export       | B       | Connection lost during upload                        |
| 26  | File exceeds size limit        | -       | Unlikely (tokens are small), log error               |
| 27  | Rapid double-click export      | F       | User clicks multiple times                           |
| 28  | Merge conflict                 | -       | Handled by conflict resolution UI (separate feature) |
| 29  | No tokens selected             | A       | User tries to export with nothing checked            |
| 30  | All formats unchecked          | A       | No export formats selected in Settings               |
| 31  | Token expires mid-export       | D       | GitHub token becomes invalid                         |
| 32  | Disconnect during export       | F       | User disconnects GitHub while uploading              |

---

## Error Screen Designs

**Note:** All wireframes have been moved to the User Flow document for centralized reference. See:
- Empty & Error States section in `Figma-Tokens-Plugin-User-Flow.md`

### Pattern A: Empty State

**Covers Edge Cases:** #1, #16, #21, #29, #30

**Visual Design:**
```
┌─────────────────────────────────────┐
│  Design Tokens  [< > Code] 🔄  ⚙️  │
├─────────────────────────────────────┤
│                                     │
│             🎨                      │
│                                     │
│      No design tokens found         │
│                                     │
│   This file doesn't have any        │
│   Figma Variables or Styles yet.    │
│                                     │
└─────────────────────────────────────┘
```

**Behavior:**
- Display centered empty state with icon
- Disable export/download buttons (grayed out)
- Keep utility functions active (Sync, Settings)
- No error styling (not an error, just empty)

**Specific Messages by Context:**

#### A1: No Tokens Found (EC #1)
- Icon: 🎨
- Headline: "No design tokens found"
- Message: "This file doesn't have any Figma Variables or Styles yet."

#### A2: No Repositories (EC #16)
- Icon: 📦
- Headline: "You don't have any repositories"
- Message: "Create a repository on GitHub to export your design tokens."
- Action: [Go to GitHub]

#### A3: No Tokens Selected (EC #29)
- Modal dialog, not full-screen
- Message: "Select at least one token to export"

#### A4: No Formats Selected (EC #30)
- Modal dialog in Settings
- Message: "At least one format required"

---

### Pattern B: Connection Failure

**Covers Edge Cases:** #3, #11, #12, #15, #25

**Visual Design:**
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

**Behavior:**
- Display warning icon (⚠️) in yellow/orange
- Provide clear error message
- Always offer [Retry] button
- Include [Cancel] to exit flow

**Specific Messages by Context:**
- Network timeout: "Connection timed out"
- GitHub unavailable: "GitHub is temporarily unavailable"
- Firewall: "Unable to reach GitHub. Check your network settings."
- Mid-export failure: "Export interrupted. Connection lost."

---

### Pattern C: Permission Denied

**Covers Edge Cases:** #9, #19, #20, #23

**Visual Design:**
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

**Behavior:**
- Display lock icon (🔒) to indicate permission issue
- Explain what permission is missing
- Provide clear path to resolution
- Link to help if needed

**Specific Messages:**
- Missing scope: "Your token doesn't have the 'repo' scope..."
- Lost access: "You no longer have access to this repository"
- Archived repo: "This repository is archived (read-only)"
- Protected branch: "This branch requires pull request reviews"

---

### Pattern D: Invalid/Expired

**Covers Edge Cases:** #8, #10, #18, #22, #31

**Visual Design:**
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

**Behavior:**
- Display timer icon (⏱️) for expired/invalid states
- Clear explanation of what went wrong
- Single action to fix (Reconnect, Reconfigure)

**Specific Messages:**
- Token expired: "Your GitHub token is no longer valid"
- Invalid format: "Invalid token format. Please check and try again"
- Repo deleted: "This repository no longer exists"
- Branch deleted: "Selected branch no longer exists"

---

### Pattern E: Overload/Performance

**Covers Edge Cases:** #2, #13, #17

**Visual Design:**
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

**Behavior:**
- Show animated loading indicator
- Display progress message
- No error styling (operation in progress)
- Can show estimated time or count if available

**Specific Messages:**
- Large file: "Scanning 1000+ tokens..."
- Rate limit: "GitHub rate limit reached. Try again in 5 minutes."
- Many repos: "Loading repositories... (500+)"

---

### Pattern F: Confirmation Dialog

**Covers Edge Cases:** #14, #27, #32

**Visual Design:**
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

**Behavior:**
- Modal overlay (dims background)
- Clear question as title
- Explain consequences
- [Cancel] is safe default
- Destructive action on right (red if appropriate)

**Specific Dialogs:**
- Disconnect: "Disconnect from GitHub?"
- Unsaved changes: "Discard unsaved changes?"
- Overwrite files: "Overwrite existing tokens?"

---

### Pattern G: Data Validation Warning

**Covers Edge Cases:** #5, #6, #7

**Visual Design:**
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

**Behavior:**
- Non-blocking warning banner at top
- Can be dismissed with [×]
- [View Issues] shows detailed panel
- Invalid tokens marked in list with ⚠️
- Export continues, skipping invalid tokens

**Validation Types:**
- Invalid values: Missing/malformed color/number
- Special characters: Emojis, symbols in names
- Duplicates: Same token name appears multiple times

---

## Pattern Summary Reference

| Pattern | Icon | Color       | Action Style     | Use When                  |
|---------|------|-------------|------------------|---------------------------|
| **A**   | 🎨📦 | Neutral     | Informational    | Nothing to display        |
| **B**   | ⚠️   | Yellow      | Retry            | Network/connection issues |
| **C**   | 🔒   | Red         | Fix permission   | Access denied             |
| **D**   | ⏱️   | Orange      | Reconfigure      | Invalid/expired data      |
| **E**   | ●●●  | Blue        | Wait/loading     | Slow operations           |
| **F**   | -    | Red/default | Confirm/cancel   | Destructive actions       |
| **G**   | ⚠️   | Yellow      | View/dismiss     | Data quality warnings     |

---

## Implementation Priority

### v1 Must-Have (Launch Blockers)
All error patterns A-E must be implemented for v1 launch:
- ✅ Pattern A: Empty states
- ✅ Pattern B: Connection failures
- ✅ Pattern C: Permission errors
- ✅ Pattern D: Invalid/expired configs
- ✅ Pattern E: Loading/performance

**Rationale:** These cover critical user flows and prevent confusion/frustration.

### v2 Nice-to-Have (Polish)
Patterns F-G can be deferred:
- ⏸️ Pattern F: Confirmation dialogs (can use browser confirm() in v1)
- ⏸️ Pattern G: Validation warnings (can fail silently in v1)

**Rationale:** While helpful, users can work around missing confirmations and validation.

---
