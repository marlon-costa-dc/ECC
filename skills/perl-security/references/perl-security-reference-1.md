---
name: perl-security-reference
description: Reference companion for perl-security containing detailed code examples for taint mode, input validation, safe file and process execution, DBI parameterization, web security, session headers, perlcritic configuration, and security anti-patterns.
---

# Perl Security Patterns — Reference

## Taint Mode

```perl
#!/usr/bin/perl -T
use v5.36;

my $input = $ARGV[0];        # Tainted

$ENV{PATH} = '/usr/local/bin:/usr/bin:/bin';
delete @ENV{qw(IFS CDPATH ENV BASH_ENV)};

sub untaint_username($input) {
    if ($input =~ /^([a-zA-Z0-9_]{3,30})$/) {
        return $1;
    }
    die "Invalid username\n";
}
```

## Input Validation

```perl
use v5.36;

sub validate_sort_field($field) {
    my %allowed = map { $_ => 1 } qw(name email created_at updated_at);
    die "Invalid sort field: $field\n" unless $allowed{$field};
    return $field;
}

sub validate_integer($input) {
    if ($input =~ /^(-?\d{1,10})$/) {
        return $1 + 0;
    }
    die "Invalid integer\n";
}
```

## Safe File Operations

```perl
use v5.36;
use Fcntl qw(:DEFAULT :flock);
use File::Spec;
use Cwd qw(realpath);

sub create_file_safe($path) {
    sysopen(my $fh, $path, O_WRONLY | O_CREAT | O_EXCL, 0600)
        or die "Cannot create '$path': $!\n";
    return $fh;
}

sub safe_path($base_dir, $user_path) {
    my $real = realpath(File::Spec->catfile($base_dir, $user_path))
        // die "Path does not exist\n";
    my $base_real = realpath($base_dir)
        // die "Base dir does not exist\n";
    die "Path traversal blocked\n" unless $real =~ /^\Q$base_real\E(?:\/|\z)/;
    return $real;
}
```

## Safe Process Execution

```perl
use v5.36;
use IPC::Run3;

sub run_command(@cmd) {
    system(@cmd) == 0
        or die "Command failed: @cmd\n";
}

sub capture_output(@cmd) {
    my ($stdout, $stderr);
    run3(\@cmd, \undef, \$stdout, \$stderr);
    if ($?) {
        die "Command failed (exit $?): $stderr\n";
    }
    return $stdout;
}
```

## SQL Injection Prevention

```perl
use v5.36;
use DBI;

sub find_user($dbh, $email) {
    my $sth = $dbh->prepare('SELECT * FROM users WHERE email = ?');
    $sth->execute($email);
    return $sth->fetchrow_hashref;
}

sub order_by($dbh, $column, $direction) {
    my %allowed_cols = map { $_ => 1 } qw(name email created_at);
    my %allowed_dirs = map { $_ => 1 } qw(ASC DESC);
    die "Invalid column\n" unless $allowed_cols{$column};
    die "Invalid direction\n" unless $allowed_dirs{uc $direction};
    my $sth = $dbh->prepare("SELECT * FROM users ORDER BY $column $direction");
    $sth->execute;
    return $sth->fetchall_arrayref({});
}
```

## Web Security

```perl
use v5.36;
use HTML::Entities qw(encode_entities);
use URI::Escape qw(uri_escape_utf8);
use JSON::MaybeXS qw(encode_json);

sub safe_html($user_input) { encode_entities($user_input) }
sub safe_url_param($value) { uri_escape_utf8($value) }
sub safe_json($data)       { encode_json($data) }
```

## Session and Header Security

```perl
use v5.36;

> Continued in [`perl-security-reference-2.md`](perl-security-reference-2.md)
