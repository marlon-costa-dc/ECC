# Go Patterns Reference

Detailed examples for idiomatic Go.

## Error Handling

Wrap errors with context:

```go
func LoadConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("load config %s: %w", path, err)
    }
    if err := json.Unmarshal(data, &cfg); err != nil {
        return nil, fmt.Errorf("parse config %s: %w", path, err)
    }
    return &cfg, nil
}
```

Custom errors and sentinels:

```go
type ValidationError struct{ Field, Message string }

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Message)
}

var ErrNotFound = errors.New("resource not found")

func HandleError(err error) {
    if errors.Is(err, sql.ErrNoRows) { /* ... */ }
    var validationErr *ValidationError
    if errors.As(err, &validationErr) { /* ... */ }
}
```

## Concurrency

Worker pool:

```go
func WorkerPool(jobs <-chan Job, results chan<- Result, n int) {
    var wg sync.WaitGroup
    for i := 0; i < n; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs { results <- process(j) }
        }()
    }
    wg.Wait()
    close(results)
}
```

Context timeout:

```go
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
defer cancel()
req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
```

errgroup:

```go
import "golang.org/x/sync/errgroup"

func FetchAll(ctx context.Context, urls []string) ([][]byte, error) {
    g, ctx := errgroup.WithContext(ctx)
    results := make([][]byte, len(urls))
    for i, url := range urls {
        i, url := i, url
        g.Go(func() error {
            data, err := FetchWithTimeout(ctx, url)
            if err != nil { return err }
            results[i] = data
            return nil
        })
    }
    return results, g.Wait()
}
```

Avoid goroutine leaks with buffered channels and `select` on `ctx.Done()`.

## Interfaces

Define small interfaces at the consumer:

```go
package service

type UserStore interface {
    GetUser(id string) (*User, error)
    SaveUser(user *User) error
}

type Service struct{ store UserStore }
```

Compose interfaces and assert optional behavior:

```go
type ReadWriteCloser interface { Reader; Writer; Closer }

if f, ok := w.(Flusher); ok { return f.Flush() }
```

## Structs and Packages

Functional options:

```go
type Option func(*Server)

func WithTimeout(d time.Duration) Option {
    return func(s *Server) { s.timeout = d }
}

func NewServer(addr string, opts ...Option) *Server {
    s := &Server{addr: addr, timeout: 30*time.Second, logger: log.Default()}
    for _, opt := range opts { opt(s) }
    return s
}
```

Dependency injection over package-level state:

```go
// Bad
var db *sql.DB
func init() { db, _ = sql.Open(...) }

// Good
type Server struct{ db *sql.DB }
func NewServer(db *sql.DB) *Server { return &Server{db: db} }
```

## Performance

Preallocate slices, use `sync.Pool` for frequent allocations, and `strings.Builder` instead of string concatenation in loops.

## Tooling

Run `go vet ./...`, `golangci-lint run`, `go test -race -cover ./...`, `go mod tidy`, `gofmt`, and `goimports`.

Recommended linters: `errcheck`, `gosimple`, `govet`, `ineffassign`, `staticcheck`, `unused`, `gofmt`, `goimports`, `misspell`, `unconvert`, `unparam`.
