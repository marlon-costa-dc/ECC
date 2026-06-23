$app->secrets(['long-random-secret-rotated-regularly']);
$app->sessions->secure(1);
$app->sessions->samesite('Lax');

$app->hook(after_dispatch => sub ($c) {
    $c->res->headers->header('X-Content-Type-Options' => 'nosniff');
    $c->res->headers->header('X-Frame-Options'        => 'DENY');
    $c->res->headers->header('Content-Security-Policy' => "default-src 'self'");
    $c->res->headers->header('Strict-Transport-Security' => 'max-age=31536000; includeSubDomains');
});
```

## perlcritic Security Configuration

```ini
severity = 3
theme = security + core

[InputOutput::RequireThreeArgOpen]
severity = 5

[InputOutput::RequireCheckedSyscalls]
functions = :builtins
severity = 4

[BuiltinFunctions::ProhibitStringyEval]
severity = 5

[InputOutput::ProhibitBacktickOperators]
severity = 4

[Modules::RequireTaintChecking]
severity = 5

[InputOutput::ProhibitTwoArgOpen]
severity = 5

[InputOutput::ProhibitBarewordFileHandles]
severity = 5
```
