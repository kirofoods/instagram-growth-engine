# KiroGram Design System - Component Reference

## Quick Start Examples

### Page Layout
```html
<div class="page">
  <div class="page-header">
    <h1>Page Title</h1>
    <p>Descriptive subtitle goes here</p>
  </div>
  
  <div class="section">
    <h4 class="section-title">Section Title</h4>
    <!-- Content here -->
  </div>
</div>
```

### Cards
```html
<!-- Standard Card -->
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
    <button class="btn btn-ghost">Action</button>
  </div>
  <!-- Card content -->
</div>

<!-- Card with Gradient Top Border -->
<div class="card card-gradient">
  <!-- Content -->
</div>

<!-- Smaller Card -->
<div class="card card-sm">
  <!-- Content -->
</div>
```

### Buttons
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost Button</button>
<button class="btn btn-primary btn-small">Small</button>
<button class="btn btn-primary btn-large">Large</button>
```

### Grids
```html
<!-- 2-column grid (responsive) -->
<div class="grid grid-2">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
</div>

<!-- 3-column grid (responsive) -->
<div class="grid grid-3">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>

<!-- 4-column grid (responsive) -->
<div class="grid grid-4">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
  <div class="card">Item 4</div>
</div>
```

### Metrics & Stats
```html
<div class="card">
  <div class="metric-card">
    <div class="metric-card-icon">📊</div>
    <div class="metric-card-content">
      <div class="stat-value">15,234</div>
      <div class="stat-label">Total Followers</div>
      <div class="stat-change text-positive">+2.5%</div>
    </div>
  </div>
</div>
```

### Badges
```html
<span class="badge">Default</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-info">Info</span>
```

### Data Tables
```html
<table class="data-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Followers</th>
      <th>Engagement</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>@username</td>
      <td class="num">12,345</td>
      <td>3.5%</td>
      <td><span class="badge badge-success">Active</span></td>
    </tr>
  </tbody>
</table>
```

### Forms
```html
<input type="text" class="input" placeholder="Enter text...">
<textarea class="textarea" placeholder="Enter description..."></textarea>
<select class="select">
  <option>Select an option</option>
</select>
```

### Tabs
```html
<div class="tab-group">
  <button class="tab tab-active">Active Tab</button>
  <button class="tab">Inactive Tab</button>
  <button class="tab">Another Tab</button>
</div>
```

### Flex Utilities
```html
<!-- Space between -->
<div class="flex flex-between">
  <h3>Title</h3>
  <button class="btn btn-ghost">Action</button>
</div>

<!-- Centered -->
<div class="flex-center" style="height: 200px;">
  <p>Centered content</p>
</div>

<!-- Column layout with gap -->
<div class="flex flex-col gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Typography Utilities
```html
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-tertiary">Tertiary text</p>
<p class="text-muted">Muted text</p>

<p class="font-normal">Normal weight</p>
<p class="font-medium">Medium weight</p>
<p class="font-semibold">Semibold weight</p>
<p class="font-bold">Bold weight</p>

<p class="text-sm">Small</p>
<p class="text-base">Base</p>
<p class="text-lg">Large</p>
<p class="text-xl">Extra large</p>
```

### Number Formatting
```html
<!-- Tabular numbers -->
<div class="stat-value">
  <span class="num">123,456</span>
</div>

<!-- Large number -->
<div class="num-lg">98.5%</div>

<!-- Extra large number -->
<div class="num-xl">2,345,678</div>

<!-- Color indicators -->
<span class="text-positive">+12.5%</span>
<span class="text-negative">-3.2%</span>
<span class="text-muted">No change</span>
```

### Animations
```html
<div class="animate-fade-in">
  Content fades in
</div>

<div class="animate-slide-in">
  Content slides in from top
</div>

<div class="animate-fade-out">
  Content fades out
</div>
```

## CSS Variable Reference

### Using CSS Variables in Custom Styles
```css
.custom-element {
  background-color: var(--bg-card);
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
  border-radius: 0.75rem;
  padding: var(--spacing-lg);
  transition: all var(--transition-base);
}

.custom-element:hover {
  border-color: var(--border-secondary);
}
```

## Design Consistency Checklist

- [ ] Page wrapped in `.page` class
- [ ] Section titles use `.section-title`
- [ ] All metrics use `.stat-value` and `.stat-label`
- [ ] Data uses `.num` for tabular numbers
- [ ] Status indicators use appropriate `.badge-*` class
- [ ] Buttons use `.btn-primary` or `.btn-secondary`
- [ ] Forms styled with `.input`, `.textarea`, `.select`
- [ ] Grids use responsive `.grid-2`, `.grid-3`, or `.grid-4`
- [ ] Cards have consistent padding (1.5rem standard)
- [ ] All text colors use theme variables
- [ ] Hover states are subtle (no glows)

## Production Notes

1. **No Inline Styles**: All styling should come from CSS classes
2. **Component Reuse**: Use `.card` and `.grid` as building blocks
3. **Responsive First**: Test on mobile (≤768px) viewports
4. **Accessibility**: Ensure text contrast meets WCAG AA standards
5. **Performance**: Minimal shadows and transitions (no animations on load)
6. **Consistency**: Always use design system spacing and colors

