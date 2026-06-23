---
name: perl-testing-reference
description: Reference companion for perl-testing containing detailed code examples for Test2::V0 assertions, Test::More basics, prove commands, subtests, mocking, fixtures, Devel::Cover usage, integration tests, and common pitfalls.
---

# Perl Testing Patterns — Reference

## TDD Workflow

```perl
# t/unit/calculator.t
use v5.36;
use Test2::V0;

use lib 'lib';
use Calculator;

subtest 'addition' => sub {
    my $calc = Calculator->new;
    is($calc->add(2, 3), 5, 'adds two numbers');
    is($calc->add(-1, 1), 0, 'handles negatives');
};

done_testing;
```

## Test::More Basics

```perl
use v5.36;
use Test::More;

is($result, 42, 'returns correct value');
ok($user->is_active, 'user is active');
is_deeply($got, { name => 'Alice', roles => ['admin'] }, 'structure matches');
like($error, qr/not found/i, 'error mentions not found');
isa_ok($obj, 'MyApp::User');

done_testing;
```

## Test2::V0 Deep Comparison

```perl
use v5.36;
use Test2::V0;

is(
    $user->to_hash,
    hash {
        field name  => 'Alice';
        field email => match(qr/\@example\.com$/);
        field age   => validator(sub { $_ >= 18 });
        etc();
    },
    'user has expected fields'
);

is(
    $tags,
    bag { item 'perl'; item 'testing'; item 'tdd'; },
    'has all required tags regardless of order'
);
```

## Exception Testing

```perl
use v5.36;
use Test2::V0;

like(
    dies { divide(10, 0) },
    qr/Division by zero/,
    'dies on division by zero'
);

ok(lives { divide(10, 2) }, 'division succeeds') or note($@);
```

## prove Commands

```bash
prove -l t/               # Run all tests
prove -lv t/unit/user.t   # Run one test verbose
prove -lr -j8 t/          # Parallel execution
prove -l --state=failed t/ # Re-run failures
prove -l --color --timer t/
```

## Fixtures and Setup/Teardown

```perl
use v5.36;
use Test2::V0;
use File::Temp qw(tempdir);
use Path::Tiny;

subtest 'file processing' => sub {
    my $dir = tempdir(CLEANUP => 1);
    my $file = path($dir, 'input.txt');
    $file->spew_utf8("line1\nline2\nline3\n");

    my $result = process_file("$file");
    is($result->{line_count}, 3, 'counts lines');
};
```

## Mocking

```perl
use v5.36;
use Test2::V0;
use Test::MockModule;

subtest 'mock external API' => sub {
    my $mock = Test::MockModule->new('MyApp::API');
    $mock->mock(fetch_user => sub ($self, $id) {
        return { id => $id, name => 'Mock User', email => 'mock@test.com' };
    });

    my $api = MyApp::API->new;
    my $user = $api->fetch_user(42);
    is($user->{name}, 'Mock User', 'returns mocked user');
};
```

## Coverage

```bash
cover -test
cover -report html
open cover_db/coverage.html
```

## Integration Testing

```perl
use v5.36;
use Test2::V0;
use DBI;

subtest 'database integration' => sub {
    my $dbh = DBI->connect('dbi:SQLite:dbname=:memory:', '', '', {
        RaiseError => 1,
    });
    $dbh->do('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)');
    $dbh->prepare('INSERT INTO users (name) VALUES (?)')->execute('Alice');
    my $row = $dbh->selectrow_hashref('SELECT * FROM users WHERE name = ?', undef, 'Alice');
    is($row->{name}, 'Alice', 'inserted and retrieved user');
};

done_testing;
```
