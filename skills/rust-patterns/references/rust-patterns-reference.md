# Rust Patterns Reference

Extended examples and anti-patterns for the `rust-patterns` skill.

## Ownership and Borrowing

```rust
// Good: pass references
fn process(data: &[u8]) -> usize { data.len() }

// Good: take ownership to store
fn store(data: Vec<u8>) -> Record { Record { payload: data } }

// Flexible ownership
use std::borrow::Cow;
fn normalize(input: &str) -> Cow<'_, str> {
    if input.contains(' ') { Cow::Owned(input.replace(' ', "_")) }
    else { Cow::Borrowed(input) }
}
```

## Error Handling

```rust
use anyhow::{Context, Result};
fn load_config(path: &str) -> Result<Config> {
    let content = std::fs::read_to_string(path)
        .with_context(|| format!("failed to read config from {path}"))?;
    Ok(toml::from_str(&content)?)
}

// Library errors
use thiserror::Error;
#[derive(Debug, Error)]
pub enum StorageError {
    #[error("record not found: {id}")]
    NotFound { id: String },
    #[error("connection failed")]
    Connection(#[from] std::io::Error),
}
```

## Enums and Pattern Matching

```rust
enum ConnectionState {
    Disconnected,
    Connecting { attempt: u32 },
    Connected { session_id: String },
    Failed { reason: String, retries: u32 },
}

fn handle(state: &ConnectionState) {
    match state {
        ConnectionState::Disconnected => connect(),
        ConnectionState::Connecting { attempt } if *attempt > 3 => abort(),
        ConnectionState::Connecting { .. } => wait(),
        ConnectionState::Connected { session_id } => use_session(session_id),
        ConnectionState::Failed { retries, .. } if *retries < 5 => retry(),
        ConnectionState::Failed { reason, .. } => log_failure(reason),
    }
}
```

## Traits, Generics, and Newtypes

```rust
// Generic input, concrete output
fn read_all(reader: &mut impl Read) -> std::io::Result<Vec<u8>> {
    let mut buf = Vec::new();
    reader.read_to_end(&mut buf)?;
    Ok(buf)
}

// Newtype for safety
struct UserId(u64);
struct OrderId(u64);
fn get_order(user: UserId, order: OrderId) -> Result<Order> { todo!() }
```

## Iterators

```rust
let active: Vec<String> = users.iter()
    .filter(|u| u.is_active)
    .map(|u| u.email.clone())
    .collect();

let parsed: Result<Vec<i32>, _> = strings.iter().map(|s| s.parse()).collect();
```

## Concurrency

```rust
use std::sync::{Arc, Mutex};
let counter = Arc::new(Mutex::new(0));
let handles: Vec<_> = (0..10).map(|_| {
    let c = Arc::clone(&counter);
    std::thread::spawn(move || { *c.lock().unwrap() += 1; })
}).collect();
for h in handles { h.join().unwrap(); }

// Async
async fn fetch_with_timeout(url: &str) -> anyhow::Result<String> {
    let resp = tokio::time::timeout(Duration::from_secs(5), reqwest::get(url)).await??;
    Ok(resp.text().await?)
}
```

## Unsafe

```rust
/// # Safety
/// `ptr` must be valid and aligned.
unsafe fn widget_from_raw<'a>(ptr: *const Widget) -> &'a Widget {
    unsafe { &*ptr }
}
```

## Module Structure

```text
src/
├── main.rs
├── lib.rs
├── auth/
│   ├── mod.rs
│   ├── token.rs
│   └── middleware.rs
├── orders/
│   ├── mod.rs
│   ├── model.rs
│   └── service.rs
└── db/
tests/
benches/
```

## Anti-Patterns

```rust
// Bad: unwrap in production
let value = map.get("key").unwrap();

// Bad: clone to satisfy borrow checker without understanding why
let data = expensive_data.clone();

// Bad: String when &str suffices
fn greet(name: String) { }

// Bad: Box<dyn Error> in libraries (use thiserror)

// Bad: blocking in async
std::thread::sleep(Duration::from_secs(1));
```
