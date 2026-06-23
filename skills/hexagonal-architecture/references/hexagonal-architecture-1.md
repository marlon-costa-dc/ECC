# Hexagonal Architecture Reference

Detailed guide to Ports & Adapters (hexagonal) architecture.

## Core Concepts

- **Domain model**: business rules and entities/value objects; no framework imports
- **Use cases (application layer)**: orchestrate domain behavior and workflow steps
- **Inbound ports**: contracts describing what the application can do
- **Outbound ports**: contracts for dependencies the application needs
- **Adapters**: infrastructure and delivery implementations of ports
- **Composition root**: single wiring location where adapters are bound to use cases

Dependency direction is always inward:

- Adapters -> application/domain
- Application -> port interfaces
- Domain -> domain-only abstractions
- Domain -> nothing external

## Module Layout

```text
src/
  features/
    orders/
      domain/
        Order.ts
        OrderPolicy.ts
      application/
        ports/
          inbound/
            CreateOrder.ts
          outbound/
            OrderRepositoryPort.ts
            PaymentGatewayPort.ts
        use-cases/
          CreateOrderUseCase.ts
      adapters/
        inbound/
          http/
            createOrderRoute.ts
        outbound/
          postgres/
            PostgresOrderRepository.ts
          stripe/
            StripePaymentGateway.ts
      composition/
        ordersContainer.ts
```

## TypeScript Example

### Ports

```typescript
export interface OrderRepositoryPort {
  save(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
}

export interface PaymentGatewayPort {
  authorize(input: { orderId: string; amountCents: number }): Promise<{ authorizationId: string }>;
}
```

### Use Case

```typescript
type CreateOrderInput = { orderId: string; amountCents: number };
type CreateOrderOutput = { orderId: string; authorizationId: string };

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly paymentGateway: PaymentGatewayPort
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const order = Order.create({ id: input.orderId, amountCents: input.amountCents });
    const auth = await this.paymentGateway.authorize({
      orderId: order.id,
      amountCents: order.amountCents,
    });
    const authorizedOrder = order.markAuthorized(auth.authorizationId);
    await this.orderRepository.save(authorizedOrder);
    return { orderId: order.id, authorizationId: auth.authorizationId };
  }
}
```

### Outbound Adapter

```typescript
export class PostgresOrderRepository implements OrderRepositoryPort {
  constructor(private readonly db: SqlClient) {}

  async save(order: Order): Promise<void> {
    await this.db.query(
      "insert into orders (id, amount_cents, status, authorization_id) values ($1, $2, $3, $4)",
      [order.id, order.amountCents, order.status, order.authorizationId]
    );
  }

  async findById(orderId: string): Promise<Order | null> {
    const row = await this.db.oneOrNone("select * from orders where id = $1", [orderId]);
    return row ? Order.rehydrate(row) : null;
  }
}
```

### Composition Root

```typescript
export const buildCreateOrderUseCase = (deps: { db: SqlClient; stripe: StripeClient }) => {
  const orderRepository = new PostgresOrderRepository(deps.db);
  const paymentGateway = new StripePaymentGateway(deps.stripe);
  return new CreateOrderUseCase(orderRepository, paymentGateway);
};
```

## Multi-Language Mapping

### TypeScript/JavaScript

- Ports: `application/ports/*` as interfaces/types
- Use cases: classes/functions with constructor/argument injection
- Adapters: `adapters/inbound/*`, `adapters/outbound/*`
- Composition: explicit factory/container module (no hidden globals)

### Java

- Packages: `domain`, `application.port.in`, `application.port.out`, `application.usecase`, `adapter.in`, `adapter.out`
- Ports: interfaces in `application.port.*`
- Use cases: plain classes (Spring `@Service` optional)
- Composition: Spring config or manual wiring class

### Kotlin

> Continued in [`hexagonal-architecture-2.md`](hexagonal-architecture-2.md)
