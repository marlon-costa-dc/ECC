# C# Testing Reference

Expanded examples and commands for `csharp-testing`.

## Unit Test Example

```csharp
public sealed class OrderServiceTests
{
    private readonly IOrderRepository _repo = Substitute.For<IOrderRepository>();
    private readonly OrderService _sut;

    public OrderServiceTests() => _sut = new OrderService(_repo);

    [Fact]
    public async Task PlaceOrderAsync_ReturnsSuccess_WhenRequestIsValid()
    {
        var request = new CreateOrderRequest
        {
            CustomerId = "cust-123",
            Items = [new OrderItem("SKU-001", 2, 29.99m)]
        };

        var result = await _sut.PlaceOrderAsync(request, CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        result.Value!.CustomerId.Should().Be("cust-123");
    }

    [Fact]
    public async Task PlaceOrderAsync_ReturnsFailure_WhenNoItems()
    {
        var request = new CreateOrderRequest { CustomerId = "cust-123", Items = [] };
        var result = await _sut.PlaceOrderAsync(request, CancellationToken.None);
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Contain("at least one item");
    }
}
```

## Parameterized Tests

```csharp
[Theory]
[InlineData("", false)]
[InlineData("user@example.com", true)]
public void IsValidEmail_ReturnsExpected(string email, bool expected)
{
    EmailValidator.IsValid(email).Should().Be(expected);
}

public static TheoryData<CreateOrderRequest, string> InvalidOrderCases => new()
{
    { new() { CustomerId = "", Items = [ValidItem()] }, "CustomerId" },
    { new() { CustomerId = "c1", Items = [] }, "at least one item" },
};

[Theory]
[MemberData(nameof(InvalidOrderCases))]
public async Task PlaceOrderAsync_RejectsInvalidOrders(CreateOrderRequest request, string expectedError)
{
    var result = await _sut.PlaceOrderAsync(request, CancellationToken.None);
    result.IsSuccess.Should().BeFalse();
    result.Error.Should().Contain(expectedError);
}
```

## Mocking with NSubstitute

```csharp
[Fact]
public async Task GetOrderAsync_ReturnsNull_WhenNotFound()
{
    var orderId = Guid.NewGuid();
    _repo.FindByIdAsync(orderId, Arg.Any<CancellationToken>()).Returns((Order?)null);
    var result = await _sut.GetOrderAsync(orderId, CancellationToken.None);
    result.Should().BeNull();
}

[Fact]
public async Task PlaceOrderAsync_PersistsOrder()
{
    var request = ValidOrderRequest();
    await _sut.PlaceOrderAsync(request, CancellationToken.None);
    await _repo.Received(1).AddAsync(
        Arg.Is<Order>(o => o.CustomerId == request.CustomerId),
        Arg.Any<CancellationToken>());
}
```

## Integration Test with WebApplicationFactory

```csharp
public sealed class OrderApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public OrderApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.RemoveAll<DbContextOptions<AppDbContext>>();
                services.AddDbContext<AppDbContext>(options =>
                    options.UseInMemoryDatabase("TestDb"));
            });
        }).CreateClient();
    }

    [Fact]
    public async Task GetOrder_Returns404_WhenNotFound()
    {
        var response = await _client.GetAsync($"/api/orders/{Guid.NewGuid()}");
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}
```

## Testcontainers Example

```csharp
public sealed class PostgresOrderRepositoryTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgres = new PostgreSqlBuilder()
        .WithImage("postgres:16-alpine")
        .Build();

    private AppDbContext _db = null!;

    public async Task InitializeAsync()
    {
        await _postgres.StartAsync();
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(_postgres.GetConnectionString())
            .Options;
        _db = new AppDbContext(options);
        await _db.Database.MigrateAsync();
    }

> Continued in [`csharp-testing-reference-2.md`](csharp-testing-reference-2.md)
