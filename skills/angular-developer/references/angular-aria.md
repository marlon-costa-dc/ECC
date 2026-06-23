---
name: angular-aria
description: Use when building accessible custom Angular components for ARIA patterns such as accordion, listbox, combobox, menu, menubar, tabs, toolbar, tree, or grid with @angular/aria.
---

# Angular Aria

Angular Aria (`@angular/aria`) provides headless, accessible directives for common WAI-ARIA patterns. The directives handle keyboard interaction, ARIA attributes, focus management, and screen-reader support; you provide the HTML structure and CSS.

**Install before use:** `npm install @angular/aria`

## Styling Headless Components

Target the ARIA attributes the directives toggle:

- `[aria-expanded]`
- `[aria-selected]`
- `[aria-disabled]`
- `[aria-current]`
- `[aria-pressed]`
- `[aria-checked]`
- `[aria-activedescendant]`

## Pattern Reference

| Pattern | Module | Directives | Styling Target |
|---|---|---|---|
| Accordion | `@angular/aria/accordion` | `ngAccordionGroup`, `ngAccordionTrigger`, `ngAccordionPanel`, `ngAccordionContent` | `[aria-expanded]` |
| Listbox | `@angular/aria/listbox` | `ngListbox`, `ngOption` | `[aria-selected]` |
| Combobox / Select / Multiselect | `@angular/aria/combobox`, `@angular/aria/listbox` | `ngCombobox`, `ngComboboxInput`, `ngComboboxPopupContainer`, `ngListbox`, `ngOption` | popup container |
| Menu / Menubar | `@angular/aria/menu` | `ngMenuBar`, `ngMenu`, `ngMenuItem`, `ngMenuTrigger` | flexbox menubar |
| Tabs | `@angular/aria/tabs` | `ngTabs`, `ngTabList`, `ngTab`, `ngTabPanel`, `ngTabContent` | `[aria-selected]` |
| Toolbar | `@angular/aria/toolbar` | `ngToolbar`, `ngToolbarWidget`, `ngToolbarWidgetGroup` | `[aria-pressed]` / `[aria-checked]` |
| Tree | `@angular/aria/tree` | `ngTree`, `ngTreeItem`, `ngTreeGroup` | `[aria-expanded]` |
| Grid | `@angular/aria/grid` | `ngGrid`, `ngGridRow`, `ngGridCell`, `ngGridCellWidget` | `[aria-selected]` |

## Examples

### Accordion

```html
<div ngAccordionGroup [multiExpandable]="false">
  <div class="accordion-item">
    <button ngAccordionTrigger panelId="panel-1" class="accordion-header">
      Section 1 <span class="icon">▼</span>
    </button>
    <div ngAccordionPanel panelId="panel-1" class="accordion-panel">
      <ng-template ngAccordionContent>
        <p>Lazy loaded content here.</p>
      </ng-template>
    </div>
  </div>
</div>
```

```css
.accordion-header[aria-expanded='true'] .icon { transform: rotate(180deg); }
.accordion-panel { padding: 1rem; border-top: 1px solid #ccc; }
```

### Select

```html
<div ngCombobox [readonly]="true">
  <button ngComboboxInput class="select-trigger">
    {{ selectedValue() || 'Choose an option' }}
  </button>
  <ng-template ngComboboxPopupContainer>
    <ul ngListbox [(values)]="selectedValue" class="dropdown-menu">
      <li ngOption value="option1">Option 1</li>
      <li ngOption value="option2">Option 2</li>
    </ul>
  </ng-template>
</div>
```

Style the popup as a floating dropdown (`list-style: none`, border, background, shadow).

## Rules

1. Never use native HTML elements like `<select>` when asked to implement these ARIA patterns; use the `ng*` directives.
2. Angular Aria does not provide styles—write CSS targeting the ARIA attributes the directives toggle.
3. Use structural directives (`ngAccordionContent`, `ngTabContent`) inside `ng-template` for heavy panels so they render lazily.
