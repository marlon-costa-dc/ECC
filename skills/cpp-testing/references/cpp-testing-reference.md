---
name: cpp-testing-reference
description: Use when looking up detailed GoogleTest, GoogleMock, CMake, CTest, coverage, sanitizer, and flaky-test examples and recipes as a reference companion to cpp-testing.
---

# C++ Testing Reference

Detailed companion to [cpp-testing](../SKILL.md).

## TDD Workflow

RED → GREEN → REFACTOR:

1. Write a failing test that captures the behavior.
2. Implement the smallest change to pass.
3. Clean up while tests stay green.

## Code Examples

### Basic Unit Test

```cpp
#include <gtest/gtest.h>
int Add(int a, int b);
TEST(CalculatorTest, AddsTwoNumbers) {
    EXPECT_EQ(Add(2, 3), 5);
}
```

### Fixture

```cpp
class UserStoreTest : public ::testing::Test {
protected:
    void SetUp() override { store = std::make_unique<UserStore>(":memory:"); }
    std::unique_ptr<UserStore> store;
};
TEST_F(UserStoreTest, FindsExistingUser) {
    auto user = store->Find("alice");
    ASSERT_TRUE(user.has_value());
    EXPECT_EQ(user->name, "alice");
}
```

### Mock

```cpp
class Notifier {
public:
    virtual ~Notifier() = default;
    virtual void Send(const std::string& message) = 0;
};
class MockNotifier : public Notifier {
public:
    MOCK_METHOD(void, Send, (const std::string& message), (override));
};
TEST(ServiceTest, SendsNotifications) {
    MockNotifier notifier;
    Service service(notifier);
    EXPECT_CALL(notifier, Send("hello")).Times(1);
    service.Publish("hello");
}
```

## CMake/CTest Quickstart

```cmake
cmake_minimum_required(VERSION 3.20)
project(example LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)
set(GTEST_VERSION v1.17.0)
FetchContent_Declare(googletest URL https://github.com/google/googletest/archive/refs/tags/${GTEST_VERSION}.zip)
FetchContent_MakeAvailable(googletest)

add_executable(example_tests tests/calculator_test.cpp src/calculator.cpp)
target_link_libraries(example_tests GTest::gtest GTest::gmock GTest::gtest_main)

enable_testing()
include(GoogleTest)
gtest_discover_tests(example_tests)
```

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build -j
ctest --test-dir build --output-on-failure
```

## Running Tests

```bash
ctest --test-dir build --output-on-failure
ctest --test-dir build -R ClampTest
./build/example_tests --gtest_filter=ClampTest.*
```

## Coverage (GCC)

```bash
cmake -S . -B build-cov -DENABLE_COVERAGE=ON
cmake --build build-cov -j
ctest --test-dir build-cov
lcov --capture --directory build-cov --output-file coverage.info
lcov --remove coverage.info '/usr/*' --output-file coverage.info
genhtml coverage.info --output-directory coverage
```

## Sanitizers

```cmake
option(ENABLE_ASAN "Enable AddressSanitizer" OFF)
if(ENABLE_ASAN)
    add_compile_options(-fsanitize=address -fno-omit-frame-pointer)
    add_link_options(-fsanitize=address)
endif()
```

## Flaky Tests Guardrails

- Never use `sleep` for synchronization; use condition variables or latches.
- Make temp directories unique per test and always clean them.
- Avoid real time, network, or filesystem dependencies in unit tests.
- Use deterministic seeds for randomized inputs.

## Alternatives

- **Catch2**: header-only, expressive matchers.
- **doctest**: lightweight, minimal compile overhead.
