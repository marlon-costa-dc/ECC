---
name: perl-patterns-reference
description: Reference companion for perl-patterns containing detailed code examples of modern Perl 5.36+ signatures, dereferencing, object systems, regular expressions, file I/O, module layout, tooling configuration, and common anti-patterns.
---

# Modern Perl Patterns — Reference

## Subroutine Signatures

```perl
use v5.36;

sub connect_db($host, $port = 5432, $timeout = 30) {
    return DBI->connect("dbi:Pg:host=$host;port=$port", undef, undef, {
        RaiseError => 1,
        PrintError => 0,
    });
}

sub log_message($level, @details) {
    say "[$level] " . join(' ', @details);
}
```

## Postfix Dereferencing

```perl
use v5.36;

my $data = {
    users => [
        { name => 'Alice', roles => ['admin', 'user'] },
        { name => 'Bob',   roles => ['user'] },
    ],
};

my @users = $data->{users}->@*;
my @roles = $data->{users}[0]{roles}->@*;
my %first = $data->{users}[0]->%*;
```

## Modern OO with Moo

```perl
package User;
use Moo;
use Types::Standard qw(Str Int ArrayRef);
use namespace::autoclean;

has name  => (is => 'ro', isa => Str, required => 1);
has email => (is => 'ro', isa => Str, required => 1);
has age   => (is => 'ro', isa => Int, default  => sub { 0 });
has roles => (is => 'ro', isa => ArrayRef[Str], default => sub { [] });

sub is_admin($self) {
    return grep { $_ eq 'admin' } $self->roles->@*;
}

1;
```

## Native `class` Keyword (5.38+)

```perl
use v5.38;
use feature 'class';
no warnings 'experimental::class';

class Point {
    field $x :param;
    field $y :param;
    method magnitude() { sqrt($x**2 + $y**2) }
}
```

## Error Handling

```perl
use v5.36;
use Try::Tiny;

sub fetch_user($id) {
    my $user = try {
        $db->resultset('User')->find($id)
            // die "User $id not found\n";
    }
    catch {
        warn "Failed to fetch user $id: $_";
        undef;
    };
    return $user;
}
```

## Regular Expressions

```perl
use v5.36;

my $log_re = qr{
    ^ (?<timestamp> \d{4}-\d{2}-\d{2} \s \d{2}:\d{2}:\d{2} )
    \s+ \[ (?<level> \w+ ) \]
    \s+ (?<message> .+ ) $
}x;

if ($line =~ $log_re) {
    say "Time: $+{timestamp}, Level: $+{level}";
}
```

## File I/O

```perl
use v5.36;
use autodie;

sub read_file($path) {
    open my $fh, '<:encoding(UTF-8)', $path;
    local $/;
    my $content = <$fh>;
    close $fh;
    return $content;
}
```

## Tooling Configuration

```text
# .perltidyrc
-i=4
-l=100
-ci=4
-ce
-bar
-nolq
```

```ini
# .perlcriticrc
severity = 3
theme = core + pbp + security

[InputOutput::RequireCheckedSyscalls]
functions = :builtins
exclude_functions = say print

[Subroutines::ProhibitExplicitReturnUndef]
severity = 4
```

## Anti-Patterns

```perl
# Two-arg open (security risk)
open FH, $filename;                     # NEVER

# Indirect object syntax
my $obj = new Foo(bar => 1);            # Bad
my $obj = Foo->new(bar => 1);           # Good

# String eval for module loading
eval "require $module";                  # Bad
use Module::Runtime 'require_module';    # Good
```
