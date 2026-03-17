# KiroGram Instagram Growth Engine - Global CSS Design System

## Design Philosophy
Modern, minimal, structured aesthetic with clean lines, generous whitespace, and subtle borders. No visual clutter.

## Color Palette

### Dark Theme (Zinc)
- **Primary Background**: #09090b (zinc-950)
- **Secondary Background**: #18181b (zinc-900) 
- **Tertiary Background**: #27272a (zinc-800)
- **Card Background**: #18181b (zinc-900)

### Text Colors
- **Primary**: #fafafa (almost white)
- **Secondary**: #a1a1a6 (zinc-400)
- **Tertiary**: #71717a (zinc-500)
- **Muted**: #52525b (zinc-600)

### Borders & Dividers
- **Primary Border**: #27272a (zinc-800)
- **Secondary Border**: #3f3f46 (zinc-700)

### Accent Colors
- **Instagram Gradient**: #E1306C → #833AB4
- **Success**: #10b981
- **Warning**: #f59e0b
- **Error**: #ef4444
- **Info**: #3b82f6

## Typography

### Font Family
Inter, system fonts fallback

### Type Scale
- **Page Title**: 1.75rem / semibold (h1)
- **Section Title**: 1.125rem / medium (h4)
- **Body Text**: 0.875rem / regular
- **Caption**: 0.75rem / regular
- **Stat Value**: 2rem / bold
- **Stat Label**: 0.75rem / uppercase, tracking-wider

## Component Classes

### Layout
- `.page` - Full page wrapper with padding 2rem, max-width 1400px
- `.page-header` - Page title + description with bottom border
- `.section` - Margin-top 2rem for section grouping
- `.grid`, `.grid-2`, `.grid-3`, `.grid-4` - Responsive grids with 1.25rem gap
- `.flex-between`, `.flex-center`, `.flex-col` - Flex utilities

### Cards
- `.card` - bg zinc-900, border zinc-800, border-radius 12px, padding 1.5rem
- `.card-sm` - Smaller padding (1rem)
- `.card-header` - Flex between with title + action, border-bottom
- `.card-gradient` - Subtle gradient top border (Instagram accent)
- `.card:hover` - Subtle border brightness increase only

### Data Display
- `.metric-card` - Structured: icon top-right, value large, label small
- `.data-table` - Clean table with header row zinc-800 bg
- `.data-table th` - uppercase, tracking-wider, 0.6875rem, zinc-400
- `.data-table td` - 0.875rem, zinc-200, proper padding
- `.stat-value` - 2rem bold with tabular-nums
- `.stat-label` - 0.75rem uppercase with letter-spacing
- `.stat-change` - 0.8125rem with green/red color

### Badges & Status
- `.badge` - Default (Instagram pink)
- `.badge-success` - Emerald background
- `.badge-warning` - Amber background
- `.badge-danger` - Red background
- `.badge-info` - Blue background

### Buttons
- `.btn` - Base button styles
- `.btn-primary` - Gradient (Instagram), white text, subtle shadow
- `.btn-secondary` - zinc-800 bg, zinc-300 text, zinc-700 border
- `.btn-ghost` - Transparent, zinc-400 text
- `.btn-small` - Smaller padding
- `.btn-large` - Larger padding

### Forms
- `.input`, `.textarea`, `.select` - Consistent styling
  - zinc-800 background
  - zinc-700 border
  - Focus: accent border + darker background
- `.tab-group` - Horizontal tabs with active indicator bar
- `.tab-active` - Gradient text + bottom border

### Number Formatting
- `.num` - tabular-nums font-feature
- `.num-lg` - 2rem bold
- `.num-xl` - 2.5rem bold
- `.text-positive` - emerald-400 color
- `.text-negative` - red-400 color
- `.text-muted` - zinc-500 color

## Spacing Scale
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem

## Border Radius
- sm: 0.375rem
- md: 0.5rem
- lg: 0.75rem
- xl: 0.75rem
- 2xl: 1rem

## Shadows (Minimal)
- sm: 0 1px 2px rgba(0, 0, 0, 0.3)
- md: 0 2px 8px rgba(0, 0, 0, 0.4)
- lg: 0 4px 16px rgba(0, 0, 0, 0.5)

## Transitions
- fast: 150ms
- base: 250ms (default)
- slow: 350ms

## Responsive Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

### Grid Responsive Behavior
- **Desktop**: grid-4 (4 cols), grid-3 (3 cols), grid-2 (2 cols)
- **Tablet (≤1024px)**: grid-4 → 3 cols
- **Mobile (≤768px)**: grid-4 → 2 cols, grid-3 → 2 cols, grid-2 → 1 col
- **Small Mobile (≤640px)**: All grids → 1 col

## App Structure Classes
- `.app-container` - Flex, full height (100dvh)
- `.app-main` - Flex-1, flex-col, overflow hidden
- `.app-content` - Flex-1, overflow-y auto, padding 1.5rem 2rem

## Key Design Decisions
1. **100dvh instead of 100vh** - Better mobile viewport handling
2. **No glow effects** - Minimal aesthetic with subtle borders only
3. **Subtle hover states** - Slight border color change, not shadows or transforms
4. **Instagram gradient reserved** - Only for primary buttons and key highlights
5. **Generous whitespace** - Minimum 1.25rem gaps between elements
6. **Consistent padding** - Cards: 1.5rem, Page: 2rem
7. **Clear visual hierarchy** - Font sizes and weights carefully calibrated
8. **Accessibility first** - Sufficient color contrast, readable font sizes

## Implementation Notes
- All components should use these classes instead of inline styles
- Maintain consistent use of CSS variables for theming
- Use tabular-nums for all numeric displays (stats, data)
- Every component inherits from the base design system
- Mobile-first responsive approach in media queries
