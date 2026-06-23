# Frontend Component Patterns

Detailed recipes for the [frontend-patterns](../SKILL.md) skill.

## Composition

```tsx
interface CardProps { children: React.ReactNode; variant?: 'default' | 'outlined'; }
export function Card({ children, variant = 'default' }: CardProps) {
  return <div className={`card card-${variant}`}>{children}</div>;
}
export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
}
export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
}
```

## Compound Components

```tsx
const TabsContext = createContext<{ activeTab: string; setActiveTab: (tab: string) => void } | undefined>(undefined);

export function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;
}

export function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab must be used within Tabs');
  return <button className={ctx.activeTab === id ? 'active' : ''} onClick={() => ctx.setActiveTab(id)}>{children}</button>;
}
```

## Render Props

```tsx
interface DataLoaderProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}
export function DataLoader<T>({ url, children }: DataLoaderProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).catch(setError).finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
}
```

Modern alternative: a hook (`useData(id)`) returning the same shape.

## Custom Hooks

```tsx
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
```

## State Management

```tsx
type Action =
  | { type: 'SET_MARKETS'; payload: Market[] }
  | { type: 'SELECT_MARKET'; payload: Market }
  | { type: 'SET_LOADING'; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MARKETS': return { ...state, markets: action.payload };
    case 'SELECT_MARKET': return { ...state, selectedMarket: action.payload };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    default: return state;
  }
}

const MarketContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { markets: [], selectedMarket: null, loading: false });
  return <MarketContext.Provider value={{ state, dispatch }}>{children}</MarketContext.Provider>;
}

export function useMarkets() {
  const context = useContext(MarketContext);
  if (!context) throw new Error('useMarkets must be used within MarketProvider');
  return context;
}
```

## Performance

```tsx
// Memoize expensive computation; copy before sorting

> Continued in [`component-patterns-2.md`](component-patterns-2.md)
