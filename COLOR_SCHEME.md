# Color Scheme Reference

## Background Colors (Unchanged)
- **Main Background**: #000000 (Black)
- **Cards**: #000000 (Black)
- **Secondary Surfaces**: #111111 (Gray-900)

---

## Typography Colors (Updated)
Based on black (#000000) background:

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| **Primary Headings** | White | #ffffff | h1, h2, h3, h4, h5, h6 |
| **Body Text** | Light Gray | #d1d5db | Paragraphs, descriptions |
| **Secondary Text** | Medium Gray | #9ca3af | Helper text, subtitles |
| **Hint Text** | Dark Gray | #6b7280| Captions, disabled text |

---

## Status & State Colors (New)
Used throughout the application for better data representation:

### Status Badges
| Status | Background | Text | Border |
|--------|------------|------|--------|
| **Enabled** | Green-900/40 | Green-200 | Green-800 |
| **Disabled** | Red-900/40 | Red-200 | Red-800 |
| **Active** | Green-900/40 | Green-200 | Green-800 |
| **Inactive** | Red-900/40 | Red-200 | Red-800 |

### Environment Badges
| Environment | Color | Hex |
|-------------|-------|-----|
| **Development** | Blue | #3b82f6 |
| **Staging** | Amber | #f59e0b |
| **Production** | Red | #ef4444 |

### Tag / Badge Colors
| Type | Background | Text | Border |
|------|------------|------|--------|
| **Primary** | Blue-900/40 | Blue-200 | Blue-800 |
| **Success** | Green-900/40 | Green-200 | Green-800 |
| **Warning** | Amber-900/40 | Amber-200 | Amber-800 |
| **Danger** | Red-900/40 | Red-200 | Red-800 |
| **Info** | Cyan-900/40 | Cyan-200 | Cyan-800 |

---

## Chart Data Colors (Updated)

### Rollout Distribution
| Range | Color | Hex |
|-------|-------|-----|
| **0%** | Red | #ef4444 |
| **1-25%** | Amber | #f59e0b |
| **26-75%** | Blue | #3b82f6 |
| **76-100%** | Green | #10b981 |

### Environment Breakdown
| Environment | Color | Hex |
|-------------|-------|-----|
| **Dev / Development** | Blue | #3b82f6 |
| **Staging** | Amber | #f59e0b |
| **Prod / Production** | Red | #ef4444 |
| **Unknown** | Gray | #9ca3af |

---

## Component Styling

### Buttons
- **Primary Button**: White bg, Black text
- **Secondary Button**: Gray-800 bg, White text
- **Ghost Button**: Gray-400 text on hover
- **Danger Button**: Gray-900 bg, Gray-300 text

### Tables
- **Headers**: Text-Gray-300 (brightened from gray-500)
- **Rows**: Gray-900 background with gray-800 borders
- **Hover**: Light gray-900/50 background

### Forms
- **Labels**: Text-Gray-300
- **Inputs**: Gray-900 bg, Gray-700 border, White text
- **Focus**: Black bg, White border

### Cards
- **Background**: Black (#000000)
- **Border**: Gray-800
- **Title**: White text
- **Description**: Light gray text

---

## Key Improvements

✅ **Text Hierarchy**: Clear distinction between primary (white), secondary (light gray), tertiary (medium gray), and hint text (dark gray)

✅ **Status Indicators**: Green for enabled/active, Red for disabled/inactive

✅ **Environment Colors**: Blue (Dev), Amber (Staging), Red (Production)

✅ **Chart Readability**: Distinct colors for different rollout percentages and environments

✅ **Accessibility**: High contrast ratios on black background for readability
