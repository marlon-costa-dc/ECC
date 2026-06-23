---
name: perl-testing
description: Use when writing, reviewing, or debugging Perl tests and the user needs patterns for Test2::V0, Test::More, prove, mocking, coverage, fixtures, and TDD cycles.
origin: ECC
---

# Perl Testing Patterns

## When to Activate

- Writing new Perl code (follow TDD: red, green, refactor)
- Designing test suites for Perl modules or applications
- Reviewing Perl test coverage
- Setting up Perl testing infrastructure
- Migrating tests from Test::More to Test2::V0
- Debugging failing Perl tests

## Core Rules

1. **Follow TDD**: red-green-refactor.
2. **Use Test2::V0** for new projects; `Test::More` is acceptable for legacy.
3. **Run tests with `prove -l`** and use subtests to isolate state.
4. **End every test file** with `done_testing`.
5. **Mock boundaries** with `Test::MockModule`; never monkey-patch globally.
6. **Use `File::Temp` and `Path::Tiny`** for fixture setup/teardown.
7. **Aim for 80%+ coverage** with `Devel::Cover`; gate CI on thresholds.
8. **Test behavior and output**, not implementation internals.
9. **Keep tests fast**: mock I/O and use in-memory databases.

## Quick Commands

- Run all: `prove -lr t/`
- Verbose: `prove -lv t/unit/user.t`
- Parallel: `prove -lr -j8 t/`
- Coverage: `cover -test && cover -report html`
- Equality: `is($got, $expected, 'label')`
- Deep: `is($got, hash { field k => 'v'; etc() }, 'label')`
- Exception: `like(dies { ... }, qr/msg/, 'label')`
- Mock: `Test::MockModule->new('Pkg')->mock(m => sub { ... })`

For detailed examples of Test2::V0, fixtures, mocking, and coverage, see [references/perl-testing-reference.md](references/perl-testing-reference.md).

## Cross-References

- [perl-patterns](perl-patterns/SKILL.md) for modern Perl idioms.
- [perl-security](perl-security/SKILL.md) for secure test fixtures.
