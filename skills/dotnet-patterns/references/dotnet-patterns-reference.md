# .NET Patterns — Reference Examples

## Immutability

```csharp
public sealed record Money(decimal Amount, string Currency);

public sealed class CreateOrderRequest
{
    public required string CustomerId { get; init; }
    public required IReadOnlyList<OrderItem> Items { get; init; }
}
```

## Explicit Nullability and DI

```csharp
public class UserService(IUserRepository repository)
{
    private readonly IUserRepository _repository = repository
        ?? throw new ArgumentNullException(nameof(repository));

    public async Task<User?> FindByIdAsync(Guid id, CancellationToken ct)
        => await _repository.FindByIdAsync(id, ct);
}
```

## Interface Boundary

```csharp
public interface IOrderRepository
{
    Task<Order?> FindByIdAsync(Guid id, CancellationToken ct);
    Task<IReadOnlyList<Order>> FindByCustomerAsync(string customerId, CancellationToken ct);
    Task AddAsync(Order order, CancellationToken ct);
}

builder.Services.AddScoped<IOrderRepository, SqlOrderRepository>();
```

## Async/Await

```csharp
public async Task<OrderSummary> GetOrderSummaryAsync(Guid orderId, CancellationToken ct)
{
    var order = await _repository.FindByIdAsync(orderId, ct)
        ?? throw new NotFoundException($"Order {orderId} not found");
    var customer = await _customerService.GetAsync(order.CustomerId, ct);
    return new OrderSummary(order, customer);
}

public async Task<DashboardData> LoadDashboardAsync(CancellationToken ct)
{
    var orders = _orderService.GetRecentAsync(ct);
    var metrics = _metricsService.GetCurrentAsync(ct);
    var alerts = _alertService.GetActiveAsync(ct);
    await Task.WhenAll(orders, metrics, alerts);
    return new DashboardData(await orders, await metrics, await alerts);
}
```

## Options Pattern

```csharp
public sealed class SmtpOptions
{
    public const string SectionName = "Smtp";
    public required string Host { get; init; }
    public required int Port { get; init; }
    public required string Username { get; init; }
    public bool UseSsl { get; init; } = true;
}

builder.Services.Configure<SmtpOptions>(
    builder.Configuration.GetSection(SmtpOptions.SectionName));

class EmailService(IOptions<SmtpOptions> options)
{
    private readonly SmtpOptions _smtp = options.Value;
}
```

## Result Pattern

```csharp
public record Result<T>
{
    public bool IsSuccess { get; }
    public T? Value { get; }
    public string? Error { get; }
    private Result(T value) { IsSuccess = true; Value = value; }
    private Result(string error) { IsSuccess = false; Error = error; }
    public static Result<T> Success(T value) => new(value);
    public static Result<T> Failure(string error) => new(error);
}
```

## Repository

```csharp
public sealed class SqlOrderRepository(AppDbContext db) : IOrderRepository
{
    public async Task<Order?> FindByIdAsync(Guid id, CancellationToken ct)
    {
        return await db.Orders
            .Include(o => o.Items)
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id, ct);
    }
}
```

## Middleware

```csharp
public sealed class RequestTimingMiddleware(RequestDelegate next, ILogger<RequestTimingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var sw = Stopwatch.StartNew();
        try { await next(context); }
        finally
        {
            sw.Stop();
            logger.LogInformation("{Method} {Path} -> {StatusCode} in {ElapsedMs}ms",
                context.Request.Method,
                context.Request.Path,
                context.Response.StatusCode,
                sw.ElapsedMilliseconds);
        }
    }
}
```

## Minimal API

```csharp
var orders = app.MapGroup("/api/orders")
    .RequireAuthorization()
    .WithTags("Orders");

orders.MapGet("/{id:guid}", async (Guid id, IOrderRepository repo, CancellationToken ct) =>
    await repo.FindByIdAsync(id, ct) is { } order
        ? TypedResults.Ok(order)
        : TypedResults.NotFound());
```

## Guard Clauses

```csharp
public async Task<ProcessResult> ProcessPaymentAsync(PaymentRequest request, CancellationToken ct)
{
    ArgumentNullException.ThrowIfNull(request);
    if (request.Amount <= 0)
        throw new ArgumentOutOfRangeException(nameof(request.Amount), "Amount must be positive");
    if (string.IsNullOrWhiteSpace(request.Currency))
        throw new ArgumentException("Currency is required", nameof(request.Currency));

    return await _gatewayFactory.Create(request.Currency).ChargeAsync(request, ct);
}
```
