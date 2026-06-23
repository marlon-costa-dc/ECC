    public async Task DisposeAsync()
    {
        await _db.DisposeAsync();
        await _postgres.DisposeAsync();
    }

    [Fact]
    public async Task AddAsync_PersistsOrder()
    {
        var repo = new SqlOrderRepository(_db);
        var order = Order.Create("cust-1", [new OrderItem("SKU-001", 2, 10m)]);
        await repo.AddAsync(order, CancellationToken.None);
        var found = await repo.FindByIdAsync(order.Id, CancellationToken.None);
        found.Should().NotBeNull();
        found!.Items.Should().HaveCount(1);
    }
}
```

## Test Data Builder

```csharp
public sealed class OrderBuilder
{
    private string _customerId = "cust-default";
    private readonly List<OrderItem> _items = [new("SKU-001", 1, 10m)];

    public OrderBuilder WithCustomer(string customerId)
    {
        _customerId = customerId;
        return this;
    }

    public OrderBuilder WithItem(string sku, int quantity, decimal price)
    {
        _items.Add(new OrderItem(sku, quantity, price));
        return this;
    }

    public Order Build() => Order.Create(_customerId, _items);
}
```

## Test Organization

```
tests/
  MyApp.UnitTests/
    Services/
      OrderServiceTests.cs
  MyApp.IntegrationTests/
    Api/
      OrderApiTests.cs
  MyApp.TestHelpers/
    Builders/
      OrderBuilder.cs
```

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Testing implementation details | Test behavior and outcomes |
| Shared mutable test state | Fresh instance per test |
| `Thread.Sleep` in async tests | Use `Task.Delay` with timeout or polling |
| Asserting on `ToString()` | Assert on typed properties |
| One giant assertion | One logical assertion per test |
| Names describing implementation | Name by behavior |
| Ignoring `CancellationToken` | Always pass and verify cancellation |

## Running Tests

```bash
dotnet test
dotnet test --collect:"XPlat Code Coverage"
dotnet test tests/MyApp.UnitTests/
dotnet test --filter "FullyQualifiedName~OrderService"
dotnet watch test --project tests/MyApp.UnitTests/
```
