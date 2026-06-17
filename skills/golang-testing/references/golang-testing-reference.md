# Go Testing Reference

Detailed examples for Go tests, benchmarks, fuzzing, and coverage.

## Table-Driven Tests

```go
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive", 2, 3, 5},
        {"negative", -1, -2, -3},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := Add(tt.a, tt.b); got != tt.expected {
                t.Errorf("Add(%d,%d)=%d; want %d", tt.a, tt.b, got, tt.expected)
            }
        })
    }
}
```

Error cases:

```go
func TestParseConfig(t *testing.T) {
    tests := []struct {
        name, input string
        want        *Config
        wantErr     bool
    }{
        {"valid", `{"host":"localhost"}`, &Config{Host: "localhost"}, false},
        {"invalid", `{invalid}`, nil, true},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := ParseConfig(tt.input)
            if (err != nil) != tt.wantErr {
                t.Fatalf("err=%v, wantErr=%v", err, tt.wantErr)
            }
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("got %+v; want %+v", got, tt.want)
            }
        })
    }
}
```

## Subtests

```go
func TestUser(t *testing.T) {
    db := setupTestDB(t)
    t.Run("Create", func(t *testing.T) { /* ... */ })
    t.Run("Get", func(t *testing.T) { /* ... */ })
}

func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()
    db, err := sql.Open("sqlite3", ":memory:")
    if err != nil {
        t.Fatalf("failed to open database: %v", err)
    }
    t.Cleanup(func() { db.Close() })
    return db
}
```

Parallel subtests:

```go
for _, tt := range tests {
    tt := tt
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()
    })
}
```

## Golden Files and Mocking

Golden files:

```go
var update = flag.Bool("update", false, "update golden files")

func TestRender(t *testing.T) {
    got := Render(input)
    golden := filepath.Join("testdata", name+".golden")
    if *update { os.WriteFile(golden, got, 0644) }
    want, _ := os.ReadFile(golden)
    if !bytes.Equal(got, want) { t.Errorf("mismatch") }
}
```

Mock:

```go
type UserRepository interface {
    GetUser(id string) (*User, error)
    SaveUser(user *User) error
}

type MockUserRepository struct {
    GetUserFunc func(id string) (*User, error)
}

func (m *MockUserRepository) GetUser(id string) (*User, error) {
    return m.GetUserFunc(id)
}
```

## Benchmarks

```go
func BenchmarkProcess(b *testing.B) {
    data := generateTestData(1000)
    b.ResetTimer()
    for i := 0; i < b.N; i++ { Process(data) }
}
```

Run with `go test -bench=. -benchmem ./...`.

## Fuzzing

```go
func FuzzParseJSON(f *testing.F) {
    f.Add(`{"name":"test"}`)
    f.Fuzz(func(t *testing.T, input string) {
        var result map[string]interface{}
        if err := json.Unmarshal([]byte(input), &result); err != nil { return }
        if _, err := json.Marshal(result); err != nil {
            t.Errorf("Marshal failed after Unmarshal: %v", err)
        }
    })
}
```

## Coverage

Targets: critical logic 100%, public APIs 90%, general code 80%.

Run: `go test -coverprofile=coverage.out ./...` and view with `go tool cover`.

## Handler Testing

```go
func TestHealthHandler(t *testing.T) {
    req := httptest.NewRequest(http.MethodGet, "/health", nil)
    w := httptest.NewRecorder()
    HealthHandler(w, req)
    if w.Code != http.StatusOK {
        t.Errorf("got status %d; want %d", w.Code, http.StatusOK)
    }
}
```
