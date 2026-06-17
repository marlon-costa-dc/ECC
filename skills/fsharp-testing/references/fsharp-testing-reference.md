# F# Testing Reference

Detailed examples for the `fsharp-testing` skill.

## Unit Tests with xUnit + FsUnit

```fsharp
module OrderServiceTests

open Xunit
open FsUnit.Xunit

[<Fact>]
let ``create sets status to Pending`` () =
    let order = Order.create "cust-1" [ validItem ]
    order.Status |> should equal Pending

[<Fact>]
let ``confirm changes status to Confirmed`` () =
    let order = Order.create "cust-1" [ validItem ]
    let confirmed = Order.confirm order
    confirmed.Status |> should be (ofCase <@ Confirmed @>)
```

## Assertions with Unquote

Unquote uses F# quotations so failure messages show the full expression that failed.

```fsharp
module OrderValidationTests

open Xunit
open Swensen.Unquote

[<Fact>]
let ``PlaceOrder returns success when request is valid`` () =
    let request = { CustomerId = "cust-123"; Items = [ validItem ] }
    let result = OrderService.placeOrder request
    test <@ Result.isOk result @>

[<Fact>]
let ``order total sums item prices`` () =
    let items = [ { Sku = "A"; Quantity = 2; Price = 10m }
                  { Sku = "B"; Quantity = 1; Price = 5m } ]
    let total = Order.calculateTotal items
    test <@ total = 25m @>
```

## Async Tests

```fsharp
[<Fact>]
let ``PlaceOrder returns success when request is valid`` () = task {
    let deps = createTestDeps ()
    let request = { CustomerId = "cust-123"; Items = [ validItem ] }
    let! result = OrderService.placeOrder deps request
    test <@ Result.isOk result @>
}
```

## Parameterized Tests with Theory

```fsharp
[<Theory>]
[<InlineData("")>]
[<InlineData("   ")>]
let ``PlaceOrder rejects empty customer ID`` (customerId: string) =
    let request = { CustomerId = customerId; Items = [ validItem ] }
    let result = OrderService.placeOrder request
    result |> should be (ofCase <@ Error @>)

[<Theory>]
[<InlineData("", false)>]
[<InlineData("a", false)>]
[<InlineData("user@example.com", true)>]
let ``IsValidEmail returns expected result`` (email: string, expected: bool) =
    test <@ EmailValidator.isValid email = expected @>
```

## Property-Based Testing with FsCheck

```fsharp
open FsCheck
open FsCheck.Xunit

[<Property>]
let ``order total is always non-negative`` (items: NonEmptyList<PositiveInt * decimal>) =
    let orderItems =
        items.Get
        |> List.map (fun (qty, price) ->
            { Sku = "SKU"; Quantity = qty.Get; Price = abs price })
    let total = Order.calculateTotal orderItems
    total >= 0m

[<Property>]
let ``serialization roundtrips`` (order: Order) =
    let json = JsonSerializer.Serialize order
    let deserialized = JsonSerializer.Deserialize<Order> json
    deserialized = order
```

## Custom Generators

```fsharp
type OrderGenerators =
    static member ValidEmail () =
        gen {
            let! user = Gen.elements [ "alice"; "bob"; "carol" ]
            let! domain = Gen.elements [ "example.com"; "test.org" ]
            return $"{user}@{domain}"
        }
        |> Arb.fromGen

[<Property(Arbitrary = [| typeof<OrderGenerators> |])>]
let ``valid emails pass validation`` (email: string) =
    EmailValidator.isValid email
```

## Mocking Dependencies

Prefer function stubs for record-of-functions dependencies:

```fsharp
let createTestDeps () =
    { FindOrder = fun id -> task { return Map.tryFind id testData }
      SaveOrder = fun order -> task { savedOrders <- order :: savedOrders }
      SendNotification = fun _ -> Task.CompletedTask }

[<Fact>]
let ``PlaceOrder saves the confirmed order`` () = task {
    let mutable saved = []
    let deps =
        { createTestDeps () with
            SaveOrder = fun order -> task { saved <- order :: saved } }
    let! _ = OrderService.placeOrder deps validRequest
    test <@ saved.Length = 1 @>
}
```

Use NSubstitute for .NET interfaces:

```fsharp
open NSubstitute

[<Fact>]
let ``calls repository with correct ID`` () = task {
    let repo = Substitute.For<IOrderRepository>()
    repo.FindByIdAsync(Arg.Any<Guid>(), Arg.Any<CancellationToken>())
        .Returns(Task.FromResult(Some testOrder))

    let service = OrderService(repo)
    let! _ = service.GetOrder(testOrder.Id, CancellationToken.None)

    do! repo.Received(1).FindByIdAsync(testOrder.Id, Arg.Any<CancellationToken>())
}
```

## ASP.NET Core Integration Tests

```fsharp
type OrderApiTests (factory: WebApplicationFactory<Program>) =
    interface IClassFixture<WebApplicationFactory<Program>>

    let client =
        factory.WithWebHostBuilder(fun builder ->
            builder.ConfigureServices(fun services ->
                services.RemoveAll<DbContextOptions<AppDbContext>>() |> ignore
                services.AddDbContext<AppDbContext>(fun options ->
                    options.UseInMemoryDatabase("TestDb") |> ignore) |> ignore))
            .CreateClient()

    [<Fact>]
    member _.``GET order returns 404 when not found`` () = task {
        let! response = client.GetAsync($"/api/orders/{Guid.NewGuid()}")
        test <@ response.StatusCode = HttpStatusCode.NotFound @>
    }
```

## Test Organization

```
tests/
  MyApp.Tests/
    Unit/
      OrderServiceTests.fs
      PaymentServiceTests.fs
    Integration/
      OrderApiTests.fs
      OrderRepositoryTests.fs
    Properties/
      OrderPropertyTests.fs
    Helpers/
      TestData.fs
      TestDeps.fs
```

## Common Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Testing implementation details | Test behavior and outcomes |
| Mutable shared test state | Fresh state per test |
| `Thread.Sleep` in async tests | Use `Task.Delay` with timeout or polling helpers |
| Asserting on `sprintf` output | Assert on typed values and pattern matches |
| Ignoring `CancellationToken` | Always pass and verify cancellation |
| Skipping property-based tests | Use FsCheck for any function with clear invariants |
