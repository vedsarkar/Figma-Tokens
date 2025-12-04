# Figma Design Tokens Plugin - Product Requirements Document (PRD)

**Document Version:** 1.0
**Last Updated:** 2025-11-18
**Status:** Brainstorming Phase - Ready for Development Planning
**Document Type:** Handoff Document

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision & Goals](#product-vision--goals)
3. [Core Features & Requirements](#core-features--requirements)
4. [User Flows & Diagrams](#user-flows--diagrams)
5. [Technical Architecture](#technical-architecture)
6. [UI/UX Specifications](#uiux-specifications)
7. [Export Format Specifications](#export-format-specifications)
8. [Error Handling Strategy](#error-handling-strategy)
9. [Success Metrics](#success-metrics)
10. [Future Considerations](#future-considerations)

---

## Executive Summary

### Product Overview

A Figma plugin that enables developers to seamlessly export Figma Variables—such as colors, typography, spacing, and effects—directly into GitHub repositories in platform-ready formats.

### Core Value Proposition

- **Reduce developer effort** by eliminating manual token conversion and file management
- **Ensure consistency** between design and code through a single source of truth
- **Support all development platforms** (web, mobile, cross-platform)
- **Enable scalable workflows** via GitHub integration and versioning
- **Accelerate delivery** by making token updates immediately available in codebases

### Target Users

- **Primary:** Front-end developers working with design systems
- **Secondary:** Designers managing design tokens
- **Tertiary:** Team leads and product managers overseeing design-to-dev workflows

---

## Product Vision & Goals

### Mission Statement

Build a Figma plugin that enables developers to seamlessly export Figma Variables directly into GitHub repositories in platform-ready formats, making design token consumption effortless and universal across all development stacks.

### Key Objectives

1. **Eliminate Manual Work** - Automate translation of design tokens into standardized code outputs
2. **Universal Platform Support** - Support CSS, JS/TS, iOS, Android, and other frameworks
3. **Single Source of Truth** - Ensure design-code consistency through GitHub integration
4. **Scalable Workflows** - Enable versioning, multi-format exports, and team collaboration
5. **Developer-First Experience** - Minimize intervention, maximize automation

---

## Core Features & Requirements

### 1. Design Token Management

#### 1.1 Token Types Supported

The plugin shall export **all tokenizable Figma elements**, including but not limited to:

- **Colors** - Solid colors, gradients, opacity values
- **Typography** - Font families, sizes, weights, line heights, letter spacing
- **Spacing** - Padding, margins, gap values
- **Effects** - Shadows, blurs, layer effects
- **Border Radius** - Corner radius values
- **Grid Systems** - Layout grids and column structures
- **Animation Values** - Timing functions, durations (if applicable)

#### 1.2 Token Discovery

- Plugin automatically scans Figma file for all design variables
- Users can preview all discovered tokens before export
- Tokens organized by category (Colors, Typography, Spacing, etc.)

---

### 2. User Interface Architecture

#### 2.1 UI Structure

**Primary Approach:** Combined list + category dropdown

```
┌─────────────────────────────────────┐
│  Tokens Plugin        [Toggle]   ⚙️ │
├─────────────────────────────────────┤
│  [Category Dropdown: All ▼]         │
│  [Search tokens...]                 │
├─────────────────────────────────────┤
│  ☑ Colors (24)                      │
│    ☑ primary-blue      #0066CC    │
│    ☑ secondary-red     #FF4444    │
│    ☑ accent-green      #00CC66    │
│                                     │
│  ☑ Typography (12)                  │
│    ☑ heading-large     32px/700     │
│    ☑ body-regular      16px/400     │
│                                     │
│  ☑ Spacing (8)                      │
│    ☑ space-md          16px         │
│    ☑ space-lg          24px         │
├─────────────────────────────────────┤
│[Github Export][Download All][Sync]  │
└─────────────────────────────────────┘
```

**Rationale:**
- Scalable for large token sets (50+ tokens)
- Easy filtering via dropdown
- Quick access to individual tokens
- Optimized for both "sync all" and "sync individual" workflows

#### 2.2 Settings Menu

Located in plugin UI, includes:

- **GitHub Connection** - OAuth authentication, repo selection
- **Folder Path** - Custom folder location in repo (default: `/design-tokens/`)
- **Branch Selection** - Dropdown auto-populated from repo branches
- **Export Formats** - Multi-select checkboxes for output formats
- **Commit Preferences** - Commit message customization options

---

### 3. GitHub Integration

#### 3.1 Authentication

**Recommended Approach:** Hybrid Authentication

1. **Primary: GitHub OAuth** (80% of users)
   - Single-click authentication flow
   - Opens external browser for GitHub OAuth
   - Required scopes: `repo` (write access to repositories)
   - Token auto-refresh mechanism

2. **Secondary: Personal Access Token (PAT)** (20% of users)
   - Settings option: "Use Personal Access Token"
   - For enterprise/corporate users with OAuth restrictions
   - Manual token input with secure storage

**Authentication Flow:**

```
User clicks "Connect to GitHub"
         ↓
OAuth window opens in browser
         ↓
User logs in and authorizes
         ↓
Plugin receives OAuth token
         ↓
Token stored securely in Figma plugin storage
         ↓
User selects repository and branch
         ↓
Ready to sync
```

#### 3.2 Repository Configuration

- **Repository Selection** - Dropdown of user's accessible repos
- **Branch Selection** - Dropdown auto-populated from selected repo
- **Folder Path** - Custom path within repo (e.g., `/src/design-tokens/`)
- **Persistent Settings** - Configuration saved across sessions

#### 3.3 Sync Behavior

- **Commit Strategy** - One commit per sync operation
- **Commit Message** - Auto-generated with customization option
  - Default format: `Update design tokens from Figma`
  - Includes timestamp and token count
- **Multi-file Export** - Each format creates separate file in specified folder

---

### 4. Export Formats

#### 4.1 Supported Formats

The plugin shall export tokens in the following formats (user-selectable):

1. **CSS Variables** (`tokens.css`)
2. **JSON** (`tokens.json`)
3. **JavaScript/TypeScript** (`tokens.js` / `tokens.ts`)
4. **iOS Swift** (`DesignTokens.swift`)
5. **Android XML** (`tokens.xml`)

#### 4.2 Format Selection

- Multi-select checkboxes in Settings menu
- Each selected format generates separate file
- All files committed in single GitHub push
- Format specifications detailed in [Export Format Specifications](#export-format-specifications)

---

### 5. Conflict Handling & Multi-User Support

#### 5.1 Conflict Detection

When syncing, plugin checks for conflicts:

- **Modified tokens** - Value changed in GitHub since last sync
- **Removed tokens** - Deleted in GitHub but exists in Figma
- **New tokens** - Added in GitHub but doesn't exist in Figma

#### 5.2 Conflict Resolution UI

**Visual Indicators:**

```
┌─────────────────────────────────────┐
│  ⚠️ Changes detected in GitHub repo │
│  [View Changes]                     │
├─────────────────────────────────────┤
│  Colors (24)                        │
│    ⚠️ primary-blue     #0066CC    │  ← Yellow highlight + warning icon (modified)
│    ❌ old-red          #CC0000    │  ← Red highlight (removed in GitHub)
│    ✨ new-purple       #9933FF    │  ← Purple highlight (added in GitHub)
│    ☑ accent-green     #00CC66    │  ← No conflict
└─────────────────────────────────────┘
```

**Color-Coding System:**
- **Yellow + ⚠️** - Token modified in GitHub
- **Red highlight** - Token removed in GitHub
- **Purple highlight** - New token added in GitHub
- **No highlight** - No conflict

#### 5.3 Resolution Actions

Users can:
- **View Changes** - See detailed diff of what changed
- **Overwrite GitHub** - Push Figma version (default for designers)
- **Pull from GitHub** - Update Figma with GitHub version
- **Review in GitHub** - Open repo in browser for manual resolution

---

### 6. Onboarding & First-Time User Experience

#### 6.1 Onboarding Flow

1. **Welcome Screen** (Optional 2-3 education screens)
   - Screen 1: "Export design tokens directly to GitHub"
   - Screen 2: "Support for all platforms - web, iOS, Android"
   - Screen 3: "Keep design and code in sync automatically"

2. **Main Onboarding: GitHub Authentication**
   - Primary onboarding experience
   - Step-by-step connection setup
   - Repository and branch selection
   - Folder path configuration
   - Export format selection

3. **First Sync**
   - Preview all tokens to be exported
   - Confirmation before first commit
   - Success message with GitHub repo link

---

### 7. Additional Features

#### 7.1 Local Export Options

**For developers who want to experiment before pushing:**

- **Copy to Clipboard** - Copy tokens in selected format to clipboard
- **Download Local File** - Save tokens as local files (ZIP or individual)
- Available from main UI (not just error fallback)

#### 7.2 Sync Options

**Two primary workflows:**

1. **Sync All Tokens** - Export all tokens in one operation
2. **Sync Individual Tokens** - Select specific tokens to export

**North Star Vision:** Granular control over which tokens to sync/export

---

## User Flows & Diagrams

### Flow 1: First-Time Setup

```
┌──────────────────┐
│ User opens plugin│
└────────┬─────────┘
         ↓
┌────────────────────────┐
│ Welcome screens (2-3)  │
│ - Plugin overview      │
│ - Platform support     │
│ - Sync benefits        │
└────────┬───────────────┘
         ↓
┌────────────────────────────┐
│ "Connect to GitHub" button │
└────────┬───────────────────┘
         ↓
┌──────────────────────┐
│ OAuth authentication │
│ (opens browser)      │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│ Select repository    │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│ Select branch        │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│ Configure folder path│
│ (default: /design-   │
│  tokens/)            │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│ Select export formats│
│ ☑ CSS                │
│ ☑ JSON               │
│ ☑ JavaScript         │
│ ☐ iOS Swift          │
│ ☐ Android XML        │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│ Preview tokens to    │
│ export (47 tokens)   │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│ Click "Sync All"     │
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│ Export in progress...│
└────────┬─────────────┘
         ↓
┌──────────────────────┐
│ Success! View in     │
│ GitHub               │
│ [Open Repo]          │
└──────────────────────┘
```

---

### Flow 2: Daily Workflow (Returning User)

```
┌──────────────────┐
│ User opens plugin│
└────────┬─────────┘
         ↓
┌────────────────────────┐
│ Plugin loads with      │
│ - Connected repo shown │
│ - All tokens listed    │
└────────┬───────────────┘
         ↓
    ┌────┴────┐
    │         │
    ↓         ↓
┌─────────┐ ┌──────────────────┐
│Sync All │ │Select individual │
│         │ │tokens            │
└────┬────┘ └────┬─────────────┘
     │           │
     └─────┬─────┘
           ↓
     ┌──────────────┐
     │ Conflict     │
     │ Check        │
     └──────┬───────┘
            │
       ┌────┴─────┐
       │          │
       ↓          ↓
┌──────────┐ ┌──────────────────┐
│No        │ │Conflicts detected│
│Conflicts │ │Show visual       │
│          │ │indicators        │
└────┬─────┘ └────┬─────────────┘
     │            │
     │            ↓
     │       ┌──────────────────┐
     │       │User reviews      │
     │       │- Yellow: Modified│
     │       │- Red: Removed    │
     │       │- Purple: New     │
     │       └────┬─────────────┘
     │            │
     │            ↓
     │       ┌──────────────────┐
     │       │Choose action:    │
     │       │- Overwrite GitHub│
     │       │- Pull from GitHub│
     │       │- Review manually │
     │       └────┬─────────────┘
     │            │
     └─────┬──────┘
           ↓
     ┌──────────────┐
     │ Export &     │
     │ Commit       │
     └──────┬───────┘
            ↓
     ┌──────────────┐
     │ Success      │
     │ notification │
     └──────────────┘
```

---

### Flow 3: Error Handling (Network Failure)

```
┌──────────────────┐
│ User clicks Sync │
└────────┬─────────┘
         ↓
┌────────────────────┐
│ Network connection │
│ lost during sync   │
└────────┬───────────┘
         ↓
┌────────────────────┐
│ Auto-retry (3x)    │
│ - Attempt 1 (2s)   │
│ - Attempt 2 (4s)   │
│ - Attempt 3 (8s)   │
└────────┬───────────┘
         │
    ┌────┴─────┐
    │          │
    ↓          ↓
┌─────────┐ ┌──────────────────┐
│Success  │ │All retries failed│
│Continue │ │                  │
│         │ └────┬─────────────┘
└─────────┘      ↓
           ┌──────────────────┐
           │ Error Screen:    │
           │ "Unable to sync" │
           │ "Check connection│
           │  and try again"  │
           │                  │
           │ [Retry]          │
           │ [Download Local] │
           │ [Copy Clipboard] │
           └──────────────────┘
```

---

## Technical Architecture

### Technology Stack

#### Figma Plugin Development

- **Language:** TypeScript
- **Framework:** Figma Plugin API
- **UI Framework:** Figma UI components / React (for custom UI)
- **Build Tool:** Webpack / Vite
- **Package Manager:** npm / yarn

#### GitHub Integration

- **GitHub API:** REST API v3 / GraphQL API v4
- **Authentication:** OAuth 2.0 / Personal Access Tokens
- **Required Scopes:** `repo` (repository read/write access)
- **Rate Limiting:** Handle 5,000 requests/hour limit

#### Data Storage

- **Plugin Settings:** Figma's `clientStorage` API
- **Token Cache:** In-memory cache for session
- **Sensitive Data:** Secure token storage via Figma's encrypted storage

---

### System Architecture Diagram

```
┌────────────────────────────────────────────┐
│           Figma Environment                │
│                                            │
│  ┌────────────────────────────────────┐    │
│  │     Figma Plugin (TypeScript)      │    │
│  │                                    │    │
│  │  ┌──────────────────────────┐      │    │
│  │  │  Token Discovery Engine  │      │    │
│  │  │  - Scan Figma variables  │      │    │
│  │  │  - Parse token values    │      │    │
│  │  │  - Categorize by type    │      │    │
│  │  └────────────┬─────────────┘      │    │
│  │               ↓                    │    │
│  │  ┌──────────────────────────┐      │    │
│  │  │   Export Format Engine   │      │    │
│  │  │   - CSS generator        │      │    │
│  │  │   - JSON serializer      │      │    │
│  │  │   - JS/TS generator      │      │    │
│  │  │   - iOS Swift generator  │      │    │
│  │  │   - Android XML generator│      │    │
│  │  └────────────┬─────────────┘      │    │
│  │               ↓                    │    │
│  │  ┌──────────────────────────┐      │    │
│  │  │   GitHub API Client      │      │    │
│  │  │   - OAuth handler        │      │    │
│  │  │   - Repository API       │      │    │
│  │  │   - Commit/Push logic    │      │    │
│  │  │   - Conflict detection   │      │    │
│  │  └────────────┬─────────────┘      │    │
│  └───────────────┼────────────────────┘    │
└──────────────────┼─────────────────────────┘
                   │
                   ↓ HTTPS
         ┌─────────────────────┐
         │   GitHub API        │
         │   - REST API v3     │
         │   - OAuth Server    │
         │   - Git Operations  │
         └─────────┬───────────┘
                   ↓
         ┌────────────────────────┐
         │  User's GitHub Repo    │
         │  /design-tokens/       │
         │  - tokens.css          │
         │  - tokens.json         │
         │  - tokens.js           │
         │  - DesignTokens.swift  │
         │  - tokens.xml          │
         └────────────────────────┘
``

---

### Data Flow

#### Token Export Process

1. **Token Discovery**
   - Plugin scans Figma file via `figma.variables.getLocalVariables()`
   - Extracts: name, value, type, scope, description
   - Organizes by category (color, typography, spacing, etc.)

2. **Format Conversion**
   - For each selected export format:
     - Transform token data to format-specific syntax
     - Apply naming conventions (camelCase, kebab-case, snake_case)
     - Generate formatted output string

3. **GitHub API Operations**
   - Authenticate via OAuth token
   - Fetch target repository and branch
   - Check for conflicts (compare SHA with remote)
   - Create/update files via GitHub Contents API
   - Commit changes with descriptive message

4. **Response Handling**
   - Success: Display commit link and summary
   - Conflict: Show visual diff and resolution options
   - Error: Apply error handling pattern (retry/fallback)

---

## UI/UX Specifications

### Visual Design Principles

- **Minimalist** - Clean, uncluttered interface
- **Figma-native** - Match Figma's UI patterns and components
- **Developer-friendly** - Technical accuracy with friendly language
- **Responsive** - Adapt to different plugin panel sizes

### Component Specifications

#### Token List Item

```
┌──────────────────────────────────────┐
│ ☑  [Category Icon]  Token Name       │
│     Value Preview                    │
│     ⚠️ [Conflict indicator if any]   │
└──────────────────────────────────────┘

Interactions:
- Checkbox: Toggle selection
- Hover: Show full details tooltip
- Click name: Expand details panel
```

#### Category Dropdown

```
┌──────────────────────────┐
│ [Filter Icon] All ▼      │
├──────────────────────────┤
│ All tokens               │
│ Colors                   │
│ Typography               │
│ Spacing                  │
│ Effects                  │
│ Border Radius            │
│ Other                    │
└──────────────────────────┘
```

#### Error State Screen

```
┌─────────────────────────────────┐
│                                 │
│      [Error Icon]               │
│                                 │
│   Friendly Error Headline       │
│                                 │
│   Brief explanation of what     │
│   happened and why              │
│                                 │
│   [Primary Action Button]       │
│   [Secondary Action]            │
│                                 │
└─────────────────────────────────┘

Examples:
- "Unable to connect to GitHub"
- "Check your internet connection and try again"
- [Retry] [Use Local Export]
```

#### Success State

```
┌──────────────────────────────────┐
│     ✅                           │
│   47 tokens synced successfully  │
│                                  │
│   Committed to: main branch      │
│   Repository: company/design-sys │
│                                  │
│   [View in GitHub]  [Done]       │
└──────────────────────────────────┘
```

---

### Interaction States

| Element | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Primary Button | Blue fill | Darker blue | Pressed effect | Gray, 50% opacity |
| Checkbox | Empty | Border highlight | Filled checkmark | Gray, 50% opacity |
| Token Item | White bg | Light gray bg | Border highlight | Gray text |
| Dropdown | Closed | Highlight | Open menu | Gray, no interaction |

---

## Export Format Specifications

### 1. CSS Variables (tokens.css)

**File Name:** `tokens.css`

**Format Structure:**

```css
/**
 * Design Tokens
 * Generated from Figma on [timestamp]
 * Do not edit manually - changes will be overwritten
 */

:root {
  /* ========== Colors ========== */
  --color-primary-blue: #0066CC;
  --color-secondary-red: #FF4444;
  --color-accent-green: #00CC66;
  --color-neutral-gray-100: #F5F5F5;
  --color-neutral-gray-900: #1A1A1A;

  /* ========== Typography ========== */
  --font-family-primary: 'Inter', sans-serif;
  --font-family-monospace: 'Roboto Mono', monospace;

  --font-size-heading-xlarge: 48px;
  --font-size-heading-large: 32px;
  --font-size-heading-medium: 24px;
  --font-size-body-large: 18px;
  --font-size-body-regular: 16px;
  --font-size-body-small: 14px;

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* ========== Spacing ========== */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* ========== Border Radius ========== */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* ========== Effects ========== */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.2);
}
```

**Naming Convention:**
- Format: `--[category]-[name]-[variant]`
- Kebab-case
- Descriptive, semantic names

---

### 2. JSON (tokens.json)

**File Name:** `tokens.json`

**Format Structure:**

```json
{
  "metadata": {
    "version": "1.0",
    "generated": "2025-11-18T10:30:00Z",
    "source": "Figma Design Tokens Plugin",
    "figmaFileId": "abc123def456"
  },
  "colors": {
    "primary": {
      "blue": "#0066CC",
      "red": "#FF4444",
      "green": "#00CC66"
    },
    "neutral": {
      "gray": {
        "100": "#F5F5F5",
        "200": "#E5E5E5",
        "900": "#1A1A1A"
      }
    }
  },
  "typography": {
    "fontFamily": {
      "primary": "'Inter', sans-serif",
      "monospace": "'Roboto Mono', monospace"
    },
    "fontSize": {
      "heading": {
        "xlarge": "48px",
        "large": "32px",
        "medium": "24px"
      },
      "body": {
        "large": "18px",
        "regular": "16px",
        "small": "14px"
      }
    },
    "fontWeight": {
      "light": 300,
      "regular": 400,
      "medium": 500,
      "bold": 700
    },
    "lineHeight": {
      "tight": 1.2,
      "normal": 1.5,
      "relaxed": 1.75
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px",
    "3xl": "64px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "16px",
    "full": "9999px"
  },
  "effects": {
    "shadow": {
      "sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
      "md": "0 4px 6px rgba(0, 0, 0, 0.1)",
      "lg": "0 10px 15px rgba(0, 0, 0, 0.15)",
      "xl": "0 20px 25px rgba(0, 0, 0, 0.2)"
    }
  }
}
```

**Features:**
- Nested object structure for organization
- Metadata for versioning and tracking
- Figma file ID for traceability
- ISO timestamp for last update

---

### 3. JavaScript/TypeScript (tokens.js / tokens.ts)

**File Name:** `tokens.js` or `tokens.ts`

**JavaScript Format:**

```javascript
/**
 * Design Tokens
 * Generated from Figma on 2025-11-18T10:30:00Z
 * @module design-tokens
 */

export const tokens = {
  colors: {
    primary: {
      blue: '#0066CC',
      red: '#FF4444',
      green: '#00CC66'
    },
    neutral: {
      gray: {
        100: '#F5F5F5',
        200: '#E5E5E5',
        900: '#1A1A1A'
      }
    }
  },
  typography: {
    fontFamily: {
      primary: "'Inter', sans-serif",
      monospace: "'Roboto Mono', monospace"
    },
    fontSize: {
      heading: {
        xlarge: '48px',
        large: '32px',
        medium: '24px'
      },
      body: {
        large: '18px',
        regular: '16px',
        small: '14px'
      }
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px'
  },
  effects: {
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.2)'
    }
  }
};

export default tokens;
```

**TypeScript Format (tokens.ts):**

```typescript
/**
 * Design Tokens
 * Generated from Figma on 2025-11-18T10:30:00Z
 * @module design-tokens
 */

export interface DesignTokens {
  colors: {
    primary: {
      blue: string;
      red: string;
      green: string;
    };
    neutral: {
      gray: {
        100: string;
        200: string;
        900: string;
      };
    };
  };
  typography: {
    fontFamily: {
      primary: string;
      monospace: string;
    };
    fontSize: {
      heading: {
        xlarge: string;
        large: string;
        medium: string;
      };
      body: {
        large: string;
        regular: string;
        small: string;
      };
    };
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  effects: {
    shadow: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
}

export const tokens: DesignTokens = {
  // ... same structure as JavaScript version
};

export default tokens;
```

**Usage Examples:**

```javascript
// Import in React
import { tokens } from './tokens';

const Button = styled.button`
  background-color: ${tokens.colors.primary.blue};
  padding: ${tokens.spacing.md};
  border-radius: ${tokens.borderRadius.md};
  font-size: ${tokens.typography.fontSize.body.regular};
`;
```

---

### 4. iOS Swift (DesignTokens.swift)

**File Name:** `DesignTokens.swift`

**Format Structure:**

```swift
//
//  DesignTokens.swift
//  Generated from Figma on 2025-11-18
//  Do not edit manually - changes will be overwritten
//

import UIKit

// MARK: - Colors

extension UIColor {
    struct Primary {
        static let blue = UIColor(hex: "#0066CC")
        static let red = UIColor(hex: "#FF4444")
        static let green = UIColor(hex: "#00CC66")
    }

    struct Neutral {
        struct Gray {
            static let _100 = UIColor(hex: "#F5F5F5")
            static let _200 = UIColor(hex: "#E5E5E5")
            static let _900 = UIColor(hex: "#1A1A1A")
        }
    }
}

// MARK: - Typography

extension UIFont {
    struct FontFamily {
        static let primary = "Inter"
        static let monospace = "RobotoMono"
    }

    struct FontSize {
        struct Heading {
            static let xlarge: CGFloat = 48
            static let large: CGFloat = 32
            static let medium: CGFloat = 24
        }

        struct Body {
            static let large: CGFloat = 18
            static let regular: CGFloat = 16
            static let small: CGFloat = 14
        }
    }

    struct FontWeight {
        static let light = UIFont.Weight.light       // 300
        static let regular = UIFont.Weight.regular   // 400
        static let medium = UIFont.Weight.medium     // 500
        static let bold = UIFont.Weight.bold         // 700
    }
}

// MARK: - Spacing

extension CGFloat {
    struct Spacing {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 16
        static let lg: CGFloat = 24
        static let xl: CGFloat = 32
        static let xxl: CGFloat = 48
        static let xxxl: CGFloat = 64
    }
}

// MARK: - Border Radius

extension CGFloat {
    struct BorderRadius {
        static let sm: CGFloat = 4
        static let md: CGFloat = 8
        static let lg: CGFloat = 16
        static let full: CGFloat = 9999
    }
}

// MARK: - Effects (Shadows)

extension CALayer {
    struct Shadow {
        static let sm: (offset: CGSize, radius: CGFloat, opacity: Float, color: CGColor) = (
            offset: CGSize(width: 0, height: 1),
            radius: 2,
            opacity: 0.05,
            color: UIColor.black.cgColor
        )

        static let md: (offset: CGSize, radius: CGFloat, opacity: Float, color: CGColor) = (
            offset: CGSize(width: 0, height: 4),
            radius: 6,
            opacity: 0.1,
            color: UIColor.black.cgColor
        )

        static let lg: (offset: CGSize, radius: CGFloat, opacity: Float, color: CGColor) = (
            offset: CGSize(width: 0, height: 10),
            radius: 15,
            opacity: 0.15,
            color: UIColor.black.cgColor
        )

        static let xl: (offset: CGSize, radius: CGFloat, opacity: Float, color: CGColor) = (
            offset: CGSize(width: 0, height: 20),
            radius: 25,
            opacity: 0.2,
            color: UIColor.black.cgColor
        )
    }
}

// MARK: - Utility Extensions

extension UIColor {
    convenience init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            red: CGFloat(r) / 255,
            green: CGFloat(g) / 255,
            blue: CGFloat(b) / 255,
            alpha: CGFloat(a) / 255
        )
    }
}
```

**Usage Example:**

```swift
// Using in SwiftUI or UIKit
let button = UIButton()
button.backgroundColor = UIColor.Primary.blue
button.layer.cornerRadius = CGFloat.BorderRadius.md
button.titleLabel?.font = UIFont.systemFont(
    ofSize: UIFont.FontSize.Body.regular,
    weight: UIFont.FontWeight.medium
)
```

---

### 5. Android XML (tokens.xml)

**File Name:** `tokens.xml`

**Format Structure:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
    Design Tokens
    Generated from Figma on 2025-11-18
    Do not edit manually - changes will be overwritten
-->
<resources>

    <!-- ========== Colors ========== -->
    <color name="color_primary_blue">#0066CC</color>
    <color name="color_secondary_red">#FF4444</color>
    <color name="color_accent_green">#00CC66</color>

    <color name="color_neutral_gray_100">#F5F5F5</color>
    <color name="color_neutral_gray_200">#E5E5E5</color>
    <color name="color_neutral_gray_900">#1A1A1A</color>

    <!-- ========== Typography ========== -->
    <!-- Font Sizes -->
    <dimen name="font_size_heading_xlarge">48sp</dimen>
    <dimen name="font_size_heading_large">32sp</dimen>
    <dimen name="font_size_heading_medium">24sp</dimen>
    <dimen name="font_size_body_large">18sp</dimen>
    <dimen name="font_size_body_regular">16sp</dimen>
    <dimen name="font_size_body_small">14sp</dimen>

    <!-- Line Heights (as multipliers) -->
    <item name="line_height_tight" format="float" type="dimen">1.2</item>
    <item name="line_height_normal" format="float" type="dimen">1.5</item>
    <item name="line_height_relaxed" format="float" type="dimen">1.75</item>

    <!-- ========== Spacing ========== -->
    <dimen name="space_xs">4dp</dimen>
    <dimen name="space_sm">8dp</dimen>
    <dimen name="space_md">16dp</dimen>
    <dimen name="space_lg">24dp</dimen>
    <dimen name="space_xl">32dp</dimen>
    <dimen name="space_2xl">48dp</dimen>
    <dimen name="space_3xl">64dp</dimen>

    <!-- ========== Border Radius ========== -->
    <dimen name="radius_sm">4dp</dimen>
    <dimen name="radius_md">8dp</dimen>
    <dimen name="radius_lg">16dp</dimen>
    <dimen name="radius_full">9999dp</dimen>

    <!-- ========== Elevation (for shadows) ========== -->
    <dimen name="elevation_sm">2dp</dimen>
    <dimen name="elevation_md">6dp</dimen>
    <dimen name="elevation_lg">15dp</dimen>
    <dimen name="elevation_xl">25dp</dimen>

</resources>
```

**Companion Kotlin File (DesignTokens.kt):**

```kotlin
package com.example.app.design

import android.content.Context
import androidx.core.content.ContextCompat
import com.example.app.R

/**
 * Design Tokens
 * Generated from Figma on 2025-11-18
 * Provides type-safe access to design tokens
 */
object DesignTokens {

    object Colors {
        object Primary {
            fun blue(context: Context) = ContextCompat.getColor(context, R.color.color_primary_blue)
            fun red(context: Context) = ContextCompat.getColor(context, R.color.color_secondary_red)
            fun green(context: Context) = ContextCompat.getColor(context, R.color.color_accent_green)
        }

        object Neutral {
            object Gray {
                fun shade100(context: Context) = ContextCompat.getColor(context, R.color.color_neutral_gray_100)
                fun shade200(context: Context) = ContextCompat.getColor(context, R.color.color_neutral_gray_200)
                fun shade900(context: Context) = ContextCompat.getColor(context, R.color.color_neutral_gray_900)
            }
        }
    }

    object Spacing {
        fun xs(context: Context) = context.resources.getDimensionPixelSize(R.dimen.space_xs)
        fun sm(context: Context) = context.resources.getDimensionPixelSize(R.dimen.space_sm)
        fun md(context: Context) = context.resources.getDimensionPixelSize(R.dimen.space_md)
        fun lg(context: Context) = context.resources.getDimensionPixelSize(R.dimen.space_lg)
        fun xl(context: Context) = context.resources.getDimensionPixelSize(R.dimen.space_xl)
        fun xxl(context: Context) = context.resources.getDimensionPixelSize(R.dimen.space_2xl)
        fun xxxl(context: Context) = context.resources.getDimensionPixelSize(R.dimen.space_3xl)
    }

    object BorderRadius {
        fun sm(context: Context) = context.resources.getDimension(R.dimen.radius_sm)
        fun md(context: Context) = context.resources.getDimension(R.dimen.radius_md)
        fun lg(context: Context) = context.resources.getDimension(R.dimen.radius_lg)
        fun full(context: Context) = context.resources.getDimension(R.dimen.radius_full)
    }
}
```

**Usage Example:**

```xml
<!-- Using in Android XML Layout -->
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:background="@color/color_primary_blue"
    android:padding="@dimen/space_md"
    android:textSize="@dimen/font_size_body_regular"
    android:elevation="@dimen/elevation_md" />
```

```kotlin
// Using in Kotlin code
val button = Button(context).apply {
    setBackgroundColor(DesignTokens.Colors.Primary.blue(context))
    setPadding(DesignTokens.Spacing.md(context))
    textSize = resources.getDimension(R.dimen.font_size_body_regular)
}
```

---

## Error Handling Strategy

### Error Philosophy

- **Tone:** Friendly, non-technical language
- **Approach:** Pragmatic, avoid over-engineering
- **Fallback:** Always provide escape hatch (copy to clipboard, local download)

---

### Error Handling Patterns

#### Pattern 1, 2, 6: Error State Screen

**For:** Connection failures, authentication issues, critical system failures

**UI Template:**

```
┌─────────────────────────────────┐
│                                 │
│      [Friendly Icon]            │
│                                 │
│   Clear Error Headline          │
│                                 │
│   Explanation in plain English  │
│   (2-3 sentences max)           │
│                                 │
│   [Primary Action Button]       │
│   [Secondary Fallback Action]   │
│                                 │
└─────────────────────────────────┘
```

**Example Scenarios:**

| Scenario | Headline | Message | Primary Action | Secondary Action |
|----------|----------|---------|----------------|------------------|
| Network timeout | "Unable to connect" | "Check your internet connection and try again" | [Retry] | [Download Local] |
| Auth expired | "GitHub connection expired" | "Please reconnect your GitHub account" | [Reconnect] | [Copy to Clipboard] |
| No permissions | "Permission denied" | "You don't have write access to this repository" | [Choose Different Repo] | [Contact Owner] |
| GitHub down | "GitHub is unavailable" | "GitHub services are temporarily down. Your tokens are saved." | [Try Again Later] | [Download as ZIP] |

---

#### Pattern 3, 5: SKIP (Over-Engineering)

**Rationale:** For v1, skip complex validation and partial failure handling
- Pattern 3 (Token validation) - Trust Figma data, handle edge cases reactively
- Pattern 5 (Partial failures) - All-or-nothing approach for simplicity

**Future consideration:** Add in v2 based on user feedback

---

#### Pattern 4: Conflict Resolution (Already Defined)

**Visual Color-Coding System:**
- **Yellow + ⚠️** - Modified in GitHub
- **Red highlight** - Removed in GitHub
- **Purple highlight** - New in GitHub

**User Actions:**
- View detailed diff
- Overwrite GitHub (push Figma version)
- Pull from GitHub (update Figma)
- Review manually in GitHub

---

#### Pattern 7: Silent Backend Handling

**For:** Minor fixes that don't require user attention

**Examples:**
- Sanitizing invalid characters in token names (e.g., `color!` → `color`)
- Auto-converting units (e.g., Figma's absolute pixels → `px`)
- Normalizing whitespace in token values
- Fixing quote escaping for JSON strings

**Implementation:**
- Handle silently in export format generators
- Log to console for debugging
- No user notification unless debugging mode enabled

---

### Error Mapping Table

| Error Type | Pattern | User Experience |
|------------|---------|-----------------|
| OAuth timeout | 1 | Error screen with retry |
| Token expired | 2 | Reconnect prompt |
| Network failure | 1 | Auto-retry → Error screen |
| No write permissions | 2 | Error with repo selection |
| Repo deleted | 2 | Error with repo selection |
| Branch doesn't exist | 2 | Error with branch dropdown |
| GitHub API down | 6 | Error screen + local fallback |
| File conflicts | 4 | Color-coded diff UI |
| Plugin crash | 6 | Critical error + download option |
| Invalid token names | 7 | Silent auto-fix |
| Special characters | 7 | Silent sanitization |

---

## Success Metrics

### Key Performance Indicators (KPIs)

#### Adoption Metrics
- **Plugin Installs** - Total installations from Figma Community
- **Active Users** - Monthly active users (MAU)
- **Retention Rate** - Users who return after first use
- **Time to First Sync** - Minutes from install to first successful export

#### Usage Metrics
- **Syncs per User** - Average number of syncs per active user
- **Tokens Exported** - Total tokens synced to GitHub
- **Export Formats Used** - Most popular format selections
- **Repositories Connected** - Unique GitHub repos using plugin

#### Quality Metrics
- **Sync Success Rate** - % of syncs that complete without error
- **Error Rate** - % of syncs that encounter errors
- **Conflict Resolution Rate** - % of conflicts successfully resolved
- **Support Tickets** - Number of user-reported issues

#### Business Impact
- **Developer Time Saved** - Estimated hours saved vs manual export
- **Design-Code Consistency** - Reduction in design-dev discrepancies
- **Team Velocity** - Faster token updates in production

---

### Success Criteria (v1 Launch)

- ✅ **90% sync success rate** (excluding user errors)
- ✅ **< 3 minutes time to first sync** for new users
- ✅ **50% retention rate** after 30 days
- ✅ **5+ export formats supported**
- ✅ **< 2% critical error rate**

---

## Future Considerations

### Phase 2 Features (Post-MVP)

#### Advanced Sync Options
- **Selective Category Sync** - Sync only colors, or only typography
- **Scheduled Auto-Sync** - Automatic sync on file changes
- **Webhook Integration** - Trigger CI/CD pipelines on token updates
- **Version History** - View and rollback previous token versions

#### Conflict Resolution Enhancements
- **In-Plugin Merge UI** - Resolve conflicts without leaving Figma
- **Three-way Merge** - Compare Figma, GitHub, and common ancestor
- **Conflict Rules** - Auto-resolve based on user-defined rules

#### Token Validation
- **Pre-Export Validation** - Check for duplicate names, invalid values
- **Naming Convention Enforcement** - Enforce team-specific naming patterns
- **Accessibility Checks** - Validate color contrast ratios
- **Unused Token Detection** - Identify tokens not used in designs

#### Collaboration Features
- **Multi-User Permissions** - Role-based access (read-only, sync-only, full)
- **Activity Log** - Audit trail of all syncs and changes
- **Team Notifications** - Slack/email alerts on token changes
- **Approval Workflows** - Require review before syncing

#### Extended Platform Support
- **Flutter** - Dart constants export
- **React Native** - Platform-specific exports
- **Sass/SCSS** - Variable format for preprocessors
- **Tailwind Config** - tailwind.config.js generation
- **Design Token Standard** - W3C Design Tokens format support

#### Developer Tools
- **CLI Integration** - Command-line sync without opening Figma
- **VS Code Extension** - Preview tokens in editor
- **Storybook Integration** - Auto-generate Storybook docs
- **Documentation Generation** - Auto-create token documentation

#### Enterprise Features
- **SSO Support** - Single sign-on for corporate environments
- **On-Premise GitHub** - Support for GitHub Enterprise Server
- **Custom Export Templates** - User-defined format templates
- **Bulk Operations** - Manage multiple Figma files at once

---

### Technical Debt & Improvements

#### Performance Optimization
- **Incremental Sync** - Only sync changed tokens (delta sync)
- **Compression** - Reduce payload size for large token sets
- **Caching** - Aggressive caching of GitHub API responses
- **Background Sync** - Non-blocking sync operations

#### Code Quality
- **Unit Testing** - Comprehensive test coverage (>80%)
- **Integration Testing** - End-to-end sync testing
- **Error Monitoring** - Sentry/Bugsnag integration
- **Analytics** - Usage tracking and telemetry

#### Developer Experience
- **Plugin Debugging Mode** - Verbose logging for troubleshooting
- **API Documentation** - For developers extending plugin
- **Webhook API** - For custom integrations
- **Open Source Components** - Consider open-sourcing format generators

---

### User Feedback Loop

#### Feedback Collection
- **In-Plugin Feedback** - Simple feedback form in settings
- **GitHub Issues** - Public issue tracker for bug reports
- **User Interviews** - Regular interviews with power users
- **Analytics** - Track feature usage and drop-off points

#### Iteration Strategy
- **Weekly Updates** - Push small improvements frequently
- **Beta Channel** - Early access for power users
- **Feature Flags** - A/B test new features
- **Changelog** - Transparent communication of updates

---

## Appendix

### Glossary

- **Design Token** - Reusable design values (colors, spacing, typography) stored as variables
- **OAuth** - Open Authorization standard for secure API authentication
- **PAT** - Personal Access Token (GitHub authentication method)
- **Sync** - Export tokens from Figma and commit to GitHub
- **Conflict** - When token value differs between Figma and GitHub
- **Export Format** - Output file format (CSS, JSON, Swift, etc.)
- **Repository** - GitHub repo where tokens are stored
- **Branch** - Git branch within repository

---

### Technical References

#### Figma Plugin API
- [Figma Plugin Documentation](https://www.figma.com/plugin-docs/)
- [Variables API](https://www.figma.com/plugin-docs/api/variables/)
- [Client Storage API](https://www.figma.com/plugin-docs/api/figma-clientStorage/)

#### GitHub API
- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Contents API](https://docs.github.com/en/rest/repos/contents) (for file operations)

#### Design Token Standards
- [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- [Design Tokens Format Specification](https://tr.designtokens.org/format/)

---

### Contact & Collaboration

**Product Owner:** [Your Name]
**Project Repository:** [GitHub repo URL]
**Feedback:** [Email/Slack channel]
**Documentation:** [Link to additional docs]

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-18 | Brainstorming Session | Initial PRD creation from brainstorming session |

---

**End of Document**

This PRD is a living document and will be updated as the product evolves.
