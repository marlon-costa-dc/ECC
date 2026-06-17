---
name: cpp-core-guidelines-reference
description: Use when looking up C++ Core Guidelines rules, examples, and anti-patterns as reference companion to cpp-coding-standards. Covers RAII, classes, functions, resources, expressions, errors, concurrency, templates, and naming.
---

# C++ Core Guidelines Reference

Companion to [cpp-coding-standards](../SKILL.md). Based on [isocpp.github.io/CppCoreGuidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines).

## Rules by Area

| Area | Rules |
|------|-------|
| Philosophy | P.1 direct, P.3 intent, P.4 type safety, P.5 compile-time checks, P.8 no leaks, P.10 immutable data |
| Interfaces | I.1 explicit, I.2 no non-const globals, I.4 strongly typed, I.11 no raw ownership transfer |
| Functions | F.1 good names, F.3 single operation, F.4 `constexpr`, F.6 `noexcept`, F.16 cheap-by-value/else `const&`, F.20 return values |
| Classes | C.2 class/struct choice, C.9 minimize exposure, C.20 Rule of Zero, C.21 Rule of Five, C.35 destructor rule, C.46 `explicit`, C.128 virtual/override/final |
| Resources | R.1 RAII, R.3 raw pointer non-owning, R.10/11 no `malloc`/`new`, R.20/21 smart pointers, R.22 `make_shared` |
| Expressions | ES.5 small scopes, ES.20 initialize, ES.23 `{}`, ES.25 `const`, ES.45 no magic numbers, ES.46 no narrowing, ES.47 `nullptr`, ES.48 no casts, ES.50 no const cast |
| Errors | E.1 strategy early, E.2 throw on failure, E.6 RAII, E.12 `noexcept`, E.14 custom exceptions, E.15 throw by value/catch by reference |
| Constants | Con.1 immutable, Con.2 `const` members, Con.3 const refs, Con.5 `constexpr` |
| Concurrency | CP.2 no data races, CP.20 RAII locks, CP.21 `scoped_lock`, CP.22 no unknown code while locked, CP.42 wait with condition, CP.100 avoid lock-free |
| Templates | T.1 abstraction, T.10 concepts, T.11 standard concepts, T.43 `using` over `typedef`, T.120 avoid TMP, T.144 overload don't specialize |
| Standard Library | SL.1 use libraries, SL.con.1/2 array/vector over C arrays, SL.str.1/2 string owns/string_view observes, SL.io.50 `'\n'` not `endl` |
| Enumerations | Enum.1 enums over macros, Enum.3 `enum class`, Enum.5 no ALL_CAPS, Enum.6 no unnamed enums |
| Source Files | SF.1 `.cpp`/`.h`, SF.7 no `using namespace` in headers, SF.8 include guards, SF.11 self-contained, NL.5 no Hungarian, NL.8/10 underscore_style, NL.9 ALL_CAPS only macros |
| Performance | Per.1/2/6 don't optimize without reason/measurement, Per.11 compile-time, Per.19 predictable memory access |

## Examples

```cpp
// Immutable, strongly typed interface
struct Temperature { double kelvin; };
Temperature boil(const Temperature& water);

// RAII smart pointers
auto widget = std::make_unique<Widget>();
void render(const Widget* w); // non-owning observer

// Rule of Zero
struct Employee { std::string name; int id; };

// RAII locking
class ThreadSafeQueue {
    void push(int v) {
        std::lock_guard<std::mutex> lock(mutex_);
        queue_.push(v); cv_.notify_one();
    }
    std::mutex mutex_; std::condition_variable cv_; std::queue<int> queue_;
};
```

## Anti-Patterns

- Raw `new`/`delete`, `malloc`/`free` (R.10, R.11)
- Non-const globals (I.2)
- Returning reference to local (F.43)
- C-style casts, casting away `const` (ES.48, ES.50)
- `0`/`NULL` as pointer (ES.47)
- Magic numbers (ES.45)
- `using namespace std;` in headers (SF.7)
- `volatile` for synchronization (CP.8)
- Lock-free (CP.100)
