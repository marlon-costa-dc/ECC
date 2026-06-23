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
