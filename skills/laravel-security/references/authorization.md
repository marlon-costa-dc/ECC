# Laravel Security: Authorization

## Gates

```php
// App\Providers\AuthServiceProvider
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

public function boot(): void
{
    Gate::define('update-post', function (User $user, Post $post): bool {
        return $user->id === $post->user_id;
    });

    Gate::define('publish-post', function (User $user): bool {
        return in_array($user->role, ['editor', 'admin']);
    });

    Gate::before(function (User $user, string $ability): ?bool {
        if ($user->role === 'super-admin') {
            return true;
        }
        return null;
    });
}
```

Usage:

```php
Gate::authorize('update-post', $post);
abort_unless(Auth::user()->can('update-post', $post), 403);
```

## Policies

```php
// App\Policies\PostPolicy
class PostPolicy
{
    use HandlesAuthorization;

    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Post $post): bool
    {
        return $post->is_published || ($user && $user->id === $post->user_id);
    }

    public function create(User $user): bool
    {
        return $user->hasVerifiedEmail();
    }

    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    public function delete(User $user, Post $post): bool
    {
        return $user->id === $post->user_id && $post->created_at->diffInDays(now()) <= 30;
    }

    public function forceDelete(User $user, Post $post): bool
    {
        return $user->role === 'super-admin';
    }
}
```

Register in `AuthServiceProvider`:

```php
protected $policies = [
    Post::class => PostPolicy::class,
];
```

Controller and Blade usage:

```php
public function show(Post $post): View
{
    $this->authorize('view', $post);
    return view('posts.show', compact('post'));
}
```

```blade
@can('update', $post)
    <a href="{{ route('posts.edit', $post) }}">Edit</a>
@endcan
```

## Middleware Authorization

```php
Route::put('/posts/{post}', [PostController::class, 'update'])
    ->middleware('can:update,post');

Route::get('/posts/create', [PostController::class, 'create'])
    ->middleware('can:create,App\Models\Post');
```

Custom role middleware:

```php
class CheckRole
{
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        if (!$request->user() || $request->user()->role !== $role) {
            abort(403, 'Unauthorized. This area requires role: ' . $role);
        }
        return $next($request);
    }
}
```

Register in `Kernel`:

```php
protected $routeMiddleware = [
    'role' => \App\Http\Middleware\CheckRole::class,
];
```

Use:

```php
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
});
```
