# Rust Testing Reference

Extended examples for the `rust-testing` skill.

## TDD Cycle

```rust
// RED
pub fn add(a: i32, b: i32) -> i32 { todo!() }

#[cfg(test)]
mod tests { use super::*; #[test] fn add_works() { assert_eq!(add(2, 3), 5); } }

// GREEN
pub fn add(a: i32, b: i32) -> i32 { a + b }
```

## Unit Tests

```rust
pub struct User { pub email: String }

impl User {
    pub fn new(email: impl Into<String>) -> Result<Self, String> {
        let email = email.into();
        if !email.contains('@') { return Err(format!("invalid email: {email}")); }
        Ok(Self { email })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_valid_email() {
        assert_eq!(User::new("alice@example.com").unwrap().email, "alice@example.com");
    }

    #[test]
    fn rejects_invalid_email() { assert!(User::new("not-an-email").is_err()); }
}
```

## Assertions and Panic Testing

```rust
assert_eq!(2 + 2, 4);
assert_ne!(2 + 2, 5);
assert!((0.1_f64 + 0.2 - 0.3).abs() < f64::EPSILON);

#[test]
#[should_panic(expected = "index out of bounds")]
fn panics_with_message() { let _ = vec![0i32; 0][0]; }
```

## Integration Tests

```rust
// tests/api_test.rs
use my_crate::{App, Config};

#[test]
fn health_ok() {
    let response = App::new(Config::test_default()).handle_request("/health");
    assert_eq!(response.status, 200);
}
```

## Async Tests

```rust
#[tokio::test]
async fn fetches_data() {
    assert!(TestClient::new().await.get("/data").await.is_ok());
}

#[tokio::test]
async fn handles_timeout() {
    assert!(tokio::time::timeout(Duration::from_millis(100), slow_operation()).await.is_err());
}
```

## Parameterized Tests

```rust
use rstest::{rstest, fixture};

#[rstest]
#[case("hello", 5)]
#[case("", 0)]
fn string_length(#[case] input: &str, #[case] expected: usize) {
    assert_eq!(input.len(), expected);
}

#[fixture]
fn db() -> TestDb { TestDb::new_in_memory() }

#[rstest]
fn insert(db: TestDb) {
    db.insert("key", "value");
    assert_eq!(db.get("key"), Some("value".into()));
}
```

## Property-Based Tests

```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn encode_decode_roundtrip(input in ".*") {
        assert_eq!(input, decode(&encode(&input)).unwrap());
    }
}
```

## Mocking

```rust
use mockall::{automock, predicate::eq};

#[automock]
trait UserRepository { fn find_by_id(&self, id: u64) -> Option<User>; }

#[test]
fn returns_user_when_found() {
    let mut mock = MockUserRepository::new();
    mock.expect_find_by_id().with(eq(42))
        .returning(|_| Some(User { id: 42, name: "Alice".into() }));
    assert_eq!(UserService::new(Box::new(mock)).get_user(42).unwrap().name, "Alice");
}
```

## Doc Tests

```rust
/// Adds two numbers.
///
/// ```
/// use my_crate::add;
/// assert_eq!(add(2, 3), 5);
/// ```
pub fn add(a: i32, b: i32) -> i32 { a + b }
```

## Benchmarking

```toml
[dev-dependencies]
criterion = { version = "0.5", features = ["html_reports"] }

[[bench]]
name = "benchmark"
harness = false
```

```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};

fn bench_fibonacci(c: &mut Criterion) {
    c.bench_function("fib 20", |b| b.iter(|| fibonacci(black_box(20))));
}

criterion_group!(benches, bench_fibonacci);
criterion_main!(benches);
```

## Coverage

```bash
cargo llvm-cov --html
cargo llvm-cov --fail-under-lines 80
```
