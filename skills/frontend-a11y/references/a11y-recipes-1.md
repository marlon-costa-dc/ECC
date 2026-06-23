# Frontend Accessibility Recipes

Extended examples and recipes for the [frontend-a11y](../SKILL.md) skill.

## Form Accessibility

### Label Connection

```tsx
{/* BAD: label has no connection to input */}
<label>Email</label>
<input type="email" />

{/* GOOD */}
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### Required Fields

```tsx
<label htmlFor="email">
  Email <span aria-hidden="true">*</span>
</label>
<input id="email" type="email" required aria-required="true" />
```

### Error Messages

```tsx
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={!!error}
/>
{error && <span id="email-error" role="alert">{error}</span>}
```

## ARIA Attributes

```tsx
{/* aria-label: no visible label */}
<button aria-label="Close modal"><XIcon /></button>

{/* aria-labelledby: references visible text */}
<section aria-labelledby="section-title">
  <h2 id="section-title">Recent Orders</h2>
</section>

{/* aria-describedby: supplementary description */}
<button aria-describedby="delete-warning">Delete account</button>
<p id="delete-warning">This action cannot be undone.</p>

{/* aria-live for dynamic content */}
<div role="status" aria-live={isError ? 'assertive' : 'polite'} aria-atomic="true">
  {message}
</div>

{/* aria-expanded + aria-controls */}
<button aria-expanded={isOpen} aria-controls={contentId} onClick={toggle}>
  {title}
</button>
<div id={contentId} hidden={!isOpen}>{children}</div>
```

## Keyboard Navigation

```tsx
function Dropdown({ options, onSelect }: { options: string[]; onSelect: (v: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = useId();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) onSelect(options[activeIndex]);
        setIsOpen(o => !o);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" aria-controls={listId}
         tabIndex={0} onKeyDown={handleKeyDown} onClick={() => setIsOpen(o => !o)}>
      <span>{options[activeIndex]}</span>
      {isOpen && (
        <ul id={listId} role="listbox">
          {options.map((option, index) => (
            <li key={option} role="option" aria-selected={index === activeIndex}
                onClick={() => { onSelect(option); setIsOpen(false); }}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Focus Management

```tsx
function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title"
         tabIndex={-1} onKeyDown={e => e.key === 'Escape' && onClose()}>
      <h2 id="modal-title">{title}</h2>
      {children}

> Continued in [`a11y-recipes-2.md`](a11y-recipes-2.md)
