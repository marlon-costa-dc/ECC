# Laravel TDD: Model and Feature Tests

## Model Tests

```php
namespace Tests\Unit\Models;

use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_hides_sensitive_attributes(): void
    {
        $user = User::factory()->create();
        $this->assertArrayNotHasKey('password', $user->toArray());
    }

    public function test_admin_scope_returns_only_admins(): void
    {
        User::factory()->admin()->create();
        User::factory()->count(3)->create();
        $this->assertCount(1, User::admin()->get());
    }
}

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_active_scope_filters_correctly(): void
    {
        Product::factory()->count(3)->create(['is_active' => true]);
        Product::factory()->count(2)->create(['is_active' => false]);
        $this->assertCount(3, Product::active()->get());
    }

    public function test_it_belongs_to_a_user(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['user_id' => $user->id]);
        $this->assertTrue($product->user->is($user));
    }
}
```

## Feature / HTTP Tests

```php
namespace Tests\Feature\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login(): void
    {
        $this->get(route('products.create'))->assertRedirect(route('login'));
    }

    public function test_it_stores_a_new_product(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post(route('products.store'), [
            'name' => 'New Product',
            'description' => 'Description',
            'price' => 2999,
            'stock' => 10,
        ]);

        $response->assertRedirect(route('products.index'));
        $this->assertDatabaseHas('products', [
            'name' => 'New Product',
            'user_id' => $user->id,
        ]);
    }

    public function test_it_validates_required_fields(): void
    {
        $this->actingAs(User::factory()->create());
        $this->post(route('products.store'), [])
            ->assertSessionHasErrors(['name', 'price']);
    }

    public function test_users_cannot_modify_others_products(): void
    {
        $owner = User::factory()->create();
        $attacker = User::factory()->create();
        $product = Product::factory()->create(['user_id' => $owner->id]);

        $this->actingAs($attacker)
            ->delete(route('products.destroy', $product))
            ->assertForbidden();
    }
}
```
