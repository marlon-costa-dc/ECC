      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

For full focus trapping with Tab/Shift+Tab cycling, use a library like `focus-trap-react`.

## Images and Icons

```tsx
{/* BAD: decorative icon announced as unlabeled image */}
<img src="/icon.svg" />

{/* GOOD: decorative image hidden from screen readers */}
<img src="/decoration.png" alt="" aria-hidden="true" />

{/* GOOD: meaningful image with descriptive alt text */}
<img src="/chart.png" alt="Monthly revenue increased 23% from January to March" />

{/* GOOD: icon button with accessible label */}
<button aria-label="Delete item">
  <TrashIcon aria-hidden="true" />
</button>
```

## Reduced Motion

```tsx
function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

## Review Checklist

- [ ] Every `<input>`, `<select>`, and `<textarea>` has a connected `<label>` via `htmlFor`/`id`.
- [ ] Error messages are linked with `aria-describedby` and marked `role="alert"`.
- [ ] No `onClick` on `<div>` or `<span>` without `role`, `tabIndex`, and `onKeyDown`.
- [ ] Icon-only buttons have `aria-label`.
- [ ] Decorative images use `alt=""` and `aria-hidden="true"`.
- [ ] Modals restore focus on close.
- [ ] Dynamic content updates use `aria-live`.
- [ ] `prefers-reduced-motion` is respected for animations.
