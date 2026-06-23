---
name: perl-patterns
description: Use when writing, reviewing, or refactoring Perl 5.36+ code and the user needs idiomatic patterns for subroutine signatures, postfix dereferencing, modern object systems, regular expressions, file I/O, module organization, and tooling choices.
origin: ECC
---

# Modern Perl Development Patterns

## When to Activate

- Writing new Perl modules or scripts
- Reviewing Perl code for idiom compliance
- Refactoring legacy Perl to modern standards
- Designing Perl module architecture

## Core Rules

1. **Use `use v5.36`** instead of `use strict; use warnings; use feature ...`.
2. **Use subroutine signatures** for arity checking and defaults.
3. **Prefer postfix dereferencing** (`$ref->@*`, `$ref->%*`) and the `isa` operator.
4. **Prefer Moo** for OO; use native `class` only on Perl 5.38+.
5. **Use named captures and `/x`** for complex regexes.
6. **Use three-argument `open`** with lexical filehandles and `Path::Tiny` for file ops.
7. **Use `Try::Tiny`** or native `try/catch` (5.40+) for exceptions.
8. **Avoid**: two-arg open, indirect object syntax, string eval, global config, `no strict 'refs'`.

## Modern Replacements

- `my ($x, $y) = @_;` → `sub foo($x, $y)`
- `@{ $ref }` → `$ref->@*`
- `open FH, $file` → `open my $fh, '<:encoding(UTF-8)', $file`
- blessed hashref → `Moo` class with types
- `$1, $2` → `$+{name}`
- `eval { }; if ($@)` → `Try::Tiny` / native `try/catch`

For detailed examples and anti-patterns, see [references/perl-patterns-reference.md](references/perl-patterns-reference.md).

## Cross-References

- [perl-security](perl-security/SKILL.md) for taint mode, injection prevention, and secure defaults.
- [perl-testing](perl-testing/SKILL.md) for Test2::V0 and TDD workflows.
