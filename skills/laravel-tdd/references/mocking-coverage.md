# Laravel TDD: Mocking and Coverage

## HTTP Fake

```php
use Illuminate\Support\Facades\Http;

public function test_it_handles_successful_payment(): void
{
    Http::fake([
        'api.stripe.com/*' => Http::response(['id' => 'pi_123', 'status' => 'succeeded'], 200),
    ]);

    $result = (new PaymentService())->charge(2999);
    $this->assertTrue($result->success);
}

public function test_it_retries_on_timeout(): void
{
    Http::fake([
        'api.stripe.com/*' => Http::sequence()->pushStatus(408)->pushStatus(200),
    ]);

    $this->assertTrue((new PaymentService())->charge(2999)->success);
}
```

## Other Fakes

```php
Mail::fake();
$order->sendConfirmation();
Mail::assertSent(OrderConfirmation::class, fn ($mail) => $mail->hasTo($order->user->email));

Notification::fake();
$user->notify(new WelcomeUser());
Notification::assertSentTo($user, WelcomeUser::class);

Queue::fake();
ProcessImage::dispatch($product);
Queue::assertPushed(ProcessImage::class, fn ($job) => $job->product->id === $product->id);

Storage::fake('public');
$file = UploadedFile::fake()->image('photo.jpg', 200, 200);
$response = $this->actingAs($user)->post('/avatar', ['avatar' => $file]);
$response->assertSessionHasNoErrors();
Storage::disk('public')->assertExists('avatars/' . $file->hashName());

Event::fake();
$order->markAsShipped();
Event::assertDispatched(OrderShipped::class, fn ($event) => $event->order->id === $order->id);
```

## Artisan and Authorization Tests

```php
public function test_it_sends_newsletters(): void
{
    Mail::fake();
    User::factory()->count(5)->create(['subscribed' => true]);

    $this->artisan('newsletter:send')
        ->expectsOutput('Sending newsletter to 5 subscribers...')
        ->assertExitCode(0);

    Mail::assertSent(NewsletterMail::class, 5);
}

public function test_users_cannot_update_others_posts(): void
{
    $post = Post::factory()->create();
    $this->actingAs(User::factory()->create())
        ->put(route('posts.update', $post), ['title' => 'Hacked'])
        ->assertForbidden();
}
```

## Pest Feature Tests

```php
uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

it('lists products', function () {
    Product::factory()->count(3)->create(['user_id' => $this->user->id]);
    $this->get(route('products.index'))
        ->assertOk()
        ->assertViewHas('products');
});

it('authorizes updates', function () {
    $other = User::factory()->create();
    $product = Product::factory()->create(['user_id' => $other->id]);
    $this->put(route('products.update', $product), ['name' => 'Hacked'])
        ->assertForbidden();
});
```

## Coverage

```bash
vendor/bin/phpunit --coverage-html coverage --coverage-clover clover.xml
vendor/bin/pest --coverage --min=80
```

| Component | Target |
|-----------|--------|
| Models | 95%+ |
| Actions/Services | 90%+ |
| Form Requests | 90%+ |
| Controllers | 85%+ |
| Policies | 95%+ |
| Overall | 80%+ |

## Best Practices

- Use factories over manual `create()` calls.
- Keep one logical assertion per test.
- Name tests descriptively: `test_guests_cannot_create_products`.
- Test edge cases and authorization boundaries.
- Mock external services with `Http::fake()`, `Mail::fake()`.
- Use `RefreshDatabase` for clean state.
- Do not test Laravel internals or private methods.
