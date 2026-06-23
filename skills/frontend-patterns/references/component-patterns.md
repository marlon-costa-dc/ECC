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
const sortedMarkets = useMemo(() => [...markets].sort((a, b) => b.volume - a.volume), [markets]);

// Stable callback passed to children
const handleSearch = useCallback((query: string) => setSearchQuery(query), []);

// Pure component
export const MarketCard = React.memo<MarketCardProps>(({ market }) => (
  <div className="market-card">
    <h3>{market.name}</h3>
    <p>{market.description}</p>
  </div>
));

// Lazy loading
const HeavyChart = lazy(() => import('./HeavyChart'));
<Suspense fallback={<ChartSkeleton />}><HeavyChart data={data} /></Suspense>

// Virtualization
function VirtualMarketList({ markets }: { markets: Market[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: markets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });
  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(row => (
          <div key={row.index} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: `${row.size}px`, transform: `translateY(${row.start}px)` }}>
            <MarketCard market={markets[row.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Error Boundary

```tsx
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) { console.error(error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
```
